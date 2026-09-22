import { useEffect, useRef, useState, type PointerEvent } from "react";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Eraser,
  Play,
  RotateCcw,
  Sparkles,
  Trash2,
} from "lucide-react";

type KanjiDrawingProps = {
  kanji: string;
};

type Point = {
  x: number;
  y: number;
};

type Mode = "practice" | "trace" | "stroke";

function KanjiDrawing({ kanji }: KanjiDrawingProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [mode, setMode] = useState<Mode>("practice");

  const [isDrawing, setIsDrawing] = useState(false);

  const [strokes, setStrokes] = useState<Point[][]>([]);

  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);

  // =====================================================
  // Stroke Order Demo
  // =====================================================

  /*
   * Temporary stroke count.
   *
   * Later we will replace this with the real
   * KanjiVG stroke data.
   */
  const [currentStrokeNumber, setCurrentStrokeNumber] = useState(1);

  const [isAnimating, setIsAnimating] = useState(false);

  const totalDemoStrokes = 8;

  // =====================================================
  // Canvas
  // =====================================================

  const CANVAS_SIZE = 320;

  // =====================================================
  // Canvas Context
  // =====================================================

  function getContext() {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    return canvas.getContext("2d");
  }

  // =====================================================
  // Grid
  // =====================================================

  function drawGrid(context: CanvasRenderingContext2D) {
    context.save();

    context.strokeStyle = "rgba(236, 72, 153, 0.12)";

    context.lineWidth = 1;

    // Vertical

    context.beginPath();

    context.moveTo(CANVAS_SIZE / 2, 0);

    context.lineTo(CANVAS_SIZE / 2, CANVAS_SIZE);

    context.stroke();

    // Horizontal

    context.beginPath();

    context.moveTo(0, CANVAS_SIZE / 2);

    context.lineTo(CANVAS_SIZE, CANVAS_SIZE / 2);

    context.stroke();

    // Diagonal

    context.beginPath();

    context.moveTo(0, 0);

    context.lineTo(CANVAS_SIZE, CANVAS_SIZE);

    context.stroke();

    // Opposite diagonal

    context.beginPath();

    context.moveTo(CANVAS_SIZE, 0);

    context.lineTo(0, CANVAS_SIZE);

    context.stroke();

    context.restore();
  }

  // =====================================================
  // Draw Stroke
  // =====================================================

  function drawStroke(context: CanvasRenderingContext2D, stroke: Point[]) {
    if (stroke.length === 0) return;

    context.beginPath();

    context.moveTo(stroke[0].x, stroke[0].y);

    for (let index = 1; index < stroke.length; index += 1) {
      context.lineTo(stroke[index].x, stroke[index].y);
    }

    context.stroke();
  }

  // =====================================================
  // Redraw
  // =====================================================

  function redrawCanvas(
    savedStrokes: Point[][] = strokes,
    activeStroke: Point[] = [],
  ) {
    const context = getContext();

    if (!context) return;

    context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Grid

    drawGrid(context);

    // ===================================================
    // Trace Guide
    // ===================================================

    if (mode === "trace" || mode === "stroke") {
      context.save();

      context.font =
        "bold 235px 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif";

      context.textAlign = "center";

      context.textBaseline = "middle";

      context.fillStyle =
        mode === "stroke"
          ? "rgba(236, 72, 153, 0.07)"
          : "rgba(168, 85, 247, 0.10)";

      context.fillText(kanji, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 8);

      context.restore();
    }

    // ===================================================
    // User Drawing
    // ===================================================

    context.save();

    context.lineCap = "round";

    context.lineJoin = "round";

    context.lineWidth = 7;

    context.strokeStyle = "#ec4899";

    savedStrokes.forEach((stroke) => {
      drawStroke(context, stroke);
    });

    if (activeStroke.length > 0) {
      drawStroke(context, activeStroke);
    }

    context.restore();
  }

  // =====================================================
  // Canvas Coordinates
  // =====================================================

  function getCanvasPoint(
    event: PointerEvent<HTMLCanvasElement>,
  ): Point | null {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    const scaleX = CANVAS_SIZE / rect.width;

    const scaleY = CANVAS_SIZE / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,

      y: (event.clientY - rect.top) * scaleY,
    };
  }

  // =====================================================
  // Start Drawing
  // =====================================================

  function handlePointerDown(event: PointerEvent<HTMLCanvasElement>) {
    if (mode === "stroke") return;

    event.preventDefault();

    const point = getCanvasPoint(event);

    if (!point) return;

    event.currentTarget.setPointerCapture(event.pointerId);

    setIsDrawing(true);

    setCurrentStroke([point]);
  }

  // =====================================================
  // Draw
  // =====================================================

  function handlePointerMove(event: PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;

    event.preventDefault();

    const point = getCanvasPoint(event);

    if (!point) return;

    setCurrentStroke((previous) => {
      const updated = [...previous, point];

      redrawCanvas(strokes, updated);

      return updated;
    });
  }

  // =====================================================
  // Finish Drawing
  // =====================================================

  function handlePointerUp(event: PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;

    event.preventDefault();

    const point = getCanvasPoint(event);

    const finishedStroke = point ? [...currentStroke, point] : currentStroke;

    if (finishedStroke.length > 1) {
      setStrokes((previous) => [...previous, finishedStroke]);
    }

    setCurrentStroke([]);

    setIsDrawing(false);
  }

  // =====================================================
  // Clear
  // =====================================================

  function clearDrawing() {
    setStrokes([]);

    setCurrentStroke([]);

    requestAnimationFrame(() => {
      redrawCanvas([]);
    });
  }

  // =====================================================
  // Undo
  // =====================================================

  function undoStroke() {
    if (strokes.length === 0) {
      return;
    }

    setStrokes((previous) => previous.slice(0, -1));
  }

  // =====================================================
  // Change Mode
  // =====================================================

  function changeMode(newMode: Mode) {
    setMode(newMode);

    setCurrentStrokeNumber(1);

    setIsAnimating(false);

    setStrokes([]);

    setCurrentStroke([]);
  }

  // =====================================================
  // Stroke Navigation
  // =====================================================

  function previousStroke() {
    setCurrentStrokeNumber((previous) => Math.max(1, previous - 1));

    setIsAnimating(false);
  }

  function nextStroke() {
    setCurrentStrokeNumber((previous) =>
      Math.min(totalDemoStrokes, previous + 1),
    );

    setIsAnimating(false);
  }

  // =====================================================
  // Animate Stroke
  // =====================================================

  function animateStroke() {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 900);
  }

  // =====================================================
  // Reset When Kanji Changes
  // =====================================================

  useEffect(() => {
    setStrokes([]);

    setCurrentStroke([]);

    setCurrentStrokeNumber(1);

    setIsAnimating(false);
  }, [kanji]);

  // =====================================================
  // Redraw
  // =====================================================

  useEffect(() => {
    requestAnimationFrame(() => {
      redrawCanvas(strokes, currentStroke);
    });
  }, [strokes, currentStroke, mode, kanji]);

  // =====================================================
  // Render
  // =====================================================

  return (
    <section
      className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-sm"
      onClick={(event) => event.stopPropagation()}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="border-b border-pink-100 bg-gradient-to-r from-pink-50 via-white to-purple-50 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-100">
              <span className="text-xl">✍️</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-gray-800 sm:text-xl">
                  Kanji Writing Practice
                </h2>

                <Sparkles size={16} className="text-pink-400" />
              </div>

              <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                Practice writing {kanji} step by step.
              </p>
            </div>
          </div>

          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm sm:flex">
            <span className="text-3xl font-bold text-gray-800">{kanji}</span>
          </div>
        </div>
      </div>

      {/* =================================================
          MODE SELECTOR
      ================================================= */}

      <div className="p-4 sm:p-6">
        <div className="mb-5 grid grid-cols-3 rounded-2xl bg-pink-50 p-1">
          {/* Practice */}

          <button
            type="button"
            onClick={() => changeMode("practice")}
            className={`rounded-xl px-2 py-2.5 text-[10px] font-bold transition sm:px-3 sm:text-sm ${
              mode === "practice"
                ? "bg-white text-pink-500 shadow-sm"
                : "text-gray-400 hover:text-pink-400"
            }`}
          >
            ✍️ Practice
          </button>

          {/* Trace */}

          <button
            type="button"
            onClick={() => changeMode("trace")}
            className={`rounded-xl px-2 py-2.5 text-[10px] font-bold transition sm:px-3 sm:text-sm ${
              mode === "trace"
                ? "bg-white text-purple-500 shadow-sm"
                : "text-gray-400 hover:text-purple-400"
            }`}
          >
            👻 Trace
          </button>

          {/* Stroke Order */}

          <button
            type="button"
            onClick={() => changeMode("stroke")}
            className={`rounded-xl px-2 py-2.5 text-[10px] font-bold transition sm:px-3 sm:text-sm ${
              mode === "stroke"
                ? "bg-white text-blue-500 shadow-sm"
                : "text-gray-400 hover:text-blue-400"
            }`}
          >
            🖌️ Stroke Order
          </button>
        </div>

        {/* =================================================
            STROKE ORDER INFO
        ================================================= */}

        {mode === "stroke" && (
          <div className="mb-5 rounded-2xl bg-blue-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-blue-400">
                  Stroke Order
                </p>

                <p className="mt-1 text-sm font-bold text-gray-700">
                  Follow each stroke carefully ✨
                </p>
              </div>

              <div className="rounded-xl bg-white px-3 py-2 text-sm font-extrabold text-blue-500 shadow-sm">
                {currentStrokeNumber} / {totalDemoStrokes}
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            CANVAS
        ================================================= */}

        <div className="flex justify-center">
          <div className="relative w-full max-w-[320px]">
            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerLeave={(event) => {
                if (isDrawing) {
                  handlePointerUp(event);
                }
              }}
              className={`block aspect-square w-full rounded-3xl border-2 border-pink-100 bg-white shadow-inner ${
                mode === "stroke" ? "cursor-default" : "cursor-crosshair"
              }`}
              style={{
                touchAction: "none",
              }}
              aria-label={`Kanji drawing canvas for ${kanji}`}
            />

            {/* Stroke Animation Indicator */}

            {mode === "stroke" && isAnimating && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-blue-500/10 px-5 py-3 text-sm font-bold text-blue-500 backdrop-blur-sm">
                  ✨ Watch the stroke
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            STROKE CONTROLS
        ================================================= */}

        {mode === "stroke" && (
          <div className="mt-5">
            {/* Progress */}

            <div className="mb-4 h-2 overflow-hidden rounded-full bg-blue-50">
              <div
                className="h-full rounded-full bg-blue-400 transition-all duration-300"
                style={{
                  width: `${(currentStrokeNumber / totalDemoStrokes) * 100}%`,
                }}
              />
            </div>

            {/* Buttons */}

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={previousStroke}
                disabled={currentStrokeNumber === 1}
                className="flex items-center justify-center gap-1 rounded-2xl bg-gray-50 px-2 py-3 text-xs font-bold text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={15} />

                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                type="button"
                onClick={animateStroke}
                className="flex items-center justify-center gap-1 rounded-2xl bg-blue-500 px-2 py-3 text-xs font-bold text-white transition hover:bg-blue-600 active:scale-95"
              >
                <Play size={14} />

                <span>{isAnimating ? "Playing..." : "Show Stroke"}</span>
              </button>

              <button
                type="button"
                onClick={nextStroke}
                disabled={currentStrokeNumber === totalDemoStrokes}
                className="flex items-center justify-center gap-1 rounded-2xl bg-blue-50 px-2 py-3 text-xs font-bold text-blue-500 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="hidden sm:inline">Next</span>

                <ChevronRight size={15} />
              </button>
            </div>

            {/* Restart */}

            <button
              type="button"
              onClick={() => {
                setCurrentStrokeNumber(1);
                setIsAnimating(false);
              }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-50 px-4 py-3 text-xs font-bold text-gray-500 transition hover:bg-gray-100"
            >
              <RotateCcw size={14} />
              Restart Stroke Order
            </button>
          </div>
        )}

        {/* =================================================
            PRACTICE CONTROLS
        ================================================= */}

        {mode !== "stroke" && (
          <>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-xs font-semibold text-gray-400">
                Practice:
              </span>

              <span className="text-xl font-bold text-pink-500">{kanji}</span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={undoStroke}
                disabled={strokes.length === 0}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gray-50 px-4 py-3 text-xs font-bold text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
              >
                <RotateCcw size={16} />
                Undo
              </button>

              <button
                type="button"
                onClick={clearDrawing}
                disabled={strokes.length === 0}
                className="flex items-center justify-center gap-2 rounded-2xl bg-pink-50 px-4 py-3 text-xs font-bold text-pink-500 transition hover:bg-pink-100 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
              >
                <Trash2 size={16} />
                Clear
              </button>
            </div>
          </>
        )}

        {/* =================================================
            TIP
        ================================================= */}

        <div className="mt-5 flex items-start gap-2 rounded-2xl bg-purple-50 p-3.5">
          <Eraser size={16} className="mt-0.5 shrink-0 text-purple-400" />

          <p className="text-xs leading-5 text-purple-500">
            {mode === "stroke"
              ? "Learn the correct stroke order first. We will connect this to real stroke data next."
              : mode === "trace"
                ? "Follow the faint kanji guide and practice each stroke carefully."
                : "Try writing the kanji from memory. Use Undo if you make a mistake."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default KanjiDrawing;
