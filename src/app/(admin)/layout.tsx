import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Students", href: "/admin/students", icon: Users },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 lg:block">
        <div className="flex h-16 items-center border-b border-zinc-200 px-6 dark:border-zinc-800">
          <Link href="/admin/dashboard" className="text-xl font-bold tracking-tight">
            AdminPanel
          </Link>
        </div>
        <div className="flex flex-col justify-between h-[calc(100%-64px)] p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button variant="ghost" className="w-full justify-start gap-3 px-3 text-zinc-600 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400">
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-8 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-medium text-zinc-500">Overview</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
