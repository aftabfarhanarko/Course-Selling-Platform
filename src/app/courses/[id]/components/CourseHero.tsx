// app/courses/[id]/components/CourseHero.tsx
import { Star, Clock, PlayCircle, ShieldCheck } from "lucide-react";

interface Props {
  course: {
    title: string;
    desc: string;
    image: string;
    category: string;
    rating: number;
    reviews: string;
  };
}

export default function CourseHero({ course }: Props) {
  return (
    <div className="bg-slate-900 text-white pt-16 pb-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px]" />

      <div className="max-w-[1200px] mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-[11px] font-black tracking-widest uppercase">
              {course.category}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 text-[13px] font-bold">
              <ShieldCheck size={16} /> Certified Quality
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6">
            {course.title}
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
            {course.desc}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {Array.from({ length: Math.floor(course.rating) }).map(
                  (_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ),
                )}
              </div>
              <span className="font-bold text-[15px]">{course.rating}</span>
              <span className="text-slate-400 text-[14px]">
                ({course.reviews} reviews)
              </span>
            </div>
            <div className="h-5 w-px bg-slate-700 hidden sm:block" />
            <div className="flex items-center gap-2 text-slate-300 text-[14px] font-medium">
              <Clock size={18} className="text-slate-400" /> 14.5 Hours
              On‑Demand
            </div>
          </div>
        </div>

        <div className="relative group rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/50 aspect-video lg:aspect-auto lg:h-[400px] bg-slate-800">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors duration-500" />
          <div className="absolute inset-0 m-auto w-20 h-20 bg-white/20 hover:bg-blue-600 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-110 cursor-pointer">
            <PlayCircle size={36} className="text-white ml-1.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
