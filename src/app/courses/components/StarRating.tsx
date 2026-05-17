import { Star } from "lucide-react";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
        />
      ))}
    </div>
  );
}
