"use client";

import { AppProviders } from "@/providers";
import React, { useState } from "react";
import Sidebar from "../../components/student/Sidebar";
import TopNavbar from "../../components/student/TopNavbar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop Fixed, Mobile Overlay */}
      <div
        className={`fixed left-0 top-0 z-50 h-screen w-[260px] transition-transform duration-300 ease-in-out md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col min-h-screen md:ml-[260px]">
        <TopNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content */}
        <main className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 lg:p-10">
          <AppProviders>{children}</AppProviders>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-200 bg-white py-6 dark:border-zinc-800 dark:bg-zinc-900 mt-auto">
          <div className="container mx-auto px-4 text-center text-xs sm:text-sm text-zinc-500">
            <p>
              © {new Date().getFullYear()} CoursePlatform. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
