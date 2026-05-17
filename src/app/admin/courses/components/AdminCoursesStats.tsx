import React from "react";

type Props = {
  total: number;
  active: number;
  deleted: number;
};

export default function AdminCoursesStats({ total, active, deleted }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
      <div className="bg-indigo-600 rounded-xl p-4 text-white shadow-lg shadow-indigo-200">
        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">
          Total Courses
        </p>
        <p className="mt-1 text-[26px] font-extrabold">{total}</p>
      </div>
      <div className="bg-white border border-emerald-200 rounded-xl p-4 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
          Active
        </p>
        <p className="mt-1 text-[26px] font-extrabold text-gray-900">
          {active}
        </p>
      </div>
      <div className="bg-white border border-amber-200 rounded-xl p-4 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
          Deleted
        </p>
        <p className="mt-1 text-[26px] font-extrabold text-gray-900">
          {deleted}
        </p>
      </div>
    </div>
  );
}
