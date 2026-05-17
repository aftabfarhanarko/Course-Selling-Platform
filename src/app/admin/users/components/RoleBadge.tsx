// components/admin/users/RoleBadge.tsx
import { Role } from "./types";

export function RoleBadge({ role }: { role: Role }) {
  const styles = {
    Admin: "text-violet-700 bg-violet-50 border-violet-200",
    Instructor: "text-blue-700 bg-blue-50 border-blue-200",
    Student: "text-gray-600 bg-gray-50 border-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[role]}`}
    >
      {role}
    </span>
  );
}
