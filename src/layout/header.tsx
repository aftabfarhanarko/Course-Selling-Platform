"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/home";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full bg-[#DFE2FF] shadow-sm"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-[#E8EBF5] md:hidden"
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

          {/* Logo */}
          <Link
            href="/"
            className="flex flex-1 items-center gap-2 font-bold text-lg text-gray-900 md:flex-none"
          >
            <span>LOGO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-8 md:flex md:flex-1 md:justify-center">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") && pathname === "/"
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/student/courses"
              className={`text-sm font-medium transition-colors ${
                isActive("/student/courses")
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Courses
            </Link>
            <Link
              href="/shop"
              className={`text-sm font-medium transition-colors ${
                isActive("/shop")
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Shop
            </Link>
            <Link
              href="/stats"
              className={`text-sm font-medium transition-colors ${
                isActive("/stats")
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Stats
            </Link>
            <Link
              href="/affiliate"
              className={`text-sm font-medium transition-colors ${
                isActive("/affiliate")
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Affiliate
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="  cursor-pointer text-gray-700 "
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 text-white"
              >
                Signup
              </Button>
            </Link>
          </div>

          {/* Profile Icon */}
          <button className="ml-4 border cursor-pointer border-blue-600 inline-flex items-center justify-center rounded-full bg-gray-300 h-9 w-9 text-gray-600 hover:bg-gray-400 transition-colors">
            <svg className="h-5  w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-300 md:hidden bg-[#DFE2FF]">
          <nav className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/"
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                isActive("/") && pathname === "/"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Home
            </Link>
            <Link
              href="/student/courses"
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                isActive("/student/courses")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Courses
            </Link>
            <Link
              href="/shop"
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                isActive("/shop")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Shop
            </Link>
            <Link
              href="/stats"
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                isActive("/stats")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Stats
            </Link>
            <Link
              href="/affiliate"
              className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                isActive("/affiliate")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Affiliate
            </Link>
          </nav>
          <div className="border-t border-gray-300 px-4 py-3">
            <div className="space-y-2">
              <Link href="/login" className="block w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-400 text-gray-700 hover:bg-white"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup" className="block w-full">
                <Button
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
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
