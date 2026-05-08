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
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Wallet", href: "/admin/wallet", icon: Wallet },
    { label: "Withdraw Requests", href: "/admin/withdraw", icon: Banknote },
    { label: "Products", href: "/admin/products", icon: ShoppingBag },
    { label: "Coupons", href: "/admin/coupons", icon: Ticket },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart },
  ];

  return (
    <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-zinc-100 bg-white dark:border-zinc-800 dark:bg-zinc-950 lg:block font-sans shadow-sm">
      <div className="flex flex-col h-full p-4">
        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-6 bg-slate-50 dark:bg-zinc-800/60 p-3 rounded-2xl border border-slate-100 dark:border-zinc-700/50">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden flex-shrink-0 ring-2 ring-blue-100 dark:ring-blue-900">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                alt="Admin User"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white dark:border-zinc-800 rounded-full" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-100 leading-tight">
              Admin User
            </h3>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-zinc-500 tracking-widest uppercase mt-0.5">
              Platform Controller
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname?.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all duration-200 ${isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-blue-900/40"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-zinc-400 dark:hover:bg-zinc-800/70 dark:hover:text-zinc-100"
                  }`}
              >
                {/* Icon wrapper */}
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${isActive
                    ? "bg-white/20"
                    : "bg-slate-100 group-hover:bg-slate-200 dark:bg-zinc-800 dark:group-hover:bg-zinc-700"
                    }`}
                >
                  <Icon
                    className={`h-4 w-4 ${isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-slate-700 dark:text-zinc-400 dark:group-hover:text-zinc-200"
                      }`}
                  />
                </span>

                <span
                  className={`text-[13.5px] font-semibold tracking-[-0.01em] ${isActive ? "text-white" : ""
                    }`}
                >
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom version badge */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
          <p className="text-[11px] text-slate-300 dark:text-zinc-600 text-center font-medium tracking-wide">
            Admin Panel · v2.0
          </p>
        </div>
      </div>
    </aside>
  );
}