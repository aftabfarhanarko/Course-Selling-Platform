"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  SignalIcon,
  Shield,
  LayoutDashboard,
  LogOut,
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
  { name: "Shop", href: "/shop", icon: ShoppingBag },
  { name: "Stats", href: "/stats", icon: BarChart2 },
  { name: "Affiliate", href: "/affiliate", icon: Users },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/student")) {
    return null;
  }

  const role = String((user as any)?.role ?? "").toLowerCase();
  const isAdminRole =
    role === "superadmin" || role === "super_admin" || role === "admin";

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

  const dashboardHref = isAdminRole ? "/admin/dashboard" : "/student";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm py-2"
            : "bg-white py-3"
        }`}
        style={{ fontFamily: "var(--font-bai-jamjuree)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link
              href="/"
              className="text-2xl font-black text-[#0F172A] tracking-tighter flex items-center gap-2"
            >
              <span className="hidden sm:inline">JEVXO</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 bg-slate-50 rounded-2xl px-2 py-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 text-[14px] font-semibold px-4 py-2 rounded-xl transition-all ${
                      isActive(link.href)
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

            <div className="hidden lg:flex items-center gap-4">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 text-[14px] font-bold text-slate-700 transition-colors px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                  <Link href="/signup">
                    <Button className="rounded-full bg-[#0047FF] hover:bg-blue-700 px-6 py-5 text-white text-sm font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2">
                      Sign Up
                      <UserPlus className="w-4 h-4" />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={dashboardHref}
                    className="flex items-center gap-1.5 text-[14px] font-bold text-slate-700 transition-colors px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200"
                    aria-label="Dashboard"
                  >
                    {isAdminRole ? (
                      <Shield className="w-4 h-4" />
                    ) : (
                      <LayoutDashboard className="w-4 h-4" />
                    )}
                    {isAdminRole ? "Admin" : "Student"}
                  </Link>

                  <div className="relative" ref={profileRef}>
                    <button
                      type="button"
                      onClick={() => setProfileOpen((v) => !v)}
                      className="w-9 h-9 rounded-full border-2 border-white shadow-md overflow-hidden hover:scale-105 transition-transform bg-slate-100 flex items-center justify-center"
                      aria-label="Account menu"
                    >
                      {typeof avatarUrl === "string" && avatarUrl.length > 0 ? (
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
                    </button>

                    {profileOpen && (
                      <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-[13px] font-black text-slate-900 truncate">
                            {displayName}
                          </p>
                          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide truncate">
                            {role || "user"}
                          </p>
                        </div>
                        <div className="py-1">
                          <Link
                            href={dashboardHref}
                            className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50"
                          >
                            <LayoutDashboard className="w-4 h-4 text-slate-500" />
                            Dashboard
                          </Link>

                          {!isAdminRole && (
                            <Link
                              href="/student/dashboard"
                              className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50"
                            >
                              <SignalIcon className="w-4 h-4 text-slate-500" />
                              Profile
                            </Link>
                          )}

                          <button
                            type="button"
                            disabled={isLoggingOut}
                            onClick={async () => {
                              if (isLoggingOut) return;
                              const toastId = toast.loading("Signing out...");
                              try {
                                await logoutApi().unwrap();
                              } catch {
                              } finally {
                                dispatch(logout());
                                dispatch(baseApi.util.resetApiState());
                                toast.success("Signed out", { id: toastId });
                                setProfileOpen(false);
                                router.replace("/");
                              }
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-red-600 hover:bg-red-50 disabled:opacity-70 disabled:pointer-events-none"
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

            <div className="lg:hidden flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href={dashboardHref}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                    aria-label="Dashboard"
                  >
                    {isAdminRole ? (
                      <Shield className="w-5 h-5 text-slate-600" />
                    ) : (
                      <LayoutDashboard className="w-5 h-5 text-slate-600" />
                    )}
                  </Link>

                  <button
                    type="button"
                    onClick={() => setProfileOpen((v) => !v)}
                    className="w-9 h-9 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-100 flex items-center justify-center"
                    aria-label="Account menu"
                  >
                    {typeof avatarUrl === "string" && avatarUrl.length > 0 ? (
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
                  </button>

                  {profileOpen && (
                    <div className="absolute right-4 top-[64px] w-[220px] rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-[13px] font-black text-slate-900 truncate">
                          {displayName}
                        </p>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide truncate">
                          {role || "user"}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          href={dashboardHref}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50"
                        >
                          <LayoutDashboard className="w-4 h-4 text-slate-500" />
                          Dashboard
                        </Link>
                        <button
                          type="button"
                          disabled={isLoggingOut}
                          onClick={async () => {
                            if (isLoggingOut) return;
                            const toastId = toast.loading("Signing out...");
                            try {
                              await logoutApi().unwrap();
                            } catch {
                            } finally {
                              dispatch(logout());
                              dispatch(baseApi.util.resetApiState());
                              toast.success("Signed out", { id: toastId });
                              setProfileOpen(false);
                              router.replace("/");
                            }
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-red-600 hover:bg-red-50 disabled:opacity-70 disabled:pointer-events-none"
                        >
                          <LogOut className="w-4 h-4" />
                          {isLoggingOut ? "Signing out..." : "Sign Out"}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                    aria-label="Login"
                  >
                    <LogIn className="w-5 h-5 text-slate-600" />
                  </Link>
                  <Link
                    href="/signup"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                    aria-label="Sign up"
                  >
                    <UserPlus className="w-5 h-5 text-slate-600" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 z-[200] h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2"
          >
            <span className="font-black text-[#0F172A] text-lg tracking-tight">
              JEVXO
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[15px] font-bold transition-all ${
                  isActive(link.href)
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

        <div className="px-4 py-5 border-t border-slate-100 flex flex-col gap-3">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[15px] font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <LogIn className="w-5 h-5 text-slate-400" />
                Login
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full rounded-2xl bg-[#0047FF] hover:bg-blue-700 py-6 font-bold text-white flex items-center justify-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Sign Up Free
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                href={dashboardHref}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[15px] font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <LayoutDashboard className="w-5 h-5 text-slate-400" />
                Dashboard
              </Link>
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={async () => {
                  if (isLoggingOut) return;
                  const toastId = toast.loading("Signing out...");
                  try {
                    await logoutApi().unwrap();
                  } catch {
                  } finally {
                    dispatch(logout());
                    dispatch(baseApi.util.resetApiState());
                    toast.success("Signed out", { id: toastId });
                    setIsOpen(false);
                    router.replace("/");
                  }
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[15px] font-bold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-70 disabled:pointer-events-none"
              >
                <LogOut className="w-5 h-5" />
                {isLoggingOut ? "Signing out..." : "Sign Out"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="h-16 lg:h-[68px]" />
    </>
  );
}

export default Header;
