"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  GraduationCap,
  ShoppingBag,
  BarChart2,
  Users,
  LogIn,
  UserPlus,
  Menu,
  X,
  ArrowRight,
  SignalIcon,
  Shield,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Courses", href: "/courses", icon: GraduationCap },
  { name: "Shop", href: "/shop", icon: ShoppingBag },
  { name: "Stats", href: "/stats", icon: BarChart2 },
  { name: "Affiliate", href: "/affiliate", icon: Users },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* ===== HEADER ===== */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm py-2"
          : "bg-white py-3"
          }`}
        style={{ fontFamily: "var(--font-bai-jamjuree)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* ── Mobile: Hamburger ── */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* ── Logo ── */}
            <Link
              href="/"
              className="text-2xl font-black text-[#0F172A] tracking-tighter flex items-center gap-2"
            >
              <span className="w-8 h-8 rounded-xl bg-[#0047FF] flex items-center justify-center text-white text-xs font-black">
                IA
              </span>
              <span className="hidden sm:inline">IncomeArchitect</span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-50 rounded-2xl px-2 py-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 text-[14px] font-semibold px-4 py-2 rounded-xl transition-all ${isActive(link.href)
                      ? "bg-[#0047FF] text-white shadow-md shadow-blue-200"
                      : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop Auth ── */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-[14px] font-bold text-slate-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-xl hover:bg-blue-50"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link href="/signup">
                <Button className="rounded-full bg-[#0047FF] hover:bg-blue-700 px-6 py-5 text-white text-sm font-bold shadow-lg shadow-blue-200/60 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2">
                  Sign Up
                  <UserPlus className="w-4 h-4" />
                </Button>
              </Link>
              <Link
                href="/admin"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-blue-50 transition-colors"
                aria-label="Admin panel"
              >
                <Shield className="w-5 h-5 text-slate-600" />
              </Link>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E8C6B1] to-[#D4A574] border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform" />
            </div>



            {/* ── Mobile: Avatar & Admin ── */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                href="/admin"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-blue-50 transition-colors"
                aria-label="Admin panel"
              >
                <Shield className="w-5 h-5 text-slate-600" />
              </Link>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E8C6B1] to-[#D4A574] border-2 border-white shadow-md cursor-pointer" />
            </div>
          </div>

        </div>
      </header>

      {/* ===== MOBILE DRAWER OVERLAY ===== */}
      <div
        className={`fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 z-[200] h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-xl bg-[#0047FF] flex items-center justify-center text-white text-xs font-black">
              IA
            </span>
            <span className="font-black text-[#0F172A] text-lg tracking-tight">
              IncomeArchitect
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[15px] font-bold transition-all ${isActive(link.href)
                  ? "bg-[#0047FF] text-white shadow-lg shadow-blue-200"
                  : "text-slate-700 hover:bg-slate-50"
                  }`}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer */}
        <div className="px-4 py-5 border-t border-slate-100 flex flex-col gap-3">
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[15px] font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <LogIn className="w-5 h-5 text-slate-400" />
            Login
          </Link>
          <Link href="/signup" onClick={() => setIsOpen(false)}>
            <Button className="w-full rounded-2xl bg-[#0047FF] hover:bg-blue-700 py-6 font-bold text-white shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
              <UserPlus className="w-5 h-5" />
              Sign Up Free
            </Button>
          </Link>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16 lg:h-[68px]" />
    </>
  );
}

export default Header;
