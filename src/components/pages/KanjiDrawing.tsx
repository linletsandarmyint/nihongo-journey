import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  RotateCcw,
  Trash2,
  PenLine,
} from "lucide-react";

type Point = {
  x: number;
  y: number;
};

type Stroke = Point[];

function KanjiDrawing() {
  const location = useLocation();

  // =====================================================
  // Get Kanji From Navigation State
  // =====================================================

  const state = location.state as
    | {
        kanji?: string;
        burmese?: string | null;
      }
    | undefined;

  const kanji = state?.kanji || "漢";
  const burmese = state?.burmese || "Kanji Practice";

  // =====================================================
  // Canvas
  // =====================================================

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const currentStrokeRef = useRef<Stroke>([]);
  const isDrawingRef = useRef(false);

  // =====================================================
  // UI State
  // =====================================================

  const [showGuide, setShowGuide] = useState(true);
  const [penSize, setPenSize] = useState(6);
  const [hasDrawing, setHasDrawing] = useState(false);

  // =====================================================
  // Canvas Size
  // =====================================================

  const CANVAS_SIZE = 500;

  // =====================================================
  // Setup Canvas
  // =====================================================

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    context.lineCap = "round";
    context.lineJoin = "round";

    redrawCanvas();
  }, [kanji, showGuide, strokes]);

  // =====================================================
  // Resize / DPR Support
  // =====================================================

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();

      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const context = canvas.getContext("2d");

      if (!context) {
        return;
      }

      context.scale(dpr, dpr);

      redrawCanvas();
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [showGuide, strokes]);

  // =====================================================
  // Get Canvas Coordinates
  // =====================================================

  function getCanvasPoint(event: React.PointerEvent<HTMLCanvasElement>): Point {
    const canvas = canvasRef.current;

    if (!canvas) {
      return { x: 0, y: 0 };
    }

    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  // =====================================================
  // Draw Guide
  // =====================================================

  function drawGuide(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) {
    if (!showGuide) {
      return;
    }

    context.save();

    context.font = `bold ${Math.min(width, height) * 0.68}px "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif`;

    context.textAlign = "center";
    context.textBaseline = "middle";

    context.fillStyle = "rgba(244, 114, 182, 0.10)";

    context.fillText(kanji, width / 2, height / 2 + 5);

    context.restore();
  }

  // =====================================================
  // Draw Grid
  // =====================================================

  function drawGrid(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) {
    context.save();

    context.strokeStyle = "rgba(244, 114, 182, 0.10)";
    context.lineWidth = 1;

    // Vertical
    context.beginPath();
    context.moveTo(width / 2, 0);
    context.lineTo(width / 2, height);
    context.stroke();

    // Horizontal
    context.beginPath();
    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    context.stroke();

    // Diagonal
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(width, height);
    context.stroke();

    context.beginPath();
    context.moveTo(width, 0);
    context.lineTo(0, height);
    context.stroke();

    context.restore();
  }

  // =====================================================
  // Redraw Everything
  // =====================================================

  function redrawCanvas() {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const width = canvas.clientWidth || CANVAS_SIZE;
    const height = canvas.clientHeight || CANVAS_SIZE;

    context.clearRect(0, 0, width, height);

    drawGrid(context, width, height);

    drawGuide(context, width, height);

    // Draw User Strokes
    context.save();

    context.strokeStyle = "#ec4899";
    context.lineWidth = penSize;
    context.lineCap = "round";
    context.lineJoin = "round";

    strokes.forEach((stroke) => {
      if (stroke.length === 0) {
        return;
      }

      context.beginPath();

      context.moveTo(stroke[0].x, stroke[0].y);

      for (let index = 1; index < stroke.length; index += 1) {
        context.lineTo(stroke[index].x, stroke[index].y);
      }

      context.stroke();
    });

    context.restore();
  }

  // =====================================================
  // Pointer Down
  // =====================================================

  function handlePointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    event.preventDefault();

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    canvas.setPointerCapture(event.pointerId);

    isDrawingRef.current = true;

    const point = getCanvasPoint(event);

    currentStrokeRef.current = [point];

    setHasDrawing(true);
  }

  // =====================================================
  // Pointer Move
  // =====================================================

  function handlePointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawingRef.current) {
      return;
    }

    event.preventDefault();

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const point = getCanvasPoint(event);

    const stroke = currentStrokeRef.current;

    const previousPoint = stroke[stroke.length - 1];

    if (!previousPoint) {
      return;
    }

    stroke.push(point);

    context.save();

    context.strokeStyle = "#ec4899";
    context.lineWidth = penSize;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.beginPath();

    context.moveTo(previousPoint.x, previousPoint.y);

    context.lineTo(point.x, point.y);

    context.stroke();

    context.restore();
  }

  // =====================================================
  // Pointer Up
  // =====================================================

  function handlePointerUp(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawingRef.current) {
      return;
    }

    isDrawingRef.current = false;

    const stroke = currentStrokeRef.current;

    if (stroke.length > 0) {
      setStrokes((previous) => [...previous, stroke]);
    }

    currentStrokeRef.current = [];

    try {
      canvasRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      // Ignore pointer capture errors
    }
  }

  // =====================================================
  // Undo
  // =====================================================

  function undoLastStroke() {
    setStrokes((previous) => {
      const updated = previous.slice(0, -1);

      if (updated.length === 0) {
        setHasDrawing(false);
      }

      return updated;
    });
  }

  // =====================================================
  // Clear
  // =====================================================

  function clearCanvas() {
    setStrokes([]);
    currentStrokeRef.current = [];
    isDrawingRef.current = false;
    setHasDrawing(false);
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-4xl">
        {/* =====================================================
            BACK
        ===================================================== */}

        <Link
          to="/kanji-master"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-pink-500"
        >
          <ArrowLeft size={18} />
          Back to Kanji Master
        </Link>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <section className="rounded-[2rem] bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
              <PenLine size={25} />
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-pink-400">
              Kanji Practice
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-800 sm:text-4xl">
              Practice Writing
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Trace the guide or practice writing freely. ✨
            </p>
          </div>

          {/* =====================================================
              KANJI INFO
          ===================================================== */}

          <div className="mx-auto mt-7 flex max-w-xl items-center justify-center gap-4 rounded-3xl bg-pink-50 p-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-5xl font-bold text-gray-800 shadow-sm">
              {kanji}
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-pink-400">
                Current Kanji
              </p>

              <p className="mt-1 text-lg font-bold text-gray-800">{kanji}</p>

              <p className="mt-1 truncate text-sm font-medium text-gray-500">
                {burmese}
              </p>
            </div>
          </div>

          {/* =====================================================
              CANVAS
          ===================================================== */}

          <div className="mx-auto mt-7 max-w-xl">
            <div className="overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-sm">
              <div className="relative aspect-square w-full">
                <canvas
                  ref={canvasRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  className="h-full w-full touch-none cursor-crosshair"
                  aria-label={`Practice writing ${kanji}`}
                />

                {!hasDrawing && showGuide && (
                  <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-gray-400 shadow-sm">
                    Trace the kanji ✨
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =====================================================
              GUIDE + PEN
          ===================================================== */}

          <div className="mx-auto mt-5 max-w-xl">
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Guide */}
              <button
                type="button"
                onClick={() => setShowGuide((previous) => !previous)}
                className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition active:scale-[0.98] ${
                  showGuide
                    ? "bg-pink-100 text-pink-500 hover:bg-pink-200"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {showGuide ? <Eye size={18} /> : <EyeOff size={18} />}

                {showGuide ? "Hide Guide" : "Show Guide"}
              </button>

              {/* Clear */}
              <button
                type="button"
                onClick={clearCanvas}
                disabled={!hasDrawing}
                className="flex items-center justify-center gap-2 rounded-2xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-500 transition hover:bg-red-50 hover:text-red-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 size={18} />
                Clear
              </button>
            </div>
          </div>

          {/* =====================================================
              PEN SIZE
          ===================================================== */}

          <div className="mx-auto mt-5 max-w-xl rounded-2xl bg-purple-50 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-500">
                Pen Size
              </p>

              <span className="text-xs font-bold text-purple-400">
                {penSize}px
              </span>
            </div>

            <input
              type="range"
              min="2"
              max="14"
              value={penSize}
              onChange={(event) => setPenSize(Number(event.target.value))}
              className="mt-3 w-full accent-pink-500"
            />

            <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-gray-400">
              <span>Thin</span>
              <span>Medium</span>
              <span>Thick</span>
            </div>
          </div>

          {/* =====================================================
              ACTIONS
          ===================================================== */}

          <div className="mx-auto mt-5 grid max-w-xl grid-cols-2 gap-3">
            <button
              type="button"
              onClick={undoLastStroke}
              disabled={strokes.length === 0}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-gray-500 shadow-sm ring-1 ring-gray-100 transition hover:bg-gray-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw size={17} />
              Undo
            </button>

            <button
              type="button"
              onClick={clearCanvas}
              disabled={!hasDrawing}
              className="flex items-center justify-center gap-2 rounded-2xl bg-pink-500 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-pink-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Check size={17} />
              Start Again
            </button>
          </div>

          {/* =====================================================
              TIP
          ===================================================== */}

          <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-pink-100 bg-pink-50/60 px-4 py-3 text-center">
            <p className="text-xs leading-5 text-gray-500">
              🌸 <span className="font-bold text-pink-500">Tip:</span> Try
              writing the kanji several times without the guide to improve your
              memory.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default KanjiDrawing;
