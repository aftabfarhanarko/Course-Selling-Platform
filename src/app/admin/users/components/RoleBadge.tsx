// components/admin/users/RoleBadge.tsx
import { Role } from "./types";

export function RoleBadge({ role }: { role: Role }) {
  const styles: Record<string, string> = {
    Admin: "text-violet-700 bg-violet-50 border-violet-200",
    admin: "text-violet-700 bg-violet-50 border-violet-200",
    Student: "text-gray-600 bg-gray-50 border-gray-200",
    student: "text-gray-600 bg-gray-50 border-gray-200",
    Affiliate: "text-blue-700 bg-blue-50 border-blue-200",
    affiliate: "text-blue-700 bg-blue-50 border-blue-200",
    Buyer: "text-orange-700 bg-orange-50 border-orange-200",
    buyer: "text-orange-700 bg-orange-50 border-orange-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[role] || "text-gray-600 bg-gray-50 border-gray-200"}`}
    >
      {role}
    </span>
  );
}
