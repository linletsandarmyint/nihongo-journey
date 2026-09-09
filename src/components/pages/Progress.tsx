
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Lock,
  RotateCcw,
  Target,
  Trophy,
} from "lucide-react";

import { studyPlan } from "../../data/studyPlan";
import {
  clearAllProgress,
  getCompletedTasks,
  loadProgressFromSupabase,
  type TaskKey,
} from "../../utils/progress";

const TOTAL_TASKS = 103;

type Category = {
  key: TaskKey;
  label: string;
  icon: string;
};

const categories: Category[] = [
  {
    key: "kanji",
    label: "Kanji",
    icon: "🈷️",
  },
  {
    key: "goi",
    label: "Vocabulary",
    icon: "📚",
  },
  {
    key: "grammar",
    label: "Grammar",
    icon: "📝",
  },
  {
    key: "reading",
    label: "Reading",
    icon: "📖",
  },
  {
    key: "listening",
    label: "Listening",
    icon: "🎧",
  },
];

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getTotalTasks(day: (typeof studyPlan)[number]): number {
  return [
    day.kanji,
    day.goi,
    day.grammar,
    day.reading,
    day.listening,
  ].filter(Boolean).length;
}

function getCompletedTasksForDay(dayNumber: number): number {
  const completed = getCompletedTasks(dayNumber);

  return Array.isArray(completed) ? completed.length : 0;
}

function getCompletedTaskKeys(dayNumber: number): TaskKey[] {
  const completed = getCompletedTasks(dayNumber);

  return Array.isArray(completed) ? completed : [];
}

function startOfDay(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
}

function addDays(date: Date, amount: number): Date {
  const result = new Date(date);

  result.setDate(result.getDate() + amount);

  return result;
}

function getStudyDate(dayNumber: number): Date {
  const studyStartDate = new Date(2026, 8, 1);

  return addDays(studyStartDate, dayNumber - 1);
}

export default function Progress() {
  /*
   * ============================================================
   * SUPABASE PROGRESS LOADING
   * ============================================================
   */

  const [progressVersion, setProgressVersion] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function loadRemoteProgress() {
      await loadProgressFromSupabase();

      if (!mounted) {
        return;
      }

      // Force all progress calculations to run again
      setProgressVersion((value) => value + 1);
    }

    void loadRemoteProgress();

    return () => {
      mounted = false;
    };
  }, []);

  const today = useMemo(() => startOfDay(new Date()), []);

  /*
   * ============================================================
   * CALENDAR
   * ============================================================
   *
   * This calendar is intentionally NOT connected to studyPlan.
   * It only displays dates.
   */

  const [calendarMonth, setCalendarMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const firstDay = new Date(year, month, 1);

    // Monday = 0
    const mondayOffset =
      (firstDay.getDay() + 6) % 7;

    const daysInMonth = new Date(
      year,
      month + 1,
      0,
    ).getDate();

    const days: Array<{
      day: number | null;
      isToday: boolean;
    }> = [];

    // Empty cells before the first day
    for (
      let index = 0;
      index < mondayOffset;
      index += 1
    ) {
      days.push({
        day: null,
        isToday: false,
      });
    }

    // Actual dates
    for (
      let day = 1;
      day <= daysInMonth;
      day += 1
    ) {
      const date = new Date(year, month, day);

      days.push({
        day,
        isToday: date.getTime() === today.getTime(),
      });
    }

    return days;
  }, [calendarMonth, today]);

  function changeMonth(amount: number) {
    setCalendarMonth(
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() + amount,
        1,
      ),
    );
  }

  function goToToday() {
    setCalendarMonth(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      ),
    );
  }

  /*
   * ============================================================
   * COMPLETED TASKS
   * ============================================================
   */

  const completedByDay = useMemo(() => {
    return studyPlan.map((day) => {
      const completedTasks =
        getCompletedTasksForDay(day.day);

      const totalTasks = getTotalTasks(day);

      const percentage =
        totalTasks > 0
          ? Math.round(
              (completedTasks / totalTasks) * 100,
            )
          : 0;

      return {
        dayNumber: day.day,
        completedTasks,
        totalTasks,
        percentage,
        isCompleted:
          totalTasks > 0 &&
          completedTasks === totalTasks,
      };
    });
  }, [progressVersion]);

  /*
   * ============================================================
   * OVERALL PROGRESS
   * ============================================================
   *
   * Total is fixed at 103 as requested.
   */

  const completedTasks = Math.min(
    TOTAL_TASKS,
    completedByDay.reduce(
      (sum, day) => sum + day.completedTasks,
      0,
    ),
  );

  const overallPercentage = Math.min(
    100,
    Math.round(
      (completedTasks / TOTAL_TASKS) * 100,
    ),
  );

  /*
   * ============================================================
   * SUBJECT PROGRESS
   * ============================================================
   */

  const categoryStats = categories.map(
    (category) => {
      let completed = 0;
      let total = 0;

      studyPlan.forEach((day) => {
        if (day[category.key]) {
          total += 1;

          const completedKeys =
            getCompletedTaskKeys(day.day);

          if (
            completedKeys.includes(
              category.key,
            )
          ) {
            completed += 1;
          }
        }
      });

      const percentage =
        total > 0
          ? Math.round(
              (completed / total) * 100,
            )
          : 0;

      return {
        ...category,
        completed,
        total,
        percentage,
      };
    },
  );

  /*
   * ============================================================
   * ACHIEVEMENTS
   * ============================================================
   */

  const activeStudyDays =
    completedByDay.filter(
      (day) => day.completedTasks > 0,
    ).length;

  const studyStreak = (() => {
    let streak = 0;

    for (
      let index = 0;
      index < completedByDay.length;
      index += 1
    ) {
      if (
        completedByDay[index]
          .completedTasks > 0
      ) {
        streak += 1;
      } else {
        break;
      }
    }

    return streak;
  })();

  const hasFirstStep =
    completedTasks >= 1;

  const hasStudyStarter =
    activeStudyDays >= 3;

  const hasSevenDayStreak =
    studyStreak >= 7;

  const hasHalfway =
    overallPercentage >= 50;

  const hasPerfectDay =
    completedByDay.some(
      (day) => day.isCompleted,
    );

  const hasJourneyComplete =
    overallPercentage >= 100;

  const achievements = [
    {
      title: "First Step",
      description:
        "Complete your first task",
      icon: "🌱",
      unlocked: hasFirstStep,
    },
    {
      title: "Study Starter",
      description:
        "Study for 3 days",
      icon: "🌸",
      unlocked: hasStudyStarter,
    },
    {
      title: "7 Day Streak",
      description:
        "Keep a 7-day study streak",
      icon: "🔥",
      unlocked: hasSevenDayStreak,
    },
    {
      title: "Halfway There",
      description:
        "Reach 50% overall progress",
      icon: "⭐",
      unlocked: hasHalfway,
    },
    {
      title: "Perfect Day",
      description:
        "Complete every task in one day",
      icon: "✨",
      unlocked: hasPerfectDay,
    },
    {
      title: "Journey Complete",
      description:
        "Complete your whole study plan",
      icon: "🏆",
      unlocked: hasJourneyComplete,
    },
  ];

  /*
   * ============================================================
   * RESET
   * ============================================================
   */

  const [showResetConfirm, setShowResetConfirm] =
    useState(false);

  function handleReset() {
    clearAllProgress();

    setShowResetConfirm(false);

    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-[#fffafd] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <section>
          <div className="mb-1 flex items-center gap-2">
            <span className="text-2xl">
              🫧
            </span>

            <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
              Your Progress
            </h1>

            <span className="text-2xl">
              🫧
            </span>
          </div>

          <p className="text-sm text-gray-500 sm:text-base">
            See how far you&apos;ve come on your
            Nihongo Journey 🌸
          </p>
        </section>

        {/* =====================================================
            OVERALL PROGRESS
        ====================================================== */}

        <section className="overflow-hidden rounded-3xl border border-pink-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6">
            <h2 className="text-xl font-extrabold text-pink-500">
              Overall Progress
            </h2>

            {/* TASK COUNT */}

            <p className="mt-3 text-sm font-medium text-gray-500">
              {completedTasks} of {TOTAL_TASKS}{" "}
              tasks completed
            </p>

            {/* GREAT START */}

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-2">
              <span className="text-xl leading-none">
                🌱
              </span>

              <span className="text-xs font-bold text-gray-600">
                Great Start!
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-16">
            {/* =================================================
                WATER ANIMATION
                DO NOT CHANGE
            ================================================== */}

            <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-pink-50 ring-8 ring-pink-100" />

              <div className="absolute inset-[10px] overflow-hidden rounded-full border-4 border-white bg-[#fffafd] shadow-inner">
                <div
                  className="absolute bottom-0 left-0 w-full bg-pink-300 transition-all duration-1000 ease-out"
                  style={{
                    height: `${overallPercentage}%`,
                  }}
                >
                  <div className="absolute -top-3 left-[-50%] h-8 w-[200%] animate-[waterWave_4s_ease-in-out_infinite] rounded-[45%] bg-pink-300" />

                  <div className="absolute -top-2 left-[-50%] h-7 w-[200%] animate-[waterWaveReverse_5s_ease-in-out_infinite] rounded-[45%] bg-pink-200/80" />

                  {overallPercentage > 10 && (
                    <>
                      <span className="absolute bottom-8 left-[25%] h-2 w-2 animate-[bubble_3s_ease-in-out_infinite] rounded-full bg-white/70" />

                      <span className="absolute bottom-12 right-[25%] h-1.5 w-1.5 animate-[bubble_4s_ease-in-out_1s_infinite] rounded-full bg-white/70" />

                      <span className="absolute bottom-6 left-[55%] h-1.5 w-1.5 animate-[bubble_3.5s_ease-in-out_1.5s_infinite] rounded-full bg-white/60" />
                    </>
                  )}
                </div>

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                  <span
                    className={`text-3xl font-extrabold transition-colors duration-500 ${
                      overallPercentage >= 55
                        ? "text-white"
                        : "text-pink-500"
                    }`}
                  >
                    {overallPercentage}%
                  </span>

                  <span
                    className={`text-xs font-bold ${
                      overallPercentage >= 55
                        ? "text-white/90"
                        : "text-gray-400"
                    }`}
                  >
                    Complete
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                OVERALL SUMMARY
            ================================================== */}

            <div className="w-full max-w-xl">
              {/* PROGRESS BAR */}

              <div className="mt-6 w-full">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400">
                    Your Journey
                  </span>

                  <span className="text-xs font-extrabold text-pink-500">
                    {overallPercentage}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-pink-100">
                  <div
                    className="h-full rounded-full bg-pink-300 transition-all duration-1000 ease-out"
                    style={{
                      width: `${overallPercentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SUBJECT PROGRESS
        ====================================================== */}

        <section className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6">
            <h2 className="text-xl font-extrabold text-gray-800">
              Subject Progress
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Track each part of your Japanese
              study plan
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categoryStats.map(
              (category) => (
                <div
                  key={category.key}
                  className="rounded-2xl border border-pink-100 bg-[#fffafd] p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-2xl">
                      {category.icon}
                    </span>

                    <span className="text-sm font-extrabold text-pink-500">
                      {category.percentage}%
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-700">
                    {category.label}
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    {category.completed} /{" "}
                    {category.total} completed
                  </p>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-pink-100">
                    <div
                      className="h-full rounded-full bg-pink-300 transition-all duration-700"
                      style={{
                        width: `${category.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        {/* =====================================================
            STUDY CALENDAR
            DATE ONLY
        ====================================================== */}

        <section className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm sm:p-7">
          {/* HEADER */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CalendarDays
                  size={22}
                  className="text-pink-400"
                />

                <h2 className="text-xl font-extrabold text-gray-800">
                  Study Calendar
                </h2>

                <span className="text-lg">
                  🌸
                </span>
              </div>

              <p className="mt-1 text-sm text-gray-400">
                Take a look at your month
              </p>
            </div>

            {/* CONTROLS */}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  changeMonth(-1)
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-pink-100 bg-white text-gray-500 transition hover:bg-pink-50 hover:text-pink-500"
                aria-label="Previous month"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={goToToday}
                className="rounded-xl border border-pink-100 bg-white px-4 py-2 text-xs font-bold text-pink-500 transition hover:bg-pink-50"
              >
                Today
              </button>

              <button
                type="button"
                onClick={() =>
                  changeMonth(1)
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-pink-100 bg-white text-gray-500 transition hover:bg-pink-50 hover:text-pink-500"
                aria-label="Next month"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* MONTH TITLE */}

          <div className="mb-5 flex items-center justify-center gap-2">
            <span className="text-sm">
              🌷
            </span>

            <h3 className="text-lg font-extrabold text-gray-700">
              {
                months[
                  calendarMonth.getMonth()
                ]
              }{" "}
              {calendarMonth.getFullYear()}
            </h3>

            <span className="text-sm">
              🌷
            </span>
          </div>

          {/* CALENDAR */}

          <div className="overflow-hidden rounded-2xl border border-pink-100 bg-white">
            {/* WEEKDAYS */}

            <div className="grid grid-cols-7 border-b border-pink-100 bg-pink-50/70">
              {weekdays.map(
                (weekday) => (
                  <div
                    key={weekday}
                    className="py-3 text-center text-[10px] font-extrabold uppercase tracking-wide text-pink-400 sm:text-xs"
                  >
                    <span className="hidden sm:inline">
                      {weekday.slice(
                        0,
                        3,
                      )}
                    </span>

                    <span className="sm:hidden">
                      {weekday.slice(
                        0,
                        1,
                      )}
                    </span>
                  </div>
                ),
              )}
            </div>

            {/* DATES */}

            <div className="grid grid-cols-7">
              {calendarDays.map(
                (calendarDay, index) => {
                  if (
                    calendarDay.day ===
                    null
                  ) {
                    return (
                      <div
                        key={`empty-${index}`}
                        className="min-h-[72px] border-b border-r border-pink-50 bg-pink-50/10 sm:min-h-[100px]"
                      />
                    );
                  }

                  return (
                    <div
                      key={
                        calendarDay.day
                      }
                      className={`relative flex min-h-[72px] items-start justify-center border-b border-r border-pink-50 p-2 sm:min-h-[100px] sm:p-3 ${
                        calendarDay.isToday
                          ? "bg-pink-50/60"
                          : "bg-white"
                      }`}
                    >
                      {/* DATE CIRCLE */}

                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold transition sm:h-10 sm:w-10 sm:text-base ${
                          calendarDay.isToday
                            ? "bg-pink-300 text-white shadow-sm ring-4 ring-pink-100"
                            : "text-gray-500 hover:bg-pink-50 hover:text-pink-500"
                        }`}
                      >
                        {
                          calendarDay.day
                        }
                      </div>

                      {/* CUTE FLOWER */}

                      {calendarDay.isToday && (
                        <span className="absolute bottom-2 right-2 text-xs opacity-70">
                          🌸
                        </span>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          </div>

          {/* SMALL DECORATION */}

          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-gray-300">
            <span>🌸</span>

            <span>
              New month, new little steps
            </span>

            <span>🌸</span>
          </div>
        </section>

        {/* =====================================================
            DAY-BY-DAY PROGRESS
        ====================================================== */}

        <section className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-gray-800">
                Day-by-Day Progress
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Follow your journey one day at
                a time 🌱
              </p>
            </div>

            <Target
              size={24}
              className="text-pink-300"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {completedByDay.map(
              (day) => {
                const date =
                  getStudyDate(
                    day.dayNumber,
                  );

                return (
                  <div
                    key={
                      day.dayNumber
                    }
                    className="rounded-2xl border border-pink-100 bg-[#fffafd] p-4"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <p className="text-xs font-bold text-pink-400">
                          DAY{" "}
                          {
                            day.dayNumber
                          }
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {date.toLocaleDateString(
                            "en-US",
                            {
                              month:
                                "short",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>

                      {day.isCompleted ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100">
                          <Check
                            size={16}
                            className="text-pink-500"
                            strokeWidth={
                              3
                            }
                          />
                        </div>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                          <span className="h-2 w-2 rounded-full bg-gray-300" />
                        </div>
                      )}
                    </div>

                    <div className="mb-2 flex items-end justify-between">
                      <span className="text-sm font-bold text-gray-600">
                        {
                          day.completedTasks
                        }{" "}
                        /{" "}
                        {
                          day.totalTasks
                        }
                      </span>

                      <span className="text-xs font-extrabold text-pink-500">
                        {
                          day.percentage
                        }
                        %
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-pink-100">
                      <div
                        className="h-full rounded-full bg-pink-300 transition-all"
                        style={{
                          width: `${day.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </section>

        {/* =====================================================
            ACHIEVEMENTS
        ====================================================== */}

        <section className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center gap-2">
            <Trophy
              size={22}
              className="text-yellow-400"
            />

            <div>
              <h2 className="text-xl font-extrabold text-gray-800">
                Achievements
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Little milestones worth celebrating
                🎉
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map(
              (achievement) => (
                <div
                  key={
                    achievement.title
                  }
                  className={`rounded-2xl border p-4 transition ${
                    achievement.unlocked
                      ? "border-pink-100 bg-pink-50/50"
                      : "border-gray-100 bg-gray-50/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl ${
                        achievement.unlocked
                          ? "bg-white"
                          : "bg-gray-100 grayscale"
                      }`}
                    >
                      {achievement.unlocked ? (
                        achievement.icon
                      ) : (
                        <Lock
                          size={18}
                          className="text-gray-300"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3
                        className={`text-sm font-extrabold ${
                          achievement.unlocked
                            ? "text-gray-700"
                            : "text-gray-400"
                        }`}
                      >
                        {
                          achievement.title
                        }
                      </h3>

                      <p className="mt-1 text-xs text-gray-400">
                        {
                          achievement.description
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        {/* =====================================================
            RESET PROGRESS
        ====================================================== */}

        <section className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-extrabold text-gray-700">
                Reset Progress
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Clear all completed tasks and
                start your journey again.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowResetConfirm(
                  true,
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-400 transition hover:bg-red-100 hover:text-red-500"
            >
              <RotateCcw size={15} />
              Reset Progress
            </button>
          </div>
        </section>
      </div>

      {/* =======================================================
          RESET CONFIRMATION
      ======================================================== */}

      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
              <RotateCcw
                size={24}
                className="text-red-400"
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-lg font-extrabold text-gray-800">
                Reset your progress?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                This will remove all completed
                tasks from your study journey.
                This action cannot be undone.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowResetConfirm(
                    false,
                  )
                }
                className="flex-1 rounded-xl border border-pink-100 bg-white px-4 py-3 text-sm font-bold text-gray-500 transition hover:bg-pink-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex-1 rounded-xl bg-red-400 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-500"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          WATER ANIMATION CSS
      ======================================================== */}

      <style>{`
        @keyframes waterWave {
          0% {
            transform: translateX(0) rotate(0deg);
          }

          50% {
            transform: translateX(-6%) rotate(2deg);
          }

          100% {
            transform: translateX(0) rotate(0deg);
          }
        }

        @keyframes waterWaveReverse {
          0% {
            transform: translateX(-4%) rotate(-1deg);
          }

          50% {
            transform: translateX(5%) rotate(1deg);
          }

          100% {
            transform: translateX(-4%) rotate(-1deg);
          }
        }

        @keyframes bubble {
          0% {
            transform: translateY(8px);
            opacity: 0;
          }

          30% {
            opacity: 0.8;
          }

          100% {
            transform: translateY(-25px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

