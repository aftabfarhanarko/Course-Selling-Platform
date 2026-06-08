"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  GraduationCap,
  HandCoins,
  LayoutDashboard,
  LogOut,
  Package,
  Users,
  Wallet,
  CreditCard,
  X,
  UserRound,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useLogoutMutation } from "@/lib/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { baseApi } from "@/lib/api/baseApi";
import { toast } from "sonner";
import type { RootState } from "@/store";

const menuItems = [
  { name: "Dashboard", href: "/affiliate/dashboard", icon: LayoutDashboard },
  { name: "Wallet", href: "/affiliate/dashboard/wallet", icon: Wallet },
  {
    name: "Payment Methods",
    href: "/affiliate/dashboard/payment-methods",
    icon: CreditCard,
  },
  { name: "Withdraw", href: "/affiliate/dashboard/withdraw", icon: HandCoins },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const authUser = useSelector((state: RootState) => state.auth.user);

  const displayName =
    String(
      authUser?.name ?? authUser?.fullName ?? authUser?.username ?? "",
    ).trim() || "Affiliate";
  const email = String(authUser?.email ?? "").trim();

  const avatarUrlRaw =
    authUser?.photo ??
    authUser?.avatar ??
    authUser?.image ??
    authUser?.profileImage ??
    null;
  const avatarUrl =
    typeof avatarUrlRaw === "string" && avatarUrlRaw.trim().length > 0
      ? avatarUrlRaw.trim()
      : null;

  const roleRaw = String(authUser?.role ?? "affiliate");
  const badge = roleRaw.replace(/_/g, " ").toUpperCase();

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();

  return (
    <aside className="relative h-screen w-full border-r border-slate-200 bg-white overflow-hidden px-4 sm:px-5 py-6">
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <defs>
            <pattern
              id="grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Close button (mobile) */}
      {onClose && (
        <div className="relative z-20 flex justify-end mb-4 md:hidden">
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      )}

      {/* Profile card – premium white version */}
      <div className="relative z-10 mb-8 sm:mb-10">
        <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Avatar with subtle glow */}
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-30 blur-md" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white border-2 border-slate-200 text-xl font-bold text-slate-700 overflow-hidden">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={displayName}
                    className="h-full w-full object-cover"
                    width={56}
                    height={56}
                  />
                ) : (
                  <span>{displayName.charAt(0)}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-start min-w-0 flex-1">
              <h2 className="text-sm font-bold text-slate-900 truncate max-w-full">
                {displayName}
              </h2>
              <p className="text-xs text-slate-500 truncate max-w-full">
                {email || "Logged in"}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white shadow-lg shadow-blue-500/30">
                <Sparkles size={10} />
                {badge}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex flex-col gap-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // Dashboard only active on exact match; others on prefix match
          const isActive =
            item.name === "Dashboard"
              ? pathname === item.href
              : pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon
                size={18}
                className={`transition-transform ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-slate-600"
                }`}
              />
              <span className="truncate">{item.name}</span>
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="relative z-10 my-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Sign out */}
      <div className="relative z-10">
        <button
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
              onClose?.();
              router.replace("/");
            }
          }}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 disabled:opacity-70 disabled:pointer-events-none"
        >
          <LogOut size={18} />
          <span className="truncate">
            {isLoggingOut ? "Signing out..." : "Sign Out"}
          </span>
        </button>
      </div>
    </aside>
  );
}
