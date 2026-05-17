// StatusBadge.tsx
import { Status } from "./types";

export function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    Active: "text-emerald-600",
    Inactive: "text-amber-600",
    Deleted: "text-red-500",
  };
  const dotMap: Record<Status, string> = {
    Active: "bg-emerald-500",
    Inactive: "bg-amber-500",
    Deleted: "bg-red-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[12px] font-semibold ${map[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotMap[status]}`}
      />
      {status}
    </span>
  );
}
