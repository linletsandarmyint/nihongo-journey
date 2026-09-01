import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Flame,
  Sparkles,
  Timer,
} from "lucide-react";

import { studyPlan } from "../../data/studyPlan";
import { getProgress } from "../../utils/progress";

function Home() {
  const progress = getProgress();

  const totalTasks = studyPlan.reduce((total, day) => {
    return (
      total +
      [day.kanji, day.goi, day.grammar, day.reading, day.listening].filter(
        Boolean,
      ).length
    );
  }, 0);

  const completedTasks = studyPlan.reduce((total, day) => {
    const activeTasks = [
      day.kanji,
      day.goi,
      day.grammar,
      day.reading,
      day.listening,
    ].filter(Boolean).length;

    const completed = getCompletedTasksForDay(progress, day.day, activeTasks);

    return total + completed;
  }, 0);

  const overallPercentage =
    totalTasks === 0
      ? 0
      : Math.min(100, Math.round((completedTasks / totalTasks) * 100));

  /*
   * The current day is ALWAYS the first unfinished
   * active study day.
   *
   * This means:
   *
   * Day 4 complete → Day 5
   * Day 5 complete → Day 6
   *
   * Rest days are skipped.
   */
  const currentDay = getCurrentDay(progress);

  const currentStudyDay =
    studyPlan.find((day) => day.day === currentDay) ??
    studyPlan[studyPlan.length - 1];

  const currentTasks = currentStudyDay
    ? [
        currentStudyDay.kanji,
        currentStudyDay.goi,
        currentStudyDay.grammar,
        currentStudyDay.reading,
        currentStudyDay.listening,
      ].filter(Boolean).length
    : 0;

  const currentCompleted = currentStudyDay
    ? getCompletedTasksForDay(progress, currentStudyDay.day, currentTasks)
    : 0;

  const currentPercentage =
    currentTasks === 0
      ? 0
      : Math.min(100, Math.round((currentCompleted / currentTasks) * 100));

  const streak = calculateStreak(progress);

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* ================= HERO ================= */}

        <section className="relative mb-8 overflow-hidden rounded-[2rem] bg-white p-7 shadow-sm md:p-10">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-500">
              <Sparkles size={16} />
              Nihongo Journey
            </div>

            <h1 className="font-heading text-4xl font-bold tracking-tight text-gray-800 md:text-6xl">
              Your Japanese Journey 🌸
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500 md:text-lg">
              Learn Japanese one small step at a time. Follow your{" "}
              {studyPlan.length}-day journey, complete your daily tasks, and
              build your Japanese skills. ✨
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to={`/study-plan/${currentStudyDay?.day ?? 1}`}
                className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-pink-600 hover:shadow-md"
              >
                Continue Day {currentStudyDay?.day ?? 1}
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/study-plan"
                className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-6 py-3 font-bold text-pink-500 transition hover:bg-pink-200"
              >
                View Study Plan
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute right-8 top-5 hidden text-7xl opacity-70 md:block">
            🌸
          </div>

          <div className="pointer-events-none absolute bottom-4 right-32 hidden text-4xl opacity-50 md:block">
            🌸
          </div>

          <div className="pointer-events-none absolute right-10 top-36 hidden text-3xl opacity-40 md:block">
            ✨
          </div>
        </section>

        {/* ================= TODAY ================= */}

        <section className="mb-8 rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-500">
                <CalendarDays size={16} />
                Today's Mission
              </div>

              <h2 className="font-heading mt-4 text-3xl font-bold text-gray-800">
                Day {currentStudyDay?.day ?? 1} 🌱
              </h2>

              <p className="mt-2 text-gray-500">
                {currentCompleted} of {currentTasks} tasks completed
              </p>
            </div>

            <div className="w-full md:w-72">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-400">
                  Today's Progress
                </span>

                <span className="font-bold text-pink-500">
                  {currentPercentage}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-pink-400 transition-all duration-500"
                  style={{
                    width: `${currentPercentage}%`,
                  }}
                />
              </div>

              <Link
                to={`/study-plan/${currentStudyDay?.day ?? 1}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-pink-500 hover:text-pink-600"
              >
                Open today's tasks
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ================= STATISTICS ================= */}

        <section className="mb-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Overall Progress
                </p>

                <p className="font-heading mt-2 text-4xl font-bold text-gray-800">
                  {overallPercentage}%
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
                <CheckCircle2 size={28} />
              </div>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-pink-400 transition-all duration-500"
                style={{
                  width: `${overallPercentage}%`,
                }}
              />
            </div>

            <p className="mt-3 text-sm text-gray-500">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Study Streak
                </p>

                <p className="font-heading mt-2 text-4xl font-bold text-gray-800">
                  {streak}
                </p>

                <p className="mt-1 text-sm text-gray-500">consecutive days</p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                <Flame size={28} />
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Journey
                </p>

                <p className="font-heading mt-2 text-4xl font-bold text-gray-800">
                  {studyPlan.length}
                </p>

                <p className="mt-1 text-sm text-gray-500">total study days</p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-500">
                <BookOpen size={28} />
              </div>
            </div>
          </div>
        </section>

        {/* ================= LEARNING PATH ================= */}

        <section className="mb-8">
          <div className="mb-5">
            <h2 className="font-heading text-2xl font-bold text-gray-800">
              Your Learning Path 🌸
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Build your Japanese skills step by step.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <SubjectCard
              emoji="🈷️"
              title="Kanji"
              description="Kanji Master"
              background="bg-purple-50"
              iconBackground="bg-purple-100"
              textColor="text-purple-500"
            />

            <SubjectCard
              emoji="📚"
              title="Vocabulary"
              description="Tango"
              background="bg-blue-50"
              iconBackground="bg-blue-100"
              textColor="text-blue-500"
            />

            <SubjectCard
              emoji="📝"
              title="Grammar"
              description="Shinkanzen"
              background="bg-pink-50"
              iconBackground="bg-pink-100"
              textColor="text-pink-500"
            />

            <SubjectCard
              emoji="📖"
              title="Reading"
              description="Reading Practice"
              background="bg-yellow-50"
              iconBackground="bg-yellow-100"
              textColor="text-yellow-600"
            />

            <SubjectCard
              emoji="🎧"
              title="Listening"
              description="Listening Practice"
              background="bg-green-50"
              iconBackground="bg-green-100"
              textColor="text-green-500"
            />
          </div>
        </section>

        {/* ================= QUICK ACTIONS ================= */}

        <section className="mb-8">
          <div className="mb-5">
            <h2 className="font-heading text-2xl font-bold text-gray-800">
              Quick Actions ✨
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Link
              to="/study-plan"
              className="group rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
                <BookOpen size={24} />
              </div>

              <h3 className="font-heading mt-5 text-xl font-bold text-gray-800">
                Study Plan
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                See all {studyPlan.length} days and check your daily tasks.
              </p>

              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-pink-500">
                Open Plan
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </span>
            </Link>

            <Link
              to="/progress"
              className="group rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-500">
                <CheckCircle2 size={24} />
              </div>

              <h3 className="font-heading mt-5 text-xl font-bold text-gray-800">
                My Progress
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Track your completed tasks and learning progress.
              </p>

              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-purple-500">
                View Progress
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </span>
            </Link>

            <Link
              to="/timer"
              className="group rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-500">
                <Timer size={24} />
              </div>

              <h3 className="font-heading mt-5 text-xl font-bold text-gray-800">
                Focus Timer
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Start a focused Japanese study session.
              </p>

              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-500">
                Start Timer
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </span>
            </Link>
          </div>
        </section>

        {/* ================= MOTIVATION ================= */}

        <section className="mb-8 rounded-[2rem] bg-gradient-to-br from-pink-100 via-purple-50 to-blue-50 p-8 text-center">
          <div className="text-4xl">🌸 ✨ 🌱</div>

          <h2 className="font-heading mt-4 text-2xl font-bold text-gray-800">
            一歩ずつ、頑張ろう！
          </h2>

          <p className="mt-2 text-gray-500">
            One step at a time. Keep going with your Japanese journey! 💕
          </p>
        </section>
      </div>
    </main>
  );
}

/* ============================================================
   SUBJECT CARD
============================================================ */

type SubjectCardProps = {
  emoji: string;
  title: string;
  description: string;
  background: string;
  iconBackground: string;
  textColor: string;
};

function SubjectCard({
  emoji,
  title,
  description,
  background,
  iconBackground,
  textColor,
}: SubjectCardProps) {
  return (
    <div
      className={`rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-sm ${background}`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${iconBackground}`}
      >
        {emoji}
      </div>

      <h3 className="font-heading mt-4 font-bold text-gray-800">{title}</h3>

      <p className={`mt-1 text-xs font-semibold ${textColor}`}>{description}</p>
    </div>
  );
}

/* ============================================================
   VALID COMPLETED TASKS
============================================================ */

function getCompletedTasksForDay(
  progress: Record<string, string[]>,
  dayNumber: number,
  totalActiveTasks: number,
): number {
  const completed = progress[String(dayNumber)] ?? [];

  return Math.min(completed.length, totalActiveTasks);
}

/* ============================================================
   GET CURRENT DAY
============================================================ */

function getCurrentDay(progress: Record<string, string[]>): number {
  for (const day of studyPlan) {
    if (day.is_rest_day) {
      continue;
    }

    const totalTasks = [
      day.kanji,
      day.goi,
      day.grammar,
      day.reading,
      day.listening,
    ].filter(Boolean).length;

    const completedTasks = getCompletedTasksForDay(
      progress,
      day.day,
      totalTasks,
    );

    if (completedTasks < totalTasks) {
      return day.day;
    }
  }

  return studyPlan[studyPlan.length - 1]?.day ?? 1;
}

/* ============================================================
   STUDY STREAK
============================================================ */

function calculateStreak(progress: Record<string, string[]>): number {
  let streak = 0;

  for (const day of studyPlan) {
    if (day.is_rest_day) {
      continue;
    }

    const totalTasks = [
      day.kanji,
      day.goi,
      day.grammar,
      day.reading,
      day.listening,
    ].filter(Boolean).length;

    const completedTasks = getCompletedTasksForDay(
      progress,
      day.day,
      totalTasks,
    );

    if (totalTasks > 0 && completedTasks >= totalTasks) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/* ============================================================
   IMPORT HELPER
============================================================ */




export default Home;
