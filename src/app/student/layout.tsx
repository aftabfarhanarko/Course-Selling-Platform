import React from "react";
import { Navbar } from "@/components/shared/navbar";
import { AppProviders } from "@/providers";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
          <AppProviders>{children}</AppProviders>
        </div>
      </main>
      <footer className="border-t border-zinc-200 bg-white py-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="container mx-auto px-4 text-center text-sm text-zinc-500">
          <p>
            © {new Date().getFullYear()} CoursePlatform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
