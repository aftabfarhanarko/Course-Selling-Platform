"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Home,
  GraduationCap,
  ShoppingBag,
  BarChart2,
  Menu,
  X,
  LogIn,
  UserPlus,
  Shield,
  LayoutDashboard,
  LogOut,
  SignalIcon,
  ChevronDown,
  Search,
  BookOpen,
  User,
  Layers,
  FileText,
  Mail,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useLogoutMutation } from "@/lib/api/authApi";
import { logout } from "@/store/slices/authSlice";
import { baseApi } from "@/lib/api/baseApi";
import { toast } from "sonner";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Courses", href: "/courses", icon: GraduationCap },
  { name: "About", href: "/about", icon: User },
  { name: "Shop", href: "/shop", icon: ShoppingBag },
  { name: "Blog", href: "/blog", icon: FileText },
  { name: "Contact", href: "/contact", icon: Mail },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const drawerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();

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
      if (
        profileOpen &&
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen, profileOpen]);

  useEffect(() => {
    setProfileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/student") ||
    pathname?.startsWith("/affiliate/dashboard")
  ) {
    return null;
  }

  const role = String((user as any)?.role ?? "").toLowerCase();
  const isAdminRole =
    role === "superadmin" || role === "super_admin" || role === "admin";
  const isAffiliateRole = role === "affiliate";

  const avatarUrl =
    (user as any)?.photo ||
    (user as any)?.avatar ||
    (user as any)?.image ||
    (user as any)?.profileImage ||
    null;

  const displayName =
    (user as any)?.name ||
    (user as any)?.fullName ||
    (user as any)?.username ||
    "User";

  const initials = String(displayName).trim().slice(0, 1).toUpperCase();

  const dashboardHref = isAdminRole
    ? "/admin/dashboard"
    : isAffiliateRole
      ? "/affiliate/dashboard"
      : "/student/dashboard";

  const handleLogout = async (closeCallback: () => void) => {
    if (isLoggingOut) return;
    const toastId = toast.loading("Signing out...");
    try {
      await logoutApi().unwrap();
    } catch {
    } finally {
      dispatch(logout());
      dispatch(baseApi.util.resetApiState());
      toast.success("Signed out", { id: toastId });
      closeCallback();
      router.replace("/");
    }
  };

  return (
    <>
      {/* Local premium-animation keyframes (self-contained, no config changes needed) */}
      <style jsx global>{`
        @keyframes shine-sweep {
          0% {
            transform: translateX(-150%) skewX(-12deg);
          }
          100% {
            transform: translateX(250%) skewX(-12deg);
          }
        }
        @keyframes pill-pop {
          0% {
            transform: scale(0.85);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>

      {/* ───── TOP HEADER ───── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ease-out ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(79,70,229,0.08)] py-3 border-b border-indigo-50/50"
            : "bg-white/95 backdrop-blur-sm py-4 border-b border-slate-100"
        }`}
        style={{ fontFamily: "var(--font-bai-jamjuree)" }}
      >
        {/* Subtle background ambient light dot */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-12 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-2xl pointer-events-none rounded-full" />

        <div className="w-full max-w-[96%] lg:max-w-10/12 mx-auto px-2.5 sm:px-6 relative z-10">
          <div className="flex items-center justify-between gap-4">
            {/* ── Logo: LEFT on both mobile & desktop ── */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center gap-2 lg:w-48 group"
            >
              <div className="relative text-[#5B50E6] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out">
                <div className="absolute inset-0 bg-indigo-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <GraduationCap className="w-8 h-8 text-[#5B50E6] stroke-[2.2] relative z-10" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#111827] transition-colors duration-500 ease-out group-hover:text-indigo-600">
                Edu
                <span className="text-[#5B50E6] group-hover:text-purple-600 transition-colors duration-500 ease-out">
                  Nova
                </span>
              </span>
            </Link>

            {/* ── Desktop Center Nav (pill-style hover/active with sliding fill) ── */}
            <nav className="hidden lg:flex items-center gap-1.5 justify-center flex-1 max-w-xl mx-auto">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative flex items-center gap-1.5 py-2 px-3.5 rounded-full text-[14.5px] font-semibold overflow-hidden group transition-colors duration-500 ease-out ${
                      active
                        ? "text-white"
                        : "text-slate-700 hover:text-[#4F46E5]"
                    }`}
                  >
                    {/* animated pill fill */}
                    <span
                      className={`absolute inset-0 rounded-full transition-all duration-500 ease-out ${
                        active
                          ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-100 scale-100 shadow-md shadow-indigo-500/30"
                          : "bg-indigo-50 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                      }`}
                    />
                    <Icon
                      className={`relative z-10 w-4 h-4 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6 ${
                        active ? "text-white" : "text-slate-500 group-hover:text-[#4F46E5]"
                      }`}
                    />
                    <span className="relative z-10 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 inline-block">
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop Right: Search + Cart + Get Started / Auth ── */}
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0 justify-end">
              {/* Premium Pill Search Bar */}
              <div className="relative flex items-center">
                <div className="flex items-center w-56 xl:w-64 bg-slate-50/80 hover:bg-slate-100/90 border border-indigo-200/80 focus-within:border-indigo-500 ring-2 ring-indigo-500/10 focus-within:ring-indigo-500/20 rounded-full px-3.5 py-1.5 transition-all duration-500 ease-out shadow-sm">
                  <Search className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery.trim()) {
                        router.push(
                          `/courses?search=${encodeURIComponent(searchQuery)}`,
                        );
                      }
                    }}
                    className="w-full bg-transparent text-[13.5px] font-medium text-slate-800 focus:outline-none placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-slate-400 hover:text-slate-600 p-0.5 ml-1 transition-colors duration-300"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Cart Button with Animated Badge */}
              <Link
                href="/shop"
                aria-label="Cart"
                className="relative text-slate-700 hover:text-[#4F46E5] p-2 rounded-xl hover:bg-indigo-50/60 transition-all duration-500 ease-out group hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5 transition-transform duration-500 ease-out group-hover:-rotate-12" />
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-[9px] font-bold text-white shadow-md shadow-indigo-500/30 transition-transform duration-500 ease-out group-hover:scale-110">
                  2
                </span>
              </Link>

              {!isAuthenticated ? (
                <Link
                  href="/signup"
                  className="relative group overflow-hidden rounded-xl p-[1px] transition-all duration-500 ease-out active:scale-95 shadow-md shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] group-hover:animate-none group-hover:bg-[position:100%_0] transition-[background-position] duration-700 ease-out" />
                  <span className="relative inline-flex items-center justify-center h-10 px-6 rounded-[11px] bg-[#4F46E5] text-white text-[14px] font-bold overflow-hidden transition-colors duration-500 ease-out">
                    {/* shine sweep on hover */}
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100">
                      <span
                        className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        style={{
                          animation: "shine-sweep 1.1s ease-out",
                        }}
                      />
                    </span>
                    <span className="relative z-10">Get Started</span>
                  </span>
                </Link>
              ) : (
                <>
                  <Link
                    href={dashboardHref}
                    className="flex items-center gap-1.5 text-[13.5px] font-bold text-slate-700 px-4 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-500 ease-out hover:scale-105 active:scale-95"
                  >
                    {isAdminRole ? (
                      <Shield className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                    )}
                    {isAdminRole
                      ? "Admin"
                      : isAffiliateRole
                        ? "Affiliate"
                        : "Dashboard"}
                  </Link>

                  {/* Profile dropdown */}
                  <div className="relative" ref={profileRef}>
                    <button
                      type="button"
                      onClick={() => setProfileOpen((v) => !v)}
                      className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 transition-all duration-500 ease-out hover:scale-105 active:scale-95"
                      aria-label="Account menu"
                    >
                      <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-200 flex items-center justify-center shadow-sm">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt={displayName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[11px] font-black text-slate-700">
                            {initials}
                          </span>
                        )}
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-500 ease-out ${profileOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {profileOpen && (
                      <div
                        className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-100 bg-white/95 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 overflow-hidden z-50"
                        style={{ animation: "pill-pop 0.22s ease-out" }}
                      >
                        <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50/30">
                          <p className="text-[13px] font-black text-slate-900 truncate">
                            {displayName}
                          </p>
                          <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-wide truncate">
                            {role || "user"}
                          </p>
                        </div>
                        <div className="py-1.5 px-1.5 flex flex-col gap-0.5">
                          <Link
                            href={dashboardHref}
                            className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-semibold text-slate-700 hover:bg-indigo-50/80 hover:text-indigo-600 rounded-xl transition-all duration-300 ease-out hover:translate-x-0.5"
                          >
                            <LayoutDashboard className="w-4 h-4 text-slate-400" />
                            Dashboard
                          </Link>
                          {!isAdminRole && (
                            <Link
                              href="/student/dashboard"
                              className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-semibold text-slate-700 hover:bg-indigo-50/80 hover:text-indigo-600 rounded-xl transition-all duration-300 ease-out hover:translate-x-0.5"
                            >
                              <SignalIcon className="w-4 h-4 text-slate-400" />
                              Profile
                            </Link>
                          )}
                          <button
                            type="button"
                            disabled={isLoggingOut}
                            onClick={() =>
                              handleLogout(() => setProfileOpen(false))
                            }
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 ease-out hover:translate-x-0.5 disabled:opacity-50"
                          >
                            <LogOut className="w-4 h-4" />
                            {isLoggingOut ? "Signing out..." : "Sign Out"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* ── Mobile: Animated Hamburger / Close toggle — RIGHT side ── */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="lg:hidden relative w-10 h-10 -mr-1.5 flex items-center justify-center text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 active:scale-90 rounded-xl transition-all duration-300 ease-out"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <span className="relative w-5 h-5 block">
                <Menu
                  className={`absolute inset-0 w-5 h-5 transition-all duration-300 ease-out ${
                    isOpen
                      ? "opacity-0 rotate-90 scale-50"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 w-5 h-5 transition-all duration-300 ease-out ${
                    isOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-50"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ───── MOBILE SIDE DRAWER (opens from the right) ───── */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 z-[200] h-full w-72 bg-white/95 backdrop-blur-2xl shadow-2xl shadow-black/20 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden flex flex-col"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2"
          >
            <GraduationCap className="w-6 h-6 text-[#5B50E6]" />
            <span className="text-xl font-bold tracking-tight text-[#111827]">
              Edu<span className="text-[#5B50E6]">Nova</span>
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 hover:rotate-90 transition-all duration-300 ease-out"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Search */}
        <div className="px-4 py-3 border-b border-slate-100">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  router.push(
                    `/courses?search=${encodeURIComponent(searchQuery)}`,
                  );
                  setIsOpen(false);
                }
              }}
              className="w-full pl-9 pr-4 py-2 text-[13.5px] rounded-xl bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-800 transition-all duration-300 ease-out"
            />
          </div>
        </div>

        {/* Drawer nav — staggered fade/slide-in on open */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          <p className="px-4 text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2">
            Navigation
          </p>
          {navLinks.map((link, i) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{
                  transitionDelay: isOpen ? `${80 + i * 55}ms` : "0ms",
                }}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-[14.5px] font-bold transition-all duration-500 ease-out overflow-hidden ${
                  isOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                } ${
                  active
                    ? "bg-indigo-50 text-[#4F46E5] shadow-sm"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${active ? "text-[#4F46E5]" : "text-slate-400"}`}
                />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Drawer bottom auth */}
        <div className="px-3 py-4 border-t border-slate-100 flex flex-col gap-2">
          {!isAuthenticated ? (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-3 rounded-2xl text-[13.5px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:-translate-y-0.5 transition-all duration-300 ease-out"
              >
                <LogIn className="w-4 h-4 text-slate-500" />
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="relative flex overflow-hidden rounded-2xl group"
              >
                <button className="relative flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold text-[13.5px] transition-all duration-300 ease-out hover:shadow-lg hover:shadow-indigo-400/30 hover:-translate-y-0.5 active:scale-[0.98] overflow-hidden">
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100">
                    <span
                      className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      style={{ animation: "shine-sweep 1.1s ease-out" }}
                    />
                  </span>
                  <UserPlus className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Sign Up</span>
                </button>
              </Link>
            </div>
          ) : (
            <>
              {/* User info strip */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 mb-1">
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center flex-shrink-0">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[12px] font-black text-slate-700">
                      {initials}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-black text-slate-900 truncate">
                    {displayName}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {role || "user"}
                  </p>
                </div>
              </div>

              <Link
                href={dashboardHref}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-bold text-slate-700 hover:bg-slate-50 hover:translate-x-0.5 transition-all duration-300 ease-out"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
                  <LayoutDashboard className="w-4 h-4 text-slate-500" />
                </div>
                Dashboard
              </Link>
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => handleLogout(() => setIsOpen(false))}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-bold text-red-500 hover:bg-red-50 hover:translate-x-0.5 transition-all duration-300 ease-out disabled:opacity-50"
              >
                <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                  <LogOut className="w-4 h-4 text-red-500" />
                </div>
                {isLoggingOut ? "Signing out..." : "Sign Out"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* ───── MOBILE BOTTOM NAV ───── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-t border-slate-200/80 pb-safe">
        <div className="flex items-center justify-around h-[60px] max-w-lg mx-auto px-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center justify-center gap-[3px] flex-1 py-1 px-2 rounded-2xl transition-all duration-300 ease-out ${
                  active
                    ? "text-[#4F46E5]"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <div
                  className={`relative flex items-center justify-center w-8 h-7 rounded-xl transition-all duration-300 ease-out ${
                    active ? "bg-indigo-50 scale-110" : ""
                  }`}
                >
                  <Icon
                    className="w-[18px] h-[18px] transition-transform duration-300 ease-out"
                    strokeWidth={active ? 2.5 : 1.8}
                  />
                  {active && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#4F46E5] shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
                  )}
                </div>
                <span
                  className={`text-[9.5px] font-bold tracking-wide ${active ? "text-[#4F46E5]" : ""}`}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}

          {/* ── Profile tab (only when logged in) ── */}
          {isAuthenticated && (
            <div className="relative flex-1" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((v) => !v)}
                className={`w-full flex flex-col items-center justify-center gap-[3px] py-1 px-2 rounded-2xl transition-all duration-300 ease-out ${
                  profileOpen ? "text-[#4F46E5]" : "text-slate-400"
                }`}
              >
                <div
                  className={`relative flex items-center justify-center w-8 h-7 rounded-xl transition-all duration-300 ease-out ${
                    profileOpen ? "bg-indigo-50 scale-110" : ""
                  }`}
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200"
                    />
                  ) : (
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black transition-colors duration-300 ease-out ${
                        profileOpen
                          ? "bg-[#4F46E5] text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {initials}
                    </div>
                  )}
                  {profileOpen && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#4F46E5] shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
                  )}
                </div>
                <span
                  className={`text-[9.5px] font-bold tracking-wide ${profileOpen ? "text-[#4F46E5]" : ""}`}
                >
                  {isAdminRole
                    ? "Admin"
                    : isAffiliateRole
                      ? "Affiliate"
                      : "Profile"}
                </span>
              </button>

              {/* Bottom-nav profile dropdown — slides up */}
              {profileOpen && (
                <div
                  className="absolute bottom-[68px] right-0 w-64 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/20 overflow-hidden z-[200]"
                  style={{ animation: "pill-pop 0.22s ease-out" }}
                >
                  {/* User info */}
                  <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-slate-50">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={displayName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[13px] font-black text-slate-700">
                          {initials}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-black text-slate-900 truncate">
                        {displayName}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {role || "user"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="py-2 px-2 flex flex-col gap-0.5">
                    <Link
                      href={dashboardHref}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:translate-x-0.5 transition-all duration-300 ease-out"
                    >
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                        {isAdminRole ? (
                          <Shield className="w-3.5 h-3.5 text-[#4F46E5]" />
                        ) : (
                          <LayoutDashboard className="w-3.5 h-3.5 text-[#4F46E5]" />
                        )}
                      </div>
                      {isAdminRole
                        ? "Admin Dashboard"
                        : isAffiliateRole
                          ? "Affiliate Dashboard"
                          : "Student Dashboard"}
                    </Link>

                    {!isAdminRole && (
                      <Link
                        href="/student/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:translate-x-0.5 transition-all duration-300 ease-out"
                      >
                        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <SignalIcon className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        Profile
                      </Link>
                    )}

                    <div className="my-1 h-px bg-slate-100 mx-1" />

                    <button
                      type="button"
                      disabled={isLoggingOut}
                      onClick={() => handleLogout(() => setProfileOpen(false))}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-red-500 hover:bg-red-50 hover:translate-x-0.5 transition-all duration-300 ease-out disabled:opacity-50"
                    >
                      <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                        <LogOut className="w-3.5 h-3.5 text-red-500" />
                      </div>
                      {isLoggingOut ? "Signing out..." : "Sign Out"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Spacers */}
      <div className="h-[60px] lg:h-[68px]" />
      <div className="lg:hidden h-[60px]" />
    </>
  );
}

export default Header;