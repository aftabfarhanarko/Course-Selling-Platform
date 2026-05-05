import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span>CoursePlatform</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/student/courses" className="text-sm font-medium hover:text-zinc-600 dark:hover:text-zinc-400">
            Browse
          </Link>
          <Link href="/student/dashboard" className="text-sm font-medium hover:text-zinc-600 dark:hover:text-zinc-400">
            My Learning
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
