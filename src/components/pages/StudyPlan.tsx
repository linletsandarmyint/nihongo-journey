import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  
  Languages,
  NotebookPen,
  Sparkles,
} from "lucide-react";

import { studyPlan } from "../../data/studyPlan";
import { getCompletedTasks } from "../../utils/progress";

function StudyPlan() {
  return (
    <main className="min-h-screen bg-pink-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <section className="mb-8 rounded-[2rem] bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-500">
                <Sparkles size={16} />
                Nihongo Journey
              </div>

              <h1 className="font-heading text-4xl font-bold text-gray-800 md:text-5xl">
                Your Study Plan 🌸
              </h1>

              <p className="mt-4 max-w-2xl leading-7 text-gray-500">
                Follow your 56-day Japanese learning journey one day at a time.
                Small steps every day lead to big progress. ✨
              </p>
            </div>

            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-pink-100 text-6xl">
              🌸
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
              <CalendarDays size={22} />
            </div>

            <p className="mt-4 text-2xl font-bold text-gray-800">
              {studyPlan.length}
            </p>

            <p className="text-sm text-gray-500">Study Days</p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100 text-purple-500">
              <BookOpen size={22} />
            </div>

            <p className="mt-4 text-2xl font-bold text-gray-800">Kanji</p>

            <p className="text-sm text-gray-500">Kanji Master</p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-500">
              <Languages size={22} />
            </div>

            <p className="mt-4 text-2xl font-bold text-gray-800">Tango</p>

            <p className="text-sm text-gray-500">Vocabulary</p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-500">
              <NotebookPen size={22} />
            </div>

            <p className="mt-4 text-2xl font-bold text-gray-800">Grammar</p>

            <p className="text-sm text-gray-500">Shinkanzen</p>
          </div>
        </section>

        {/* Title */}
        <section className="mb-6">
          <h2 className="font-heading text-2xl font-bold text-gray-800 md:text-3xl">
            56-Day Journey 🌱
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Choose a day to see your tasks and track your progress.
          </p>
        </section>

        {/* Study Day Cards */}
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {studyPlan.map((studyDay) => {
            const completedTasks = getCompletedTasks(studyDay.day);

            const tasks = [
              {
                key: "kanji" as const,
                title: "Kanji",
                value: studyDay.kanji,
                emoji: "🈷️",
                background: "bg-purple-50",
                text: "text-purple-500",
              },
              {
                key: "goi" as const,
                title: "Vocabulary",
                value: studyDay.goi,
                emoji: "📚",
                background: "bg-blue-50",
                text: "text-blue-500",
              },
              {
                key: "grammar" as const,
                title: "Grammar",
                value: studyDay.grammar,
                emoji: "📝",
                background: "bg-pink-50",
                text: "text-pink-500",
              },
              {
                key: "reading" as const,
                title: "Reading",
                value: studyDay.reading,
                emoji: "📖",
                background: "bg-yellow-50",
                text: "text-yellow-600",
              },
              {
                key: "listening" as const,
                title: "Listening",
                value: studyDay.listening,
                emoji: "🎧",
                background: "bg-green-50",
                text: "text-green-500",
              },
            ].filter((task) => task.value);

            const totalTasks = tasks.length;

            const completedCount = tasks.filter((task) =>
              completedTasks.includes(task.key),
            ).length;

            const percentage =
              totalTasks === 0
                ? 0
                : Math.round((completedCount / totalTasks) * 100);

            const isCompleted =
              !studyDay.is_rest_day && totalTasks > 0 && percentage === 100;

            return (
              <Link
                key={studyDay.day}
                to={`/study-plan/${studyDay.day}`}
                className="group block"
              >
                <article className="flex h-full flex-col rounded-[2rem] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-bold ${
                          isCompleted
                            ? "bg-green-100 text-green-500"
                            : studyDay.is_rest_day
                              ? "bg-purple-100 text-purple-500"
                              : "bg-pink-100 text-pink-500"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={23} />
                        ) : (
                          studyDay.day
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Day
                        </p>

                        <h3 className="font-heading text-xl font-bold text-gray-800">
                          Day {studyDay.day}
                        </h3>
                      </div>
                    </div>

                    {studyDay.is_rest_day ? (
                      <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-500">
                        Rest 🌙
                      </span>
                    ) : isCompleted ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                        Done ✓
                      </span>
                    ) : (
                      <ArrowRight
                        size={21}
                        className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-pink-500"
                      />
                    )}
                  </div>

                  {/* Rest Day */}
                  {studyDay.is_rest_day ? (
                    <div className="mt-6 rounded-2xl bg-purple-50 p-5">
                      <div className="text-3xl">🌙</div>

                      <p className="mt-3 font-bold text-purple-600">
                        Review & Rest
                      </p>

                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {studyDay.note}
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Tasks */}
                      <div className="mt-6 flex-1 space-y-3">
                        {tasks.map((task) => {
                          const completed = completedTasks.includes(task.key);

                          return (
                            <div
                              key={task.key}
                              className={`rounded-2xl p-3 ${
                                completed ? "bg-green-50" : task.background
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-lg">{task.emoji}</span>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <p
                                      className={`text-xs font-bold ${
                                        completed ? "text-green-600" : task.text
                                      }`}
                                    >
                                      {task.title}
                                    </p>

                                    {completed && (
                                      <CheckCircle2
                                        size={15}
                                        className="text-green-500"
                                      />
                                    )}
                                  </div>

                                  <p
                                    className={`mt-1 text-sm leading-6 ${
                                      completed
                                        ? "text-green-600 line-through"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    {task.value}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Progress */}
                      <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between text-xs">
                          <span className="text-gray-400">
                            Today's Progress
                          </span>

                          <span className="font-bold text-pink-500">
                            {completedCount} / {totalTasks}
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isCompleted ? "bg-green-400" : "bg-pink-400"
                            }`}
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>

                        <p className="mt-2 text-right text-xs font-semibold text-gray-400">
                          {percentage}%
                        </p>
                      </div>
                    </>
                  )}

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-xs font-medium text-gray-400">
                      {studyDay.is_rest_day
                        ? "Review your previous lessons"
                        : "View today's tasks"}
                    </span>

                    <span
                      className={`text-sm font-bold ${
                        isCompleted ? "text-green-500" : "text-pink-500"
                      }`}
                    >
                      Open Day →
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </section>

        {/* Bottom */}
        <section className="mt-10 rounded-[2rem] bg-white p-7 text-center shadow-sm">
          <div className="text-4xl">🌸 📚 ✨</div>

          <h2 className="mt-3 font-heading text-2xl font-bold text-gray-800">
            Keep going! 頑張って!
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-500">
            One day at a time. Keep studying and your Japanese will get stronger
            every day. 💕
          </p>
        </section>
      </div>
    </main>
  );
}

export default StudyPlan;
