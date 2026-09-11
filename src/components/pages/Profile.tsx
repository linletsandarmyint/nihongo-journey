import { useRef, useState, type ChangeEvent } from "react";

import {
  Camera,
  Check,
  Image as ImageIcon,
  Mail,
  Save,
  UserRound,
  X,
} from "lucide-react";

import { useAuth } from "../context/useAuth";
import { useProfile } from "../context/useProfile";
import { supabase } from "../../lib/supabase";

export default function Profile() {
  const { user } = useAuth();

  const { profile, loading, error, updateProfile } = useProfile();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("");

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [saved, setSaved] = useState(false);

  const [saveError, setSaveError] = useState("");

  const [avatarError, setAvatarError] = useState("");

  /*
   * ---------------------------------------------------------
   * DISPLAY NAME
   * ---------------------------------------------------------
   */

  const displayName =
    name ||
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Learner";

  /*
   * ---------------------------------------------------------
   * AVATAR
   * ---------------------------------------------------------
   */

  const avatarUrl =
    avatarPreview ||
    profile?.avatar_url ||
    `https://api.dicebear.com/9.x/avataaars/svg?seed=${user?.id || "learner"}`;

  /*
   * ---------------------------------------------------------
   * OPEN FILE PICKER
   * ---------------------------------------------------------
   */

  function handleChooseAvatar() {
    fileInputRef.current?.click();
  }

  /*
   * ---------------------------------------------------------
   * SELECT IMAGE
   * ---------------------------------------------------------
   */

  function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setAvatarError("");
    setSaved(false);

    /*
     * Only allow image files.
     */
    if (!file.type.startsWith("image/")) {
      setAvatarError("Please select an image file.");

      event.target.value = "";
      return;
    }

    /*
     * Allow JPG, PNG, WEBP and GIF.
     */
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      setAvatarError("Please use JPG, PNG, WEBP, or GIF.");

      event.target.value = "";
      return;
    }

    /*
     * Maximum 5 MB.
     */
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setAvatarError("Image must be smaller than 5 MB.");

      event.target.value = "";
      return;
    }

    /*
     * Create temporary preview.
     */
    const previewUrl = URL.createObjectURL(file);

    setAvatarPreview(previewUrl);
    setSelectedFile(file);
  }

  /*
   * ---------------------------------------------------------
   * REMOVE SELECTED IMAGE
   * ---------------------------------------------------------
   */

  function handleRemoveSelectedAvatar() {
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarPreview(null);
    setSelectedFile(null);
    setAvatarError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  /*
   * ---------------------------------------------------------
   * UPLOAD AVATAR TO SUPABASE STORAGE
   * ---------------------------------------------------------
   */

  async function uploadAvatar(file: File): Promise<string | null> {
    if (!user) {
      setAvatarError("You must be logged in to upload an avatar.");

      return null;
    }

    setUploadingAvatar(true);
    setAvatarError("");

    /*
     * Get file extension.
     */
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";

    /*
     * Create a unique file name.
     *
     * Example:
     *
     * avatars/
     *   USER_ID/
     *     profile-1726123456789.jpg
     */
    const filePath = `${user.id}/profile-${Date.now()}.${extension}`;

    /*
     * Upload file.
     */
    const { data, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Avatar upload error:", uploadError);

      setAvatarError(
        uploadError.message || "Failed to upload profile picture.",
      );

      setUploadingAvatar(false);

      return null;
    }

    /*
     * Get public URL.
     */
    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(data.path);

    const publicUrl = publicUrlData.publicUrl;

    setUploadingAvatar(false);

    return publicUrl;
  }

  /*
   * ---------------------------------------------------------
   * SAVE PROFILE
   * ---------------------------------------------------------
   */

  async function handleSave() {
    if (!user) {
      setSaveError("You must be logged in.");

      return;
    }

    const trimmedName = displayName.trim();

    if (!trimmedName) {
      setSaveError("Please enter your name.");

      return;
    }

    setSaving(true);
    setSaved(false);
    setSaveError("");
    setAvatarError("");

    let avatarUrlToSave = profile?.avatar_url || null;

    /*
     * Upload new avatar if user selected one.
     */
    if (selectedFile) {
      const uploadedUrl = await uploadAvatar(selectedFile);

      if (!uploadedUrl) {
        setSaving(false);
        return;
      }

      avatarUrlToSave = uploadedUrl;
    }

    /*
     * Update profile database row.
     */
    const { error: updateError } = await updateProfile({
      full_name: trimmedName,
      avatar_url: avatarUrlToSave,
    });

    if (updateError) {
      setSaveError(updateError.message);

      setSaving(false);
      return;
    }

    /*
     * Clean temporary preview.
     */
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarPreview(null);
    setSelectedFile(null);
    setName("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setSaved(true);
    setSaving(false);

    /*
     * Hide success message after 2.5 seconds.
     */
    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  /*
   * ---------------------------------------------------------
   * LOADING
   * ---------------------------------------------------------
   */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff7fb] px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] border border-pink-100 bg-white p-8 shadow-sm">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-40 rounded-full bg-pink-100" />

              <div className="h-32 rounded-3xl bg-pink-50" />

              <div className="h-12 rounded-2xl bg-pink-50" />

              <div className="h-12 rounded-2xl bg-pink-50" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
   * ---------------------------------------------------------
   * PAGE
   * ---------------------------------------------------------
   */

  return (
    <main className="min-h-screen bg-[#fff7fb] px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-2xl">🌸</span>

            <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-600">
              MY PROFILE
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
            Your Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Make your Nihongo Journey feel like yours.
          </p>
        </div>

        {/* ================================================= */}
        {/* PROFILE CARD */}
        {/* ================================================= */}

        <div className="overflow-hidden rounded-[2rem] border border-pink-100 bg-white shadow-sm">
          {/* ================================================= */}
          {/* COVER */}
          {/* ================================================= */}

          <div className="relative h-36 bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100">
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0">
              <div className="relative">
                {/* Avatar */}
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-pink-50 shadow-lg">
                  <img
                    src={avatarUrl}
                    alt="Profile avatar"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Camera button */}
                <button
                  type="button"
                  onClick={handleChooseAvatar}
                  disabled={saving || uploadingAvatar}
                  className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-pink-500 text-white shadow-md transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
                  title="Change profile picture"
                >
                  <Camera size={15} />
                </button>

                {/* Hidden input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* CONTENT */}
          {/* ================================================= */}

          <div className="px-6 pb-8 pt-20 sm:px-10 sm:pt-20">
            {/* ================================================= */}
            {/* AVATAR INFORMATION */}
            {/* ================================================= */}

            <div className="mb-8 rounded-2xl border border-pink-100 bg-pink-50/50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-500">
                  <ImageIcon size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-gray-800">Profile Picture</h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    JPG, PNG, WEBP or GIF · Maximum 5 MB
                  </p>
                </div>
              </div>

              {/* Selected image controls */}
              {selectedFile && (
                <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-3 py-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-700">
                      {selectedFile.name}
                    </p>

                    <p className="text-xs text-gray-400">Ready to upload</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveSelectedAvatar}
                    disabled={saving}
                    className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                    title="Remove selected image"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Avatar error */}
            {avatarError && (
              <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {avatarError}
              </div>
            )}

            {/* ================================================= */}
            {/* NAME */}
            {/* ================================================= */}

            <div className="mb-8">
              <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
                <UserRound size={16} className="text-pink-500" />
                Display Name
              </label>

              <input
                type="text"
                value={name}
                placeholder={
                  profile?.full_name ||
                  user?.email?.split("@")[0] ||
                  "Your name"
                }
                onChange={(event) => {
                  setName(event.target.value);

                  setSaved(false);
                  setSaveError("");
                }}
                className="w-full rounded-2xl border border-pink-100 bg-pink-50/40 px-4 py-3.5 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100"
              />

              <p className="mt-2 text-xs text-gray-400">
                This name will appear around Nihongo Journey.
              </p>
            </div>

            {/* ================================================= */}
            {/* EMAIL */}
            {/* ================================================= */}

            <div className="mb-8">
              <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
                <Mail size={16} className="text-pink-500" />
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3.5">
                <span className="min-w-0 flex-1 truncate text-gray-600">
                  {user?.email || "No email"}
                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
                  Verified
                </span>
              </div>
            </div>

            {/* ================================================= */}
            {/* JLPT LEVEL */}
            {/* ================================================= */}

            <div className="mb-8">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Current JLPT Level
              </label>

              <div className="flex items-center justify-between rounded-2xl border border-pink-100 bg-pink-50/40 px-4 py-4">
                <div>
                  <p className="font-bold text-gray-800">
                    {profile?.jlpt_level || "N2"}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Your current learning level
                  </p>
                </div>

                <span className="rounded-xl bg-pink-500 px-4 py-2 text-sm font-extrabold text-white">
                  {profile?.jlpt_level || "N2"}
                </span>
              </div>
            </div>

            {/* ================================================= */}
            {/* SAVE SECTION */}
            {/* ================================================= */}

            <div className="border-t border-pink-100 pt-6">
              {/* General error */}
              {saveError && (
                <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {saveError}
                </div>
              )}

              {/* Provider error */}
              {error && !saveError && (
                <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Success */}
              {saved && (
                <div className="mb-4 flex items-center gap-2 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
                  <Check size={17} />
                  Profile saved successfully 🌸
                </div>
              )}

              {/* Save button */}
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || uploadingAvatar}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-pink-500 px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {saving || uploadingAvatar ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                    {uploadingAvatar ? "Uploading..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* WELCOME CARD */}
        {/* ================================================= */}

        <div className="mt-6 rounded-[2rem] border border-pink-100 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-2xl">
              🌸
            </div>

            <div>
              <h2 className="font-extrabold text-gray-800">
                Keep going, {displayName}! 💪
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Every kanji, vocabulary word, and grammar point brings you one
                step closer to your Japanese goal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
