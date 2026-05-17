// components/admin/users/Avatar.tsx
import { UiUser } from "./types";

export function Avatar({
  user,
  size = "md",
}: {
  user: UiUser;
  size?: "sm" | "md" | "lg";
}) {
  const dims = {
    sm: "w-8 h-8 text-[11px]",
    md: "w-9 h-9 text-[12px]",
    lg: "w-16 h-16 text-xl",
  };
  const radius = size === "lg" ? "rounded-2xl" : "rounded-xl";

  if (user.photoUrl) {
    return (
      <img
        src={user.photoUrl}
        alt={user.name}
        className={`${dims[size]} ${radius} object-cover flex-shrink-0 border-2 border-white shadow-sm`}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    );
  }
  return (
    <div
      className={`${dims[size]} ${radius} flex items-center justify-center font-extrabold flex-shrink-0`}
      style={{ background: user.avatarBg, color: user.avatarColor }}
    >
      {user.avatar}
    </div>
  );
}
