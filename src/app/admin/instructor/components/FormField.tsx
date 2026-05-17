// FormField.tsx
export function FormField({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
        {label}{" "}
        {optional && (
          <span className="text-gray-300 normal-case font-normal">
            (optional)
          </span>
        )}
      </label>
      {children}
      {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export function inputCls(error?: string) {
  return `w-full h-10 sm:h-9 px-3 text-[13px] sm:text-[12px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
    error ? "border-red-400 bg-red-50" : "border-gray-200"
  }`;
}
