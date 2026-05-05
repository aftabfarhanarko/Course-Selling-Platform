import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AdminCoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Courses Management</h1>
          <p className="text-zinc-500">Create, edit, and manage your course catalog.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create Course
        </Button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="p-6">
          <p className="text-sm text-zinc-500">Course list will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}
