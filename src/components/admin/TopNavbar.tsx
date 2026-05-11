"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  Plus,
  Menu,
  Search,
  Sun,
  Moon,
  MessageSquare,
  Maximize,
  Minimize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function TopNavbar({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const getPageTitle = () => {
    if (!pathname) return "Dashboard";
    const parts = pathname.split("/").filter(Boolean);
    const lastPart = parts[parts.length - 1];
    if (!lastPart || lastPart === "admin") return "Dashboard";
    return (
      lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/-/g, " ")
    );
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
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-zinc-100 bg-white/90 px-4 sm:px-6 lg:px-8 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
      {/* Left — Title + Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
        </button>
        <div className="hidden sm:flex flex-col justify-center min-w-0">
          <h1 className="text-[13px] font-bold text-slate-800 dark:text-zinc-100 leading-tight truncate">
            {getPageTitle()}
          </h1>
          {breadcrumbs.length > 1 && (
            <div className="hidden sm:flex items-center gap-1 mt-0.5">
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <span className="text-[10px] text-slate-300 dark:text-zinc-600">
                      /
                    </span>
                  )}
                  <span
                    className={`text-[10px] ${
                      i === breadcrumbs.length - 1
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
      </div>

      {/* Center - Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full h-8 pl-8 pr-4 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-[12px] text-slate-700 dark:text-zinc-300 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
        {/* Create Report button */}
        <Button
          size="sm"
          className="hidden lg:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold rounded-lg px-3 h-8 shadow-sm shadow-blue-200 dark:shadow-blue-900/30 transition-all mr-1.5"
        >
          <Plus className="h-3 w-3" />
          <span>Create Report</span>
        </Button>

        {/* Search (Mobile Only) */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden relative h-8 w-8 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800 p-0 flex items-center justify-center"
        >
          <Search className="h-3.5 w-3.5" />
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="relative h-8 w-8 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800 p-0 flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="h-3.5 w-3.5" />
          ) : (
            <Moon className="h-3.5 w-3.5" />
          )}
        </Button>

        {/* Messages */}
        <Button
          variant="ghost"
          size="sm"
          className="relative h-8 w-8 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800 p-0 hidden sm:flex items-center justify-center"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-blue-500 ring-2 ring-white dark:ring-zinc-950" />
        </Button>

        {/* Fullscreen Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFullScreen}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="relative h-8 w-8 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800 p-0 hidden lg:flex items-center justify-center"
        >
          {isFullscreen ? (
            <Minimize className="h-3.5 w-3.5" />
          ) : (
            <Maximize className="h-3.5 w-3.5" />
          )}
        </Button>

        {/* Bell / Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="relative h-8 w-8 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800 p-0 flex items-center justify-center"
        >
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-950" />
        </Button>

        <div className="w-px h-4 bg-slate-200 dark:bg-zinc-800 mx-1 hidden sm:block" />

        {/* Avatar */}
        <div className="relative ml-0.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden ring-2 ring-blue-100 dark:ring-blue-900/50 cursor-pointer hover:ring-4 transition-all">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
              alt="Admin"
              className="w-full h-full object-cover bg-blue-50"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border-2 border-white dark:border-zinc-950 rounded-full" />
        </div>
      </div>
    </header>
  );
}
