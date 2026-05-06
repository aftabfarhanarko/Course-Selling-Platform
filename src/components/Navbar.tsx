"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Shop", href: "/shop" },
    { name: "Stats", href: "/stats" },
    { name: "Affiliate", href: "/affiliate" },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full bg-[#DFE2FF] shadow-sm"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-gray-900"
          >
            <span>LOGO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative pb-1 ${
                    isActive
                      ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-600"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Login
            </Link>
            <Link href="/signup">
              <Button className="rounded-full bg-[#2563EB] px-6 text-white hover:bg-blue-700 cursor-pointer">
                Signup
              </Button>
            </Link>
            <div className="h-8 w-8 rounded-full bg-[#E8C6B1]" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-[#E8EBF5] md:hidden cursor-pointer"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-[#DFE2FF] border-t border-gray-200 md:hidden">
          <div className="space-y-1 px-4 pt-2 pb-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-[#E8EBF5]"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-gray-300 pt-4">
              <Link
                href="/login"
                className="text-base font-medium text-gray-700 px-3"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full rounded-full bg-[#2563EB] text-white">
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
