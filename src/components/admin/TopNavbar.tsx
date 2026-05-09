"use client";

import React from "react";
import { Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function TopNavbar() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (!pathname) return "Dashboard";
    const parts = pathname.split("/").filter(Boolean);
    const lastPart = parts[parts.length - 1];
    if (!lastPart || lastPart === "admin") return "Dashboard";
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/-/g, " ");
  };

  const getBreadcrumb = () => {
    if (!pathname) return [];
    return pathname
      .split("/")
      .filter(Boolean)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, " "));
  };

  const breadcrumbs = getBreadcrumb();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-zinc-100 bg-white/90 px-4 sm:px-6 lg:px-8 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">

      {/* Left — Title + Breadcrumb */}
      <div className="flex flex-col justify-center min-w-0">
        <h1 className="text-[15px] font-bold text-slate-800 dark:text-zinc-100 leading-tight truncate">
          {getPageTitle()}
        </h1>
        {breadcrumbs.length > 1 && (
          <div className="hidden sm:flex items-center gap-1 mt-0.5">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <span className="text-[11px] text-slate-300 dark:text-zinc-600">/</span>
                )}
                <span
                  className={`text-[11px] ${i === breadcrumbs.length - 1
                      ? "text-blue-500 font-semibold"
                      : "text-slate-400 dark:text-zinc-500"
                    }`}
                >
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

        {/* Create Report button — hidden on small screens */}
        <Button
          size="sm"
          className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold rounded-xl px-4 h-9 shadow-sm shadow-blue-200 dark:shadow-blue-900/30 transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Create Report</span>
          <span className="md:hidden">New</span>
        </Button>

        {/* Bell */}
        <Button
          variant="ghost"
          size="sm"
          className="relative h-9 w-9 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 p-0 flex items-center justify-center"
        >
          <Bell className="h-4 w-4 text-slate-500 dark:text-zinc-400" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-950" />
        </Button>

        {/* Avatar */}
        <div className="relative">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden ring-2 ring-blue-100 dark:ring-blue-900/50">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white dark:border-zinc-950 rounded-full" />
        </div>

      </div>
    </header>
  );
}