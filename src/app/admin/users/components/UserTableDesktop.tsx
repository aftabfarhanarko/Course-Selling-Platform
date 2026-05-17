// components/admin/users/UserTableDesktop.tsx
import {
  Eye,
  Shield,
  ShieldOff,
  Trash2,
  Phone,
  Globe,
  Hash,
  Send,
  MessageCircle,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { UiUser } from "./types";
import { Avatar } from "./Avatar";
import { RoleBadge } from "./RoleBadge";
import { StatusBadge } from "./StatusBadge";

export function UserTableDesktop({
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
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-100 bg-gray-50/80">
          {[
            "User",
            "Role",
            "Phone",
            "Country",
            "Refer Code",
            "Telegram",
            "WhatsApp",
            "NID",
            "Joined",
            "Status",
            "Actions",
          ].map((h) => (
            <th
              key={h}
              className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-3 whitespace-nowrap"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {isLoading ? (
          <tr>
            <td colSpan={11} className="py-16 text-center">
              <div className="flex items-center justify-center gap-2 text-[13px] text-gray-400 font-semibold">
                <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />{" "}
                Loading users...
              </div>
            </td>
          </tr>
        ) : isError ? (
          <tr>
            <td
              colSpan={11}
              className="py-16 text-center text-[13px] text-red-500 font-semibold"
            >
              Failed to load users.
            </td>
          </tr>
        ) : users.length === 0 ? (
          <tr>
            <td
              colSpan={11}
              className="py-16 text-center text-[13px] text-gray-400"
            >
              No users found.
            </td>
          </tr>
        ) : (
          users.map((u) => (
            <tr
              key={String(u.id)}
              className="hover:bg-indigo-50/20 transition-colors"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <Avatar user={u} size="sm" />
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold text-gray-900 whitespace-nowrap">
                      {u.name}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate max-w-[150px]">
                      {u.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <RoleBadge role={u.role} />
              </td>
              <td className="px-4 py-3 text-[12px] text-gray-600 whitespace-nowrap">
                {u.phone ? (
                  <span className="flex items-center gap-1">
                    <Phone size={10} className="text-gray-400" />
                    {u.phone}
                  </span>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-[12px] text-gray-600 whitespace-nowrap">
                {u.country ? (
                  <span className="flex items-center gap-1">
                    <Globe size={10} className="text-gray-400" />
                    {u.country}
                  </span>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
              <td className="px-4 py-3">
                {u.referCode ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-violet-50 border border-violet-100 rounded-lg text-[11px] font-mono font-semibold text-violet-700">
                    <Hash size={9} />
                    {u.referCode}
                  </span>
                ) : (
                  <span className="text-gray-300 text-[12px]">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-[12px] whitespace-nowrap">
                {u.telegram ? (
                  <span className="flex items-center gap-1 text-blue-500">
                    <Send size={10} />
                    {u.telegram}
                  </span>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-[12px] whitespace-nowrap">
                {u.whatsapp ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <MessageCircle size={10} />
                    {u.whatsapp}
                  </span>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </td>
              <td className="px-4 py-3">
                {u.nidFrontSide || u.nidBackSide ? (
                  <div className="flex items-center gap-1">
                    {u.nidFrontSide && (
                      <a
                        href={u.nidFrontSide}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="NID Front"
                        className="flex items-center gap-0.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg px-1.5 py-0.5 hover:bg-indigo-100 transition-colors"
                      >
                        <ImageIcon size={9} /> F
                      </a>
                    )}
                    {u.nidBackSide && (
                      <a
                        href={u.nidBackSide}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="NID Back"
                        className="flex items-center gap-0.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg px-1.5 py-0.5 hover:bg-indigo-100 transition-colors"
                      >
                        <ImageIcon size={9} /> B
                      </a>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-300 text-[12px]">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-[12px] text-gray-500 whitespace-nowrap">
                {u.joinDate}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={u.status} />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onView(u)}
                    title="View"
                    className="p-2 rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 text-gray-500 hover:text-indigo-600 transition-all"
                  >
                    <Eye size={13} />
                  </button>
                  {u.status === "Deleted" ? (
                    <button
                      onClick={() => onRestore(u)}
                      title="Restore"
                      className="p-2 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors"
                    >
                      <Shield size={13} />
                    </button>
                  ) : u.status === "Active" ? (
                    <button
                      onClick={() => onBan(u)}
                      title="Ban"
                      className="p-2 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors"
                    >
                      <ShieldOff size={13} />
                    </button>
                  ) : (
                    <button
                      onClick={() => onUnban(u)}
                      title="Unban"
                      className="p-2 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                    >
                      <Shield size={13} />
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(u)}
                    title="Delete"
                    className="p-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
