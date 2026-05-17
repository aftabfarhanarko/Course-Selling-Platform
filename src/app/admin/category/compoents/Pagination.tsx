// Pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  const safePage = Math.min(currentPage, totalPages);
  const start = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, totalItems);

  return (
    <div className="px-4 py-4 border-t border-gray-100 flex items-center justify-between">
      <p className="text-[11px] text-gray-400 font-semibold">
        Showing{" "}
        <span className="text-gray-700">
          {start}–{end}
        </span>{" "}
        of <span className="text-gray-700">{totalItems}</span>
      </p>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(safePage - 1)}
          disabled={safePage <= 1}
          className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft size={15} />
        </button>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const pg = i + 1;
          return (
            <button
              key={pg}
              onClick={() => onPageChange(pg)}
              className={`hidden sm:flex w-9 h-9 items-center justify-center rounded-xl text-[12px] font-bold transition-colors ${
                pg === safePage
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "border border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {pg}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(safePage + 1)}
          disabled={safePage >= totalPages}
          className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
