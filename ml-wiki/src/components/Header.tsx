import { useState } from "react";
import { Link, useLocation } from "react-router";
import Logo from "./Logo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/wiki") {
      return location.pathname.startsWith("/wiki");
    }
    if (path === "/papers") {
      return location.pathname.startsWith("/papers");
    }
    if (path === "/essays") {
      return location.pathname.startsWith("/essays");
    }
    if (path === "/projects") {
      return location.pathname.startsWith("/projects");
    }
    return false;
  };

  const navLinks = [
    { to: "/wiki", label: "Wiki" },
    { to: "/papers", label: "Papers" },
    { to: "/essays", label: "Essays" },
    { to: "/projects", label: "Projects" },
  ];

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <Logo className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
            <span className="text-lg sm:text-2xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
              ML Wiki
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-colors ${
                  isActive(link.to)
                    ? "text-violet-600 font-semibold"
                    : "text-slate-600 hover:text-violet-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-violet-600 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 border-t border-slate-200 pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base py-2 px-3 rounded transition-colors ${
                    isActive(link.to)
                      ? "bg-violet-50 text-violet-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-violet-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
