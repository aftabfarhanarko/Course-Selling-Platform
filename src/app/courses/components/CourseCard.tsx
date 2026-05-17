import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Course } from "./types";
import { CATEGORY_PALETTE } from "./utils";
import StarRating from "./StarRating";

interface Props {
  course: Course;
  index: number;
  categoryMeta: Record<
    string,
    { icon: React.ReactNode; color: string; bg: string }
  >;
}

export default function CourseCard({ course, index, categoryMeta }: Props) {
  const meta = categoryMeta[course.category] ?? CATEGORY_PALETTE[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
    >
      <div className="relative h-44 overflow-hidden bg-slate-100 flex-shrink-0">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-emerald-500/30">
          <Sparkles className="w-2.5 h-2.5" />
          {course.potential}
        </div>
        <span
          className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md bg-white/80 ${meta.color} ${meta.bg}`}
        >
          {course.category}
        </span>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-black text-emerald-700 tracking-wide">
            {course.commission}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-[14.5px] font-bold text-slate-900 leading-snug flex-1 group-hover:text-blue-600 transition-colors line-clamp-2">
            {course.title}
          </h3>
          <div className="text-right shrink-0">
            <span className="text-[18px] font-extrabold text-slate-900">
              ${course.price}
            </span>
          </div>
        </div>
        <p className="text-[12px] text-slate-500 leading-relaxed mb-4 line-clamp-2 flex-1">
          {course.desc}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <StarRating rating={course.rating} />
            <span className="text-[12px] font-bold text-slate-800">
              {course.rating}
            </span>
            <span className="text-[11px] text-slate-400">
              ({course.reviews})
            </span>
          </div>
        </div>
        <Link
          href={`/courses/${course.id}`}
          className="group/btn w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-[12.5px] font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-blue-500/30 hover:shadow-lg"
        >
          View Details{" "}
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
