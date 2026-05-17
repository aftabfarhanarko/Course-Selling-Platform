import { Search } from "lucide-react";

export default function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-slate-400">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <Search className="w-7 h-7 opacity-40" />
      </div>
      <p className="text-base font-bold text-slate-600">
        No courses match your filters
      </p>
      <p className="text-sm mt-1 text-slate-400">
        Try adjusting your criteria.
      </p>
      <button
        onClick={onClear}
        className="mt-5 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}
