import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Headphones,
  Languages,
  NotebookPen,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";

import { studyPlan } from "../../data/studyPlan";

import {
  getCompletedTasks,
  toggleTask,
  type TaskKey,
} from "../../utils/progress";

function StudyDay() {
  const { day } = useParams<{ day: string }>();
  const navigate = useNavigate();

  const dayNumber = Number(day);

  const studyDay = studyPlan.find((item) => item.day === dayNumber);

  const [completedTasks, setCompletedTasks] = useState<TaskKey[]>(() =>
    getCompletedTasks(dayNumber),
  );

  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

  const [showAppreciation, setShowAppreciation] = useState(false);

  if (!studyDay) {
    return (
      <main className="min-h-screen bg-pink-50 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-[2rem] bg-white p-10 text-center shadow-sm">
          <div className="text-6xl">🥺</div>

          <h1 className="mt-5 text-3xl font-bold text-gray-800">
            Study Day Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            Day {day} does not exist in your study plan.
          </p>

          <Link
            to="/study-plan"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600"
          >
            <ArrowLeft size={18} />
            Back to Study Plan
          </Link>
        </div>
      </main>
    );
  }

  const taskDefinitions: {
    key: TaskKey;
    title: string;
    value: string | null;
    emoji: string;
    icon: typeof BookOpen;
    background: string;
    iconBackground: string;
    textColor: string;
  }[] = [
    {
      key: "kanji",
      title: "Kanji",
      value: studyDay.kanji,
      emoji: "🈷️",
      icon: BookOpen,
      background: "bg-purple-50",
      iconBackground: "bg-purple-100",
      textColor: "text-purple-500",
    },
    {
      key: "goi",
      title: "Vocabulary",
      value: studyDay.goi,
      emoji: "📚",
      icon: Languages,
      background: "bg-blue-50",
      iconBackground: "bg-blue-100",
      textColor: "text-blue-500",
    },
    {
      key: "grammar",
      title: "Grammar",
      value: studyDay.grammar,
      emoji: "📝",
      icon: NotebookPen,
      background: "bg-pink-50",
      iconBackground: "bg-pink-100",
      textColor: "text-pink-500",
    },
    {
      key: "reading",
      title: "Reading",
      value: studyDay.reading,
      emoji: "📖",
      icon: BookOpen,
      background: "bg-yellow-50",
      iconBackground: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      key: "listening",
      title: "Listening",
      value: studyDay.listening,
      emoji: "🎧",
      icon: Headphones,
      background: "bg-green-50",
      iconBackground: "bg-green-100",
      textColor: "text-green-500",
    },
  ];

  const activeTasks = taskDefinitions.filter((task) => task.value);

  const completedCount = activeTasks.filter((task) =>
    completedTasks.includes(task.key),
  ).length;

  const totalTasks = activeTasks.length;

  const percentage =
    totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  /*
   * Find the next active study day.
   *
   * Rest days are skipped.
   */
  const nextStudyDay = studyPlan.find(
    (item) => item.day > studyDay.day && !item.is_rest_day,
  );

  /*
   * Check whether this is the final study day.
   */
  

  function handleToggleTask(task: TaskKey) {
    const wasCompleted = completedTasks.includes(task);

    const updatedProgress = toggleTask(dayNumber, task);

    const updatedTasks = updatedProgress[String(dayNumber)] ?? [];

    setCompletedTasks(updatedTasks);

    /*
     * Only show the completion popup when:
     *
     * 1. User is completing a task, not unchecking it.
     * 2. All tasks for the current day are now complete.
     * 3. The popup hasn't already been shown.
     */
    const newCompletedCount = activeTasks.filter((item) =>
      updatedTasks.includes(item.key),
    ).length;

    const dayIsNowComplete = totalTasks > 0 && newCompletedCount === totalTasks;

    if (!wasCompleted && dayIsNowComplete) {
      setShowCompletionPopup(true);
    }
  }

  function handleContinue() {
    setShowCompletionPopup(false);

    if (nextStudyDay) {
      navigate(`/study-plan/${nextStudyDay.day}`);
    } else {
      setShowAppreciation(true);
    }
  }

  function handleNotNow() {
    setShowCompletionPopup(false);
    setShowAppreciation(true);
  }

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}

        <Link
          to="/study-plan"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-pink-500"
        >
          <ArrowLeft size={18} />
          Back to Study Plan
        </Link>

        {/* Main Card */}

        <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-10">
          {/* Header */}

          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 text-4xl">
              🌸
            </div>

            <p className="mt-5 text-lg font-semibold text-pink-400">
              Your Daily Mission
            </p>

            <h1 className="mt-1 text-4xl font-bold text-gray-800 md:text-5xl">
              Day {studyDay.day}
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-gray-500">
              Complete your Japanese study tasks today and keep your journey
              moving forward. ✨
            </p>
          </div>

          {/* Rest Day */}

          {studyDay.is_rest_day ? (
            <div className="mt-8 rounded-3xl bg-purple-50 p-8 text-center">
              <div className="text-6xl">🌙</div>

              <h2 className="mt-4 text-2xl font-bold text-purple-600">
                Rest & Review Day
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-gray-600">
                {studyDay.note ||
                  "Take a break and review what you have learned. 🌸"}
              </p>
            </div>
          ) : (
            <>
              {/* Progress */}

              {totalTasks > 0 && (
                <div className="mt-8 rounded-3xl bg-pink-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-800">
                        Today's Progress
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {completedCount} of {totalTasks} tasks completed
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-pink-500">
                        {percentage}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-pink-400 transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Tasks */}

              <div className="mt-8 space-y-4">
                {activeTasks.map((task) => {
                  const Icon = task.icon;

                  const isCompleted = completedTasks.includes(task.key);

                  return (
                    <button
                      key={task.key}
                      type="button"
                      onClick={() => handleToggleTask(task.key)}
                      className={`flex w-full items-center gap-4 rounded-3xl p-5 text-left transition duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                        isCompleted
                          ? "bg-green-50 ring-2 ring-green-200"
                          : task.background
                      }`}
                    >
                      {/* Icon */}

                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                          isCompleted
                            ? "bg-green-100 text-green-500"
                            : `${task.iconBackground} ${task.textColor}`
                        }`}
                      >
                        {isCompleted ? <Check size={26} /> : <Icon size={26} />}
                      </div>

                      {/* Content */}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{task.emoji}</span>

                          <p
                            className={`font-bold ${
                              isCompleted ? "text-green-600" : "text-gray-800"
                            }`}
                          >
                            {task.title}
                          </p>
                        </div>

                        <p
                          className={`mt-1 text-sm ${
                            isCompleted
                              ? "text-green-600 line-through"
                              : "text-gray-600"
                          }`}
                        >
                          {task.value}
                        </p>
                      </div>

                      {/* Checkbox */}

                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${
                          isCompleted
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {isCompleted && <Check size={18} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Note */}

              {studyDay.note && (
                <div className="mt-6 rounded-3xl bg-yellow-50 p-5">
                  <p className="font-semibold text-yellow-700">📝 Note</p>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {studyDay.note}
                  </p>
                </div>
              )}

              {/* Completed Message */}

              {totalTasks > 0 && percentage === 100 && (
                <div className="mt-6 flex items-center gap-4 rounded-3xl bg-green-50 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500">
                    <CheckCircle2 size={26} />
                  </div>

                  <div>
                    <p className="font-bold text-green-600">
                      Day {studyDay.day} completed! 🎉
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Amazing work! You completed today's mission. 🌸
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Previous / Next */}

        <div className="mt-6 flex items-center justify-between">
          {studyDay.day > 1 ? (
            <Link
              to={`/study-plan/${studyDay.day - 1}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50"
            >
              <ArrowLeft size={17} />
              Previous
            </Link>
          ) : (
            <div />
          )}

          {studyDay.day < studyPlan.length ? (
            <Link
              to={`/study-plan/${studyDay.day + 1}`}
              className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-600"
            >
              Next
              <ArrowRight size={17} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* =====================================================
          COMPLETION POPUP
      ====================================================== */}

      {showCompletionPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-[2rem] bg-white p-7 text-center shadow-2xl md:p-9">
            {/* Close */}

            <button
              type="button"
              onClick={handleNotNow}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition hover:bg-gray-200 hover:text-gray-600"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Celebration */}

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 text-4xl">
              🎉
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-pink-400">
              <Sparkles size={18} />
              <span className="font-bold">Amazing work!</span>
              <Sparkles size={18} />
            </div>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-800">
              Day {studyDay.day} Complete! 🌸
            </h2>

            <p className="mt-3 leading-7 text-gray-500">
              You finished all {totalTasks} tasks for today. You should be proud
              of yourself! 💕
            </p>

            {nextStudyDay ? (
              <>
                <div className="mt-6 rounded-3xl bg-pink-50 p-5">
                  <p className="text-sm font-semibold text-pink-400">
                    What's next?
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-800">
                    Day {nextStudyDay.day} Mission 🌱
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Ready to keep your Japanese journey going?
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-500 px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-pink-600 hover:shadow-md"
                  >
                    Continue Learning
                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={handleNotNow}
                    className="rounded-full bg-gray-100 px-6 py-3.5 font-bold text-gray-600 transition hover:bg-gray-200"
                  >
                    Not Now
                  </button>
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={handleContinue}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-pink-500 px-6 py-3.5 font-bold text-white transition hover:bg-pink-600"
              >
                <Trophy size={18} />
                Finish Journey
              </button>
            )}
          </div>
        </div>
      )}

      {/* =====================================================
          APPRECIATION POPUP
      ====================================================== */}

      {showAppreciation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setShowAppreciation(false)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition hover:bg-gray-200"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="text-6xl">🌸</div>

            <h2 className="mt-5 text-3xl font-extrabold text-gray-800">
              You Did Amazing! 💕
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              You completed Day {studyDay.day}. Take a moment to be proud of
              yourself. Every small step brings you closer to your Japanese
              goal! ✨
            </p>

            <div className="mt-6 rounded-3xl bg-purple-50 p-5">
              <p className="font-bold text-purple-600">
                一歩ずつ、頑張ろう！ 🌱
              </p>

              <p className="mt-1 text-sm text-gray-500">
                One step at a time. You're doing great!
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAppreciation(false)}
              className="mt-6 w-full rounded-full bg-pink-500 px-6 py-3.5 font-bold text-white transition hover:bg-pink-600"
            >
              I'm Proud of Myself 🌸
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default StudyDay;
