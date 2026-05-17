// DetailsModal.tsx
import React, { useEffect, useMemo } from "react";
import { Globe, Github, Linkedin, Loader2 } from "lucide-react";
import { useLazyAdminInstructorQuery } from "@/lib/api/admin/instructor";
import { ModalShell } from "./ModalShell";
import { Avatar } from "./Avatar";
import { StatusBadge } from "./StatusBadge";
import { SkillTags } from "./SkillTags";
import { toUiInstructor } from "./utils";

export function DetailsModal({
  id,
  onClose,
}: {
  id: number | string;
  onClose: () => void;
}) {
  const [trigger, { data, isFetching, isError }] =
    useLazyAdminInstructorQuery();

  useEffect(() => {
    trigger(id);
  }, [id, trigger]);

  const instructor = useMemo(() => {
    if (!data) return null;
    const raw = data?.data ?? data;
    return toUiInstructor(raw);
  }, [data]);

  return (
    <ModalShell
      title="Instructor Details"
      subtitle="GET /instructor/:id"
      loading={isFetching}
      onClose={onClose}
      wide
    >
      {isFetching ? (
        <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold py-10">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </div>
      ) : isError ? (
        <div className="text-[12px] text-red-500 font-semibold py-4">
          Failed to load details.
        </div>
      ) : instructor ? (
        <div className="space-y-5">
          <div className="flex items-center gap-3 flex-wrap">
            <Avatar name={instructor.name} photo={instructor.photo} size="lg" />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-extrabold text-gray-900 truncate">
                {instructor.name}
              </p>
              <p className="text-[11px] text-gray-400 truncate">
                {instructor.email}
              </p>
            </div>
            <StatusBadge status={instructor.status} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {(
              [
                "Designation",
                "Experience",
                "Phone",
                "Country",
                "Role",
                "Joined",
              ] as const
            ).map((label) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                  {label}
                </p>
                <p className="text-[12px] font-semibold text-gray-800 break-words">
                  {instructor[label.toLowerCase() as keyof typeof instructor] ||
                    "—"}
                </p>
              </div>
            ))}
          </div>

          {instructor.bio && (
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Bio
              </p>
              <p className="text-[12px] text-gray-600 leading-relaxed">
                {instructor.bio}
              </p>
            </div>
          )}

          {instructor.skills.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Skills
              </p>
              <SkillTags skills={instructor.skills} max={20} />
            </div>
          )}

          {(instructor.website || instructor.github || instructor.linkedin) && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Links
              </p>
              {instructor.website && (
                <a
                  href={instructor.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[12px] text-indigo-600 hover:underline break-all"
                >
                  <Globe size={13} className="flex-shrink-0" />{" "}
                  {instructor.website}
                </a>
              )}
              {instructor.github && (
                <a
                  href={instructor.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[12px] text-indigo-600 hover:underline break-all"
                >
                  <Github size={13} className="flex-shrink-0" />{" "}
                  {instructor.github}
                </a>
              )}
              {instructor.linkedin && (
                <a
                  href={instructor.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[12px] text-indigo-600 hover:underline break-all"
                >
                  <Linkedin size={13} className="flex-shrink-0" />{" "}
                  {instructor.linkedin}
                </a>
              )}
            </div>
          )}
        </div>
      ) : (
        <pre className="text-[11px] text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 overflow-auto max-h-[320px]">
          {JSON.stringify(data ?? null, null, 2)}
        </pre>
      )}
    </ModalShell>
  );
}
