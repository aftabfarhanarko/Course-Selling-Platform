// components/admin/users/StatCards.tsx
import { Users, UserCheck, UserX, UserMinus } from "lucide-react";

export function StatCards({
  total,
  active,
  suspended,
  deleted,
}: {
  total: number;
  active: number;
  suspended: number;
  deleted: number;
}) {
  const cards = [
    {
      label: "Total Users",
      value: total,
      icon: <Users size={17} />,
      card: "bg-indigo-600 shadow-indigo-100",
      iconWrap: "bg-white/20 text-white",
      val: "text-white",
      lbl: "text-white/70",
    },
    {
      label: "Active",
      value: active,
      icon: <UserCheck size={17} />,
      card: "bg-white border border-gray-200",
      iconWrap: "bg-emerald-50 text-emerald-600",
      val: "text-emerald-600",
      lbl: "text-gray-400",
    },
    {
      label: "Suspended",
      value: suspended,
      icon: <UserX size={17} />,
      card: "bg-white border border-gray-200",
      iconWrap: "bg-amber-50 text-amber-600",
      val: "text-amber-600",
      lbl: "text-gray-400",
    },
    {
      label: "Deleted",
      value: deleted,
      icon: <UserMinus size={17} />,
      card: "bg-white border border-gray-200",
      iconWrap: "bg-red-50 text-red-500",
      val: "text-red-500",
      lbl: "text-gray-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
      {cards.map((s) => (
        <div
          key={s.label}
          className={`rounded-2xl p-4 shadow-sm flex items-center gap-3 ${s.card}`}
        >
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.iconWrap}`}
          >
            {s.icon}
          </div>
          <div>
            <p
              className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${s.lbl}`}
            >
              {s.label}
            </p>
            <p
              className={`text-[20px] sm:text-[24px] font-extrabold leading-none mt-0.5 ${s.val}`}
            >
              {s.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
