import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function StudentCoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Browse Courses</h1>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input className="pl-10" placeholder="Search for courses..." />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Course cards will go here */}
        <p className="text-zinc-500 col-span-full py-12 text-center">
          Start exploring our courses catalog.
        </p>
      </div>
    </div>
  );
}
