"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Wallet,
  Banknote,
  ShoppingBag,
  Ticket,
  BarChart,
  LogOut,
  X,
} from "lucide-react";
import { LiaCloudShowersHeavySolid } from "react-icons/lia";

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Wallet", href: "/admin/wallet", icon: Wallet },
    { label: "Withdraw Requests", href: "/admin/withdraw", icon: Banknote },
    { label: "Products", href: "/admin/products", icon: ShoppingBag },
    { label: "Courses", href: "/admin/courses", icon: LiaCloudShowersHeavySolid },
    { label: "Coupons", href: "/admin/coupons", icon: Ticket },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart },
  ];

  return (
    <aside className="h-full w-56 border-r border-zinc-200/80 bg-white/80 backdrop-blur-2xl dark:border-zinc-800/80 dark:bg-zinc-950/80 shadow-[8px_0_30px_rgba(0,0,0,0.03)] flex flex-col z-50 overflow-y-auto">
      <div className="flex flex-col h-full p-4">
        {/* Mobile Close Button */}
        {onClose && (
          <div className="flex justify-end mb-1 lg:hidden">
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:bg-zinc-100/80 hover:text-zinc-700 rounded-lg dark:text-zinc-500 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-300 transition-all duration-300"
            >
              
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* Profile Section */}
        <div className="flex items-center gap-2.5 mb-7 bg-white dark:bg-zinc-900 p-2.5 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-zinc-800">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-blue-50 dark:ring-blue-900/30">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                alt="Admin User"
                className="w-full h-full object-cover bg-blue-100"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[12px] font-bold text-slate-800 dark:text-zinc-100 truncate">
              Admin User
            </h3>
            <p className="text-[9px] font-bold text-blue-600 dark:text-blue-400 tracking-wide uppercase mt-0.5 truncate">
              Platform Controller
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-all duration-200 ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-[0_6px_14px_rgba(37,99,235,0.2)]"
                    : "text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-50 dark:hover:bg-zinc-800/50"
                }`}
              >
                {/* Icon wrapper */}
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-zinc-800 dark:text-zinc-500 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400"
                  }`}
                >
                  <Icon className="h-[14px] w-[14px]" />
                </span>

                <span
                  className={`text-[12px] font-medium tracking-tight leading-none ${
                    isActive ? "text-white font-semibold" : ""
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Sign Out Button */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/80">
          <button
            onClick={onClose}
            className="group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50/80 dark:text-red-400 dark:hover:bg-red-500/10 transition-all duration-300"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-50 group-hover:bg-red-100 dark:bg-red-500/10 dark:group-hover:bg-red-500/20 transition-colors">
              <LogOut className="h-[14px] w-[14px]" />
            </span>
            <span className="truncate text-[12px]">Sign Out</span>
          </button>
        </div>

        {/* Bottom version badge */}
        <div className="mt-3">
          <p className="text-[9px] text-slate-400 dark:text-zinc-500 text-center font-semibold tracking-widest uppercase">
            Admin Panel · v2.0
          </p>
        </div>
      </div>
    </aside>
  );
}
