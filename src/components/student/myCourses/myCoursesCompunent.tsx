"use client";

import {
  Flame,
  MessageCircle,
  Play,
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Star,
  ChevronRight,
  Zap,
  Lock,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Course {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  progress?: number;
  lessonsCompleted?: number;
  totalLessons?: number;
  streak?: number;
  hours?: number;
  units?: number;
  badge?: string | null;
  badgeVariant?: "blue" | "purple" | "amber" | "emerald" | "rose";
  accent: string;
  accentLight: string;
  accentText: string;
  instructor?: string;
  rating?: number;
  isLocked?: boolean;
  nextLesson?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const COURSES: Course[] = [
  {
    id: 1,
    title: "Master the Digital Economy",
    subtitle: "Your Learning Pathway",
    description:
      "You have 4 active enrollments. Keep moving forward to reach Level 5 status and unlock premium affiliate bonuses.",
    progress: 84,
    lessonsCompleted: 12,
    totalLessons: 18,
    streak: 5,
    badge: "FEATURED",
    badgeVariant: "blue",
    accent: "#2563EB",
    accentLight: "#DBEAFE",
    accentText: "#1D4ED8",
    nextLesson: "Module 6: Scaling Your Revenue Streams",
  },
  {
    id: 2,
    title: "High-Ticket Affiliate Funnel Mastery",
    subtitle: "Advanced Track",
    progress: 92,
    lessonsCompleted: 22,
    totalLessons: 24,
    instructor: "Sarah Mitchell",
    rating: 4.9,
    badge: "ADVANCED",
    badgeVariant: "purple",
    accent: "#7C3AED",
    accentLight: "#EDE9FE",
    accentText: "#6D28D9",
    nextLesson: "Final Assessment",
  },
  {
    id: 3,
    title: "Advanced Crypto Arbitrage Strategies",
    subtitle: "Specialist Module",
    progress: 65,
    lessonsCompleted: 13,
    totalLessons: 20,
    instructor: "James Vance",
    rating: 4.7,
    badge: null,
    accent: "#DB2777",
    accentLight: "#FCE7F3",
    accentText: "#BE185D",
    nextLesson: "Lesson 14: Risk Management",
  },
  {
    id: 4,
    title: "Psychology of the Top 1% Earner",
    subtitle: "Mindset & Performance",
    description:
      "Master the cognitive frameworks and habits that distinguish high-performing professionals from the rest.",
    hours: 14,
    units: 24,
    badge: "POPULAR",
    badgeVariant: "amber",
    instructor: "Dr. Elena Cross",
    rating: 4.8,
    accent: "#D97706",
    accentLight: "#FEF3C7",
    accentText: "#B45309",
    nextLesson: "Unit 1: The Wealth Mindset",
  },
  {
    id: 5,
    title: "E-Commerce Empire Blueprint",
    subtitle: "Business Mastery",
    hours: 20,
    units: 32,
    badge: "NEW",
    badgeVariant: "emerald",
    instructor: "Marcus Reed",
    rating: 4.6,
    accent: "#059669",
    accentLight: "#D1FAE5",
    accentText: "#047857",
    isLocked: true,
    nextLesson: "Unit 1: Store Architecture",
  },
];

// ─── Badge Component ───────────────────────────────────────────────────────────

const BADGE_STYLES: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  purple: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
  },
};

function CourseBadge({
  label,
  variant = "blue",
}: {
  label: string;
  variant?: string;
}) {
  const s = BADGE_STYLES[variant] ?? BADGE_STYLES.blue;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border ${s.bg} ${s.text} ${s.border}`}
    >
      {label}
    </span>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star size={11} className="fill-amber-400 text-amber-400" />
      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

// ─── Progress Ring (SVG) ──────────────────────────────────────────────────────

function ProgressRing({
  progress,
  size = 56,
  stroke = 4,
  color,
}: {
  progress: number;
  size?: number;
  stroke?: number;
  color: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="text-zinc-200 dark:text-zinc-700"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
    </svg>
  );
}

// ─── Featured Hero Card ───────────────────────────────────────────────────────

function FeaturedCard({ course }: { course: Course }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-1 shadow-xl shadow-blue-500/20">
      {/* inner card */}
      <div className="relative rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-7 sm:px-8 sm:py-8 overflow-hidden">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-52 w-52 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-96 -translate-x-1/2 rounded-full bg-indigo-900/30 blur-2xl" />

        {/* grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* left content */}
          <div className="flex-1 min-w-0">
            {course.badge && (
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-sm">
                <Zap size={10} className="fill-emerald-300 text-emerald-300" />
                {course.badge}
              </span>
            )}

            <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
              Master the{" "}
              <span className="text-emerald-300">Digital Economy</span>
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-blue-100 sm:text-base">
              {course.description}
            </p>

            {/* next lesson pill */}
            {course.nextLesson && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-sm">
                <BookOpen size={13} className="shrink-0 text-emerald-300" />
                <span className="truncate">Up next: {course.nextLesson}</span>
              </div>
            )}
          </div>

          {/* right — progress ring */}
          <div className="flex shrink-0 flex-col items-center gap-1">
            <div className="relative">
              <ProgressRing
                progress={course.progress ?? 0}
                size={72}
                stroke={5}
                color="#34D399"
              />
              <span className="absolute inset-0 flex items-center justify-center text-lg font-extrabold text-white">
                {course.progress}%
              </span>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-200">
              Complete
            </span>
          </div>
        </div>

        {/* stats row */}
        <div className="relative z-10 mt-7 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
          {[
            {
              icon: <CheckCircle2 size={16} className="text-emerald-300" />,
              value: `${course.lessonsCompleted}/${course.totalLessons}`,
              label: "Lessons Done",
            },
            {
              icon: <Clock size={16} className="text-sky-300" />,
              value: "3.2h",
              label: "This Week",
            },
            {
              icon: <Flame size={16} className="text-orange-300" />,
              value: `${course.streak} days`,
              label: "Active Streak",
            },
          ].map(({ icon, value, label }) => (
            <div key={label}>
              <div className="mb-1 flex items-center gap-1.5">{icon}</div>
              <p className="text-lg font-extrabold leading-none text-white sm:text-xl">
                {value}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-200">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="relative z-10 mt-6 flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-blue-700 shadow-sm transition-all hover:bg-blue-50 hover:shadow-md active:scale-[0.98]">
            <Play size={15} className="fill-blue-700" />
            Continue Learning
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-[0.98]">
            <BarChart3 size={15} />
            View Progress
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Course Card ──────────────────────────────────────────────────────────────

function CourseCard({ course }: { course: Course }) {
  const [hovered, setHovered] = useState(false);
  const hasProgress = course.progress !== undefined;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 dark:bg-zinc-900 ${
        course.isLocked
          ? "border-zinc-200 opacity-75 dark:border-zinc-800"
          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 hover:shadow-xl dark:hover:border-zinc-700"
      }`}
      style={
        hovered && !course.isLocked
          ? {
              boxShadow: `0 20px 40px -8px ${course.accent}22`,
            }
          : {}
      }
    >
      {/* Thumbnail area */}
      <div
        className="relative flex h-36 sm:h-40 items-center justify-center overflow-hidden"
        style={{ background: course.accentLight }}
      >
        {/* subtle geometric pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 30%, ${course.accent}55 0%, transparent 55%), radial-gradient(circle at 30% 80%, ${course.accent}33 0%, transparent 45%)`,
          }}
        />

        {course.isLocked ? (
          <div className="relative flex flex-col items-center gap-2">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: `${course.accent}20` }}
            >
              <Lock size={22} style={{ color: course.accent }} />
            </div>
            <span
              className="text-xs font-bold"
              style={{ color: course.accentText }}
            >
              Locked
            </span>
          </div>
        ) : (
          <div className="relative flex flex-col items-center gap-2">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110"
              style={{ background: `${course.accent}20` }}
            >
              <Play
                size={22}
                style={{ color: course.accent }}
                className="ml-0.5 fill-current"
              />
            </div>
            {hasProgress && course.progress !== undefined && (
              <div className="absolute bottom-0 left-0 right-0 h-1 rounded-full overflow-hidden bg-white/40">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${course.progress}%`,
                    background: course.accent,
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* badge */}
        {course.badge && (
          <div className="absolute top-3 left-3">
            <CourseBadge
              label={course.badge}
              variant={course.badgeVariant ?? "blue"}
            />
          </div>
        )}

        {/* rating */}
        {course.rating && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-sm dark:bg-zinc-800/90">
            <StarRating rating={course.rating} />
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* subtitle */}
        <p
          className="mb-1 text-[10px] font-bold uppercase tracking-widest"
          style={{ color: course.accentText }}
        >
          {course.subtitle}
        </p>

        {/* title */}
        <h3 className="mb-2 line-clamp-2 text-sm font-bold leading-snug text-zinc-900 dark:text-white sm:text-base">
          {course.title}
        </h3>

        {/* instructor */}
        {course.instructor && (
          <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
            by{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {course.instructor}
            </span>
          </p>
        )}

        {/* description */}
        {course.description && !hasProgress && (
          <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {course.description}
          </p>
        )}

        {/* push footer to bottom */}
        <div className="mt-auto">
          {/* Progress or meta stats */}
          {hasProgress && course.progress !== undefined ? (
            <div className="mb-4">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  Progress
                </span>
                <div className="flex items-center gap-2">
                  {course.lessonsCompleted !== undefined &&
                    course.totalLessons !== undefined && (
                      <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                        {course.lessonsCompleted}/{course.totalLessons} lessons
                      </span>
                    )}
                  <span
                    className="text-xs font-bold"
                    style={{ color: course.accent }}
                  >
                    {course.progress}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${course.progress}%`,
                    background: course.accent,
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="mb-4 grid grid-cols-2 gap-3 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/60">
              <div>
                <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-zinc-400" />
                  <span className="text-base font-extrabold text-zinc-900 dark:text-white">
                    {course.hours}h
                  </span>
                </div>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  Content
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <BookOpen size={13} className="text-zinc-400" />
                  <span className="text-base font-extrabold text-zinc-900 dark:text-white">
                    {course.units}
                  </span>
                </div>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  Units
                </p>
              </div>
            </div>
          )}

          {/* next lesson */}
          {!course.isLocked && course.nextLesson && (
            <p className="mb-4 flex items-start gap-1.5 text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">
              <ChevronRight
                size={12}
                className="mt-0.5 shrink-0"
                style={{ color: course.accent }}
              />
              <span className="line-clamp-1">{course.nextLesson}</span>
            </p>
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              disabled={course.isLocked}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              style={{ background: course.accent }}
            >
              {course.isLocked ? (
                <>
                  <Lock size={13} />
                  Unlock Course
                </>
              ) : hasProgress ? (
                <>
                  <Play size={13} className="fill-white" />
                  Continue
                </>
              ) : (
                <>
                  <Zap size={13} />
                  Start Course
                </>
              )}
            </button>
            <button className="flex items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-xs font-semibold text-zinc-700 transition-all hover:bg-zinc-100 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
              <MessageCircle size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    {
      icon: <BookOpen size={18} className="text-blue-500" />,
      value: "4",
      label: "Active Courses",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: <TrendingUp size={18} className="text-emerald-500" />,
      value: "78%",
      label: "Avg. Progress",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      icon: <Trophy size={18} className="text-amber-500" />,
      value: "3",
      label: "Certifications",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      icon: <Flame size={18} className="text-rose-500" />,
      value: "5 days",
      label: "Current Streak",
      bg: "bg-rose-50 dark:bg-rose-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map(({ icon, value, label, bg }) => (
        <div
          key={label}
          className={`flex items-center gap-3 rounded-xl px-4 py-3.5 ${bg}`}
        >
          <div className="shrink-0">{icon}</div>
          <div>
            <p className="text-base font-extrabold leading-none text-zinc-900 dark:text-white">
              {value}
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type FilterTab = "all" | "in-progress" | "not-started";

export default function StudentCoursesPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const tabs: { label: string; value: FilterTab; count?: number }[] = [
    { label: "All Courses", value: "all", count: COURSES.length },
    {
      label: "In Progress",
      value: "in-progress",
      count: COURSES.filter((c) => c.progress !== undefined && !c.isLocked)
        .length,
    },
    {
      label: "Not Started",
      value: "not-started",
      count: COURSES.filter((c) => c.progress === undefined || c.isLocked)
        .length,
    },
  ];

  const featured = COURSES[0];

  const filtered = COURSES.slice(1).filter((c) => {
    if (activeTab === "in-progress")
      return c.progress !== undefined && !c.isLocked;
    if (activeTab === "not-started")
      return c.progress === undefined || c.isLocked;
    return true;
  });

  return (
    <div className="w-full space-y-7 sm:space-y-8">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          Dashboard
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          My Courses
        </h1>
      </div>

      {/* ── Stats ── */}
      <StatsBar />

      {/* ── Featured ── */}
      <FeaturedCard course={featured} />

      {/* ── Section header + tabs ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
          Continue Learning
        </h2>

        {/* filter tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
          {tabs.map(({ label, value, count }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === value
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {label}
              {count !== undefined && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    activeTab === value
                      ? "bg-zinc-100 text-zinc-700 dark:bg-zinc-600 dark:text-zinc-200"
                      : "bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Course Grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-200 py-16 dark:border-zinc-800">
          <BookOpen size={32} className="text-zinc-300 dark:text-zinc-600" />
          <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
            No courses in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
