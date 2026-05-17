import { X } from "lucide-react";

export default function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold">
      {label}
      <button
        onClick={onRemove}
        className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-200 transition-colors"
      >
        <X className="w-2.5 h-2.5" />
      </button>
    </span>
  );
}