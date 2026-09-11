import { useCallback, useEffect, useState, type ReactNode } from "react";

import { supabase } from "../../lib/supabase";
import { useAuth } from "./useAuth";
import { ProfileContext } from "./ProfileContext";

export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  jlpt_level: "N5" | "N4" | "N3" | "N2" | "N1";
  daily_goal: number;
  language: "English" | "Myanmar";
  appearance: "system" | "light" | "dark";
  study_reminders: boolean;
  sakura_ai_enabled: boolean;
  created_at: string;
  updated_at: string;
};

type ProfileProviderProps = {
  children: ReactNode;
};

export function ProfileProvider({ children }: ProfileProviderProps) {
  const { user, loading: authLoading } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  /**
   * Load the current user's profile from Supabase.
   *
   * If the profile doesn't exist, create it automatically.
   */
  const loadProfile = useCallback(async () => {
    // No logged-in user
    if (!user) {
      setProfile(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Get profile
    const { data, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    // Profile loading error
    if (profileError) {
      console.error("Error loading profile:", profileError.message);

      setError(profileError.message);
      setProfile(null);
      setLoading(false);

      return;
    }

    // Profile already exists
    if (data) {
      setProfile(data as Profile);
      setError(null);
      setLoading(false);

      return;
    }

    /**
     * Profile doesn't exist.
     *
     * This can happen for users who were created before
     * the profiles table/trigger was added.
     */
    const fallbackName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Learner";

    const { data: newProfile, error: createError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        full_name: fallbackName,
      })
      .select()
      .single();

    // Profile creation error
    if (createError) {
      console.error("Error creating profile:", createError.message);

      setError(createError.message);
      setProfile(null);
      setLoading(false);

      return;
    }

    // Profile created successfully
    setProfile(newProfile as Profile);
    setError(null);
    setLoading(false);
  }, [user]);

  /**
   * Load profile whenever authentication finishes
   * or the logged-in user changes.
   */
  useEffect(() => {
    if (authLoading) {
      return;
    }

    let cancelled = false;

    async function run() {
      if (cancelled) {
        return;
      }

      await loadProfile();
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [authLoading, loadProfile]);

  /**
   * Manually refresh the profile.
   */
  const refreshProfile = useCallback(async () => {
    setLoading(true);

    await loadProfile();
  }, [loadProfile]);

  /**
   * Update the user's profile in Supabase.
   */
  async function updateProfile(
    updates: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>,
  ) {
    // User isn't logged in
    if (!user) {
      return {
        error: new Error("You must be logged in."),
      };
    }

    setError(null);

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id)
      .select()
      .single();

    // Update failed
    if (updateError) {
      console.error("Error updating profile:", updateError.message);

      setError(updateError.message);

      return {
        error: new Error(updateError.message),
      };
    }

    // Update local state immediately
    setProfile(data as Profile);

    return {
      error: null,
    };
  }

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        refreshProfile,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
