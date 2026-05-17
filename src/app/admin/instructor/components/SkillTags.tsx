// SkillTags.tsx
export function SkillTags({
  skills,
  max = 2,
}: {
  skills: string[];
  max?: number;
}) {
  const visible = skills.slice(0, max);
  const extra = skills.length - max;
  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((s) => (
        <span
          key={s}
          className="inline-block bg-indigo-50 text-indigo-600 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-indigo-100"
        >
          {s}
        </span>
      ))}
      {extra > 0 && (
        <span className="inline-block bg-gray-100 text-gray-500 text-[10px] font-semibold px-2 py-0.5 rounded-full">
          +{extra}
        </span>
      )}
    </div>
  );
}
