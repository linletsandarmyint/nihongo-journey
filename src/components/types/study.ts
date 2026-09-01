export interface StudyDay {
  day: number;
  kanji: string | null;
  goi: string | null;
  grammar: string | null;
  reading: string | null;
  listening: string | null;
  is_rest_day: boolean;
  note: string | null;
}

export type StudySubject =
  | "kanji"
  | "goi"
  | "grammar"
  | "reading"
  | "listening";

export interface TaskProgress {
  completed: boolean;
  completedAt?: string;
}

export interface DayProgress {
  day: number;
  tasks: {
    kanji?: TaskProgress;
    goi?: TaskProgress;
    grammar?: TaskProgress;
    reading?: TaskProgress;
    listening?: TaskProgress;
  };
  note?: string;
}
