// components/admin/users/Pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}) {
  const safePage = Math.min(currentPage, totalPages);
  const start = totalItems === 0 ? 0 : (safePage - 1) * 8 + 1;
  const end = Math.min(safePage * 8, totalItems);
  return (
    <div className="px-4 py-4 border-t border-gray-100 flex items-center justify-between gap-3">
      <p className="text-[11px] text-gray-400 font-semibold">
        <span className="hidden sm:inline">Showing </span>
        <span className="text-gray-700">
          {start}–{end}
        </span>
        <span className="hidden sm:inline"> of </span>
        <span className="sm:hidden">/</span>
        <span className="text-gray-700"> {totalItems}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(safePage - 1)}
          disabled={safePage <= 1}
          className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-[12px] font-bold text-gray-600 min-w-[44px] text-center">
          {safePage}/{totalPages}
        </span>
        <button
          onClick={() => onPageChange(safePage + 1)}
          disabled={safePage >= totalPages}
          className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
