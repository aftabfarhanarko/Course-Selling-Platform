"use client";

import { AppProviders } from "@/providers";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import StudentSidebar from "../../components/student/sidbar/StudentSidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen mt-16 md:mt-20 bg-zinc-50 dark:bg-zinc-950">
      {/* Mobile Header - Menu Toggle */}
      <div className="fixed top-10 left-0 right-0 z-40 md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          {sidebarOpen ? (
            <X size={24} className="text-zinc-900 dark:text-white" />
          ) : (
            <Menu size={24} className="text-zinc-900 dark:text-white" />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop Fixed, Mobile Overlay */}
      <div
        className={`fixed left-0 top-20 md:top-20 z-50 h-screen w-[260px] transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <StudentSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex min-h-screen flex-col md:ml-[260px]">
        {/* Content */}
        <main className="flex-1 flex min-h-screen flex-col pt-4 md:pt-6 px-4 sm:px-6 md:p-8 lg:p-10">
          <AppProviders>{children}</AppProviders>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-200 bg-white py-6 dark:border-zinc-800 dark:bg-zinc-900">
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
