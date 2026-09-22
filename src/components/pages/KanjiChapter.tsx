import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Flame,
  RotateCcw,
  Search,
  Settings2,
  Trash2,
  Volume2,
} from "lucide-react";

import { kanjiMaster } from "../../data/kanjiMaster";
import { kanjiVocabulary } from "../../data/kanjiVocabulary";
import { kanjiChapter2 } from "../../data/kanjiChapter2";
import { kanjiChapter3 } from "../../data/kanjiChapter3";
import { kanjiChapter4 } from "../../data/kanjiChapter4";
import { kanjiChapter5 } from "../../data/kanjiChapter5";

type Point = {
  x: number;
  y: number;
};

type Stroke = Point[];

type VisibleColumns = {
  kanji: boolean;
  hiragana: boolean;
  meaning: boolean;
  audio: boolean;
  hard: boolean;
};

function KanjiChapter() {
  const { chapterId } = useParams();

  // =====================================================
  // Chapter
  // =====================================================

  const chapterIndex = Number(chapterId) - 1;
  const chapter = kanjiMaster[chapterIndex];

  // =====================================================
  // State
  // =====================================================

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // =====================================================
  // Drawing Practice State
  // =====================================================

  const [isPracticing, setIsPracticing] = useState(false);
  const [showPracticeGuide, setShowPracticeGuide] = useState(true);
  const [penSize, setPenSize] = useState(5);
  const [drawingStrokes, setDrawingStrokes] = useState<Stroke[]>([]);

  const drawingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentStrokeRef = useRef<Stroke>([]);
  const isDrawingRef = useRef(false);

  // =====================================================
  // Vocabulary Column Visibility
  // =====================================================

  const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>({
    kanji: true,
    hiragana: true,
    meaning: true,
    audio: true,
    hard: true,
  });

  const [showColumnMenu, setShowColumnMenu] = useState(false);

  // =====================================================
  // Hard Vocabulary Filter
  // =====================================================

  const [showHardOnly, setShowHardOnly] = useState(false);

  // =====================================================
  // Hard Vocabulary
  // =====================================================

  const [hardVocabulary, setHardVocabulary] = useState<Record<string, boolean>>(
    () => {
      try {
        const saved = localStorage.getItem("nihongo-journey-hard-vocabulary");

        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    },
  );

  // =====================================================
  // Save Hard Vocabulary
  // =====================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "nihongo-journey-hard-vocabulary",
        JSON.stringify(hardVocabulary),
      );
    } catch {
      // Ignore localStorage errors
    }
  }, [hardVocabulary]);

  // =====================================================
  // Reset when chapter changes
  // =====================================================

  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsPracticing(false);
    setShowPracticeGuide(true);
    setDrawingStrokes([]);
    setShowColumnMenu(false);
    setShowHardOnly(false);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [chapterId]);

  // =====================================================
  // Chapter Not Found
  // =====================================================

  if (!chapter) {
    return (
      <main className="min-h-screen bg-pink-50 p-8">
        <div className="mx-auto max-w-xl rounded-[2rem] bg-white p-10 text-center shadow-sm">
          <div className="text-5xl">🥺</div>

          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Chapter Not Found
          </h1>

          <Link
            to="/kanji-master"
            className="mt-6 inline-flex rounded-full bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600"
          >
            Back to Kanji Master
          </Link>
        </div>
      </main>
    );
  }

  // =====================================================
  // Current Kanji
  // =====================================================

  const currentKanji = chapter.kanji_list[currentIndex];
  const totalWords = chapter.kanji_list.length;

  // =====================================================
  // Vocabulary Source
  // =====================================================

  const vocabularySource =
    chapterId === "5"
      ? kanjiChapter5
      : chapterId === "4"
        ? kanjiChapter4
        : chapterId === "3"
          ? kanjiChapter3
          : chapterId === "2"
            ? kanjiChapter2
            : kanjiVocabulary;

  const vocabulary =
    vocabularySource.find((item) => item.kanji === currentKanji.kanji)
      ?.vocabulary ?? [];

  // =====================================================
  // Vocabulary ID
  // =====================================================

  function getVocabularyId(word: string, reading: string) {
    return `${word}__${reading}`;
  }

  // =====================================================
  // Filter Vocabulary
  // =====================================================

  const displayedVocabulary = showHardOnly
    ? vocabulary.filter((item) => {
        const vocabularyId = getVocabularyId(item.word, item.reading);

        return hardVocabulary[vocabularyId] === true;
      })
    : vocabulary;

  // =====================================================
  // Dynamic Vocabulary Grid
  // =====================================================

  const gridColumns = [
    visibleColumns.kanji ? "0.9fr" : null,
    visibleColumns.hiragana ? "1fr" : null,
    visibleColumns.meaning ? "1.3fr" : null,
    visibleColumns.audio ? "55px" : null,
    visibleColumns.hard ? "65px" : null,
  ]
    .filter(Boolean)
    .join(" ");

  // =====================================================
  // Toggle Vocabulary Column
  // =====================================================

  function toggleColumn(column: keyof VisibleColumns) {
    const visibleCount = Object.values(visibleColumns).filter(Boolean).length;

    if (visibleColumns[column] && visibleCount === 1) {
      return;
    }

    setVisibleColumns((previous) => ({
      ...previous,
      [column]: !previous[column],
    }));
  }

  // =====================================================
  // Toggle Hard
  // =====================================================

  function toggleHard(word: string, reading: string) {
    const vocabularyId = getVocabularyId(word, reading);

    setHardVocabulary((previous) => ({
      ...previous,
      [vocabularyId]: !previous[vocabularyId],
    }));
  }

  // =====================================================
  // Japanese Pronunciation
  // =====================================================

  function speakJapanese(text: string) {
    if (!text || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "ja-JP";
    utterance.rate = 0.85;
    utterance.pitch = 1;

    const voices = window.speechSynthesis.getVoices();

    const japaneseVoice = voices.find(
      (voice) =>
        voice.lang.toLowerCase().startsWith("ja") ||
        voice.lang.toLowerCase().includes("jp"),
    );

    if (japaneseVoice) {
      utterance.voice = japaneseVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  // =====================================================
  // Jisho
  // =====================================================

  function searchJisho(kanji: string) {
    window.open(
      `https://jisho.org/search/${encodeURIComponent(`${kanji} #kanji`)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  // =====================================================
  // Drawing - Get Canvas Point
  // =====================================================

  function getCanvasPoint(event: React.PointerEvent<HTMLCanvasElement>): Point {
    const canvas = drawingCanvasRef.current;

    if (!canvas) {
      return {
        x: 0,
        y: 0,
      };
    }

    const rect = canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  // =====================================================
  // Drawing - Render Canvas
  // =====================================================

  function renderDrawingCanvas() {
    const canvas = drawingCanvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (!width || !height) {
      return;
    }

    context.clearRect(0, 0, width, height);

    // ---------------------------------------------
    // Background
    // ---------------------------------------------

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    // ---------------------------------------------
    // Practice Grid
    // ---------------------------------------------

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

    // ---------------------------------------------
    // Kanji Guide
    // ---------------------------------------------

    if (showPracticeGuide) {
      context.save();

      const fontSize = Math.min(width, height) * 0.68;

      context.font = `bold ${fontSize}px "Yu Gothic", "Hiragino Kaku Gothic ProN", sans-serif`;

      context.textAlign = "center";
      context.textBaseline = "middle";

      context.fillStyle = "rgba(236, 72, 153, 0.10)";

      context.fillText(currentKanji.kanji, width / 2, height / 2 + 5);

      context.restore();
    }

    // ---------------------------------------------
    // User Drawing
    // ---------------------------------------------

    context.save();

    context.strokeStyle = "#ec4899";
    context.lineWidth = penSize;
    context.lineCap = "round";
    context.lineJoin = "round";

    drawingStrokes.forEach((stroke) => {
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
  // Redraw Drawing Canvas
  // =====================================================

  useEffect(() => {
    if (!isPracticing) {
      return;
    }

    const canvas = drawingCanvasRef.current;

    if (!canvas) {
      return;
    }

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();

      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const context = canvas.getContext("2d");

      if (!context) {
        return;
      }

      context.scale(dpr, dpr);

      renderDrawingCanvas();
    };

    setupCanvas();

    window.addEventListener("resize", setupCanvas);

    return () => {
      window.removeEventListener("resize", setupCanvas);
    };
  }, [isPracticing, currentIndex, showPracticeGuide, drawingStrokes, penSize]);

  // =====================================================
  // Start Drawing
  // =====================================================

  function handlePointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    event.preventDefault();
    event.stopPropagation();

    const canvas = drawingCanvasRef.current;

    if (!canvas) {
      return;
    }

    canvas.setPointerCapture(event.pointerId);

    isDrawingRef.current = true;

    const point = getCanvasPoint(event);

    currentStrokeRef.current = [point];
  }

  // =====================================================
  // Continue Drawing
  // =====================================================

  function handlePointerMove(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawingRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const canvas = drawingCanvasRef.current;

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
  // Finish Drawing
  // =====================================================

  function handlePointerUp(event: React.PointerEvent<HTMLCanvasElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!isDrawingRef.current) {
      return;
    }

    isDrawingRef.current = false;

    const stroke = currentStrokeRef.current;

    if (stroke.length > 0) {
      setDrawingStrokes((previous) => [...previous, stroke]);
    }

    currentStrokeRef.current = [];

    try {
      drawingCanvasRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      // Ignore pointer capture errors
    }
  }

  // =====================================================
  // Undo Drawing
  // =====================================================

  function undoDrawing() {
    setDrawingStrokes((previous) => previous.slice(0, -1));
  }

  // =====================================================
  // Clear Drawing
  // =====================================================

  function clearDrawing() {
    setDrawingStrokes([]);
    currentStrokeRef.current = [];
    isDrawingRef.current = false;
  }

  // =====================================================
  // Open Practice
  // =====================================================

  function openPractice(event: React.MouseEvent) {
    event.stopPropagation();

    setIsPracticing(true);
    setIsFlipped(false);
    setShowPracticeGuide(true);
    setDrawingStrokes([]);
  }

  // =====================================================
  // Hide Practice
  // =====================================================

  function hidePractice(event: React.MouseEvent) {
    event.stopPropagation();

    setIsPracticing(false);
    setDrawingStrokes([]);
    currentStrokeRef.current = [];
    isDrawingRef.current = false;
  }

  // =====================================================
  // Navigation
  // =====================================================

  function nextKanji() {
    if (currentIndex < totalWords - 1) {
      setCurrentIndex((previousIndex) => previousIndex + 1);

      setIsFlipped(false);
      setIsPracticing(false);
      setDrawingStrokes([]);

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
  }

  function previousKanji() {
    if (currentIndex > 0) {
      setCurrentIndex((previousIndex) => previousIndex - 1);

      setIsFlipped(false);
      setIsPracticing(false);
      setDrawingStrokes([]);

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
  }

  // =====================================================
  // Flashcard Click
  // =====================================================

  function handleFlashcardClick() {
    if (isPracticing) {
      return;
    }

    setIsFlipped((previous) => !previous);
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {/* =====================================================
            BACK
        ===================================================== */}

        <Link
          to="/kanji-master"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-gray-500 transition hover:text-pink-500"
        >
          <ArrowLeft size={18} />
          Back to Kanji Master
        </Link>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-pink-400">
            Kanji Master
          </p>

          <h1 className="font-heading mt-2 text-3xl font-bold text-gray-800">
            {chapter.chapter}
          </h1>

          <p className="mt-2 text-gray-500">
            Kanji {currentIndex + 1} of {totalWords}
          </p>
        </div>

        {/* =====================================================
            FLASHCARD
        ===================================================== */}

        <div
          role="button"
          tabIndex={0}
          onClick={handleFlashcardClick}
          onKeyDown={(event) => {
            if (!isPracticing && (event.key === "Enter" || event.key === " ")) {
              event.preventDefault();

              setIsFlipped((previous) => !previous);
            }
          }}
          className={`mt-8 min-h-[380px] w-full rounded-[2.5rem] bg-white p-5 text-center shadow-sm transition hover:shadow-lg sm:p-8 ${
            isPracticing ? "cursor-default" : "cursor-pointer"
          }`}
        >
          {/* =====================================================
              NORMAL FRONT
          ===================================================== */}

          {!isFlipped && !isPracticing && (
            <div className="flex min-h-[320px] flex-col items-center justify-center">
              <p className="text-8xl font-bold text-gray-800">
                {currentKanji.kanji}
              </p>

              {/* Practice Button */}

              <button
                type="button"
                onClick={openPractice}
                className="mt-8 rounded-full bg-pink-100 px-5 py-3 text-sm font-bold text-pink-500 transition hover:bg-pink-200 active:scale-95"
              >
                ✍️ Practice Writing
              </button>

              <p className="mt-4 text-xs font-semibold text-gray-300">
                Click the card to flip ✨
              </p>
            </div>
          )}

          {/* =====================================================
              DRAWING PRACTICE
          ===================================================== */}

          {!isFlipped && isPracticing && (
            <div
              className="w-full"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Practice Header */}

              <div className="flex items-center justify-between gap-3">
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-widest text-pink-400">
                    Kanji Practice
                  </p>

                  <p className="mt-1 text-2xl font-bold text-gray-800">
                    {currentKanji.kanji}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {currentKanji.burmese || ""}
                  </p>
                </div>

                {/* Hide Practice */}

                <button
                  type="button"
                  onClick={hidePractice}
                  className="flex shrink-0 items-center gap-1.5 rounded-full bg-gray-100 px-3 py-2 text-xs font-bold text-gray-500 transition hover:bg-pink-50 hover:text-pink-500 active:scale-95"
                >
                  <EyeOff size={14} />
                  <span className="hidden sm:inline">Hide Practice</span>
                  <span className="sm:hidden">Hide</span>
                </button>
              </div>

              {/* Drawing Canvas */}

              <div className="mx-auto mt-5 max-w-[500px] overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-sm">
                <div className="relative aspect-square w-full">
                  <canvas
                    ref={drawingCanvasRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    className="h-full w-full touch-none cursor-crosshair"
                    aria-label={`Practice writing ${currentKanji.kanji}`}
                  />

                  {drawingStrokes.length === 0 && showPracticeGuide && (
                    <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-gray-400 shadow-sm">
                      Trace the Kanji ✨
                    </div>
                  )}
                </div>
              </div>

              {/* Practice Controls */}

              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                {/* Guide */}

                <button
                  type="button"
                  onClick={() => setShowPracticeGuide((previous) => !previous)}
                  className={`flex items-center justify-center gap-1.5 rounded-2xl px-2 py-3 text-xs font-bold transition active:scale-95 sm:px-3 sm:text-sm ${
                    showPracticeGuide
                      ? "bg-pink-100 text-pink-500 hover:bg-pink-200"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {showPracticeGuide ? <Eye size={16} /> : <EyeOff size={16} />}

                  <span className="hidden sm:inline">
                    {showPracticeGuide ? "Hide Guide" : "Show Guide"}
                  </span>

                  <span className="sm:hidden">Guide</span>
                </button>

                {/* Undo */}

                <button
                  type="button"
                  onClick={undoDrawing}
                  disabled={drawingStrokes.length === 0}
                  className="flex items-center justify-center gap-1.5 rounded-2xl bg-purple-50 px-2 py-3 text-xs font-bold text-purple-500 transition hover:bg-purple-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3 sm:text-sm"
                >
                  <RotateCcw size={16} />
                  Undo
                </button>

                {/* Clear */}

                <button
                  type="button"
                  onClick={clearDrawing}
                  disabled={drawingStrokes.length === 0}
                  className="flex items-center justify-center gap-1.5 rounded-2xl bg-gray-100 px-2 py-3 text-xs font-bold text-gray-500 transition hover:bg-red-50 hover:text-red-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3 sm:text-sm"
                >
                  <Trash2 size={16} />
                  Clear
                </button>
              </div>

              {/* Pen Size */}

              <div className="mt-4 rounded-2xl bg-purple-50 p-4 text-left">
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
                  max="12"
                  value={penSize}
                  onChange={(event) => setPenSize(Number(event.target.value))}
                  className="mt-3 w-full accent-pink-500"
                />
              </div>

              {/* Practice Tip */}

              <p className="mt-5 text-center text-xs font-medium text-gray-300">
                🌸 Try tracing first, then hide the guide and write it yourself.
              </p>
            </div>
          )}

          {/* =====================================================
              BACK
          ===================================================== */}

          {isFlipped && !isPracticing && (
            <div className="w-full">
              {/* Main Kanji */}

              <p className="text-6xl font-bold text-gray-800">
                {currentKanji.kanji}
              </p>

              <div className="mt-8 space-y-5 text-left">
                {/* =================================================
                    ONYOMI
                ================================================== */}

                <div className="rounded-2xl bg-purple-50 p-4">
                  <p className="text-xs font-bold text-purple-500">ONYOMI</p>

                  {currentKanji.onyomi ? (
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="font-semibold text-gray-700">
                        {currentKanji.onyomi}
                      </p>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();

                          speakJapanese(currentKanji.onyomi || "");
                        }}
                        className="shrink-0 text-purple-500 transition hover:text-purple-700 active:scale-95"
                        aria-label={`Pronounce ${currentKanji.onyomi}`}
                        title="Listen to pronunciation"
                      >
                        <Volume2 size={20} />
                      </button>
                    </div>
                  ) : (
                    <p className="mt-2 font-semibold text-gray-700">-</p>
                  )}
                </div>

                {/* =================================================
                    KUNYOMI
                ================================================== */}

                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs font-bold text-blue-500">KUNYOMI</p>

                  {currentKanji.kunyomi ? (
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="font-semibold text-gray-700">
                        {currentKanji.kunyomi}
                      </p>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();

                          speakJapanese(currentKanji.kunyomi || "");
                        }}
                        className="shrink-0 text-blue-500 transition hover:text-blue-700 active:scale-95"
                        aria-label={`Pronounce ${currentKanji.kunyomi}`}
                        title="Listen to pronunciation"
                      >
                        <Volume2 size={20} />
                      </button>
                    </div>
                  ) : (
                    <p className="mt-2 font-semibold text-gray-700">-</p>
                  )}
                </div>

                {/* =================================================
                    BURMESE MEANING
                ================================================== */}

                <div className="rounded-2xl bg-pink-50 p-4">
                  <p className="text-xs font-bold text-pink-500">🇲🇲 MEANING</p>

                  <p className="mt-2 font-semibold text-gray-700">
                    {currentKanji.burmese || "-"}
                  </p>
                </div>

                {/* =================================================
                    VOCABULARY
                ================================================== */}

                {vocabulary.length > 0 && (
                  <div className="rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 p-3 sm:p-5">
                    {/* Vocabulary Header */}

                    <div className="mb-4 flex items-start justify-between gap-3 px-1">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                          <span className="text-xl">📚</span>
                        </div>

                        <div>
                          <p className="text-sm font-extrabold tracking-wide text-pink-500">
                            VOCABULARY
                          </p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            Words using {currentKanji.kanji}
                          </p>
                        </div>
                      </div>

                      {/* Column Settings */}

                      <div className="relative shrink-0">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();

                            setShowColumnMenu((previous) => !previous);
                          }}
                          className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-gray-500 shadow-sm transition hover:bg-pink-50 hover:text-pink-500 active:scale-95"
                          aria-label="Show or hide vocabulary columns"
                          title="Show or hide columns"
                        >
                          <Settings2 size={15} />

                          <span className="hidden sm:inline">Columns</span>
                        </button>

                        {showColumnMenu && (
                          <div
                            onClick={(event) => event.stopPropagation()}
                            className="absolute right-0 top-11 z-30 w-44 rounded-2xl bg-white p-3 shadow-lg ring-1 ring-pink-100"
                          >
                            <p className="mb-2 px-2 text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                              Show columns
                            </p>

                            {(
                              [
                                ["kanji", "Kanji"],
                                ["hiragana", "Hiragana"],
                                ["meaning", "Meaning"],
                                ["audio", "Audio"],
                                ["hard", "Hard"],
                              ] as [keyof VisibleColumns, string][]
                            ).map(([column, label]) => (
                              <button
                                key={column}
                                type="button"
                                onClick={() => toggleColumn(column)}
                                className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs font-semibold text-gray-600 transition hover:bg-pink-50"
                              >
                                <span
                                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition ${
                                    visibleColumns[column]
                                      ? "border-pink-400 bg-pink-400 text-white"
                                      : "border-gray-200 bg-white"
                                  }`}
                                >
                                  {visibleColumns[column] && (
                                    <Check size={11} strokeWidth={3} />
                                  )}
                                </span>

                                {label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hard Filter */}

                    <div
                      className="mb-4 flex items-center justify-center gap-2"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setShowHardOnly(false)}
                        className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                          !showHardOnly
                            ? "bg-white text-pink-500 shadow-sm"
                            : "text-gray-400 hover:bg-white/70 hover:text-pink-400"
                        }`}
                      >
                        All Words
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowHardOnly(true)}
                        className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition ${
                          showHardOnly
                            ? "bg-orange-50 text-orange-500 shadow-sm"
                            : "text-gray-400 hover:bg-orange-50/70 hover:text-orange-400"
                        }`}
                      >
                        <Flame size={13} />
                        Hard Words
                      </button>
                    </div>

                    {/* Vocabulary Table */}

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                      {/* Header */}

                      <div
                        style={{
                          gridTemplateColumns: gridColumns,
                        }}
                        className="grid items-center border-b border-pink-100 bg-pink-50/60"
                      >
                        {visibleColumns.kanji && (
                          <div className="flex min-w-0 items-center justify-center px-1 py-3 text-center text-[9px] font-extrabold tracking-wide text-pink-500 sm:px-3 sm:text-xs">
                            KANJI
                          </div>
                        )}

                        {visibleColumns.hiragana && (
                          <div className="flex min-w-0 items-center justify-center px-1 py-3 text-center text-[9px] font-extrabold tracking-wide text-purple-500 sm:px-3 sm:text-xs">
                            HIRAGANA
                          </div>
                        )}

                        {visibleColumns.meaning && (
                          <div className="flex min-w-0 items-center justify-center px-1 py-3 text-center text-[9px] font-extrabold tracking-wide text-gray-500 sm:px-3 sm:text-xs">
                            🇲🇲 MEANING
                          </div>
                        )}

                        {visibleColumns.audio && (
                          <div className="flex items-center justify-center px-1 py-3 text-center text-[9px] font-extrabold tracking-wide text-blue-500 sm:px-2 sm:text-xs">
                            AUDIO
                          </div>
                        )}

                        {visibleColumns.hard && (
                          <div className="flex items-center justify-center px-1 py-3 text-center text-[9px] font-extrabold tracking-wide text-orange-400 sm:px-2 sm:text-xs">
                            HARD
                          </div>
                        )}
                      </div>

                      {/* No Hard Words */}

                      {displayedVocabulary.length === 0 && (
                        <div className="px-5 py-10 text-center">
                          <div className="text-3xl">🌸</div>

                          <p className="mt-2 text-sm font-bold text-gray-500">
                            No hard words yet
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            Mark difficult words with the little flame 🔥
                          </p>
                        </div>
                      )}

                      {/* Vocabulary Rows */}

                      {displayedVocabulary.map((item, index) => {
                        const vocabularyId = getVocabularyId(
                          item.word,
                          item.reading,
                        );

                        const isHard = hardVocabulary[vocabularyId] === true;

                        return (
                          <div
                            key={`${item.word}-${item.reading}-${index}`}
                            style={{
                              gridTemplateColumns: gridColumns,
                            }}
                            className={`grid items-center transition ${
                              index !== displayedVocabulary.length - 1
                                ? "border-b border-pink-100/80"
                                : ""
                            } ${isHard ? "bg-orange-50/70" : "bg-white"}`}
                          >
                            {visibleColumns.kanji && (
                              <div className="flex min-w-0 items-center justify-center px-1 py-4 text-center sm:px-3">
                                <p
                                  className={`break-words text-center text-sm font-extrabold transition sm:text-base ${
                                    isHard ? "text-orange-500" : "text-gray-800"
                                  }`}
                                >
                                  {item.word}
                                </p>
                              </div>
                            )}

                            {visibleColumns.hiragana && (
                              <div className="flex min-w-0 items-center justify-center px-1 py-4 text-center sm:px-3">
                                <p
                                  className={`break-words text-center text-xs font-semibold transition sm:text-sm ${
                                    isHard
                                      ? "text-orange-400"
                                      : "text-purple-500"
                                  }`}
                                >
                                  {item.reading}
                                </p>
                              </div>
                            )}

                            {visibleColumns.meaning && (
                              <div className="flex min-w-0 items-center justify-center px-1 py-4 text-center sm:px-3">
                                <p
                                  className={`break-words text-center text-[11px] leading-5 transition sm:text-sm ${
                                    isHard
                                      ? "font-semibold text-orange-600"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {item.meaning}
                                </p>
                              </div>
                            )}

                            {visibleColumns.audio && (
                              <div className="flex items-center justify-center px-1 py-4">
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();

                                    speakJapanese(item.reading || item.word);
                                  }}
                                  className="flex items-center justify-center p-1 text-purple-400 transition hover:scale-110 hover:text-purple-600 active:scale-95"
                                  aria-label={`Listen to ${item.word}`}
                                  title="Listen"
                                >
                                  <Volume2 size={17} />
                                </button>
                              </div>
                            )}

                            {visibleColumns.hard && (
                              <div className="flex items-center justify-center px-1 py-4">
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();

                                    toggleHard(item.word, item.reading);
                                  }}
                                  aria-label={
                                    isHard
                                      ? `Remove ${item.word} from hard words`
                                      : `Mark ${item.word} as hard`
                                  }
                                  title={
                                    isHard
                                      ? "Remove from hard words"
                                      : "Mark as hard"
                                  }
                                  className="flex h-8 w-8 items-center justify-center transition active:scale-90"
                                >
                                  {isHard ? (
                                    <Flame
                                      size={18}
                                      strokeWidth={2.5}
                                      className="text-orange-400 transition hover:scale-110 hover:text-orange-500"
                                    />
                                  ) : (
                                    <span className="h-2.5 w-2.5 rounded-full bg-pink-300 transition hover:scale-125 hover:bg-orange-300" />
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Cute Tip */}

                    <div className="mt-4 flex items-center justify-center gap-2 text-center">
                      <Flame size={13} className="text-orange-300" />

                      <p className="text-[11px] font-medium text-gray-400">
                        Mark words that feel difficult with the little flame ✨
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Flip Hint */}

              <p className="mt-6 text-center text-xs font-semibold text-gray-300">
                Click anywhere on the card to flip back ✨
              </p>
            </div>
          )}
        </div>

        {/* =====================================================
            JISHO
        ===================================================== */}

        <button
          type="button"
          onClick={() => searchJisho(currentKanji.kanji)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-pink-100 px-5 py-4 font-bold text-pink-500 transition hover:bg-pink-200 active:scale-[0.99]"
        >
          <Search size={19} />
           Kanji Drawing
        </button>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <div className="mt-6 flex items-center justify-between gap-3">
          {/* Previous */}

          <button
            type="button"
            onClick={previousKanji}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-3 font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
          >
            <ChevronLeft size={18} />

            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Counter */}

          <span className="shrink-0 font-bold text-pink-500">
            {currentIndex + 1} / {totalWords}
          </span>

          {/* Next */}

          <button
            type="button"
            onClick={nextKanji}
            disabled={currentIndex === totalWords - 1}
            className="flex items-center gap-2 rounded-full bg-pink-500 px-4 py-3 font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
          >
            <span className="hidden sm:inline">Next</span>

            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}

export default KanjiChapter;
