"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Clock, Heart } from "lucide-react";
import { Course } from "./types";

interface Props {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: Props) {
  const [saved, setSaved] = useState(false);
  const baseDelay = (index % 8) * 0.08;

  const originalPrice = course.price > 0 ? `$${course.price + 40}` : null;
  const discountPercent = course.price > 0 ? 30 : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: baseDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_28px_56px_-20px_rgba(0,82,204,0.28)] hover:-translate-y-1.5 hover:border-transparent transition-all duration-500 ease-out flex flex-col h-full"
    >
      {/* ── Image Header ── */}
      <div className="relative h-48 sm:h-52 overflow-hidden flex-shrink-0 bg-slate-100">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=85";
          }}
        />

        {/* Legibility Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10 pointer-events-none" />

        {/* Top Row: Level/Potential Pill + Save Button */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between z-10">
          <span className="text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-md backdrop-blur-md bg-white/90 border border-white/60 text-amber-700">
            {course.potential || "Best Seller"}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setSaved((s) => !s);
            }}
            aria-label={saved ? "Remove from wishlist" : "Save course"}
            className="w-8 h-8 rounded-full bg-white/85 backdrop-blur-md border border-white/60 shadow-md flex items-center justify-center hover:bg-white hover:scale-110 active:scale-90 transition-all duration-200"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                saved ? "fill-rose-500 text-rose-500" : "text-gray-500"
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Floating Glass Stat Bar ── */}
      <div className="relative px-5">
        <div className="relative z-10 -mt-7 flex items-center justify-between backdrop-blur-xl bg-white/85 border border-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.09)] rounded-2xl px-4 py-2.5">
          <span className="flex items-center gap-1.5 text-[13px] font-extrabold text-gray-900">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            {course.rating || "4.9"}
            <span className="text-[11px] font-medium text-gray-400">
              ({course.reviews || "1.2k"})
            </span>
          </span>
          <span className="w-px h-4 bg-gray-200" />
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-600">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            40h
          </span>
          <span className="w-px h-4 bg-gray-200" />
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-600">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            2.4k
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-6 pt-4 pb-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Category */}
          <p className="flex items-center gap-1.5 text-[10.5px] font-extrabold tracking-[0.14em] mb-2 uppercase text-[#0052CC]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
            {course.category}
          </p>

          {/* Title */}
          <h3 className="text-[16px] font-bold text-gray-900 leading-[1.4] mb-2 line-clamp-2 group-hover:text-[#0052CC] transition-colors duration-200">
            {course.title}
          </h3>

          {/* Short Description */}
          <p className="text-[12.5px] text-gray-500 leading-relaxed line-clamp-2 mb-4">
            {course.desc}
          </p>
        </div>

        <div>
          {/* Price Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-[22px] font-extrabold text-gray-900 tracking-tight">
                ${course.price}
              </span>
              {originalPrice && (
                <span className="text-[13px] font-medium text-gray-400 line-through">
                  {originalPrice}
                </span>
              )}
            </div>
            {discountPercent && (
              <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Enroll Button */}
          <Link href={`/courses/${course.id}`}>
            <motion.button
              className="group/btn relative w-full py-3 rounded-2xl text-[14px] font-bold text-white tracking-wide flex items-center justify-center gap-2 overflow-hidden bg-[#0052CC] shadow-[0_12px_24px_-8px_rgba(0,82,204,0.4)]"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
              <span className="relative z-10">Enroll Now</span>
              <span className="relative z-10 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:bg-white/30 transition-all duration-300">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </span>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
