
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  BookOpen,
  ChevronDown,
  Clock3,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";

import { createAvatar } from "avatarka";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { user, signOut } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // --------------------------------------------------
  // USER NAME
  // --------------------------------------------------

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Learner";

  // --------------------------------------------------
  // CUTE ANIMAL AVATAR
  // --------------------------------------------------

  const avatarSeed = user?.id || displayName;

  const avatarSvg = user
    ? createAvatar("critters", avatarSeed, {
        namespace: "nihongo-journey",
        palette: "orchid",
        backgroundShape: "circle",
      }).svg
    : "";

  const avatarUrl = user
    ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        avatarSvg,
      )}`
    : "";

  // --------------------------------------------------
  // NAVIGATION ITEMS
  // --------------------------------------------------

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Study Plan",
      path: "/study-plan",
      icon: BookOpen,
    },
    {
      name: "Kanji Master",
      path: "/kanji-master",
      icon: GraduationCap,
    },
    {
      name: "Progress",
      path: "/progress",
      icon: Trophy,
    },
    {
      name: "Timer",
      path: "/timer",
      icon: Clock3,
    },
  ];

  // --------------------------------------------------
  // ACTIVE NAVIGATION
  // --------------------------------------------------

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  async function handleLogout() {
    const { error } = await signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    setProfileOpen(false);
    setMobileOpen(false);

    navigate("/login");
  }

  // --------------------------------------------------
  // MOBILE NAVIGATION
  // --------------------------------------------------

  function handleMobileNavigation() {
    setMobileOpen(false);
    setProfileOpen(false);
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <nav className="sticky top-0 z-50 border-b border-pink-100 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ==================================================
            LOGO
        ================================================== */}

        <Link
          to="/"
          onClick={() => {
            setMobileOpen(false);
            setProfileOpen(false);
          }}
          className="group flex items-center gap-2"
        >
          {/* Sakura Logo */}

          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-200 shadow-sm transition-transform duration-200 group-hover:scale-105">
            <span className="text-xl">🌸</span>

            <span className="absolute -right-1 -top-1 text-xs">
              ✨
            </span>
          </div>

          {/* Logo Text */}

          <div className="hidden sm:block">
            <div className="text-base font-bold leading-tight text-gray-800">
              Nihongo Journey
            </div>

            <div className="text-[11px] font-medium text-pink-400">
              日本語を楽しく学ぼう ♡
            </div>
          </div>
        </Link>

        {/* ==================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-pink-100 text-pink-600 shadow-sm"
                    : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                }`}
              >
                <Icon
                  size={16}
                  strokeWidth={active ? 2.5 : 2}
                  className="transition-transform duration-200 group-hover:scale-110"
                />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* ==================================================
            RIGHT SIDE
        ================================================== */}

        <div className="flex items-center gap-2">

          <div className="hidden text-sm text-pink-300 lg:block">
            ♡
          </div>

          {/* ==================================================
              LOGGED-IN USER
          ================================================== */}

          {user ? (
            <div className="relative">

              {/* Avatar Button */}

              <button
                type="button"
                onClick={() => {
                  setProfileOpen((previous) => !previous);
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 rounded-2xl border border-pink-100 bg-pink-50/70 px-2 py-1.5 transition-all duration-200 hover:border-pink-200 hover:bg-pink-100"
              >

                {/* Small Avatar */}

                <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-pink-100 shadow-sm">
                  <img
                    src={avatarUrl}
                    alt={`${displayName}'s animal avatar`}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* User Name */}

                <div className="hidden max-w-28 text-left sm:block">
                  <p className="truncate text-sm font-semibold text-gray-700">
                    {displayName}
                  </p>

                  <p className="text-[10px] text-pink-400">
                    My Journey 🌸
                  </p>
                </div>

                {/* Arrow */}

                <ChevronDown
                  size={16}
                  className={`hidden text-pink-400 transition-transform sm:block ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* ==================================================
                  PROFILE DROPDOWN
              ================================================== */}

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-xl shadow-pink-100/50">

                  {/* Profile Header */}

                  <div className="bg-gradient-to-br from-pink-50 via-white to-rose-50 p-5">
                    <div className="flex items-center gap-3">

                      {/* Large Avatar */}

                      <div className="h-14 w-14 overflow-hidden rounded-2xl border-2 border-white bg-pink-100 shadow-md">
                        <img
                          src={avatarUrl}
                          alt={`${displayName}'s animal avatar`}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* User Information */}

                      <div className="min-w-0">
                        <p className="truncate font-bold text-gray-800">
                          {displayName}
                        </p>

                        <p className="truncate text-xs text-gray-400">
                          {user.email}
                        </p>

                        <div className="mt-1 flex items-center gap-1 text-[11px] text-pink-400">
                          <Sparkles size={11} />

                          <span>
                            Keep learning!
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ==================================================
                      LOGOUT ONLY
                  ================================================== */}

                  <div className="p-2">

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm text-pink-400 transition-colors hover:bg-pink-50 hover:text-pink-500"
                    >

                      {/* Logout Icon */}

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100 text-pink-400">
                        <LogOut size={17} />
                      </div>

                      {/* Logout Text */}

                      <div>
                        <p className="font-semibold">
                          Log Out
                        </p>

                        <p className="text-[11px] text-pink-300">
                          See you next time ♡
                        </p>
                      </div>

                    </button>

                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ==================================================
               LOGGED-OUT USER
            ================================================== */

            <div className="hidden items-center gap-2 sm:flex">

              <Link
                to="/login"
                className="rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-pink-50 hover:text-pink-600"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-pink-600 hover:shadow-md"
              >
                Sign Up
              </Link>

            </div>
          )}

          {/* ==================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() => {
              setMobileOpen((previous) => !previous);
              setProfileOpen(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-500 transition-colors hover:bg-pink-100 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>
      </div>

      {/* ==================================================
          MOBILE MENU
      ================================================== */}

      {mobileOpen && (
        <div className="border-t border-pink-100 bg-white px-4 pb-5 pt-3 shadow-sm md:hidden">

          {/* Mobile User Information */}

          {user && (
            <div className="mb-3 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 p-3">

              {/* Avatar */}

              <div className="h-11 w-11 overflow-hidden rounded-xl border-2 border-white bg-pink-100 shadow-sm">
                <img
                  src={avatarUrl}
                  alt={`${displayName}'s animal avatar`}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* User Info */}

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-gray-700">
                  {displayName}
                </p>

                <p className="truncate text-xs text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          {/* Mobile Navigation */}

          <div className="space-y-1">

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleMobileNavigation}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-pink-100 text-pink-600"
                      : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                  }`}
                >
                  <Icon size={18} />

                  <span>{item.name}</span>

                  {active && (
                    <span className="ml-auto text-xs">
                      🌸
                    </span>
                  )}
                </Link>
              );
            })}

          </div>

          {/* ==================================================
              MOBILE LOGIN / SIGNUP / LOGOUT
          ================================================== */}

          {!user ? (
            <div className="mt-3 grid grid-cols-2 gap-2">

              <Link
                to="/login"
                onClick={handleMobileNavigation}
                className="rounded-xl border border-pink-100 py-2.5 text-center text-sm font-semibold text-pink-500 transition-colors hover:bg-pink-50"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                onClick={handleMobileNavigation}
                className="rounded-xl bg-pink-500 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-pink-600"
              >
                Sign Up
              </Link>

            </div>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-pink-50 py-2.5 text-sm font-semibold text-pink-400 transition-colors hover:bg-pink-100 hover:text-pink-500"
            >
              <LogOut size={17} />

              Log Out
            </button>
          )}

          {/* Cute Footer */}

          <div className="mt-4 text-center text-xs text-pink-300">
            がんばってね！ 🌸✨
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

