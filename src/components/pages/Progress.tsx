import { useMemo, useState } from "react";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  Flame,
  Lock,
  RotateCcw,
  Target,
  Trophy,
} from "lucide-react";

import { studyPlan } from "../../data/studyPlan";

import {
  clearAllProgress,
  getCompletedTasks,
  type TaskKey,
} from "../../utils/progress";

type CategoryInfo = {
  key: TaskKey;
  label: string;
  emoji: string;
  color: string;
  background: string;
  bar: string;
};

const categories: CategoryInfo[] = [
  {
    key: "kanji",
    label: "Kanji",
    emoji: "🈷️",
    color: "text-purple-500",
    background: "bg-purple-50",
    bar: "bg-purple-400",
  },
  {
    key: "goi",
    label: "Vocabulary",
    emoji: "📚",
    color: "text-blue-500",
    background: "bg-blue-50",
    bar: "bg-blue-400",
  },
  {
    key: "grammar",
    label: "Grammar",
    emoji: "📝",
    color: "text-pink-500",
    background: "bg-pink-50",
    bar: "bg-pink-400",
  },
  {
    key: "reading",
    label: "Reading",
    emoji: "📖",
    color: "text-yellow-600",
    background: "bg-yellow-50",
    bar: "bg-yellow-400",
  },
  {
    key: "listening",
    label: "Listening",
    emoji: "🎧",
    color: "text-green-500",
    background: "bg-green-50",
    bar: "bg-green-400",
  },
];

function Progress() {
  const [refresh, setRefresh] = useState(0);

  function refreshProgress() {
    setRefresh((current) => current + 1);
  }

  /* ============================================================
     TOTAL TASKS
  ============================================================ */

  const totalTasks = useMemo(() => {
    return studyPlan.reduce((total, day) => {
      return (
        total +
        [day.kanji, day.goi, day.grammar, day.reading, day.listening].filter(
          Boolean,
        ).length
      );
    }, 0);
  }, []);

  /* ============================================================
     COMPLETED TASKS
  ============================================================ */

  const completedTasks = useMemo(() => {
    return studyPlan.reduce((total, day) => {
      const activeTasks = [
        day.kanji,
        day.goi,
        day.grammar,
        day.reading,
        day.listening,
      ].filter(Boolean).length;

      const completed = getCompletedTasks(day.day).length;

      return total + Math.min(completed, activeTasks);
    }, 0);
  }, [refresh]);

  /* ============================================================
     OVERALL PERCENTAGE
  ============================================================ */

  const overallPercentage =
    totalTasks === 0
      ? 0
      : Math.min(100, Math.round((completedTasks / totalTasks) * 100));

  /* ============================================================
     ACTIVE STUDY DAYS
  ============================================================ */

  const activeStudyDays = useMemo(() => {
    return studyPlan.filter((day) => !day.is_rest_day).length;
  }, []);

  /* ============================================================
     DAY STATS
  ============================================================ */

  const dayStats = useMemo(() => {
    return studyPlan.map((day) => {
      const total = [
        day.kanji,
        day.goi,
        day.grammar,
        day.reading,
        day.listening,
      ].filter(Boolean).length;

      const completed = Math.min(getCompletedTasks(day.day).length, total);

      const percentage =
        total === 0 ? 0 : Math.min(100, Math.round((completed / total) * 100));

      return {
        ...day,
        total,
        completed,
        percentage,
      };
    });
  }, [refresh]);

  /* ============================================================
     COMPLETED DAYS
  ============================================================ */

  const completedDays = useMemo(() => {
    return dayStats.filter(
      (day) => !day.is_rest_day && day.total > 0 && day.completed >= day.total,
    ).length;
  }, [dayStats]);

  const perfectDays = completedDays;

  /* ============================================================
     CURRENT DAY
  ============================================================ */

  const currentDay = useMemo(() => {
    /*
     * Always choose the FIRST unfinished active day.
     *
     * This is important:
     *
     * Day 4 complete
     * Day 5 incomplete
     * Day 6 complete
     *
     * Current day is still Day 5.
     */

    const activeDay = dayStats.find((day) => {
      if (day.is_rest_day) {
        return false;
      }

      if (day.total === 0) {
        return false;
      }

      return day.completed < day.total;
    });

    return activeDay ?? dayStats[dayStats.length - 1];
  }, [dayStats]);

  /* ============================================================
     CURRENT DAY PROGRESS
  ============================================================ */

  const currentDayProgress = useMemo(() => {
    if (!currentDay) {
      return {
        completed: 0,
        total: 0,
        percentage: 0,
      };
    }

    return {
      completed: currentDay.completed,
      total: currentDay.total,
      percentage: currentDay.percentage,
    };
  }, [currentDay]);

  /* ============================================================
     CATEGORY PROGRESS
  ============================================================ */

  const categoryStats = useMemo(() => {
    return categories.map((category) => {
      let total = 0;
      let completed = 0;

      studyPlan.forEach((day) => {
        if (!day[category.key]) {
          return;
        }

        total++;

        const dayProgress = getCompletedTasks(day.day);

        if (dayProgress.includes(category.key)) {
          completed++;
        }
      });

      const percentage =
        total === 0 ? 0 : Math.min(100, Math.round((completed / total) * 100));

      return {
        ...category,
        total,
        completed,
        percentage,
      };
    });
  }, [refresh]);

  /* ============================================================
     STUDY STREAK
  ============================================================ */

  const studyStreak = useMemo(() => {
    let streak = 0;

    for (const day of dayStats) {
      if (day.is_rest_day) {
        continue;
      }

      if (day.total > 0 && day.completed >= day.total) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }, [dayStats]);

  /* ============================================================
     ACHIEVEMENTS
  ============================================================ */

  const achievements = useMemo(() => {
    return [
      {
        id: "first-step",
        title: "First Step",
        description: "Complete your first study task.",
        emoji: "🌱",
        unlocked: completedTasks >= 1,
      },
      {
        id: "ten-tasks",
        title: "10 Tasks",
        description: "Complete 10 study tasks.",
        emoji: "📚",
        unlocked: completedTasks >= 10,
      },
      {
        id: "three-day",
        title: "3-Day Streak",
        description: "Complete 3 study days in a row.",
        emoji: "🔥",
        unlocked: studyStreak >= 3,
      },
      {
        id: "perfect-day",
        title: "Perfect Day",
        description: "Complete every task in a study day.",
        emoji: "🌸",
        unlocked: perfectDays >= 1,
      },
      {
        id: "seven-day",
        title: "7-Day Streak",
        description: "Complete 7 study days in a row.",
        emoji: "✨",
        unlocked: studyStreak >= 7,
      },
      {
        id: "halfway",
        title: "Halfway There",
        description: "Complete 50% of your study plan.",
        emoji: "🎯",
        unlocked: overallPercentage >= 50,
      },
      {
        id: "jlpt-hero",
        title: "JLPT Hero",
        description: "Complete the entire study plan.",
        emoji: "👑",
        unlocked: overallPercentage === 100,
      },
    ];
  }, [completedTasks, overallPercentage, perfectDays, studyStreak]);

  const unlockedAchievements = achievements.filter(
    (achievement) => achievement.unlocked,
  ).length;

  /* ============================================================
     CLEAR PROGRESS
  ============================================================ */

  function handleClearProgress() {
    const confirmed = window.confirm(
      "Are you sure you want to clear all study progress?",
    );

    if (!confirmed) {
      return;
    }

    clearAllProgress();
    refreshProgress();
  }

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}

        <section className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-500">
            <Trophy size={16} />
            Nihongo Journey
          </div>

          <h1 className="font-heading text-4xl font-extrabold text-gray-800 md:text-5xl">
            Your Progress 🌸
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            See how far you've come and keep moving forward with your Japanese
            learning journey. ✨
          </p>
        </section>

        {/* OVERALL PROGRESS */}

        <section className="mb-6 rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-pink-400">
                Overall Progress
              </p>

              <h2 className="font-heading mt-2 text-3xl font-bold text-gray-800">
                {overallPercentage}% Complete
              </h2>

              <p className="mt-2 text-gray-500">
                {completedTasks} of {totalTasks} tasks completed
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {overallPercentage === 100 ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
                    🎉 Study Plan Complete!
                  </span>
                ) : overallPercentage >= 50 ? (
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-600">
                    ✨ More than halfway!
                  </span>
                ) : overallPercentage > 0 ? (
                  <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-500">
                    🌱 Great start!
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500">
                    🌸 Ready to begin
                  </span>
                )}
              </div>
            </div>

            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-pink-50 ring-8 ring-pink-100">
              <div className="text-center">
                <p className="text-3xl font-extrabold text-pink-500">
                  {overallPercentage}%
                </p>

                <p className="text-xs font-semibold text-gray-400">Complete</p>
              </div>
            </div>
          </div>

          <div className="mt-7 h-4 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-pink-400 transition-all duration-700"
              style={{
                width: `${overallPercentage}%`,
              }}
            />
          </div>
        </section>

        {/* STATISTICS */}

        <section className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <CalendarDays size={24} className="text-pink-500" />

            <p className="mt-3 text-2xl font-bold text-gray-800">
              {activeStudyDays}
            </p>

            <p className="text-sm text-gray-500">Study Days</p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <CheckCircle2 size={24} className="text-green-500" />

            <p className="mt-3 text-2xl font-bold text-gray-800">
              {completedDays}
            </p>

            <p className="text-sm text-gray-500">Days Completed</p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <Target size={24} className="text-purple-500" />

            <p className="mt-3 text-2xl font-bold text-gray-800">
              {completedTasks}
            </p>

            <p className="text-sm text-gray-500">Tasks Finished</p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <Flame size={24} className="text-orange-500" />

            <p className="mt-3 text-2xl font-bold text-gray-800">
              {studyStreak}
            </p>

            <p className="text-sm text-gray-500">Day Streak 🔥</p>
          </div>
        </section>

        {/* CONTINUE LEARNING */}

        {currentDay && (
          <section className="mb-8 rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-pink-400">
                  Continue Learning
                </p>

                <h2 className="font-heading mt-2 text-2xl font-bold text-gray-800">
                  Day {currentDay.day} 🌸
                </h2>

                <p className="mt-2 text-gray-500">
                  {currentDayProgress.completed} of {currentDayProgress.total}{" "}
                  tasks completed
                </p>
              </div>

              <div className="text-left md:text-right">
                <p className="text-3xl font-extrabold text-pink-500">
                  {currentDayProgress.percentage}%
                </p>

                <p className="text-xs font-semibold text-gray-400">
                  Today's Progress
                </p>
              </div>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-pink-400 transition-all duration-500"
                style={{
                  width: `${currentDayProgress.percentage}%`,
                }}
              />
            </div>

            <a
              href={`/study-plan/${currentDay.day}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-600"
            >
              Continue Day {currentDay.day}
              <ArrowRightIcon />
            </a>
          </section>
        )}

        {/* SUBJECT PROGRESS */}

        <section className="mb-8">
          <div className="mb-5">
            <h2 className="font-heading text-2xl font-bold text-gray-800">
              Subject Progress 📚
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Track each part of your Japanese study plan.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryStats.map((category) => (
              <div
                key={category.key}
                className="rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${category.background}`}
                    >
                      <span className="text-xl">{category.emoji}</span>
                    </div>

                    <div>
                      <p className="font-bold text-gray-800">
                        {category.label}
                      </p>

                      <p className="text-xs text-gray-400">
                        {category.completed} / {category.total} completed
                      </p>
                    </div>
                  </div>

                  <span className={`text-lg font-extrabold ${category.color}`}>
                    {category.percentage}%
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${category.bar} transition-all duration-700`}
                    style={{
                      width: `${category.percentage}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {category.percentage === 100
                      ? "Completed 🎉"
                      : category.percentage === 0
                        ? "Not started"
                        : "Keep going 🌱"}
                  </span>

                  {category.percentage === 100 && (
                    <Check size={16} className="text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS */}

        <section className="mb-8">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-800">
                Achievements 🏆
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Keep learning to unlock new milestones.
              </p>
            </div>

            <span className="text-sm font-bold text-pink-400">
              {unlockedAchievements} / {achievements.length} unlocked
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`relative overflow-hidden rounded-3xl p-5 transition ${
                  achievement.unlocked
                    ? "bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                    : "bg-gray-100/70"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${
                      achievement.unlocked
                        ? "bg-pink-50"
                        : "bg-gray-200 grayscale"
                    }`}
                  >
                    {achievement.unlocked ? (
                      achievement.emoji
                    ) : (
                      <Lock size={20} className="text-gray-400" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`font-bold ${
                          achievement.unlocked
                            ? "text-gray-800"
                            : "text-gray-400"
                        }`}
                      >
                        {achievement.title}
                      </p>

                      {achievement.unlocked && (
                        <CheckCircle2
                          size={17}
                          className="shrink-0 text-green-500"
                        />
                      )}
                    </div>

                    <p
                      className={`mt-1 text-sm ${
                        achievement.unlocked ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DAY-BY-DAY */}

        <section className="mb-8">
          <div className="mb-5">
            <h2 className="font-heading text-2xl font-bold text-gray-800">
              Day-by-Day Progress 🗓️
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              See how your study journey is progressing.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {dayStats.map((day) => (
              <div
                key={day.day}
                className={`rounded-2xl p-4 transition hover:-translate-y-0.5 ${
                  day.is_rest_day
                    ? "bg-purple-50"
                    : day.percentage === 100
                      ? "bg-green-50"
                      : "bg-white shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${
                        day.is_rest_day
                          ? "bg-purple-100 text-purple-500"
                          : day.percentage === 100
                            ? "bg-green-100 text-green-600"
                            : day.percentage > 0
                              ? "bg-pink-100 text-pink-500"
                              : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {day.is_rest_day ? "🌙" : day.day}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-700">
                        {day.is_rest_day ? "Rest Day" : `Day ${day.day}`}
                      </p>

                      <p className="text-xs text-gray-400">
                        {day.is_rest_day
                          ? "Rest & Review"
                          : `${day.completed}/${day.total} tasks`}
                      </p>
                    </div>
                  </div>

                  {!day.is_rest_day && day.percentage === 100 && (
                    <CheckCircle2 size={18} className="text-green-500" />
                  )}
                </div>

                {!day.is_rest_day && (
                  <>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          day.percentage === 100
                            ? "bg-green-400"
                            : "bg-pink-400"
                        }`}
                        style={{
                          width: `${day.percentage}%`,
                        }}
                      />
                    </div>

                    <p className="mt-2 text-right text-xs font-bold text-gray-400">
                      {day.percentage}%
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* MOTIVATION */}

        <section className="mb-8 rounded-[2rem] bg-gradient-to-r from-pink-100 via-purple-50 to-yellow-50 p-6 md:p-8">
          <div className="flex flex-col items-center text-center md:flex-row md:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white text-3xl shadow-sm">
              {overallPercentage === 100
                ? "👑"
                : studyStreak >= 7
                  ? "🔥"
                  : studyStreak >= 3
                    ? "🌸"
                    : completedTasks > 0
                      ? "🌱"
                      : "✨"}
            </div>

            <div className="mt-4 md:ml-5 md:mt-0">
              <h2 className="font-heading text-xl font-bold text-gray-800">
                {overallPercentage === 100
                  ? "You did it! 🎉"
                  : studyStreak >= 7
                    ? "You're on fire! 🔥"
                    : studyStreak >= 3
                      ? "Amazing consistency! 🌸"
                      : completedTasks > 0
                        ? "You're making progress! 🌱"
                        : "Your journey starts here! ✨"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {overallPercentage === 100
                  ? "You completed your entire Japanese study plan. Be proud of yourself!"
                  : studyStreak >= 7
                    ? `You've studied for ${studyStreak} consecutive days. Keep the momentum going!`
                    : completedTasks > 0
                      ? "Every completed task brings you one step closer to your JLPT goal."
                      : "Start with one small task today. You don't have to finish everything at once."}
              </p>
            </div>
          </div>
        </section>

        {/* RESET */}

        <section className="rounded-3xl border border-red-100 bg-white p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-bold text-gray-700">Reset your progress</p>

              <p className="mt-1 text-sm text-gray-400">
                This will remove all completed tasks from this browser.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClearProgress}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-50 px-5 py-3 text-sm font-bold text-red-500 transition hover:bg-red-100"
            >
              <RotateCcw size={17} />
              Clear Progress
            </button>
          </div>
        </section>

        <div className="h-8" />
      </div>
    </main>
  );
}

function ArrowRightIcon() {
  return <span aria-hidden="true">→</span>;
}

export default Progress;
