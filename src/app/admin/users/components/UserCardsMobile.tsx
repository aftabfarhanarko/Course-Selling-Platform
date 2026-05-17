// components/admin/users/UserCardsMobile.tsx
import {
  Eye,
  Shield,
  ShieldOff,
  Trash2,
  Phone,
  Globe,
  Calendar,
  Loader2,
} from "lucide-react";
import { UiUser } from "./types";
import { Avatar } from "./Avatar";
import { RoleBadge } from "./RoleBadge";
import { StatusBadge } from "./StatusBadge";

export function UserCardsMobile({
  isLoading,
  isError,
  users,
  onView,
  onBan,
  onUnban,
  onDelete,
  onRestore,
}: {
  isLoading: boolean;
  isError: boolean;
  users: UiUser[];
  onView: (user: UiUser) => void;
  onBan: (user: UiUser) => void;
  onUnban: (user: UiUser) => void;
  onDelete: (user: UiUser) => void;
  onRestore: (user: UiUser) => void;
}) {
  if (isLoading)
    return (
      <div className="py-16 flex items-center justify-center gap-2 text-[13px] text-gray-400">
        <Loader2 className="h-4 w-4 animate-spin text-indigo-500" /> Loading...
      </div>
    );
  if (isError)
    return (
      <div className="py-16 text-center text-[13px] text-red-500 font-semibold">
        Failed to load users.
      </div>
    );
  if (users.length === 0)
    return (
      <div className="py-16 text-center text-[13px] text-gray-400">
        No users found.
      </div>
    );

  return (
    <div className="divide-y divide-gray-100">
      {users.map((u) => (
        <div key={String(u.id)} className="p-4">
          <div className="flex items-start gap-3">
            <Avatar user={u} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-gray-900 truncate">
                    {u.name}
                  </p>
                  <p className="text-[11px] text-gray-400 truncate">
                    {u.email}
                  </p>
                </div>
                <StatusBadge status={u.status} />
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <RoleBadge role={u.role} />
                {u.phone && (
                  <span className="text-[11px] text-gray-500 flex items-center gap-1">
                    <Phone size={10} className="text-gray-400" />
                    {u.phone}
                  </span>
                )}
                {u.country && (
                  <span className="text-[11px] text-gray-500 flex items-center gap-1">
                    <Globe size={10} className="text-gray-400" />
                    {u.country}
                  </span>
                )}
                {u.joinDate !== "—" && (
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Calendar size={10} />
                    {u.joinDate}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => onView(u)}
                  className="flex-1 py-2 rounded-xl border border-gray-200 text-[12px] font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye size={13} /> Details
                </button>
                {u.status === "Deleted" ? (
                  <button
                    onClick={() => onRestore(u)}
                    className="flex-1 py-2 rounded-xl border border-indigo-200 bg-indigo-50 text-[12px] font-bold text-indigo-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Shield size={13} /> Restore
                  </button>
                ) : u.status === "Active" ? (
                  <button
                    onClick={() => onBan(u)}
                    className="flex-1 py-2 rounded-xl border border-amber-200 bg-amber-50 text-[12px] font-bold text-amber-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShieldOff size={13} /> Ban
                  </button>
                ) : (
                  <button
                    onClick={() => onUnban(u)}
                    className="flex-1 py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-[12px] font-bold text-emerald-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Shield size={13} /> Unban
                  </button>
                )}
                <button
                  onClick={() => onDelete(u)}
                  className="w-9 h-9 rounded-xl border border-red-200 bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
