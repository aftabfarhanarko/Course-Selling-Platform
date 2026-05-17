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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={loading ? undefined : onClose}
      />
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-center">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
            confirmTone === "danger" ? "bg-red-50" : "bg-indigo-50"
          }`}
        >
          <AlertTriangle
            size={26}
            className={confirmTone === "danger" ? "text-red-500" : "text-indigo-600"}
          />
        </div>
        <h3 className="text-[16px] font-black text-gray-900 mb-1.5">{title}</h3>
        <p className="text-[12px] text-gray-500 leading-relaxed">{description}</p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-[12px] font-bold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-3 rounded-xl text-white text-[12px] font-bold flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50 ${btnCls}`}
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}