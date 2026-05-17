// InstructorCard.tsx
import { Eye, RefreshCw, Trash2 } from "lucide-react";
import { UiInstructor } from "./types";
import { Avatar } from "./Avatar";
import { StatusBadge } from "./StatusBadge";
import { SkillTags } from "./SkillTags";

export function InstructorCard({
  u,
  busy,
  onDetails,
  onDelete,
  onRestore,
}: {
  u: UiInstructor;
  busy: boolean;
  onDetails: () => void;
  onDelete: () => void;
  onRestore: () => void;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar name={u.name} photo={u.photo} size="md" />
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-gray-900 truncate">
              {u.name}
            </p>
            <p className="text-[11px] text-gray-400 truncate">{u.email}</p>
          </div>
        </div>
        <div className="flex-shrink-0 mt-0.5">
          <StatusBadge status={u.status} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px]">
        {u.designation && (
          <div>
            <p className="text-gray-400 font-medium">Designation</p>
            <p className="text-gray-700 font-semibold truncate">
              {u.designation}
            </p>
          </div>
        )}
        {u.experience && (
          <div>
            <p className="text-gray-400 font-medium">Experience</p>
            <p className="text-gray-700 font-semibold">{u.experience}</p>
          </div>
        )}
        {u.phone && (
          <div>
            <p className="text-gray-400 font-medium">Phone</p>
            <p className="text-gray-700 font-semibold truncate">{u.phone}</p>
          </div>
        )}
        {u.country && (
          <div>
            <p className="text-gray-400 font-medium">Country</p>
            <p className="text-gray-700 font-semibold">{u.country}</p>
          </div>
        )}
        {u.joinDate !== "—" && (
          <div className="col-span-2">
            <p className="text-gray-400 font-medium">Joined</p>
            <p className="text-gray-700 font-semibold">{u.joinDate}</p>
          </div>
        )}
      </div>

      {u.skills.length > 0 && <SkillTags skills={u.skills} max={3} />}

      <div className="flex items-center gap-2 pt-1 border-t border-gray-50">
        <button
          onClick={onDetails}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 text-[12px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Eye size={13} /> Details
        </button>
        {u.status === "Deleted" ? (
          <button
            onClick={onRestore}
            disabled={busy}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-[12px] font-bold text-indigo-700 hover:bg-indigo-100 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            <RefreshCw size={12} /> Restore
          </button>
        ) : (
          <button
            onClick={onDelete}
            disabled={busy}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-red-200 bg-red-50 text-[12px] font-bold text-red-600 hover:bg-red-100 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            <Trash2 size={12} /> Delete
          </button>
        )}
      </div>
    </div>
  );
}
