import { Suspense } from "react";
import CourseList from "./components/CourseList";

export default function CoursesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-[#f8f9fc]">
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-sm font-medium">Loading courses...</span>
          </div>
        </div>
      }
    >
      <CourseList />
    </Suspense>
  );
}
