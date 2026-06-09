"use client";

import { AppProviders } from "@/providers";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/student/Sidebar";
import TopNavbar from "../../components/student/TopNavbar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    const role = String(user?.role ?? "").toLowerCase();
    if (role === "superadmin" || role === "super_admin" || role === "admin") {
      router.replace("/admin/dashboard");
    }
  }, [isAuthenticated, router, user]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-50 h-screen w-[220px] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content — margin matches sidebar width exactly */}
      <div className="flex flex-col min-h-screen lg:ml-[220px]">
        <TopNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 flex flex-col ">
          <AppProviders>{children}</AppProviders>
        </main>

        <footer className="border-t border-zinc-200 bg-white py-4 dark:border-zinc-800 dark:bg-zinc-900 mt-auto">
          <div className="container mx-auto px-4 text-center text-xs text-zinc-400">
            © {new Date().getFullYear()} CoursePlatform. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
