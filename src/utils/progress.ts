
import { supabase } from "../lib/supabase";

export type TaskKey =
  | "kanji"
  | "goi"
  | "grammar"
  | "reading"
  | "listening";

export type ProgressData = Record<string, TaskKey[]>;

const STORAGE_KEY = "nihongo-progress";

// ============================================================
// LOCAL STORAGE
// ============================================================

export function getProgress(): ProgressData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {};
    }

    const data: unknown = JSON.parse(saved);

    if (
      typeof data !== "object" ||
      data === null ||
      Array.isArray(data)
    ) {
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

// ============================================================
// SUPABASE SYNC
// ============================================================

async function syncTaskToSupabase(
  day: number,
  task: TaskKey,
  completed: boolean,
) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { error } = await supabase
      .from("task_progress")
      .upsert(
        {
          user_id: user.id,
          day_number: day,
          task_key: task,
          completed,
          completed_at: completed
            ? new Date().toISOString()
            : null,
        },
        {
          onConflict: "user_id,day_number,task_key",
        },
      );

    if (error) {
      console.error(
        "Failed to sync task to Supabase:",
        error.message,
      );
    }
  } catch (error) {
    console.error(
      "Supabase progress sync failed:",
      error,
    );
  }
}

// ============================================================
// SAVE TASK
// ============================================================

export function saveProgress(
  day: number,
  task: TaskKey,
): TaskKey[] {
  const progress = getProgress();
  const dayKey = String(day);

  if (!progress[dayKey]) {
    progress[dayKey] = [];
  }

  if (!progress[dayKey].includes(task)) {
    progress[dayKey].push(task);
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(progress),
  );

  // Sync in background
  void syncTaskToSupabase(day, task, true);

  return progress[dayKey];
}

// ============================================================
// REMOVE TASK
// ============================================================

export function removeProgress(
  day: number,
  task: TaskKey,
): TaskKey[] {
  const progress = getProgress();
  const dayKey = String(day);

  if (!progress[dayKey]) {
    return [];
  }

  progress[dayKey] = progress[dayKey].filter(
    (item) => item !== task,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(progress),
  );

  // Sync in background
  void syncTaskToSupabase(day, task, false);

  return progress[dayKey];
}

// ============================================================
// TOGGLE TASK
// ============================================================

export function toggleTask(
  day: number,
  task: TaskKey,
): ProgressData {
  const progress = getProgress();
  const dayKey = String(day);

  if (!progress[dayKey]) {
    progress[dayKey] = [];
  }

  const alreadyCompleted =
    progress[dayKey].includes(task);

  if (alreadyCompleted) {
    progress[dayKey] = progress[dayKey].filter(
      (item) => item !== task,
    );
  } else {
    progress[dayKey].push(task);
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(progress),
  );

  // Sync in background
  void syncTaskToSupabase(
    day,
    task,
    !alreadyCompleted,
  );

  return progress;
}

// ============================================================
// TOGGLE TASK - ALTERNATIVE NAME
// ============================================================

export function toggleProgress(
  day: number,
  task: TaskKey,
): TaskKey[] {
  const progress = toggleTask(day, task);

  return progress[String(day)] ?? [];
}

// ============================================================
// CLEAR ONE DAY
// ============================================================

export function clearDayProgress(day: number): void {
  const progress = getProgress();

  delete progress[String(day)];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(progress),
  );

  void clearDayProgressFromSupabase(day);
}

async function clearDayProgressFromSupabase(
  day: number,
) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { error } = await supabase
      .from("task_progress")
      .delete()
      .eq("user_id", user.id)
      .eq("day_number", day);

    if (error) {
      console.error(
        "Failed to clear day progress:",
        error.message,
      );
    }
  } catch (error) {
    console.error(
      "Failed to clear day progress:",
      error,
    );
  }
}

// ============================================================
// CLEAR ALL PROGRESS
// ============================================================

export function clearAllProgress(): void {
  localStorage.removeItem(STORAGE_KEY);

  void clearAllProgressFromSupabase();
}

async function clearAllProgressFromSupabase() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { error } = await supabase
      .from("task_progress")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error(
        "Failed to clear Supabase progress:",
        error.message,
      );
    }
  } catch (error) {
    console.error(
      "Failed to clear Supabase progress:",
      error,
    );
  }
}

// ============================================================
// LOAD PROGRESS FROM SUPABASE
// ============================================================

export async function loadProgressFromSupabase(): Promise<ProgressData> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {};
    }

    const { data, error } = await supabase
      .from("task_progress")
      .select(
        "day_number, task_key, completed",
      )
      .eq("user_id", user.id)
      .eq("completed", true);

    if (error) {
      console.error(
        "Failed to load progress from Supabase:",
        error.message,
      );

      return getProgress();
    }

    const progress: ProgressData = {};

    for (const row of data ?? []) {
      const dayKey = String(row.day_number);

      if (!progress[dayKey]) {
        progress[dayKey] = [];
      }

      if (
        !progress[dayKey].includes(
          row.task_key as TaskKey,
        )
      ) {
        progress[dayKey].push(
          row.task_key as TaskKey,
        );
      }
    }

    // Update local cache
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress),
    );

    return progress;
  } catch (error) {
    console.error(
      "Failed to load Supabase progress:",
      error,
    );

    return getProgress();
  }
}

// ============================================================
// GET NEXT INCOMPLETE DAY
// ============================================================

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

