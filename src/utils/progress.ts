export type TaskKey = "kanji" | "goi" | "grammar" | "reading" | "listening";

export type ProgressData = Record<string, TaskKey[]>;

const STORAGE_KEY = "nihongo-progress";

// Get all progress
export function getProgress(): ProgressData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {};
    }

    const data: unknown = JSON.parse(saved);

    if (typeof data !== "object" || data === null || Array.isArray(data)) {
      return {};
    }

    return data as ProgressData;
  } catch {
    return {};
  }
}

// Get completed tasks for one day
export function getCompletedTasks(day: number): TaskKey[] {
  const progress = getProgress();

  const tasks = progress[String(day)];

  if (!Array.isArray(tasks)) {
    return [];
  }

  return tasks;
}

// Save a task
export function saveProgress(day: number, task: TaskKey): TaskKey[] {
  const progress = getProgress();
  const dayKey = String(day);

  if (!progress[dayKey]) {
    progress[dayKey] = [];
  }

  if (!progress[dayKey].includes(task)) {
    progress[dayKey].push(task);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

  return progress[dayKey];
}

// Remove a task
export function removeProgress(day: number, task: TaskKey): TaskKey[] {
  const progress = getProgress();
  const dayKey = String(day);

  if (!progress[dayKey]) {
    return [];
  }

  progress[dayKey] = progress[dayKey].filter((item) => item !== task);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

  return progress[dayKey];
}

// Toggle task
export function toggleTask(day: number, task: TaskKey): ProgressData {
  const progress = getProgress();
  const dayKey = String(day);

  if (!progress[dayKey]) {
    progress[dayKey] = [];
  }

  const alreadyCompleted = progress[dayKey].includes(task);

  if (alreadyCompleted) {
    progress[dayKey] = progress[dayKey].filter((item) => item !== task);
  } else {
    progress[dayKey].push(task);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

  return progress;
}

// Toggle task - alternative function name
export function toggleProgress(day: number, task: TaskKey): TaskKey[] {
  const progress = toggleTask(day, task);

  return progress[String(day)] ?? [];
}

// Clear one day's progress
export function clearDayProgress(day: number): void {
  const progress = getProgress();

  delete progress[String(day)];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// Clear ALL progress
export function clearAllProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}
export function getNextIncompleteDay(
  studyPlan: {
    day: number;
    is_rest_day?: boolean;
    kanji?: string | null;
    goi?: string | null;
    grammar?: string | null;
    reading?: string | null;
    listening?: string | null;
  }[],
): number | null {
  for (const day of studyPlan) {
    if (day.is_rest_day) {
      continue;
    }

    const tasks = [
      day.kanji,
      day.goi,
      day.grammar,
      day.reading,
      day.listening,
    ].filter(Boolean);

    if (tasks.length === 0) {
      continue;
    }

    const completed = getCompletedTasks(day.day);

    if (completed.length < tasks.length) {
      return day.day;
    }
  }

  return null;
}