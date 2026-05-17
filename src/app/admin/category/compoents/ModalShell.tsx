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
  subtitle: string;
  loading?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={loading ? undefined : onClose}
      />
      <div
        className={`relative w-full ${wide ? "sm:max-w-xl" : "sm:max-w-md"} bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col`}
      >
        <div className="flex justify-center pt-2.5 sm:hidden shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-[15px] font-black text-gray-900 tracking-tight">
              {title}
            </h2>
            <p className="text-[10px] text-gray-400 mt-0.5 font-mono">
              {subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors disabled:opacity-50"
          >
            <X size={15} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="px-5 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
