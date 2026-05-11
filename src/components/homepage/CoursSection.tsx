"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { ArrowRight, Star, Users, Clock } from "lucide-react";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// ── data ─────────────────────────────────────────────────────────────────────
const courses = [
  {
    id: 1,
    tag: "$2k+/mo Potential",
    tagColor: "#15803d",
    tagBg: "#dcfce7",
    category: "DESIGN & STRATEGY",
    categoryColor: "#0052CC",
    title: "High Income Skill: UI/UX Architecture",
    price: "$499",
    rating: "4.9",
    students: "12.4k",
    duration: "48h",
    imageBg: "#f0ece4",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=85",
    imageAlt: "UI/UX design on mobile",
    accent: "#0052CC",
  },
  {
    id: 2,
    tag: "$5k+/mo Potential",
    tagColor: "#15803d",
    tagBg: "#dcfce7",
    category: "MARKETING & SCALE",
    categoryColor: "#0052CC",
    title: "High Income Skill: Growth Systems",
    price: "$699",
    rating: "4.9",
    students: "9.1k",
    duration: "56h",
    imageBg: "#d1fae5",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=85",
    imageAlt: "Growth marketing charts",
    accent: "#006E2A",
  },
  {
    id: 3,
    tag: "$10k+/mo Potential",
    tagColor: "#15803d",
    tagBg: "#dcfce7",
    category: "BUSINESS DEVELOPMENT",
    categoryColor: "#0052CC",
    title: "High Income Skill: Elite Tech Sales",
    price: "$899",
    rating: "5.0",
    students: "6.8k",
    duration: "64h",
    imageBg: "#0d9488",
    imageUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&q=85",
    imageAlt: "Tech sales professional",
    accent: "#705D00",
  },
];

// ── card ─────────────────────────────────────────────────────────────────────
function CourseCard({
  course,
  index,
  isInView,
}: {
  course: (typeof courses)[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group bg-white rounded-[1.35rem] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_40px_rgba(0,82,204,0.13)] transition-shadow duration-500 flex flex-col"
    >
      {/* image */}
      <div
        className="relative h-52 overflow-hidden flex-shrink-0"
        style={{ backgroundColor: course.imageBg }}
      >
        <motion.img
          src={course.imageUrl}
          alt={course.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          initial={{ scale: 1.1 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{
            delay: index * 0.15 + 0.15,
            duration: 0.8,
            ease: "easeOut",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* potential badge */}
        <motion.span
          className="absolute top-3.5 right-3.5 text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm"
          style={{ backgroundColor: course.tagBg, color: course.tagColor }}
          initial={{ opacity: 0, y: -6, scale: 0.85 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            delay: index * 0.15 + 0.4,
            duration: 0.4,
            type: "spring",
            stiffness: 220,
          }}
        >
          {course.tag}
        </motion.span>
      </div>

      {/* body */}
      <div className="p-6 flex flex-col flex-1">
        {/* category */}
        <p
          className="text-[10.5px] font-extrabold tracking-[0.14em] mb-2.5 uppercase"
          style={{ color: course.categoryColor }}
        >
          {course.category}
        </p>

        {/* title */}
        <h3 className="text-[17px] font-bold text-gray-900 leading-[1.4] mb-4 flex-1">
          {course.title}
        </h3>

        {/* meta row */}
        <div className="flex items-center gap-4 text-[12px] text-gray-400 font-medium mb-5">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {course.students} students
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </span>
        </div>

        {/* divider */}
        <div className="h-px bg-gray-100 mb-4" />

        {/* price + rating */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-[22px] font-extrabold text-gray-900 tracking-tight">
            {course.price}
          </span>
          <span className="flex items-center gap-1 text-[13px] font-semibold text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {course.rating}
          </span>
        </div>

        {/* enroll button */}
        <Link href={`/courses/${course.id}`}>
          <motion.button
            className="w-full py-3 rounded-xl text-[14px] font-bold text-[#0052CC] tracking-wide transition-colors duration-200"
            style={{ backgroundColor: "#EEF2FF" }}
            whileHover={{ backgroundColor: "#DBEAFE" }}
            whileTap={{ scale: 0.98 }}
          >
            Enroll Now
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

// ── main ─────────────────────────────────────────────────────────────────────
const CourseSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className={`py-10 md:py-13 ${plusJakarta.className}`}
      style={{
        background:
          "linear-gradient(160deg, #EEF2FF 0%, #F4F7FF 55%, #EDF4FF 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── header ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 md:mb-12 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* left */}
          <div className="w-full">
            <h2
              className="font-extrabold text-gray-900 tracking-tight leading-[1.1]"
              style={{ fontSize: "clamp(2rem, 6vw, 2rem)" }}
            >
              Master Your Future
            </h2>

            <p className="text-gray-400 mt-2 text-sm sm:text-[12px] font-medium max-w-[260px] sm:max-w-none">
              Curated paths to high-income mastery.
            </p>
          </div>

          {/* right — "View All Courses →" */}
          <Link
            href="/courses"
            className="flex items-center self-start sm:self-auto flex-shrink-0"
          >
            <motion.span
              className="flex items-center gap-1.5 text-[#0052CC] font-semibold text-sm sm:text-[14px] group/link"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              View All Courses
              <motion.span
                className="inline-flex"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
              </motion.span>
            </motion.span>
          </Link>
        </motion.div>

        {/* ── cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, idx) => (
            <CourseCard
              key={course.id}
              course={course}
              index={idx}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
