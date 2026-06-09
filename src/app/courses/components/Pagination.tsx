import { ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const goPage = (dir: number) =>
    onPageChange(Math.max(1, Math.min(totalPages, currentPage + dir)));

  // Smart page numbers — no duplicates
  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1.5 mt-12 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => goPage(-1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 transition-all"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
      </button>

      {/* Page numbers */}
      {getPages().map((page, i) =>
        page === "..." ? (
          <span
            key={`dots-${i}`}
            className="w-9 h-9 flex items-center justify-center text-slate-300 font-bold text-[13px]"
          >
            ···
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-[13px] font-bold border transition-all duration-200 ${
              currentPage === page
                ? "bg-gradient-to-br from-indigo-600 to-violet-600 border-transparent text-white shadow-md shadow-indigo-300/40"
                : "border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 bg-white"
            }`}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => goPage(1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 transition-all"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
