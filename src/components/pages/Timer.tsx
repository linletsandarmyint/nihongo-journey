
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Headphones,
  Languages,
  NotebookPen,
  Pause,
  Play,
  RotateCcw,
  Timer as TimerIcon,
  Volume2,
  VolumeX,
} from "lucide-react";

import { studyPlan } from "../../data/studyPlan";

type Category = "kanji" | "goi" | "grammar" | "reading" | "listening";

type CategoryInfo = {
  key: Category;
  label: string;
  emoji: string;
  icon: typeof BookOpen;
  color: string;
  background: string;
};

const categories: CategoryInfo[] = [
  {
    key: "kanji",
    label: "Kanji",
    emoji: "🈷️",
    icon: BookOpen,
    color: "text-purple-500",
    background: "bg-purple-50",
  },
  {
    key: "goi",
    label: "Vocabulary",
    emoji: "📚",
    icon: Languages,
    color: "text-blue-500",
    background: "bg-blue-50",
  },
  {
    key: "grammar",
    label: "Grammar",
    emoji: "📝",
    icon: NotebookPen,
    color: "text-pink-500",
    background: "bg-pink-50",
  },
  {
    key: "reading",
    label: "Reading",
    emoji: "📖",
    icon: BookOpen,
    color: "text-yellow-600",
    background: "bg-yellow-50",
  },
  {
    key: "listening",
    label: "Listening",
    emoji: "🎧",
    icon: Headphones,
    color: "text-green-500",
    background: "bg-green-50",
  },
];

type MusicTrack = {
  name: string;
  file: string;
  emoji: string;
};

const musicTracks: MusicTrack[] = [
  {
    name: "Japanese Lofi",
    file: "/music/japanese-lofi.mp3",
    emoji: "🎵",
  },
  {
    name: "Piano",
    file: "/music/piano.mp3",
    emoji: "🎹",
  },
  {
    name: "Rain",
    file: "/music/rain.mp3",
    emoji: "🌧️",
  },
  {
    name: "Nature",
    file: "/music/nature.mp3",
    emoji: "🌿",
  },
];

function Timer() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("kanji");

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  /*
   * Music state
   */
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  /*
   * Keep the audio element in a ref so we don't
   * recreate it unnecessarily.
   */
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /*
   * Find the selected day from studyPlan.
   */
  const currentStudyDay = useMemo(() => {
    return studyPlan.find((day) => day.day === selectedDay);
  }, [selectedDay]);

  /*
   * Get the task for the selected category.
   */
  const currentTask = useMemo(() => {
    if (!currentStudyDay) {
      return null;
    }

    return currentStudyDay[selectedCategory];
  }, [currentStudyDay, selectedCategory]);

  /*
   * Get information about the selected category.
   */
  const currentCategory = useMemo(() => {
    return categories.find(
      (category) => category.key === selectedCategory,
    );
  }, [selectedCategory]);

  /*
   * Timer countdown.
   */
  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const timer = window.setInterval(() => {
      setSeconds((currentSeconds) => {
        if (currentSeconds > 0) {
          return currentSeconds - 1;
        }

        setMinutes((currentMinutes) => {
          if (currentMinutes > 0) {
            return currentMinutes - 1;
          }

          /*
           * Timer finished.
           * Stop timer and music.
           */
          setIsRunning(false);

          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }

          setIsMusicPlaying(false);

          return 0;
        });

        return 59;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [isRunning]);

  /*
   * Cleanup audio when component is unmounted.
   */
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  /*
   * Keep audio volume synchronized.
   */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : musicVolume;
    }
  }, [musicVolume, isMuted]);

  /*
   * Reset timer.
   */
  function resetTimer() {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
  }

  /*
   * Start / pause timer.
   */
  function toggleTimer() {
    if (minutes === 0 && seconds === 0) {
      return;
    }

    setIsRunning((current) => !current);
  }

  /*
   * Change study day.
   */
  function handleDayChange(day: number) {
    setIsRunning(false);
    setSelectedDay(day);
  }

  /*
   * Change study category.
   */
  function handleCategoryChange(category: Category) {
    setIsRunning(false);
    setSelectedCategory(category);
  }

  /*
   * Set timer preset.
   */
  function setPreset(time: number) {
    setIsRunning(false);
    setMinutes(time);
    setSeconds(0);
  }

  /*
   * Play or pause music.
   */
  async function toggleMusic(track: MusicTrack) {
    /*
     * If clicking the currently selected track,
     * simply play/pause it.
     */
    if (
      selectedMusic === track.file &&
      audioRef.current
    ) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsMusicPlaying(true);
        } catch (error) {
          console.error("Unable to play music:", error);
        }
      }

      return;
    }

    /*
     * Stop currently playing music.
     */
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    /*
     * Create new audio.
     */
    const newAudio = new Audio(track.file);

    newAudio.loop = true;
    newAudio.volume = isMuted ? 0 : musicVolume;

    /*
     * Handle unexpected audio errors.
     */
    newAudio.addEventListener("error", () => {
      console.error(
        `Unable to load music file: ${track.file}`,
      );

      setIsMusicPlaying(false);
    });

    try {
      await newAudio.play();

      audioRef.current = newAudio;
      setSelectedMusic(track.file);
      setIsMusicPlaying(true);
    } catch (error) {
      console.error("Unable to play music:", error);

      audioRef.current = newAudio;
      setSelectedMusic(track.file);
      setIsMusicPlaying(false);
    }
  }

  /*
   * Stop music completely.
   */
  function stopMusic() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setSelectedMusic(null);
    setIsMusicPlaying(false);
  }

  /*
   * Change music volume.
   */
  function handleVolumeChange(value: number) {
    setMusicVolume(value);

    if (value === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }

    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  }

  /*
   * Mute / unmute music.
   */
  function toggleMute() {
    if (!audioRef.current) {
      setIsMuted((current) => !current);
      return;
    }

    if (isMuted) {
      audioRef.current.volume = musicVolume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  }

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  const taskExists = Boolean(currentTask);

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <section className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
            <TimerIcon size={30} />
          </div>

          <p className="mt-4 text-sm font-bold uppercase tracking-widest text-pink-400">
            Focus Time
          </p>

          <h1 className="font-heading mt-2 text-4xl font-extrabold text-gray-800 md:text-5xl">
            Study Timer 🌸
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-gray-500">
            Focus on one Japanese task at a time and make today's learning
            count. ✨
          </p>
        </section>

        {/* Timer Card */}
        <section className="rounded-[2rem] bg-white p-6 shadow-sm md:p-10">

          {/* Study Selection */}
          <div className="rounded-3xl bg-pink-50 p-5 md:p-6">
            <div className="mb-5">
              <p className="text-sm font-bold uppercase tracking-wider text-pink-400">
                What are you working on?
              </p>

              <h2 className="font-heading mt-1 text-xl font-bold text-gray-800">
                Choose your study task 🌱
              </h2>
            </div>

            {/* Day Selection */}
            <div>
              <label
                htmlFor="study-day"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Study Day
              </label>

              <select
                id="study-day"
                value={selectedDay}
                onChange={(event) =>
                  handleDayChange(Number(event.target.value))
                }
                className="w-full rounded-2xl border border-pink-100 bg-white px-4 py-3 text-sm font-semibold text-gray-700 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              >
                {studyPlan.map((day) => (
                  <option key={day.day} value={day.day}>
                    Day {day.day}
                    {day.is_rest_day ? " — Rest & Review 🌙" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="mt-5">
              <p className="mb-3 text-sm font-semibold text-gray-700">
                Category
              </p>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isSelected =
                    selectedCategory === category.key;

                  const hasTask = Boolean(
                    currentStudyDay?.[category.key],
                  );

                  return (
                    <button
                      key={category.key}
                      type="button"
                      onClick={() =>
                        handleCategoryChange(category.key)
                      }
                      className={`relative rounded-2xl p-3 text-center transition duration-200 ${
                        isSelected
                          ? "bg-white shadow-md ring-2 ring-pink-300"
                          : "bg-white/70 hover:bg-white hover:shadow-sm"
                      }`}
                    >
                      <div
                        className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${
                          category.background
                        } ${category.color}`}
                      >
                        <Icon size={20} />
                      </div>

                      <span className="mt-2 block text-xs font-bold text-gray-700">
                        {category.label}
                      </span>

                      {hasTask && (
                        <span className="absolute right-2 top-2 text-xs">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Task */}
            <div className="mt-5">
              {taskExists ? (
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">
                      {currentCategory?.emoji}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Day {selectedDay} ·{" "}
                        {currentCategory?.label}
                      </p>

                      <p className="mt-1 font-semibold leading-6 text-gray-700">
                        {currentTask}
                      </p>
                    </div>

                    <CheckCircle2
                      size={20}
                      className="shrink-0 text-pink-400"
                    />
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                  <div className="text-2xl">🌱</div>

                  <p className="mt-2 font-semibold text-gray-700">
                    No{" "}
                    {currentCategory?.label.toLowerCase()} task planned
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    There is no{" "}
                    {currentCategory?.label.toLowerCase()} task for
                    Day {selectedDay}.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Timer Circle */}
          <div className="mt-8 flex justify-center">
            <div className="flex h-72 w-72 items-center justify-center rounded-full bg-pink-50 ring-8 ring-pink-100 md:h-80 md:w-80">
              <div className="flex h-60 w-60 flex-col items-center justify-center rounded-full bg-white shadow-sm md:h-68 md:w-68">
                <span className="text-sm font-semibold text-gray-400">
                  {isRunning ? "Focus..." : "Ready?"}
                </span>

                <p className="mt-2 font-mono text-6xl font-bold tracking-tight text-gray-800 md:text-7xl">
                  {formattedMinutes}:{formattedSeconds}
                </p>

                <span className="mt-2 text-sm text-pink-400">
                  {isRunning
                    ? "Keep going 🌱"
                    : "You can do it! 🌸"}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={toggleTimer}
              disabled={!taskExists}
              className={`flex items-center gap-2 rounded-full px-7 py-3 font-bold text-white shadow-sm transition ${
                taskExists
                  ? "bg-pink-500 hover:bg-pink-600 hover:shadow-md"
                  : "cursor-not-allowed bg-gray-300"
              }`}
            >
              {isRunning ? (
                <>
                  <Pause size={19} />
                  Pause
                </>
              ) : (
                <>
                  <Play size={19} />
                  Start
                </>
              )}
            </button>

            <button
              type="button"
              onClick={resetTimer}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
              aria-label="Reset timer"
            >
              <RotateCcw size={19} />
            </button>
          </div>

          {/* Presets */}
          <div className="mt-10">
            <p className="mb-3 text-center text-sm font-bold text-gray-700">
              Choose study time
            </p>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPreset(15)}
                className={`rounded-2xl px-3 py-4 text-center transition hover:-translate-y-0.5 hover:shadow-sm ${
                  minutes === 15 && seconds === 0
                    ? "bg-purple-100 ring-2 ring-purple-200"
                    : "bg-purple-50"
                }`}
              >
                <span className="block text-lg">🌱</span>

                <span className="mt-1 block text-sm font-bold text-purple-500">
                  15 min
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPreset(25)}
                className={`rounded-2xl px-3 py-4 text-center transition hover:-translate-y-0.5 hover:shadow-sm ${
                  minutes === 25 && seconds === 0
                    ? "bg-pink-100 ring-2 ring-pink-200"
                    : "bg-pink-50"
                }`}
              >
                <span className="block text-lg">🌸</span>

                <span className="mt-1 block text-sm font-bold text-pink-500">
                  25 min
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPreset(50)}
                className={`rounded-2xl px-3 py-4 text-center transition hover:-translate-y-0.5 hover:shadow-sm ${
                  minutes === 50 && seconds === 0
                    ? "bg-blue-100 ring-2 ring-blue-200"
                    : "bg-blue-50"
                }`}
              >
                <span className="block text-lg">✨</span>

                <span className="mt-1 block text-sm font-bold text-blue-500">
                  50 min
                </span>
              </button>
            </div>
          </div>

          {/* =====================================================
              STUDY MUSIC
              ===================================================== */}
          <div className="mt-8 rounded-3xl bg-purple-50 p-5 md:p-6">

            {/* Music Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-purple-400">
                  Study Sounds
                </p>

                <h2 className="font-heading mt-1 text-xl font-bold text-gray-800">
                  Create your study atmosphere 🎧
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Choose a relaxing sound while you focus.
                </p>
              </div>

              {isMusicPlaying && (
                <button
                  type="button"
                  onClick={stopMusic}
                  className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-500 shadow-sm transition hover:bg-gray-100"
                >
                  Stop
                </button>
              )}
            </div>

            {/* Music Options */}
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {musicTracks.map((track) => {
                const isSelected =
                  selectedMusic === track.file;

                return (
                  <button
                    key={track.file}
                    type="button"
                    onClick={() => toggleMusic(track)}
                    className={`relative rounded-2xl p-4 text-center transition duration-200 ${
                      isSelected
                        ? "bg-white shadow-md ring-2 ring-purple-300"
                        : "bg-white/70 hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    {/* Currently Playing Indicator */}
                    {isSelected && isMusicPlaying && (
                      <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-purple-400" />
                    )}

                    <div className="text-2xl">
                      {track.emoji}
                    </div>

                    <p className="mt-2 text-sm font-bold text-gray-700">
                      {track.name}
                    </p>

                    <div className="mt-2 flex items-center justify-center gap-1 text-xs text-purple-400">
                      {isSelected && isMusicPlaying ? (
                        <>
                          <Pause size={13} />
                          Playing
                        </>
                      ) : (
                        <>
                          <Play size={13} />
                          Play
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Volume */}
            <div className="mt-5 rounded-2xl bg-white p-4">
              <div className="flex items-center justify-between gap-4">

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 text-purple-500 transition hover:bg-purple-100"
                    aria-label={
                      isMuted
                        ? "Unmute music"
                        : "Mute music"
                    }
                  >
                    {isMuted ? (
                      <VolumeX size={18} />
                    ) : (
                      <Volume2 size={18} />
                    )}
                  </button>

                  <span className="text-sm font-semibold text-gray-700">
                    Volume
                  </span>
                </div>

                <span className="text-xs font-bold text-purple-400">
                  {isMuted
                    ? "Muted"
                    : `${Math.round(musicVolume * 100)}%`}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : musicVolume}
                onChange={(event) =>
                  handleVolumeChange(
                    Number(event.target.value),
                  )
                }
                className="mt-3 w-full accent-purple-500"
                aria-label="Music volume"
              />
            </div>

            {/* Current Music */}
            {selectedMusic && (
              <div className="mt-4 rounded-2xl bg-white/70 px-4 py-3">
                <p className="text-center text-xs font-semibold text-purple-400">
                  {isMusicPlaying
                    ? "🎶 Now playing"
                    : "⏸️ Music paused"}
                </p>

                <p className="mt-1 text-center text-sm font-bold text-gray-700">
                  {
                    musicTracks.find(
                      (track) =>
                        track.file === selectedMusic,
                    )?.emoji
                  }{" "}
                  {
                    musicTracks.find(
                      (track) =>
                        track.file === selectedMusic,
                    )?.name
                  }
                </p>
              </div>
            )}
          </div>

          {/* Current Session */}
          {taskExists && (
            <div className="mt-8 rounded-3xl bg-green-50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-500">
                  <CheckCircle2 size={21} />
                </div>

                <div>
                  <p className="font-bold text-green-600">
                    Today's focus
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Day {selectedDay} ·{" "}
                    {currentCategory?.label}
                  </p>

                  <p className="text-sm font-semibold leading-6 text-gray-700">
                    {currentTask}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tip */}
          <div className="mt-8 rounded-3xl bg-yellow-50 p-5">
            <p className="font-bold text-yellow-700">
              💡 Study Tip
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Put your phone away, choose one task, and focus until
              the timer ends. Small focused sessions are better than
              studying without a plan. 🌷
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Timer;
