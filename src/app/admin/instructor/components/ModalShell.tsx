// ModalShell.tsx
import { X } from "lucide-react";

export function ModalShell({
  title,
  subtitle,
  loading,
  onClose,
  children,
  wide,
}: {
  title: string;
  subtitle?: string;
  loading?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={loading ? undefined : onClose}
      />
      <div
        className={`relative w-full ${wide ? "sm:max-w-xl" : "sm:max-w-md"} bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col`}
        style={{ maxHeight: "92dvh" }}
      >
        <div className="flex justify-center pt-2.5 pb-0 sm:hidden" aria-hidden>
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-[14px] font-extrabold text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
