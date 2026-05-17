// components/admin/users/ConfirmModal.tsx
import React from "react";
import { Loader2, Trash2, ShieldOff, Shield } from "lucide-react";

type ConfirmTone = "danger" | "warning" | "primary";

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
  confirmTone: ConfirmTone;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const btnCls: Record<ConfirmTone, string> = {
    danger: "bg-red-500 hover:bg-red-600 shadow-red-100",
    warning: "bg-amber-500 hover:bg-amber-600 shadow-amber-100",
    primary: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100",
  };
  const iconEl: Record<ConfirmTone, React.ReactNode> = {
    danger: <Trash2 size={22} className="text-red-500" />,
    warning: <ShieldOff size={22} className="text-amber-500" />,
    primary: <Shield size={22} className="text-indigo-500" />,
  };
  const iconBg: Record<ConfirmTone, string> = {
    danger: "bg-red-50",
    warning: "bg-amber-50",
    primary: "bg-indigo-50",
  };
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full sm:max-w-sm bg-white sm:rounded-2xl rounded-t-3xl shadow-2xl p-6 text-center">
        <div
          className={`w-14 h-14 rounded-2xl ${iconBg[confirmTone]} flex items-center justify-center mx-auto mb-4`}
        >
          {iconEl[confirmTone]}
        </div>
        <h3 className="text-[16px] font-extrabold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-[13px] text-gray-500 leading-relaxed">
          {description}
        </p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-[13px] font-bold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-3 rounded-xl text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-lg transition-colors disabled:opacity-60 disabled:pointer-events-none ${btnCls[confirmTone]}`}
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
