"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    name: "Courses",
    href: "/courses",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M12 3L2 8l10 5 10-5-10-5z" />
        <path d="M2 16l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Shop",
    href: "/shop",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    name: "Stats",
    href: "/stats",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <rect x="2" y="13" width="4" height="9" rx="1" />
        <rect x="9" y="8" width="4" height="14" rx="1" />
        <rect x="16" y="3" width="4" height="19" rx="1" />
      </svg>
    ),
  },
  {
    name: "Affiliate",
    href: "/affiliate",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
];

const authLinks = [
  {
    name: "Login",
    href: "/login",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" y1="12" x2="3" y2="12" />
      </svg>
    ),
  },
  {
    name: "Signup",
    href: "/signup",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
  },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── HEADER ── */}
      <header
        style={{ fontFamily: "var(--font-manrope)" }}
        className={`sticky top-0 z-50 w-full bg-[#DFE2FF] transition-all duration-300 ${
          scrolled
            ? "shadow-[0_4px_24px_rgba(99,102,241,0.12)] backdrop-blur-md bg-opacity-85"
            : "shadow-sm"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold text-xl text-gray-900 tracking-tight"
            >
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center shadow-[0_2px_10px_rgba(37,99,235,0.4)]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              Income
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-[#2563EB] bg-[rgba(37,99,235,0.1)] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-[#2563EB]"
                      : "text-gray-600 hover:text-gray-900 hover:bg-[rgba(99,102,241,0.08)]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-semibold text-gray-600 px-3 py-2 rounded-lg hover:text-gray-900 hover:bg-[rgba(99,102,241,0.08)] transition-all"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm font-bold text-white bg-[#2563EB] px-6 py-2 rounded-full shadow-[0_2px_12px_rgba(37,99,235,0.35)] hover:bg-[#1d4ed8] hover:-translate-y-px hover:shadow-[0_4px_18px_rgba(37,99,235,0.45)] transition-all duration-200 active:translate-y-0"
              >
                Signup
              </Link>
              <div className="w-8 h-8 rounded-full bg-[#E8C6B1] border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform" />
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-[rgba(99,102,241,0.1)] transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── MOBILE DRAWER ── */}
      <aside
        style={{ fontFamily: "var(--font-manrope)" }}
        className={`fixed top-0 left-0 z-[70] h-full w-72 bg-white shadow-[4px_0_40px_rgba(37,99,235,0.12)] flex flex-col transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 font-extrabold text-lg text-gray-900 tracking-tight"
          >
            <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center shadow-[0_2px_8px_rgba(37,99,235,0.35)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            IncomeArchitect
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#E8C6B1] border-2 border-white shadow cursor-pointer" />
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  active
                    ? "bg-[#2563EB] text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)]"
                    : "text-gray-600 hover:bg-[#F0F2FF] hover:text-gray-900"
                }`}
              >
                <span className={active ? "text-white" : "text-gray-400"}>
                  {link.icon}
                </span>
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Divider + Auth */}
        <div className="border-t border-gray-100 px-3 py-4 space-y-1">
          {authLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-[#F0F2FF] hover:text-gray-900 transition-all duration-150"
            >
              <span className="text-gray-400">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Header;
