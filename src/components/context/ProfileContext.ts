import { createContext } from "react";

import type { Profile } from "./ProfileProvider";

export type ProfileContextType = {
  profile: Profile | null;
  loading: boolean;
  error: string | null;

  refreshProfile: () => Promise<void>;

  updateProfile: (
    updates: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>,
  ) => Promise<{
    error: Error | null;
  }>;
};

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined,
);
