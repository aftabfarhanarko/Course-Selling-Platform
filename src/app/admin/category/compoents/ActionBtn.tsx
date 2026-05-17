// ActionBtn.tsx
export function ActionBtn({
  children,
  onClick,
  title,
  color,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  color: "gray" | "indigo" | "amber" | "red";
}) {
  const styles = {
    gray: "border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-500",
    indigo:
      "border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-600",
    amber: "border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-600",
    red: "border-red-200 bg-red-50 hover:bg-red-100 text-red-500",
  };
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-xl border transition-colors ${styles[color]}`}
    >
      {children}
    </button>
  );
}
