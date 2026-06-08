"use client";

import React, { useEffect, useState } from "react";
import { AppProviders } from "@/providers";
import Sidebar from "@/components/admin/Sidebar";
import TopNavbar from "@/components/admin/TopNavbar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Bai_Jamjuree } from "next/font/google";

const baiJamjuree = Bai_Jamjuree({
  variable: "--font-bai-jamjuree",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export default function AdminLayout({
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

    if (
      role &&
      role !== "superadmin" &&
      role !== "super_admin" &&
      role !== "admin"
    ) {
      router.replace("/student");
    }
  }, [isAuthenticated, router, user]);

  if (!isAuthenticated) return null;

  return (
    <div className={`${baiJamjuree.className} flex min-h-screen `}>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed left-0 top-0 z-50 h-screen transition-transform duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        <TopNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-x-hidden px-3 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
          <AppProviders>{children}</AppProviders>
        </main>
      </div>
    </div>
  );
}
