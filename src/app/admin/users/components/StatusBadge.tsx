// components/admin/users/StatusBadge.tsx
import { Status } from "./types";

export function StatusBadge({ status }: { status: Status }) {
  const styles = {
    Active: "text-emerald-700 bg-emerald-50 border-emerald-200",
    Suspended: "text-amber-700 bg-amber-50 border-amber-200",
    Deleted: "text-red-600 bg-red-50 border-red-200",
  };
  const dots = {
    Active: "bg-emerald-500",
    Suspended: "bg-amber-500",
    Deleted: "bg-red-500",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${styles[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}
