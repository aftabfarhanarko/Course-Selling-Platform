import React from "react";
import Link from "next/link";
import { AppProviders } from "@/providers";
import Sidebar from "@/components/admin/Sidebar";
import TopNavbar from "@/components/admin/TopNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 flex flex-col">
        <TopNavbar />

        {/* Page content */}
        <main className="p-8">
          <AppProviders>{children}</AppProviders>
        </main>
      </div>
    </div>
  );
}
