// components/admin/users/InfoRow.tsx
import React from "react";

export function InfoRow({
  icon,
  label,
  value,
  valueClass = "text-gray-800",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2.5 bg-white">
      <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wide min-w-[80px] flex-shrink-0">
        {icon}
        {label}
      </span>
      <span className={`text-[12px] font-semibold text-right break-all ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}