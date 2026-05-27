"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  GraduationCap,
  HandCoins,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingBag,
  Users,
  Wallet,
  CreditCard,
  X,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { useLogoutMutation } from "@/lib/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { baseApi } from "@/lib/api/baseApi";
import { toast } from "sonner";
import type { RootState } from "@/store";

const menuItems = [
  {
    name: "Dashboard",
    href: "/student",
    icon: LayoutDashboard,
  },
  {
    name: "Profile",
    href: "/student/dashboard",
    icon: UserRound,
  },
  {
    name: "My Courses",
    href: "/student/courses",
    icon: GraduationCap,
  },
  {
    name: "Products",
    href: "/student/products",
    icon: Package,
  },

  {
    name: "Wallet",
    href: "/student/wallet",
    icon: Wallet,
  },
  {
    name: "Payment Methods",
    href: "/student/payment-methods",
    icon: CreditCard,
  },
  {
    name: "Withdraw",
    href: "/student/withdraw",
    icon: HandCoins,
  },
  {
    name: "Affiliate",
    href: "/student/affiliate",
    icon: Users,
  },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const authUser = useSelector((state: RootState) => state.auth.user);

  const displayName =
    String(authUser?.name ?? authUser?.fullName ?? authUser?.username ?? "").trim() ||
    "Student";
  const email = String(authUser?.email ?? "").trim();

  const avatarUrlRaw =
    authUser?.photo ?? authUser?.avatar ?? authUser?.image ?? authUser?.profileImage ?? null;
  const avatarUrl =
    typeof avatarUrlRaw === "string" && avatarUrlRaw.trim().length > 0
      ? avatarUrlRaw.trim()
      : null;

  const roleRaw = String(authUser?.role ?? "student");
  const badge = roleRaw.replace(/_/g, " ").toUpperCase();

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();

  return (
    <aside className="h-screen w-full border-r border-zinc-200 bg-white px-4 sm:px-5 py-6 dark:border-zinc-800 dark:bg-zinc-900 overflow-y-auto">
      {onClose && (
        <div className="flex justify-end mb-4 md:hidden">
          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-lg dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      )}

      <div className="mb-8 sm:mb-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 sm:p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-md shrink-0 overflow-hidden">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={displayName}
                className="h-full w-full object-cover"
                width={56}
                height={56}
              />
            ) : (
              <span className="text-lg font-bold text-white">{displayName.charAt(0)}</span>
            )}
          </div>

          <div className="flex flex-col text-center sm:text-left min-w-0">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
              {displayName}
            </h2>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              {email || "Logged in"}
            </p>

            <span className="mt-2 w-fit mx-auto sm:mx-0 rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold tracking-wide text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {badge}
            </span>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200

              ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              <Icon size={18} />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
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
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-all duration-200 disabled:opacity-70 disabled:pointer-events-none"
        >
          <LogOut size={18} />
          <span className="truncate">{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
        </button>
      </div>
    </aside>
  );
}
