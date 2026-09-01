import { NavLink } from "react-router-dom";
import { BarChart3, BookOpen, Clock3, Home, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
      name: "Progress",
      path: "/progress",
      icon: BarChart3,
    },
    {
      name: "Timer",
      path: "/timer",
      icon: Clock3,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-100 text-xl">
            🌸
          </div>

          <div>
            <p className="font-heading text-base font-bold text-gray-800">
              Nihongo Journey
            </p>

            <p className="hidden text-[11px] text-gray-400 sm:block">
              日本語の旅
            </p>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-pink-100 text-pink-500"
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

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-500 transition hover:bg-pink-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-pink-100 bg-white px-4 pb-4 pt-3 md:hidden">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-pink-100 text-pink-500"
                        : "text-gray-500 hover:bg-pink-50 hover:text-pink-500"
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
