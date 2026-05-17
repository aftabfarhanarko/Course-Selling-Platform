// ConfirmModal.tsx
import { AlertTriangle, Loader2 } from "lucide-react";

export function ConfirmModal({
  title,
  description,
  confirmText,
  confirmTone,
  loading,
  onClose,
  onConfirm,
}: {
  title: string;
  description: React.ReactNode;
  confirmText: string;
  confirmTone: "danger" | "primary";
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const btnCls =
    confirmTone === "danger"
      ? "bg-red-500 hover:bg-red-600 shadow-red-200"
      : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={loading ? undefined : onClose}
      />
      <div className="relative w-full sm:max-w-sm bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl p-6 text-center">
        <div className="flex justify-center mb-3 sm:hidden" aria-hidden>
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${confirmTone === "danger" ? "bg-red-50" : "bg-indigo-50"}`}
        >
          <AlertTriangle
            size={26}
            className={
              confirmTone === "danger" ? "text-red-500" : "text-indigo-500"
            }
          />
        </div>
        <h3 className="text-[15px] font-extrabold text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-[12px] text-gray-500 leading-relaxed">
          {description}
        </p>
        <div className="flex gap-2.5 mt-5">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 sm:py-2.5 rounded-xl border-2 border-gray-200 text-[13px] sm:text-[12px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-3 sm:py-2.5 rounded-xl text-white text-[13px] sm:text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-lg transition-colors disabled:opacity-60 disabled:pointer-events-none ${btnCls}`}
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
