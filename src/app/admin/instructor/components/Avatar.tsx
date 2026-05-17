// Avatar.tsx
import { useState } from "react";
import { initials } from "./utils";

export function Avatar({
  name,
  photo,
  size = "md",
}: {
  name: string;
  photo?: string;
  size?: "sm" | "md" | "lg";
}) {
  const [imgErr, setImgErr] = useState(false);
  const cls =
    size === "sm"
      ? "w-8 h-8 text-[10px]"
      : size === "lg"
        ? "w-12 h-12 text-[14px]"
        : "w-9 h-9 text-[11px]";

  if (photo && !imgErr) {
    return (
      <img
        src={photo}
        alt={name}
        onError={() => setImgErr(true)}
        className={`${cls} rounded-full object-cover flex-shrink-0 border border-indigo-100`}
      />
    );
  }
  return (
    <div
      className={`${cls} rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0`}
    >
      {initials(name)}
    </div>
  );
}
