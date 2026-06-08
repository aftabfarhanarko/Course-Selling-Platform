"use client";

import { notFound, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useGetPublicCourseQuery } from "@/lib/api/courseApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAdminEnrollmentsPayBkashPaymentMutation } from "@/lib/api/admin/enrollments";
import { toast } from "sonner";
import {
  Star,
  CheckCircle2,
  Clock,
  PlayCircle,
  Download,
  Infinity,
  Trophy,
  ChevronRight,
  ShieldCheck,
  Loader2,
  BadgeCheck,
  BarChart2,
} from "lucide-react";

export default function CourseDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const router = useRouter();
  const searchParams = useSearchParams();
  const referCode = searchParams.get("ref");

  const authUser = useSelector((state: RootState) => state.auth.user);
  const [payBkash, { isLoading: isPaying }] =
    useAdminEnrollmentsPayBkashPaymentMutation();

  const { data: raw, isLoading, isError, error } = useGetPublicCourseQuery(id);

  // ── Data normalisation (handles nulls & new fields) ──────────────────────
  const course = raw
    ? {
        id: raw.id ?? id,
        title: raw.title ?? "Untitled Course",
        desc: raw.description ?? "",
        image: raw.thumbnail ?? null, // null → show placeholder gradient
        price: Number(raw.price ?? 0),
        discountPrice: raw.discountPrice ? Number(raw.discountPrice) : null,
        category: raw.category?.name ?? null, // null → hide badge
        level: raw.metadata?.level ?? null,
        isPremium: raw.metadata?.is_premium ?? false,
        isPublished: raw.isPublished ?? false,
        enrollmentCount: raw.enrollmentCount ?? 0,
        instructor: raw.instructor ?? null,
        potential: "$10k+/mo Potential",
        rating: 4.9,
        reviews: "1.2k",
        duration: "14.5 Hours On‑Demand",
      }
    : null;

  // Derived price values
  const displayPrice = course?.discountPrice ?? course?.price ?? 0;
  const originalPrice = course?.price ?? 0;
  const hasDiscount =
    course?.discountPrice !== null &&
    course?.discountPrice !== undefined &&
    course.discountPrice < originalPrice;
  const savePct = hasDiscount
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
    : null;

  // ── Loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading course...</span>
        </div>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (isError || !course) {
    if (
      (error as any)?.status === 404 ||
      (error as any)?.originalStatus === 404
    ) {
      return notFound();
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-red-500 font-semibold">Failed to load course.</p>
      </div>
    );
  }

  // ── Enrol handler ─────────────────────────────────────────────────────────
  const handleEnroll = async () => {
    if (!authUser) {
      toast.error("Please login to enroll in this course");
      router.push(
        `/login?redirect=/courses/${course.id}${referCode ? `?ref=${referCode}` : ""}`,
      );
      return;
    }
    const toastId = toast.loading("Initiating payment...");
    try {
      const res = await payBkash({
        studentId: Number(authUser.id),
        courseId: Number(course.id),
        amount: displayPrice,
        referCode: referCode || undefined,
      }).unwrap();

      const paymentUrl = res?.paymentUrl ?? res?.data?.paymentUrl;
      if (paymentUrl) {
        toast.success("Redirecting to payment gateway...", { id: toastId });
        window.location.href = paymentUrl;
      } else {
        toast.error("Failed to retrieve payment URL", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Enrollment failed", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 overflow-x-auto whitespace-nowrap">
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors shrink-0"
          >
            Home
          </Link>
          <ChevronRight size={13} className="text-slate-400 shrink-0" />
          <Link
            href="/courses"
            className="hover:text-blue-600 transition-colors shrink-0"
          >
            Courses
          </Link>
          {course.category && (
            <>
              <ChevronRight size={13} className="text-slate-400 shrink-0" />
              <span className="text-slate-900 truncate">{course.category}</span>
            </>
          )}
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="bg-slate-900 text-white pt-10 sm:pt-16 pb-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left text */}
          <div>
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {course.category && (
                <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                  {course.category}
                </span>
              )}
              {course.level && (
                <span className="flex items-center gap-1 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-[11px] font-bold text-slate-200">
                  <BarChart2 size={12} /> {course.level}
                </span>
              )}
              {course.isPremium && (
                <span className="flex items-center gap-1 bg-amber-500/20 border border-amber-400/30 px-3 py-1 rounded-full text-[11px] font-bold text-amber-300">
                  <Trophy size={12} /> Premium
                </span>
              )}
              <span className="flex items-center gap-1.5 text-emerald-400 text-[13px] font-bold">
                <ShieldCheck size={15} /> Certified
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight mb-5">
              {course.title}
            </h1>

            {course.desc && (
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-xl">
                {course.desc}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-[13px]">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      fill={
                        i < Math.floor(course.rating) ? "currentColor" : "none"
                      }
                    />
                  ))}
                </div>
                <span className="font-bold">{course.rating}</span>
                <span className="text-slate-400">
                  ({course.reviews} reviews)
                </span>
              </div>

              <span className="hidden sm:block h-4 w-px bg-slate-700" />

              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Clock size={15} className="text-slate-400" /> {course.duration}
              </span>

              {course.enrollmentCount > 0 && (
                <>
                  <span className="hidden sm:block h-4 w-px bg-slate-700" />
                  <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                    <BadgeCheck size={15} className="text-emerald-400" />
                    {course.enrollmentCount.toLocaleString()} enrolled
                  </span>
                </>
              )}
            </div>

            {/* Instructor */}
            {course.instructor && (
              <p className="mt-5 text-slate-400 text-[13px]">
                Instructor:{" "}
                <span className="text-white font-semibold">
                  {course.instructor.name}
                </span>
              </p>
            )}
          </div>

          {/* Hero thumbnail */}
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/50 aspect-video lg:aspect-auto lg:h-[360px]">
            {course.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : (
              /* Placeholder when thumbnail is null */
              <div className="w-full h-full bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <PlayCircle size={64} className="text-slate-600" />
              </div>
            )}
            <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 hover:bg-blue-600 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-110 cursor-pointer">
                <PlayCircle size={30} className="text-white ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 flex flex-col lg:flex-row gap-8">
        {/* ── Left column ── */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Mobile-only pricing card */}
          <div className="lg:hidden bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 text-center">
              <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                LIFETIME ACCESS
              </div>
              <div className="flex items-end justify-center gap-2 mb-1">
                {hasDiscount && (
                  <span className="text-xl font-bold text-slate-400 line-through">
                    ৳{originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-4xl font-black text-slate-900">
                  ৳{displayPrice.toLocaleString()}
                </span>
              </div>
              {savePct && (
                <p className="text-sm font-semibold text-emerald-600 mb-4">
                  Save {savePct}% — limited time offer
                </p>
              )}
              <button
                onClick={handleEnroll}
                disabled={isPaying}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-4 rounded-xl shadow-md transition-all text-base flex items-center justify-center gap-2 disabled:opacity-75 disabled:pointer-events-none"
              >
                {isPaying ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Initiating...
                  </>
                ) : (
                  <>
                    Enroll Now <ChevronRight size={18} />
                  </>
                )}
              </button>
              <p className="text-xs text-slate-400 font-medium mt-3">
                30-Day Money-Back Guarantee
              </p>
            </div>
          </div>

          {/* Key metrics */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200">
            <div className="grid grid-cols-2 divide-x divide-slate-100">
              <div className="pr-4 sm:pr-6 text-center">
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Earning Potential
                </p>
                <p className="text-xl sm:text-2xl font-black text-emerald-600">
                  {course.potential}
                </p>
              </div>
              <div className="pl-4 sm:pl-6 text-center">
                <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Enrollments
                </p>
                <p className="text-xl sm:text-2xl font-black text-blue-600">
                  {course.enrollmentCount.toLocaleString()}+
                </p>
              </div>
            </div>
          </div>

          {/* What you'll learn */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
              What you&apos;ll learn
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                "Develop high-conversion funnels and landing pages that turn visitors into paying customers.",
                "Master the psychology of high-ticket sales and closing techniques.",
                "Automate client acquisition using advanced AI tools and frameworks.",
                "Build a predictable, recurring revenue engine from scratch.",
                "Create scalable design systems to charge premium enterprise rates.",
                "Leverage performance marketing to scale rapidly across platforms.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />
                  <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* About this course */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              About this course
            </h2>
            <div className="space-y-4 text-[14px] sm:text-[15px] text-slate-600 leading-relaxed">
              <p>
                This intensive program is designed for ambitious professionals
                who want to escape the trap of low-ticket services. You will
                learn the exact blueprint to architect a premium offer, position
                yourself as an authority, and execute strategies that command
                high fees.
              </p>
              <p>
                Whether you are starting from zero or looking to scale an
                existing business,{" "}
                <span className="font-semibold text-slate-800">
                  {course.title}
                </span>{" "}
                provides you with the tools, templates, and community support
                you need.
              </p>
              <p>
                By the end of this course you will have a deployed, functioning
                system capable of generating{" "}
                {course.potential.toLowerCase().replace(" potential", "")}.
              </p>
            </div>
          </div>
        </div>

        {/* ── Right column (desktop sticky card) ── */}
        <div className="hidden lg:block lg:w-[370px] shrink-0">
          <div className="sticky top-24 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Price header */}
            <div className="p-8 pb-6 border-b border-slate-100 text-center">
              <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                LIFETIME ACCESS
              </div>
              <div className="flex items-end justify-center gap-2 mb-2">
                {hasDiscount && (
                  <span className="text-2xl font-bold text-slate-400 line-through">
                    ৳{originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-5xl font-black text-slate-900 tracking-tight">
                  ৳{displayPrice.toLocaleString()}
                </span>
              </div>
              {savePct && (
                <p className="text-sm font-semibold text-emerald-600 mb-6">
                  Save {savePct}% — limited time offer
                </p>
              )}
              <button
                onClick={handleEnroll}
                disabled={isPaying}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 active:translate-y-0 text-lg flex items-center justify-center gap-2 disabled:opacity-75 disabled:pointer-events-none"
              >
                {isPaying ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Initiating...
                  </>
                ) : (
                  <>
                    Enroll Now <ChevronRight size={20} />
                  </>
                )}
              </button>
              <p className="text-xs text-slate-400 font-medium mt-4">
                30-Day Money-Back Guarantee
              </p>
            </div>

            {/* Features list */}
            <div className="p-8 bg-slate-50">
              <h3 className="font-bold text-slate-900 mb-4">
                This course includes:
              </h3>
              <ul className="space-y-4">
                {[
                  { icon: PlayCircle, text: "14.5 hours on-demand video" },
                  {
                    icon: Download,
                    text: "22 downloadable resources & templates",
                  },
                  { icon: Infinity, text: "Full lifetime access" },
                  { icon: ShieldCheck, text: "Access on mobile and TV" },
                  { icon: Trophy, text: "Certificate of completion" },
                ].map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium text-slate-600"
                  >
                    <feat.icon size={18} className="text-blue-600 shrink-0" />
                    {feat.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile bottom bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-4 py-3 shadow-2xl flex items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-1.5">
            {hasDiscount && (
              <span className="text-sm text-slate-400 line-through">
                ৳{originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-2xl font-black text-slate-900">
              ৳{displayPrice.toLocaleString()}
            </span>
          </div>
          {savePct && (
            <p className="text-xs text-emerald-600 font-semibold">
              Save {savePct}%
            </p>
          )}
        </div>
        <button
          onClick={handleEnroll}
          disabled={isPaying}
          className="flex-1 max-w-[200px] bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-75 text-[15px]"
        >
          {isPaying ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Please wait
            </>
          ) : (
            <>
              Enroll Now <ChevronRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
