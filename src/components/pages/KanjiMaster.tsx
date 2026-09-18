
import { useMemo, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Layers,
  Search,
  Settings2,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";

import { kanjiMaster } from "../../data/kanjiMaster";

function KanjiMaster() {
  const totalChapters = kanjiMaster.length;

  const totalKanji = kanjiMaster.reduce(
    (total, chapter) => total + chapter.kanji_list.length,
    0,
  );

  // =====================================================
  // Search State
  // =====================================================

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChapterFilter, setSelectedChapterFilter] = useState("all");

  // =====================================================
  // Modal State
  // =====================================================

  const [selectedChapter, setSelectedChapter] = useState<
    (typeof kanjiMaster)[number] | null
  >(null);

  // =====================================================
  // Customize View State
  // =====================================================

  const [showCustomize, setShowCustomize] = useState(false);

  const [showKanji, setShowKanji] = useState(true);
  const [showBurmese, setShowBurmese] = useState(true);
  const [showOnyomi, setShowOnyomi] = useState(false);
  const [showKunyomi, setShowKunyomi] = useState(false);

  // =====================================================
  // Open Modal
  // =====================================================

  function openKanjiModal(
    event: MouseEvent<HTMLButtonElement>,
    chapterData: (typeof kanjiMaster)[number],
  ) {
    event.preventDefault();
    event.stopPropagation();

    setSelectedChapter(chapterData);

    // Keep customization collapsed when opening a chapter
    setShowCustomize(false);
  }

  // =====================================================
  // Close Modal
  // =====================================================

  function closeKanjiModal() {
    setSelectedChapter(null);
    setShowCustomize(false);
  }

  // =====================================================
  // Search Results
  // =====================================================

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const results: {
      chapterNumber: number;
      chapterName: string;
      kanji: string;
      onyomi: string | null;
      kunyomi: string | null;
      burmese: string | null;
    }[] = [];

    kanjiMaster.forEach((chapterData, chapterIndex) => {
      const chapterNumber = chapterIndex + 1;

      if (
        selectedChapterFilter !== "all" &&
        selectedChapterFilter !== String(chapterNumber)
      ) {
        return;
      }

      chapterData.kanji_list.forEach((item) => {
        const searchableText = [
          item.kanji,
          item.onyomi,
          item.kunyomi,
          item.burmese,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesSearch =
          query === "" || searchableText.includes(query);

        if (matchesSearch) {
          results.push({
            chapterNumber,
            chapterName: chapterData.chapter,
            kanji: item.kanji,
            onyomi: item.onyomi,
            kunyomi: item.kunyomi,
            burmese: item.burmese,
          });
        }
      });
    });

    return results;
  }, [searchQuery, selectedChapterFilter]);

  const isSearching =
    searchQuery.trim() !== "" || selectedChapterFilter !== "all";

  // =====================================================
  // Clear Search
  // =====================================================

  function clearSearch() {
    setSearchQuery("");
    setSelectedChapterFilter("all");
  }

  // =====================================================
  // Toggle Customize
  // =====================================================

  function toggleCustomize() {
    setShowCustomize((previous) => !previous);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-pink-50 px-4 py-6 sm:px-5 sm:py-8 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative mb-8 overflow-hidden rounded-[2rem] bg-white shadow-sm sm:mb-10 sm:rounded-[2.5rem]">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-pink-100/70 blur-2xl sm:h-64 sm:w-64" />

            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-purple-100/60 blur-2xl sm:h-64 sm:w-64" />

            <div className="absolute right-[28%] top-8 text-xl text-pink-200 motion-safe:animate-pulse sm:text-2xl">
              ✨
            </div>

            <div className="absolute bottom-8 left-[42%] text-lg text-pink-200 motion-safe:animate-pulse sm:text-xl">
              🌸
            </div>

            <div className="absolute right-8 top-1/2 hidden text-lg text-purple-200 sm:block motion-safe:animate-bounce">
              ✦
            </div>
          </div>

          <div className="relative grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10 lg:p-12">

            {/* Hero Content */}
            <div>

              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-100 px-3.5 py-2 text-xs font-bold text-pink-500 shadow-sm sm:px-4 sm:text-sm">
                <Sparkles size={15} />
                <span>Nihongo Journey</span>
              </div>

              {/* Heading */}
              <h1 className="font-heading max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-gray-800 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                Kanji Master{" "}
                <span className="inline-block motion-safe:animate-pulse">
                  🈷️
                </span>
              </h1>

              {/* Description */}
              <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
                Build your Japanese Kanji skills, one chapter at a time. Learn
                the readings, meanings, and sounds along your Nihongo journey.
                🌸
              </p>

              {/* Feature Pills */}
              <div className="mt-6 flex flex-wrap gap-2">

                <div className="inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50 px-3 py-2 text-xs font-bold text-pink-500 sm:text-sm">
                  <Layers size={14} />
                  {totalChapters} Chapters
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-2 text-xs font-bold text-purple-500 sm:text-sm">
                  <BookOpen size={14} />
                  {totalKanji} Kanji
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-500 sm:text-sm">
                  <Volume2 size={14} />
                  Japanese Audio
                </div>

              </div>

              {/* Encouragement */}
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-gray-400 sm:text-sm">
                <CheckCircle2 size={16} className="text-green-400" />
                Learn at your own pace ✨
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative mx-auto flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52 md:mx-0 md:h-56 md:w-56">

              <div className="absolute inset-5 rounded-full bg-pink-100/80 blur-2xl" />

              <span className="absolute left-1 top-8 text-xl text-pink-300 motion-safe:animate-bounce sm:text-2xl">
                🌸
              </span>

              <span className="absolute bottom-8 right-0 text-lg text-pink-300 motion-safe:animate-pulse sm:text-xl">
                ✨
              </span>

              <span className="absolute right-5 top-2 text-sm text-purple-300 motion-safe:animate-pulse sm:text-base">
                ✦
              </span>

              <div className="relative flex h-36 w-36 rotate-2 flex-col items-center justify-center rounded-[2rem] border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-purple-50 shadow-lg transition duration-500 hover:rotate-0 hover:scale-105 sm:h-44 sm:w-44">

                <span className="text-6xl font-bold leading-none text-gray-800 sm:text-7xl">
                  漢
                </span>

                <span className="mt-2 text-xs font-bold tracking-[0.25em] text-pink-400">
                  かんじ
                </span>

              </div>
            </div>

          </div>
        </section>

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <section className="mb-8 rounded-[1.75rem] bg-white p-4 shadow-sm sm:mb-10 sm:rounded-[2rem] sm:p-5 md:p-6">

          <div className="flex flex-col gap-3 md:flex-row">

            {/* Search Input */}
            <div className="relative min-w-0 flex-1">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search Kanji, reading, or meaning..."
                className="h-12 w-full rounded-2xl border border-pink-100 bg-pink-50/50 pl-11 pr-12 text-sm font-medium text-gray-700 outline-none transition duration-200 placeholder:text-xs placeholder:text-gray-400 focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100 sm:placeholder:text-sm"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-pink-100 hover:text-pink-500 active:scale-95"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}

            </div>

            {/* Chapter Filter */}
            <div className="w-full md:w-56">

              <select
                value={selectedChapterFilter}
                onChange={(event) =>
                  setSelectedChapterFilter(event.target.value)
                }
                className="h-12 w-full cursor-pointer rounded-2xl border border-purple-100 bg-purple-50 px-4 text-sm font-bold text-purple-500 outline-none transition duration-200 focus:border-purple-300 focus:bg-white focus:ring-4 focus:ring-purple-100"
              >

                <option value="all">📚 All Chapters</option>

                {kanjiMaster.map((chapterData, index) => (
                  <option
                    key={chapterData.chapter}
                    value={String(index + 1)}
                  >
                    Chapter {index + 1}
                  </option>
                ))}

              </select>

            </div>
          </div>

          {/* Search Information */}
          {isSearching && (
            <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-sm text-gray-500">
                Found{" "}
                <span className="font-bold text-pink-500">
                  {searchResults.length}
                </span>{" "}
                Kanji
              </p>

              <button
                type="button"
                onClick={clearSearch}
                className="self-start text-sm font-bold text-gray-400 transition hover:text-pink-500 active:scale-95"
              >
                Clear filters
              </button>

            </div>
          )}
        </section>

        {/* =====================================================
            SEARCH RESULTS
        ===================================================== */}

        {isSearching && (
          <section className="mb-10">

            <div className="mb-5">

              <div className="flex items-center gap-2">

                <h2 className="font-heading text-2xl font-bold text-gray-800 sm:text-3xl">
                  Search Results
                </h2>

                <span className="motion-safe:animate-pulse">
                  🔎
                </span>

              </div>

              <p className="mt-1 text-sm text-gray-500">
                Find a Kanji and open its chapter to study.
              </p>

            </div>

            {searchResults.length > 0 ? (

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {searchResults.map((result, index) => (

                  <Link
                    key={`${result.chapterNumber}-${result.kanji}-${index}`}
                    to={`/kanji-master/${result.chapterNumber}`}
                    className="group block"
                  >

                    <article className="h-full rounded-[1.75rem] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.99] sm:p-5">

                      <div className="flex items-start justify-between gap-3">

                        <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-4xl font-bold text-gray-800 transition duration-300 group-hover:scale-105 group-hover:bg-pink-100 sm:h-20 sm:w-20 sm:text-5xl">
                          {result.kanji}
                        </div>

                        <div className="text-right">

                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-300">
                            Chapter
                          </p>

                          <p className="text-sm font-bold text-pink-500">
                            {result.chapterNumber}
                          </p>

                        </div>

                      </div>

                      <p className="mt-3 line-clamp-1 text-xs font-semibold text-gray-400">
                        {result.chapterName}
                      </p>

                      <div className="mt-3 space-y-2">

                        {result.onyomi && (
                          <div className="rounded-xl bg-purple-50 px-3 py-2">

                            <p className="text-[10px] font-bold text-purple-400">
                              ONYOMI
                            </p>

                            <p className="mt-0.5 text-sm font-semibold text-gray-700">
                              {result.onyomi}
                            </p>

                          </div>
                        )}

                        {result.kunyomi && (
                          <div className="rounded-xl bg-blue-50 px-3 py-2">

                            <p className="text-[10px] font-bold text-blue-400">
                              KUNYOMI
                            </p>

                            <p className="mt-0.5 text-sm font-semibold text-gray-700">
                              {result.kunyomi}
                            </p>

                          </div>
                        )}

                        {result.burmese && (
                          <div className="rounded-xl bg-pink-50 px-3 py-2">

                            <p className="text-[10px] font-bold text-pink-400">
                              🇲🇲 MEANING
                            </p>

                            <p className="mt-0.5 line-clamp-2 text-sm font-semibold text-gray-700">
                              {result.burmese}
                            </p>

                          </div>
                        )}

                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">

                        <span className="text-sm font-bold text-pink-500">
                          Open Chapter
                        </span>

                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 transition duration-300 group-hover:translate-x-1 group-hover:bg-pink-100">
                          <ArrowRight
                            size={16}
                            className="text-pink-400"
                          />
                        </div>

                      </div>

                    </article>

                  </Link>

                ))}

              </div>

            ) : (

              <div className="rounded-[2rem] bg-white p-8 text-center shadow-sm sm:p-10">

                <div className="text-5xl motion-safe:animate-bounce">
                  🥺
                </div>

                <h3 className="mt-4 text-xl font-bold text-gray-800">
                  No Kanji Found
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Try another Kanji, reading, meaning, or chapter.
                </p>

                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-5 rounded-full bg-pink-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-pink-600 hover:shadow-md active:scale-95"
                >
                  Clear Search
                </button>

              </div>

            )}

          </section>
        )}

        {/* =====================================================
            CHAPTER SECTION TITLE
        ===================================================== */}

        {!isSearching && (
          <div className="mb-6">

            <div className="flex items-center gap-2">

              <h2 className="font-heading text-2xl font-bold text-gray-800 sm:text-3xl">
                Choose a Chapter
              </h2>

              <span className="motion-safe:animate-pulse">
                📚
              </span>

            </div>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Start learning with beautiful flashcards. Take it one step at a
              time. 🌸
            </p>

          </div>
        )}

        {/* =====================================================
            CHAPTER CARDS
        ===================================================== */}

        {!isSearching && (
          <section className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">

            {kanjiMaster.map((chapterData, index) => {

              const chapterNumber = index + 1;
              const kanjiCount = chapterData.kanji_list.length;

              return (
                <Link
                  key={chapterData.chapter}
                  to={`/kanji-master/${chapterNumber}`}
                  className="group block"
                >

                  <article className="h-full rounded-[1.75rem] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.99] sm:rounded-[2rem] sm:p-6">

                    {/* Card Header */}
                    <div className="flex items-center justify-between gap-3">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-lg font-extrabold text-pink-500 transition duration-300 group-hover:scale-105 group-hover:rotate-2 sm:h-14 sm:w-14 sm:text-xl">
                          {String(chapterNumber).padStart(2, "0")}
                        </div>

                        <div className="min-w-0">

                          <p className="text-[10px] font-bold tracking-wider text-gray-400 sm:text-xs">
                            CHAPTER
                          </p>

                          <h3 className="font-heading text-lg font-bold text-gray-800 sm:text-xl">
                            Chapter {chapterNumber}
                          </h3>

                        </div>

                      </div>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 transition duration-300 group-hover:translate-x-1 group-hover:bg-pink-100">

                        <ArrowRight
                          size={18}
                          className="text-gray-300 transition group-hover:text-pink-500"
                        />

                      </div>

                    </div>

                    {/* Chapter Title */}
                    <p className="mt-5 min-h-[48px] font-semibold leading-6 text-gray-700">
                      {chapterData.chapter}
                    </p>

                    {/* Kanji Preview */}
                    <div className="mt-4 rounded-2xl bg-purple-50 p-3.5 sm:p-4">

                      <div className="flex items-center justify-between gap-2">

                        <p className="text-[10px] font-bold tracking-wider text-purple-500 sm:text-xs">
                          KANJI PREVIEW
                        </p>

                        <span className="text-[10px] font-medium text-purple-300 sm:text-xs">
                          {kanjiCount} total
                        </span>

                      </div>

                      <div className="mt-3 grid grid-cols-4 gap-2">

                        {chapterData.kanji_list
                          .slice(0, 4)
                          .map((item, kanjiIndex) => (

                            <div
                              key={`${item.kanji}-${kanjiIndex}`}
                              className="flex aspect-square items-center justify-center rounded-xl bg-white text-lg font-bold text-gray-700 shadow-sm transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md sm:text-xl"
                            >
                              {item.kanji}
                            </div>

                          ))}

                      </div>

                      {/* View All */}
                      <button
                        type="button"
                        onClick={(event) =>
                          openKanjiModal(event, chapterData)
                        }
                        className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-purple-500 transition duration-200 hover:bg-white hover:text-pink-500 active:scale-[0.98] sm:text-sm"
                      >
                        ✨ View all {kanjiCount} Kanji
                        <ArrowRight size={14} />
                      </button>

                    </div>

                    {/* Kanji Count */}
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-400">

                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-50 text-xs">
                        🈷️
                      </span>

                      {kanjiCount} Kanji

                    </div>

                    {/* Footer */}
                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">

                      <span className="text-sm font-bold text-pink-500">
                        Open Chapter
                      </span>

                      <span className="text-xs text-gray-300 transition duration-300 group-hover:text-pink-300">
                        Let's learn ✨
                      </span>

                    </div>

                  </article>

                </Link>
              );
            })}

          </section>
        )}
      </div>

      {/* =========================================================
          ALL KANJI MODAL
      ========================================================= */}

      {selectedChapter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-2 backdrop-blur-sm sm:p-4"
          onClick={closeKanjiModal}
        >

          {/* =====================================================
              MODAL CONTAINER
          ===================================================== */}

          <div
            className="relative flex h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-2xl sm:h-[92vh] sm:rounded-[2rem]"
            onClick={(event) => event.stopPropagation()}
          >

            {/* =====================================================
                MODAL HEADER
            ===================================================== */}

            <div className="shrink-0 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-4 sm:px-6 sm:py-5 md:px-8">

              <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">

                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[10px] font-bold text-pink-500 shadow-sm sm:px-3 sm:text-xs">

                    <Sparkles size={12} />

                    Kanji Collection

                  </div>

                  <h2 className="font-heading text-xl font-bold leading-tight text-gray-800 sm:text-2xl md:text-3xl">
                    {selectedChapter.chapter}
                  </h2>

                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    {selectedChapter.kanji_list.length} Kanji
                  </p>

                </div>

                {/* Close */}
                <button
                  type="button"
                  onClick={closeKanjiModal}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition duration-200 hover:bg-pink-100 hover:text-pink-500 active:scale-90"
                  aria-label="Close Kanji Collection"
                >
                  <X size={20} />
                </button>

              </div>
            </div>

            {/* =====================================================
                CUSTOMIZE TOGGLE
            ===================================================== */}

            <div className="shrink-0 border-b border-gray-100 bg-white">

              <button
                type="button"
                onClick={toggleCustomize}
                className="flex min-h-[52px] w-full items-center justify-between px-4 py-3 transition hover:bg-pink-50/50 sm:px-6 md:px-8"
              >

                <div className="flex items-center gap-2.5">

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-100 text-pink-500">
                    <Settings2 size={16} />
                  </div>

                  <div className="text-left">

                    <p className="text-sm font-bold text-gray-700">
                      Customize your view
                    </p>

                    {!showCustomize && (
                      <p className="text-[10px] text-gray-400 sm:text-xs">
                        Choose what information to display
                      </p>
                    )}

                  </div>

                </div>

                <div className="flex items-center gap-2">

                  {!showCustomize && (
                    <span className="hidden rounded-full bg-pink-50 px-2.5 py-1 text-[10px] font-bold text-pink-400 sm:block">
                      {[
                        showKanji && "Kanji",
                        showBurmese && "Burmese",
                        showOnyomi && "Onyomi",
                        showKunyomi && "Kunyomi",
                      ]
                        .filter(Boolean)
                        .join(" • ")}
                    </span>
                  )}

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400">

                    {showCustomize ? (
                      <ChevronUp size={17} />
                    ) : (
                      <ChevronDown size={17} />
                    )}

                  </div>

                </div>

              </button>

              {/* =====================================================
                  CUSTOMIZE OPTIONS
              ===================================================== */}

              {showCustomize && (
                <div className="px-4 pb-4 sm:px-6 md:px-8">

                  <div className="rounded-2xl bg-gray-50 p-3 sm:p-4">

                    <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Display information
                    </p>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

                      {/* Kanji */}
                      <label
                        className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 transition ${
                          showKanji
                            ? "border-pink-200 bg-pink-50"
                            : "border-gray-100 bg-white"
                        }`}
                      >

                        <input
                          type="checkbox"
                          checked={showKanji}
                          onChange={(event) =>
                            setShowKanji(event.target.checked)
                          }
                          className="h-4 w-4 accent-pink-500"
                        />

                        <span className="text-xs font-bold text-gray-600">
                          🈷️ Kanji
                        </span>

                      </label>

                      {/* Burmese */}
                      <label
                        className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 transition ${
                          showBurmese
                            ? "border-pink-200 bg-pink-50"
                            : "border-gray-100 bg-white"
                        }`}
                      >

                        <input
                          type="checkbox"
                          checked={showBurmese}
                          onChange={(event) =>
                            setShowBurmese(event.target.checked)
                          }
                          className="h-4 w-4 accent-pink-500"
                        />

                        <span className="text-xs font-bold text-gray-600">
                          🇲🇲 Burmese
                        </span>

                      </label>

                      {/* Onyomi */}
                      <label
                        className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 transition ${
                          showOnyomi
                            ? "border-purple-200 bg-purple-50"
                            : "border-gray-100 bg-white"
                        }`}
                      >

                        <input
                          type="checkbox"
                          checked={showOnyomi}
                          onChange={(event) =>
                            setShowOnyomi(event.target.checked)
                          }
                          className="h-4 w-4 accent-purple-500"
                        />

                        <span className="text-xs font-bold text-gray-600">
                          音 Onyomi
                        </span>

                      </label>

                      {/* Kunyomi */}
                      <label
                        className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 transition ${
                          showKunyomi
                            ? "border-blue-200 bg-blue-50"
                            : "border-gray-100 bg-white"
                        }`}
                      >

                        <input
                          type="checkbox"
                          checked={showKunyomi}
                          onChange={(event) =>
                            setShowKunyomi(event.target.checked)
                          }
                          className="h-4 w-4 accent-blue-500"
                        />

                        <span className="text-xs font-bold text-gray-600">
                          訓 Kunyomi
                        </span>

                      </label>

                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* =====================================================
                SCROLLABLE KANJI AREA
            ===================================================== */}

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white px-3 py-4 sm:px-5 sm:py-5 md:px-8 md:py-6">

              {/* Empty Selection Warning */}
              {!showKanji &&
                !showBurmese &&
                !showOnyomi &&
                !showKunyomi && (
                  <div className="flex min-h-[300px] items-center justify-center">

                    <div className="max-w-sm rounded-2xl bg-pink-50 p-6 text-center">

                      <div className="text-4xl">
                        👀
                      </div>

                      <h3 className="mt-3 font-bold text-gray-700">
                        Nothing selected
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Open "Customize your view" and select at least one
                        item to display.
                      </p>

                    </div>

                  </div>
                )}

              {/* =====================================================
                  KANJI GRID
              ===================================================== */}

              {(showKanji ||
                showBurmese ||
                showOnyomi ||
                showKunyomi) && (

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">

                  {selectedChapter.kanji_list.map((item, index) => (

                    <div
                      key={`${item.kanji}-${index}`}
                      className="group relative rounded-2xl border border-gray-100 bg-gray-50 p-3 transition duration-300 hover:-translate-y-1 hover:border-pink-200 hover:bg-pink-50 hover:shadow-md sm:rounded-[1.25rem] sm:p-4"
                    >

                      {/* Number */}
                      <div className="mb-2 flex items-center justify-between">

                        <span className="text-[9px] font-bold text-gray-300 sm:text-[10px]">
                          #{String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-[10px] opacity-0 transition duration-300 group-hover:opacity-100 sm:text-xs">
                          🌸
                        </span>

                      </div>

                      {/* =================================================
                          KANJI
                      ================================================= */}

                      {showKanji && (
                        <div className="flex min-h-[72px] items-center justify-center rounded-xl bg-white shadow-sm sm:min-h-[88px]">

                          <span className="text-4xl font-bold leading-none text-gray-800 sm:text-5xl">
                            {item.kanji}
                          </span>

                        </div>
                      )}

                      {/* =================================================
                          ONYOMI
                      ================================================= */}

                      {showOnyomi && item.onyomi && (
                        <div
                          className={`rounded-lg bg-purple-50 px-2.5 py-2 ${
                            showKanji ? "mt-2" : ""
                          }`}
                        >

                          <p className="text-[9px] font-bold uppercase tracking-wide text-purple-400">
                            音 ON
                          </p>

                          <p className="mt-0.5 truncate text-xs font-bold text-purple-600 sm:text-sm">
                            {item.onyomi}
                          </p>

                        </div>
                      )}

                      {/* =================================================
                          KUNYOMI
                      ================================================= */}

                      {showKunyomi && item.kunyomi && (
                        <div
                          className={`rounded-lg bg-blue-50 px-2.5 py-2 ${
                            showKanji || showOnyomi ? "mt-2" : ""
                          }`}
                        >

                          <p className="text-[9px] font-bold uppercase tracking-wide text-blue-400">
                            訓 KUN
                          </p>

                          <p className="mt-0.5 truncate text-xs font-bold text-blue-600 sm:text-sm">
                            {item.kunyomi}
                          </p>

                        </div>
                      )}

                      {/* =================================================
                          BURMESE
                      ================================================= */}

                      {showBurmese && item.burmese && (
                        <div
                          className={`rounded-lg bg-pink-50 px-2.5 py-2 ${
                            showKanji ||
                            showOnyomi ||
                            showKunyomi
                              ? "mt-2"
                              : ""
                          }`}
                        >

                          <p className="text-[9px] font-bold uppercase tracking-wide text-pink-400">
                            🇲🇲 MEANING
                          </p>

                          <p className="mt-0.5 line-clamp-2 text-[11px] font-semibold leading-4 text-gray-600 sm:text-xs">
                            {item.burmese}
                          </p>

                        </div>
                      )}

                    </div>

                  ))}

                </div>

              )}

            </div>

            {/* =====================================================
                MODAL FOOTER
            ===================================================== */}

            <div className="shrink-0 border-t border-gray-100 bg-white px-4 py-3 sm:px-6 md:px-8">

              <div className="flex items-center justify-between">

                <p className="text-[10px] font-medium text-gray-400 sm:text-xs">
                  Showing{" "}
                  <span className="font-bold text-pink-500">
                    {selectedChapter.kanji_list.length}
                  </span>{" "}
                  Kanji
                </p>

                <button
                  type="button"
                  onClick={closeKanjiModal}
                  className="rounded-full bg-gray-100 px-4 py-2 text-xs font-bold text-gray-500 transition hover:bg-pink-100 hover:text-pink-500 active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm"
                >
                  Done
                </button>

              </div>

            </div>

          </div>
        </div>
      )}
    </main>
  );
}

export default KanjiMaster;

