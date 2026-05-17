import React from "react";
import { Search, RotateCcw } from "lucide-react";

type Props = {
  search: string;
  onSearchChange: (val: string) => void;
  onResetPage: () => void;
};

export default function AdminCoursesToolbar({
  search,
  onSearchChange,
  onResetPage,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 w-full sm:w-[420px]">
        <Search size={16} className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search course..."
          className="w-full text-[12px] font-semibold text-gray-700 placeholder:text-gray-400 outline-none"
        />
      </div>
      <button
        onClick={onResetPage}
        className="h-9 px-3 rounded-xl border border-gray-200 text-[12px] font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-2"
      >
        <RotateCcw size={14} /> Reset Page
      </button>
    </div>
  );
}
