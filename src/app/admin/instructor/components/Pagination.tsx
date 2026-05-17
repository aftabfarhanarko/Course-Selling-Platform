// Pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2 flex-wrap">
      <p className="text-[11px] text-gray-400 font-semibold">
        Page <span className="text-gray-700">{page}</span> of{" "}
        <span className="text-gray-700">{totalPages}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft size={15} />
        </button>
        <span className="text-[12px] text-gray-700 font-semibold px-1">
          {page}/{totalPages}
        </span>
        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
