import React from "react";
import { BookOpen, CheckCircle2, Trash2 } from "lucide-react";

type Props = {
  total: number;
  active: number;
  deleted: number;
};

export default function AdminCoursesStats({ total, active, deleted }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total Courses */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 p-5 text-white shadow-xl shadow-indigo-200">
        <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-white/10 -translate-y-8 translate-x-8" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-100">
              Total Courses
            </p>

            <h3 className="mt-3 text-4xl font-extrabold">{total}</h3>

            <p className="mt-2 text-xs text-indigo-100">
              All courses in the platform
            </p>
          </div>

          <div className="h-14 w-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
            <BookOpen size={28} />
          </div>
        </div>
      </div>

      {/* Active */}
      <div className="group rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Active
            </p>

            <h3 className="mt-3 text-4xl font-extrabold text-gray-900">
              {active}
            </h3>

            <p className="mt-2 text-xs text-gray-500">
              Currently published courses
            </p>
          </div>

          <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 size={28} className="text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Deleted */}
      <div className="group rounded-3xl border border-amber-100 bg-white p-5 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600">
              Deleted
            </p>

            <h3 className="mt-3 text-4xl font-extrabold text-gray-900">
              {deleted}
            </h3>

            <p className="mt-2 text-xs text-gray-500">
              Removed or archived courses
            </p>
          </div>

          <div className="h-14 w-14 rounded-2xl bg-amber-50 flex items-center justify-center">
            <Trash2 size={28} className="text-amber-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
