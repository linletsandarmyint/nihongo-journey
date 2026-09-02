
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  Volume2,
} from "lucide-react";

import { kanjiMaster } from "../../data/kanjiMaster";
import { kanjiVocabulary } from "../../data/kanjiVocabulary";
import { kanjiChapter2 } from "../../data/kanjiChapter2";
import { kanjiChapter3 } from "../../data/kanjiChapter3";
import { kanjiChapter4 } from "../../data/kanjiChapter4";

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
  // Studied Vocabulary
  // =====================================================

  const [studiedVocabulary, setStudiedVocabulary] = useState<
    Record<string, boolean>
  >(() => {
    try {
      const saved = localStorage.getItem(
        "nihongo-journey-studied-vocabulary",
      );

      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // =====================================================
  // Save Studied Vocabulary
  // =====================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "nihongo-journey-studied-vocabulary",
        JSON.stringify(studiedVocabulary),
      );
    } catch {
      // Ignore localStorage errors
    }
  }, [studiedVocabulary]);

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
  //
  // Chapter 1 → kanjiVocabulary.ts
  // Chapter 2 → kanjiChapter2.ts
  //
  // Later:
  // Chapter 3 → kanjiChapter3.ts
  // Chapter 4 → kanjiChapter4.ts
  // =====================================================

  const vocabularySource =
  chapterId === "4"
      ? kanjiChapter4 :
    chapterId === "3"
      ? kanjiChapter3
      : chapterId === "2"
        ? kanjiChapter2
        : kanjiVocabulary;

  const vocabulary =
    vocabularySource.find(
      (item) => item.kanji === currentKanji.kanji,
    )?.vocabulary ?? [];

  // =====================================================
  // Vocabulary ID
  // =====================================================

  function getVocabularyId(word: string, reading: string) {
    return `${word}__${reading}`;
  }

  // =====================================================
  // Toggle Studied
  // =====================================================

  function toggleStudied(word: string, reading: string) {
    const vocabularyId = getVocabularyId(word, reading);

    setStudiedVocabulary((previous) => ({
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

      window.speechSynthesis.cancel();
    }
  }

  function previousKanji() {
    if (currentIndex > 0) {
      setCurrentIndex((previousIndex) => previousIndex - 1);
      setIsFlipped(false);

      window.speechSynthesis.cancel();
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
          onClick={() =>
            setIsFlipped((previous) => !previous)
          }
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();

              setIsFlipped(
                (previous) => !previous,
              );
            }
          }}
          className="mt-8 min-h-[380px] w-full cursor-pointer rounded-[2.5rem] bg-white p-8 text-center shadow-sm transition hover:shadow-lg"
        >

          {/* =====================================================
              FRONT
          ===================================================== */}

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
            ===================================================== */

            <div className="w-full">

              {/* Main Kanji */}

              <p className="text-6xl font-bold text-gray-800">
                {currentKanji.kanji}
              </p>

              <div className="mt-8 space-y-5 text-left">

                {/* =================================================
                    ONYOMI
                ================================================= */}

                <div className="rounded-2xl bg-purple-50 p-4">
                  <p className="text-xs font-bold text-purple-500">
                    ONYOMI
                  </p>

                  {currentKanji.onyomi ? (
                    <div className="mt-1 flex items-center justify-between gap-3">
                      <p className="font-semibold text-gray-700">
                        {currentKanji.onyomi}
                      </p>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();

                          speakJapanese(
                            currentKanji.onyomi || "",
                          );
                        }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-purple-500 shadow-sm transition hover:bg-purple-100 hover:text-purple-600 active:scale-95"
                        aria-label={`Pronounce ${currentKanji.onyomi}`}
                        title="Listen to pronunciation"
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>
                  ) : (
                    <p className="mt-1 font-semibold text-gray-700">
                      -
                    </p>
                  )}
                </div>

                {/* =================================================
                    KUNYOMI
                ================================================= */}

                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs font-bold text-blue-500">
                    KUNYOMI
                  </p>

                  {currentKanji.kunyomi ? (
                    <div className="mt-1 flex items-center justify-between gap-3">
                      <p className="font-semibold text-gray-700">
                        {currentKanji.kunyomi}
                      </p>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();

                          speakJapanese(
                            currentKanji.kunyomi || "",
                          );
                        }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-blue-500 shadow-sm transition hover:bg-blue-100 hover:text-blue-600 active:scale-95"
                        aria-label={`Pronounce ${currentKanji.kunyomi}`}
                        title="Listen to pronunciation"
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>
                  ) : (
                    <p className="mt-1 font-semibold text-gray-700">
                      -
                    </p>
                  )}
                </div>

                {/* =================================================
                    BURMESE MEANING
                ================================================= */}

                <div className="rounded-2xl bg-pink-50 p-4">
                  <p className="text-xs font-bold text-pink-500">
                    🇲🇲 MEANING
                  </p>

                  <p className="mt-1 font-semibold text-gray-700">
                    {currentKanji.burmese || "-"}
                  </p>
                </div>

                {/* =================================================
                    VOCABULARY
                ================================================= */}

                {vocabulary.length > 0 && (
                  <div className="rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 p-5">

                    {/* Vocabulary Header */}

                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                        <span className="text-xl">
                          📚
                        </span>
                      </div>

                      <div>
                        <p className="text-sm font-extrabold tracking-wide text-pink-500">
                          VOCABULARY
                        </p>

                        <p className="mt-0.5 text-xs text-gray-400">
                          Words using{" "}
                          {currentKanji.kanji}
                        </p>
                      </div>
                    </div>

                    {/* =================================================
                        CLEAN VOCABULARY LIST
                    ================================================= */}

                    <div className="overflow-hidden rounded-2xl bg-white/70">

                      {/* Header */}

                      <div className="grid grid-cols-[1.1fr_1.25fr_1.8fr_48px] items-center bg-white/60">

                        <div className="px-2 py-3 text-center text-[10px] font-extrabold tracking-widest text-pink-500 sm:px-4 sm:text-xs">
                          KANJI
                        </div>

                        <div className="px-2 py-3 text-center text-[10px] font-extrabold tracking-widest text-purple-500 sm:px-4 sm:text-xs">
                          HIRAGANA
                        </div>

                        <div className="px-2 py-3 text-center text-[10px] font-extrabold tracking-widest text-gray-500 sm:px-4 sm:text-xs">
                          🇲🇲 MEANING
                        </div>

                        {/* No STATUS header */}

                        <div className="w-12" />
                      </div>

                      {/* Vocabulary Rows */}

                      {vocabulary.map((item, index) => {
                        const vocabularyId =
                          getVocabularyId(
                            item.word,
                            item.reading,
                          );

                        const isStudied =
                          studiedVocabulary[
                            vocabularyId
                          ] === true;

                        return (
                          <div
                            key={`${item.word}-${item.reading}-${index}`}
                            className={`grid grid-cols-[1.1fr_1.25fr_1.8fr_48px] items-center transition ${
                              index !==
                              vocabulary.length - 1
                                ? "border-b border-pink-100/70"
                                : ""
                            }`}
                          >

                            {/* =================================================
                                KANJI
                            ================================================= */}

                            <div className="flex min-w-0 items-center justify-center px-2 py-4 sm:px-4">
                              <p className="break-words text-center text-base font-extrabold text-gray-800 sm:text-lg">
                                {item.word}
                              </p>
                            </div>

                            {/* =================================================
                                HIRAGANA
                            ================================================= */}

                            <div className="flex min-w-0 items-center justify-center px-2 py-4 sm:px-4">
                              <p className="break-words text-center text-sm font-semibold text-purple-500 sm:text-base">
                                {item.reading}
                              </p>
                            </div>

                            {/* =================================================
                                BURMESE
                            ================================================= */}

                            <div className="flex min-w-0 items-center justify-center px-2 py-4 sm:px-4">
                              <p className="break-words text-center text-sm leading-6 text-gray-600 sm:text-[15px]">
                                {item.meaning}
                              </p>
                            </div>

                            {/* =================================================
                                STUDIED DOT / CHECK
                            ================================================= */}

                            <div className="flex w-12 items-center justify-center">
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();

                                  toggleStudied(
                                    item.word,
                                    item.reading,
                                  );
                                }}
                                aria-label={
                                  isStudied
                                    ? `Mark ${item.word} as not studied`
                                    : `Mark ${item.word} as studied`
                                }
                                title={
                                  isStudied
                                    ? "Studied"
                                    : "Mark as studied"
                                }
                                className={`flex h-9 w-9 items-center justify-center transition-all duration-200 active:scale-90 ${
                                  isStudied
                                    ? "text-pink-400"
                                    : "text-pink-200 hover:text-pink-400"
                                }`}
                              >
                                {isStudied ? (
                                  <Check
                                    size={21}
                                    strokeWidth={3}
                                  />
                                ) : (
                                  <span className="text-2xl leading-none">
                                    •
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Small Hint */}

                    <p className="mt-3 text-center text-[11px] font-medium text-gray-400">
                      Tap the dot when you finish studying ✨
                    </p>
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
            JISHO BUTTON
        ===================================================== */}

        <button
          type="button"
          onClick={() =>
            searchJisho(currentKanji.kanji)
          }
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-pink-100 px-5 py-4 font-bold text-pink-500 transition hover:bg-pink-200 active:scale-[0.99]"
        >
          <Search size={19} />
          ✍️ Kanji Drawing
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
            className="flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          {/* Counter */}

          <span className="shrink-0 font-bold text-pink-500">
            {currentIndex + 1} / {totalWords}
          </span>

          {/* Next */}

          <button
            type="button"
            onClick={nextKanji}
            disabled={
              currentIndex === totalWords - 1
            }
            className="flex items-center gap-2 rounded-full bg-pink-500 px-5 py-3 font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}

export default KanjiChapter;
