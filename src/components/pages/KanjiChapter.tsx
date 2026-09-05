import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  Search,
  Settings2,
  Volume2,
} from "lucide-react";

import { kanjiMaster } from "../../data/kanjiMaster";
import { kanjiVocabulary } from "../../data/kanjiVocabulary";
import { kanjiChapter2 } from "../../data/kanjiChapter2";
import { kanjiChapter3 } from "../../data/kanjiChapter3";
import { kanjiChapter4 } from "../../data/kanjiChapter4";
import { kanjiChapter5 } from "../../data/kanjiChapter5";

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
  // Vocabulary Column Visibility
  // =====================================================

  const [visibleColumns, setVisibleColumns] = useState({
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
  // Vocabulary ID
  // =====================================================

  function getVocabularyId(word: string, reading: string) {
    return `${word}__${reading}`;
  }

  // =====================================================
  // Toggle Vocabulary Column
  // =====================================================

  function toggleColumn(column: keyof typeof visibleColumns) {
    const visibleCount = Object.values(visibleColumns).filter(Boolean).length;

    // Don't allow all columns to be hidden
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
  // Navigation
  // =====================================================

  function nextKanji() {
    if (currentIndex < totalWords - 1) {
      setCurrentIndex((previousIndex) => previousIndex + 1);

      setIsFlipped(false);

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
  }

  function previousKanji() {
    if (currentIndex > 0) {
      setCurrentIndex((previousIndex) => previousIndex - 1);

      setIsFlipped(false);

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
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
  // UI
  // =====================================================

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {/* =====================================================
            BACK
        ====================================================== */}

        <Link
          to="/kanji-master"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-gray-500 transition hover:text-pink-500"
        >
          <ArrowLeft size={18} />
          Back to Kanji Master
        </Link>

        {/* =====================================================
            HEADER
        ====================================================== */}

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
        ====================================================== */}

        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsFlipped((previous) => !previous)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();

              setIsFlipped((previous) => !previous);
            }
          }}
          className="mt-8 min-h-[380px] w-full cursor-pointer rounded-[2.5rem] bg-white p-5 text-center shadow-sm transition hover:shadow-lg sm:p-8"
        >
          {/* =====================================================
              FRONT
          ====================================================== */}

          {!isFlipped ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center">
              <p className="text-8xl font-bold text-gray-800">
                {currentKanji.kanji}
              </p>

              <p className="mt-8 text-sm font-semibold text-pink-400">
                Click to flip ✨
              </p>
            </div>
          ) : (
            /* =====================================================
               BACK
            ====================================================== */

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
                    {/* =================================================
                        VOCABULARY HEADER
                    ================================================== */}

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

                      {/* =================================================
                          COLUMN SETTINGS
                      ================================================== */}

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

                        {/* =================================================
                            COLUMN MENU
                        ================================================== */}

                        {showColumnMenu && (
                          <div
                            onClick={(event) => event.stopPropagation()}
                            className="absolute right-0 top-11 z-30 w-44 rounded-2xl bg-white p-3 shadow-lg ring-1 ring-pink-100"
                          >
                            <p className="mb-2 px-2 text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                              Show columns
                            </p>

                            {/* KANJI */}

                            <button
                              type="button"
                              onClick={() => toggleColumn("kanji")}
                              className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs font-semibold text-gray-600 transition hover:bg-pink-50"
                            >
                              <span
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition ${
                                  visibleColumns.kanji
                                    ? "border-pink-400 bg-pink-400 text-white"
                                    : "border-gray-200 bg-white"
                                }`}
                              >
                                {visibleColumns.kanji && (
                                  <Check size={11} strokeWidth={3} />
                                )}
                              </span>
                              Kanji
                            </button>

                            {/* HIRAGANA */}

                            <button
                              type="button"
                              onClick={() => toggleColumn("hiragana")}
                              className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs font-semibold text-gray-600 transition hover:bg-pink-50"
                            >
                              <span
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition ${
                                  visibleColumns.hiragana
                                    ? "border-pink-400 bg-pink-400 text-white"
                                    : "border-gray-200 bg-white"
                                }`}
                              >
                                {visibleColumns.hiragana && (
                                  <Check size={11} strokeWidth={3} />
                                )}
                              </span>
                              Hiragana
                            </button>

                            {/* MEANING */}

                            <button
                              type="button"
                              onClick={() => toggleColumn("meaning")}
                              className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs font-semibold text-gray-600 transition hover:bg-pink-50"
                            >
                              <span
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition ${
                                  visibleColumns.meaning
                                    ? "border-pink-400 bg-pink-400 text-white"
                                    : "border-gray-200 bg-white"
                                }`}
                              >
                                {visibleColumns.meaning && (
                                  <Check size={11} strokeWidth={3} />
                                )}
                              </span>
                              Meaning
                            </button>

                            {/* AUDIO */}

                            <button
                              type="button"
                              onClick={() => toggleColumn("audio")}
                              className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs font-semibold text-gray-600 transition hover:bg-pink-50"
                            >
                              <span
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition ${
                                  visibleColumns.audio
                                    ? "border-pink-400 bg-pink-400 text-white"
                                    : "border-gray-200 bg-white"
                                }`}
                              >
                                {visibleColumns.audio && (
                                  <Check size={11} strokeWidth={3} />
                                )}
                              </span>
                              Audio
                            </button>

                            {/* HARD */}

                            <button
                              type="button"
                              onClick={() => toggleColumn("hard")}
                              className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs font-semibold text-gray-600 transition hover:bg-pink-50"
                            >
                              <span
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition ${
                                  visibleColumns.hard
                                    ? "border-pink-400 bg-pink-400 text-white"
                                    : "border-gray-200 bg-white"
                                }`}
                              >
                                {visibleColumns.hard && (
                                  <Check size={11} strokeWidth={3} />
                                )}
                              </span>
                              Hard
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* =================================================
                        HARD FILTER
                    ================================================== */}

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

                    {/* =================================================
                        VOCABULARY TABLE
                    ================================================== */}

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                      {/* HEADER */}

                      <div
                        style={{
                          gridTemplateColumns: gridColumns,
                        }}
                        className="grid items-center border-b border-pink-100 bg-pink-50/60"
                      >
                        {/* KANJI */}

                        {visibleColumns.kanji && (
                          <div className="flex min-w-0 items-center justify-center px-1 py-3 text-center text-[9px] font-extrabold tracking-wide text-pink-500 sm:px-3 sm:text-xs">
                            KANJI
                          </div>
                        )}

                        {/* HIRAGANA */}

                        {visibleColumns.hiragana && (
                          <div className="flex min-w-0 items-center justify-center px-1 py-3 text-center text-[9px] font-extrabold tracking-wide text-purple-500 sm:px-3 sm:text-xs">
                            HIRAGANA
                          </div>
                        )}

                        {/* MEANING */}

                        {visibleColumns.meaning && (
                          <div className="flex min-w-0 items-center justify-center px-1 py-3 text-center text-[9px] font-extrabold tracking-wide text-gray-500 sm:px-3 sm:text-xs">
                            🇲🇲 MEANING
                          </div>
                        )}

                        {/* AUDIO */}

                        {visibleColumns.audio && (
                          <div className="flex items-center justify-center px-1 py-3 text-center text-[9px] font-extrabold tracking-wide text-blue-500 sm:px-2 sm:text-xs">
                            AUDIO
                          </div>
                        )}

                        {/* HARD */}

                        {visibleColumns.hard && (
                          <div className="flex items-center justify-center px-1 py-3 text-center text-[9px] font-extrabold tracking-wide text-orange-400 sm:px-2 sm:text-xs">
                            HARD
                          </div>
                        )}
                      </div>

                      {/* =================================================
                          NO HARD WORDS
                      ================================================== */}

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

                      {/* =================================================
                          VOCABULARY ROWS
                      ================================================== */}

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
                            {/* =================================================
                                  KANJI
                              ================================================== */}

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

                            {/* =================================================
                                  HIRAGANA
                              ================================================== */}

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

                            {/* =================================================
                                  MEANING
                              ================================================== */}

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

                            {/* =================================================
                                  AUDIO
                              ================================================== */}

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

                            {/* =================================================
                                  HARD
                              ================================================== */}

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

                    {/* =================================================
                        CUTE TIP
                    ================================================== */}

                    <div className="mt-4 flex items-center justify-center gap-2 text-center">
                      <Flame size={13} className="text-orange-300" />

                      <p className="text-[11px] font-medium text-gray-400">
                        Mark words that feel difficult with the little flame ✨
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* =================================================
                  FLIP HINT
              ================================================== */}

              <p className="mt-6 text-center text-xs font-semibold text-gray-300">
                Click anywhere on the card to flip back ✨
              </p>
            </div>
          )}
        </div>

        {/* =====================================================
            JISHO BUTTON
        ====================================================== */}

        <button
          type="button"
          onClick={() => searchJisho(currentKanji.kanji)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-pink-100 px-5 py-4 font-bold text-pink-500 transition hover:bg-pink-200 active:scale-[0.99]"
        >
          <Search size={19} />
          ✍️ Kanji Drawing
        </button>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}

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
