import React from "react";
import { useLazyAdminCourseQuery } from "@/lib/api/admin/course";
import { Loader2 } from "lucide-react";
import ModalShell from "./ModalShell";

type Props = {
  id: number | string;
  open: boolean;
  onClose: () => void;
};

export default function ViewModal({ id, open, onClose }: Props) {
  const [trigger, { data, isFetching, isError }] = useLazyAdminCourseQuery();

  React.useEffect(() => {
    if (!open) return;
    trigger(id);
  }, [id, open, trigger]);

  return (
    <ModalShell
      title="Course Details"
      subtitle="GET /course/:id"
      loading={isFetching}
      onClose={onClose}
    >
      {isFetching ? (
        <div className="flex items-center justify-center gap-2 text-[12px] text-gray-500 font-semibold py-8">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </div>
      ) : isError ? (
        <div className="text-[12px] text-red-500 font-semibold py-4">
          Failed to load details
        </div>
      ) : (
        <pre className="text-[11px] text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3 overflow-auto max-h-[320px]">
          {JSON.stringify(data ?? null, null, 2)}
        </pre>
      )}
    </ModalShell>
  );
}