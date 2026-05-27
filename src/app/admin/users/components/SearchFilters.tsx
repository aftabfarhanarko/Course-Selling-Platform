// components/admin/users/SearchFilters.tsx
import { Search, X } from "lucide-react";
import { Role, Status } from "./types";

export function SearchFilters({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  onSearchChange,
}: {
  search: string;
  setSearch: (v: string) => void;
  roleFilter: "All" | Role;
  setRoleFilter: (v: "All" | Role) => void;
  statusFilter: "All" | Status;
  setStatusFilter: (v: "All" | Status) => void;
  onSearchChange?: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 sm:p-4 mb-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 flex-1 min-w-0 bg-gray-50 rounded-xl px-3 py-2">
        <Search size={14} className="text-gray-400 flex-shrink-0" />
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearchChange?.();
          }}
          placeholder="Search name, email, phone, country..."
          className="w-full text-[13px] font-medium text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
        />
        {search && (
          <button
            onClick={() => {
              setSearch("");
              onSearchChange?.();
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={13} />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value as any);
            onSearchChange?.();
          }}
          className="h-9 px-3 text-[12px] font-semibold border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="All">All Roles</option>
          <option value="student">Student</option>
          <option value="buyer">Buyer</option>
          <option value="affiliate">Affiliate</option>
          <option value="admin">Admin</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as any);
            onSearchChange?.();
          }}
          className="h-9 px-3 text-[12px] font-semibold border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Suspended">Suspended</option>
          <option value="Deleted">Deleted</option>
        </select>
      </div>
    </div>
  );
}
