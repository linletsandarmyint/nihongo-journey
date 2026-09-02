
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Search,
  Volume2,
} from "lucide-react";

import { kanjiMaster } from "../../data/kanjiMaster";

function KanjiChapter() {
  const { chapterId } = useParams();

  const chapterIndex = Number(chapterId) - 1;

  const chapter = kanjiMaster[chapterIndex];

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isFlipped, setIsFlipped] = useState(false);

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
            className="mt-6 inline-flex rounded-full bg-pink-500 px-6 py-3 font-semibold text-white"
          >
            Back to Kanji Master
          </Link>
        </div>
      </main>
    );
  }

  const currentKanji = chapter.kanji_list[currentIndex];

  const totalWords = chapter.kanji_list.length;

  // =====================================================
  // Navigation
  // =====================================================

  function nextKanji() {
    if (currentIndex < totalWords - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);

      // Stop any speech when changing Kanji
      window.speechSynthesis.cancel();
    }
  }

  function previousKanji() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);

      // Stop any speech when changing Kanji
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

    // Stop previous pronunciation
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Japanese language
    utterance.lang = "ja-JP";

    // Natural Japanese pronunciation
    utterance.rate = 0.85;
    utterance.pitch = 1;

    // Try to find a Japanese voice
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

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {/* =====================================================
            BACK
        ===================================================== */}

        <Link
          to="/kanji-master"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-gray-500 hover:text-pink-500"
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
            Word {currentIndex + 1} of {totalWords}
          </p>
        </div>

        {/* =====================================================
            FLASHCARD
        ===================================================== */}

        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="mt-8 flex min-h-[380px] w-full flex-col items-center justify-center rounded-[2.5rem] bg-white p-8 text-center shadow-sm transition hover:shadow-lg"
        >
          {!isFlipped ? (
            <>
              <p className="text-8xl font-bold text-gray-800">
                {currentKanji.kanji}
              </p>

              <p className="mt-8 text-sm font-semibold text-pink-400">
                Click to flip ✨
              </p>
            </>
          ) : (
            <div className="w-full">
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
                          speakJapanese(currentKanji.onyomi || "");
                        }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-purple-500 shadow-sm transition hover:bg-purple-100 hover:text-purple-600 active:scale-95"
                        aria-label={`Pronounce ${currentKanji.onyomi}`}
                        title="Listen to pronunciation"
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>
                  ) : (
                    <p className="mt-1 font-semibold text-gray-700">-</p>
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
                          speakJapanese(currentKanji.kunyomi || "");
                        }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-blue-500 shadow-sm transition hover:bg-blue-100 hover:text-blue-600 active:scale-95"
                        aria-label={`Pronounce ${currentKanji.kunyomi}`}
                        title="Listen to pronunciation"
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>
                  ) : (
                    <p className="mt-1 font-semibold text-gray-700">-</p>
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
                    {currentKanji.burmese}
                  </p>
                </div>
              </div>
            </div>
          )}
        </button>

        {/* =====================================================
            JISHO BUTTON
        ===================================================== */}

        <button
          type="button"
          onClick={() => searchJisho(currentKanji.kanji)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-pink-100 px-5 py-4 font-bold text-pink-500 transition hover:bg-pink-200"
        >
          <Search size={19} />
          ✍️ Kanji Drawing
        </button>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={previousKanji}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-gray-600 shadow-sm disabled:opacity-40"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <span className="font-bold text-pink-500">
            {currentIndex + 1} / {totalWords}
          </span>

          <button
            type="button"
            onClick={nextKanji}
            disabled={currentIndex === totalWords - 1}
            className="flex items-center gap-2 rounded-full bg-pink-500 px-5 py-3 font-semibold text-white shadow-sm disabled:opacity-40"
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

