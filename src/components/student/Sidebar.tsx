"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  GraduationCap,
  HandCoins,
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  Upload,
  Users,
  Wallet,
  X,
} from "lucide-react";
import Image from "next/image";

const menuItems = [
  {
    name: "Dashboard",
    href: "/student",
    icon: LayoutDashboard,
  },
  {
    name: "My Courses",
    href: "/student/courses",
    icon: GraduationCap,
  },
  {
    name: "Submit Product",
    href: "/student/submitProduct",
    icon: Upload,
  },
  {
    name: "Wallet",
    href: "/student/wallet",
    icon: Wallet,
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
  {
    name: "Shop",
    href: "/student/shop",
    icon: ShoppingBag,
  },
  
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const userInfo = [
    {
      name: "Alex Rivera",
      level: "Level 4",
      badge: "PRO EARNER",
      userImage:
        "https://laser360clinic.com/wp-content/uploads/2020/08/user-image.jpg",
    },
  ];
  const pathname = usePathname();

  return (
    <aside className="h-screen w-full border-r border-zinc-200 bg-white px-4 sm:px-5 py-6 dark:border-zinc-800 dark:bg-zinc-900 overflow-y-auto">
      {/* Mobile Close Button */}
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

      {/* Profile */}
      <div className="mb-8 sm:mb-10">
        {userInfo.map((info: any, index: number) => {
          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 sm:p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              {/* Avatar */}
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-md shrink-0">
                {info.userImage ? (
                  <Image
                    src={info.userImage}
                    alt={info.name}
                    className="h-full w-full rounded-full object-cover"
                    width={56}
                    height={56}
                  />
                ) : (
                  <span className="text-lg font-bold text-white">
                    {info.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* User Info */}
              <div className="flex flex-col text-center sm:text-left">
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {info.name}
                </h2>

                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {info.level}
                </p>

                <span className="mt-2 w-fit mx-auto sm:mx-0 rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold tracking-wide text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {info.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          // Active Check
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

      {/* Sign Out */}
      <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <button
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-all duration-200"
        >
          <LogOut size={18} />
          <span className="truncate">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
