// StatCards.tsx
import { FolderOpen, CheckCircle2, Trash2 } from "lucide-react";

export function StatCards({
  total,
  active,
  deleted,
}: {
  total: number;
  active: number;
  deleted: number;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {/* Total */}
      <div className="bg-indigo-600 rounded-2xl p-5 flex items-center gap-4 shadow-lg shadow-indigo-200">
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <FolderOpen size={22} className="text-white" />
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">
            Total Categories
          </p>
          <p className="text-[32px] font-black text-white leading-none mt-0.5 tabular-nums">
            {total}
          </p>
        </div>
      </div>

      {/* Active */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
          <CheckCircle2 size={22} className="text-emerald-500" />
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">
            Active
          </p>
          <p className="text-[32px] font-black text-gray-900 leading-none mt-0.5 tabular-nums">
            {active}
          </p>
        </div>
      </div>

      {/* Deleted */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
          <Trash2 size={22} className="text-red-400" />
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-red-400">
            Deleted
          </p>
          <p className="text-[32px] font-black text-gray-900 leading-none mt-0.5 tabular-nums">
            {deleted}
          </p>
        </div>
      </div>
    </div>
  );
}
