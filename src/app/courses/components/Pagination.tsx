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

  return (
    <div className="flex items-center justify-center gap-1.5 mt-12 flex-wrap">
      <button
        onClick={() => goPage(-1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-30 transition-all"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
      </button>
      {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`w-9 h-9 flex items-center justify-center rounded-xl text-[13px] font-bold border transition-all ${currentPage === i + 1 ? "bg-slate-900 border-slate-900 text-white shadow-sm" : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 bg-white"}`}
        >
          {i + 1}
        </button>
      ))}
      <span className="text-slate-300 font-bold px-1">···</span>
      <button
        onClick={() => onPageChange(totalPages)}
        className={`w-9 h-9 flex items-center justify-center rounded-xl text-[13px] font-bold border transition-all ${currentPage === totalPages ? "bg-slate-900 border-slate-900 text-white" : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 bg-white"}`}
      >
        {totalPages}
      </button>
      <button
        onClick={() => goPage(1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-30 transition-all"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
