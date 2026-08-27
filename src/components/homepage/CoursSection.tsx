"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { ArrowRight, Star, Users, Clock, Heart } from "lucide-react";
import { useGetPublicCoursesQuery } from "@/lib/api/courseApi";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// ── skeleton ─────────────────────────────────────────────────────────────────
function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden flex flex-col">
      <div className="h-48 sm:h-52 bg-gray-100 animate-pulse" />
      <div className="px-5 -mt-7 relative z-10">
        <div className="h-14 bg-gray-100 rounded-2xl animate-pulse border border-gray-200" />
      </div>
      <div className="p-6 pt-4 flex flex-col gap-3">
        <div className="h-2.5 w-20 bg-gray-100 rounded-full animate-pulse" />
        <div className="h-4 w-full bg-gray-100 rounded-full animate-pulse" />
        <div className="h-4 w-3/4 bg-gray-100 rounded-full animate-pulse" />
        <div className="h-8 w-24 bg-gray-100 rounded-lg animate-pulse mt-1" />
        <div className="h-12 w-full bg-gray-100 rounded-2xl animate-pulse mt-1" />
      </div>
    </div>
  );
}

// ── card ─────────────────────────────────────────────────────────────────────
function CourseCard({
  course,
  index,
  isInView,
}: {
  course: any;
  index: number;
  isInView: boolean;
}) {
  const [saved, setSaved] = useState(false);
  const baseDelay = index * 0.15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: baseDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_28px_56px_-20px_rgba(0,82,204,0.28)] hover:-translate-y-1.5 hover:border-transparent transition-all duration-500 ease-out flex flex-col"
    >
      {/* image */}
      <div
        className="relative h-48 sm:h-52 overflow-hidden flex-shrink-0"
        style={{ backgroundColor: course.imageBg }}
      >
        <motion.img
          src={course.imageUrl}
          alt={course.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          initial={{ scale: 1.1 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: baseDelay + 0.15, duration: 0.8, ease: "easeOut" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        {/* legibility gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10 pointer-events-none" />

        {/* top row: level/tag pill + save button (glass) */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between">
          <motion.span
            className="text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-md backdrop-blur-md bg-white/90 border border-white/60"
            style={{ color: course.tagColor }}
            initial={{ opacity: 0, y: -6, scale: 0.85 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: baseDelay + 0.4, duration: 0.4, type: "spring", stiffness: 220 }}
          >
            {course.tag}
          </motion.span>

          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setSaved((s) => !s);
            }}
            aria-label={saved ? "Remove from wishlist" : "Save course"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: baseDelay + 0.45, duration: 0.35 }}
            className="w-8 h-8 rounded-full bg-white/85 backdrop-blur-md border border-white/60 shadow-md flex items-center justify-center hover:bg-white hover:scale-110 active:scale-90 transition-all duration-200"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                saved ? "fill-rose-500 text-rose-500" : "text-gray-500"
              }`}
            />
          </motion.button>
        </div>
      </div>

      {/* floating glass stat bar — overlaps image + body */}
      <div className="relative px-5">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: baseDelay + 0.32, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 -mt-7 flex items-center justify-between backdrop-blur-xl bg-white/80 border border-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.09)] rounded-2xl px-4 py-3"
        >
          <span className="flex items-center gap-1.5 text-[13px] font-extrabold text-gray-900">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            {course.rating}
            <span className="text-[11px] font-medium text-gray-400">({course.reviews})</span>
          </span>
          <span className="w-px h-4 bg-gray-200" />
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-600">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            {course.duration}
          </span>
          <span className="w-px h-4 bg-gray-200" />
          <span className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-600">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            {course.students}
          </span>
        </motion.div>
      </div>

      {/* body */}
      <div className="px-6 pt-4 pb-6 flex flex-col flex-1">
        {/* category */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: baseDelay + 0.4, duration: 0.4 }}
          className="flex items-center gap-1.5 text-[10.5px] font-extrabold tracking-[0.14em] mb-2.5 uppercase"
          style={{ color: course.categoryColor }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: course.categoryColor }} />
          {course.category}
        </motion.p>

        {/* title */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: baseDelay + 0.46, duration: 0.4 }}
          className="text-[17px] font-bold text-gray-900 leading-[1.4] mb-4 flex-1 line-clamp-2 min-h-[3.1rem]"
        >
          {course.title}
        </motion.h3>

        {/* price */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: baseDelay + 0.52, duration: 0.4 }}
          className="flex items-center justify-between mb-5"
        >
          <div className="flex items-baseline gap-2">
            <span className="text-[22px] font-extrabold text-gray-900 tracking-tight">
              {course.price}
            </span>
            {course.originalPrice && (
              <span className="text-[13px] font-medium text-gray-400 line-through">
                {course.originalPrice}
              </span>
            )}
          </div>
          {course.discountPercent ? (
            <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
              {course.discountPercent}% OFF
            </span>
          ) : null}
        </motion.div>

        {/* enroll button — glass icon chip + shine sweep */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: baseDelay + 0.58, duration: 0.4 }}
        >
          <Link href={`/courses/${course.id}`}>
            <motion.button
              className="group/btn relative w-full py-3.5 rounded-2xl text-[14px] font-bold text-white tracking-wide flex items-center justify-center gap-2 overflow-hidden"
              style={{
                backgroundColor: course.accent,
                boxShadow: `0 16px 30px -12px ${course.accent}99`,
              }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* shine sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
              <span className="relative z-10">Enroll Now</span>
              <span className="relative z-10 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover/btn:translate-x-1 group-hover/btn:bg-white/30 transition-all duration-300">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── main ─────────────────────────────────────────────────────────────────────
const CourseSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { data, isLoading } = useGetPublicCoursesQuery({ page: 1, limit: 4 });

  const fallbackCourses = [
    {
      id: "fallback-1",
      tag: "Best Seller",
      tagColor: "#d97706",
      tagBg: "#fef3c7",
      category: "WEB DEVELOPMENT",
      categoryColor: "#0052CC",
      title: "Next.js 14 Production Architecture & SaaS Blueprint",
      price: "$99",
      originalPrice: "$149",
      discountPercent: 34,
      rating: "4.9",
      reviews: "412",
      students: "3.4k",
      duration: "48h",
      imageBg: "#f0ece4",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=85",
      imageAlt: "Next.js Course",
      accent: "#0052CC",
    },
    {
      id: "fallback-2",
      tag: "High Potential",
      tagColor: "#16a34a",
      tagBg: "#dcfce7",
      category: "DEVOPS",
      categoryColor: "#0052CC",
      title: "Mastering Kubernetes, Docker & GitOps Pipelines",
      price: "$129",
      originalPrice: null,
      discountPercent: null,
      rating: "4.8",
      reviews: "268",
      students: "2.1k",
      duration: "35h",
      imageBg: "#d1fae5",
      imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=700&q=85",
      imageAlt: "Kubernetes Course",
      accent: "#006E2A",
    },
    {
      id: "fallback-3",
      tag: "Popular",
      tagColor: "#0369a1",
      tagBg: "#e0f2fe",
      category: "PROGRAMMING",
      categoryColor: "#0052CC",
      title: "Advanced TypeScript, Architecture & Design Patterns",
      price: "$79",
      originalPrice: "$99",
      discountPercent: 20,
      rating: "4.9",
      reviews: "531",
      students: "4.5k",
      duration: "30h",
      imageBg: "#0d9488",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=85",
      imageAlt: "TypeScript Course",
      accent: "#705D00",
    },
    {
      id: "fallback-4",
      tag: "Special Track",
      tagColor: "#7e22ce",
      tagBg: "#f3e8ff",
      category: "SAAS BUSINESS",
      categoryColor: "#0052CC",
      title: "Fullstack SaaS Boilerplate, Stripe & AI Integrations",
      price: "$149",
      originalPrice: null,
      discountPercent: null,
      rating: "5.0",
      reviews: "156",
      students: "1.8k",
      duration: "55h",
      imageBg: "#e0f2fe",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=85",
      imageAlt: "SaaS Course",
      accent: "#1d4ed8",
    },
  ];

  const mappedCourses =
    data?.items && data.items.length > 0
      ? data.items.map((c, idx) => {
          const colors = [
            { tagColor: "#15803d", tagBg: "#dcfce7", imageBg: "#f0ece4", accent: "#0052CC" },
            { tagColor: "#15803d", tagBg: "#dcfce7", imageBg: "#d1fae5", accent: "#006E2A" },
            { tagColor: "#15803d", tagBg: "#dcfce7", imageBg: "#0d9488", accent: "#705D00" },
            { tagColor: "#1e3a8a", tagBg: "#dbeafe", imageBg: "#e0f2fe", accent: "#1d4ed8" },
          ];
          const colorSet = colors[idx % colors.length];

          const coursePrice = parseFloat(c.price || "0");
          const discount = parseFloat(c.discountPrice || "0");
          const hasDiscount = discount > 0 && coursePrice > discount;
          const displayPrice = hasDiscount
            ? `$${discount}`
            : coursePrice > 0
            ? `$${coursePrice}`
            : "Free";
          const discountPercent = hasDiscount
            ? Math.round((1 - discount / coursePrice) * 100)
            : null;

          const enrollment = c.enrollmentCount || 0;

          return {
            id: c.id,
            tag: c.metadata?.level
              ? `${c.metadata.level} Level`
              : coursePrice > 50
              ? "High Potential"
              : "Popular",
            tagColor: colorSet.tagColor,
            tagBg: colorSet.tagBg,
            category: c.category?.name || "DEVELOPMENT",
            categoryColor: "#0052CC",
            title: c.title,
            price: displayPrice,
            originalPrice: hasDiscount ? `$${coursePrice}` : null,
            discountPercent,
            rating: (4.7 + (idx % 3) * 0.1).toFixed(1),
            reviews: enrollment ? Math.max(12, Math.round(enrollment * 0.12)) : "89",
            students: enrollment ? `${enrollment}` : "1.2k",
            duration: c.metadata?.duration || "40h",
            imageBg: colorSet.imageBg,
            imageUrl:
              c.thumbnail ||
              "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=85",
            imageAlt: c.title,
            accent: colorSet.accent,
          };
        })
      : fallbackCourses;

  return (
    <section ref={ref} className={`py-10 md:py-13 bg-transparent ${plusJakarta.className}`}>
      <div className="max-w-10/12 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── header ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 md:mb-12 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#0052CC] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
              Curated Catalog
            </span>
            <h2
              className="font-extrabold text-gray-900 tracking-tight leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 6vw, 2rem)" }}
            >
              Explore Our Courses
            </h2>
            <p className="text-gray-400 mt-2 text-sm sm:text-[12px] font-medium max-w-[260px] sm:max-w-none">
              Curated paths to high-income mastery.
            </p>
          </div>

          <Link href="/courses" className="flex items-center self-start sm:self-auto flex-shrink-0">
            <motion.span
              className="flex items-center gap-1.5 text-[#0052CC] font-semibold text-sm sm:text-[14px] group/link"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              View All Courses
              <motion.span className="inline-flex" initial={{ x: 0 }} whileHover={{ x: 4 }}>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
              </motion.span>
            </motion.span>
          </Link>
        </motion.div>

        {/* ── cards ── */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mappedCourses.map((course, idx) => (
              <CourseCard key={course.id} course={course} index={idx} isInView={isInView} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseSection;