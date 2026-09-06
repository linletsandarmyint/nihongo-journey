
import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Home,
  BarChart3,
  Timer,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../context/useAuth";

function Navbar() {
  const { user, loading, signOut } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

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
      icon: Sparkles,
    },
    {
      name: "Progress",
      path: "/progress",
      icon: BarChart3,
    },
    {
      name: "Timer",
      path: "/timer",
      icon: Timer,
    },
  ];

  async function handleLogout() {
    setLoggingOut(true);

    const { error } = await signOut();

    setLoggingOut(false);
    setMobileMenuOpen(false);

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    navigate("/login");
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  // Hide the main navigation on authentication pages
  if (isAuthPage) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-100 text-xl">
            🌸
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-800">
              Nihongo Journey
            </h1>

            <p className="hidden text-[10px] font-medium text-pink-400 sm:block">
              日本語と一緒に成長しよう
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-pink-100 text-pink-600"
                      : "text-gray-500 hover:bg-pink-50 hover:text-pink-500"
                  }`
                }
              >
                <Icon size={17} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop Auth Area */}
        <div className="hidden items-center gap-2 lg:flex">
          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded-xl bg-pink-50" />
          ) : user ? (
            <>
              {/* User Email */}
              <div className="flex max-w-52 items-center gap-2 rounded-xl bg-pink-50 px-3 py-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pink-200 text-sm">
                  🌷
                </div>

                <span className="truncate text-xs font-medium text-gray-600">
                  {user.email}
                </span>
              </div>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-2 rounded-xl border border-pink-200 px-3 py-2 text-sm font-semibold text-pink-500 transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LogOut size={17} />

                {loggingOut ? "Logging out..." : "Log Out"}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-gray-500 transition hover:bg-pink-50 hover:text-pink-500"
              >
                <LogIn size={17} />
                Log In
              </Link>

              <Link
                to="/signup"
                className="flex items-center gap-2 rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-600"
              >
                <UserPlus size={17} />
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="rounded-xl p-2 text-gray-600 transition hover:bg-pink-50 hover:text-pink-500 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-pink-100 bg-white px-4 py-4 lg:hidden">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-pink-100 text-pink-600"
                        : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          <div className="my-3 h-px bg-pink-100" />

          {/* Mobile Auth */}
          {loading ? (
            <div className="h-10 animate-pulse rounded-xl bg-pink-50" />
          ) : user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 rounded-xl bg-pink-50 px-4 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-200">
                  🌷
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Signed in as</p>

                  <p className="truncate text-sm font-medium text-gray-700">
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-pink-200 px-4 py-3 text-sm font-semibold text-pink-500 transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LogOut size={18} />

                {loggingOut ? "Logging out..." : "Log Out"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 rounded-xl border border-pink-200 px-4 py-3 text-sm font-semibold text-pink-500 transition hover:bg-pink-50"
              >
                <LogIn size={17} />
                Log In
              </Link>

              <Link
                to="/signup"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 rounded-xl bg-pink-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
              >
                <UserPlus size={17} />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;

