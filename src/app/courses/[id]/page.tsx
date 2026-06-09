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
  Users,
  Zap,
  Globe,
  Award,
  BookOpen,
  TrendingUp,
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

  const course = raw
    ? {
        id: raw.id ?? id,
        title: raw.title ?? "Untitled Course",
        desc: raw.description ?? "",
        image: raw.thumbnail ?? null,
        price: Number(raw.price ?? 0),
        discountPrice: raw.discountPrice ? Number(raw.discountPrice) : null,
        category: raw.category?.name ?? null,
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

  const displayPrice = course?.discountPrice ?? course?.price ?? 0;
  const originalPrice = course?.price ?? 0;
  const hasDiscount =
    course?.discountPrice !== null &&
    course?.discountPrice !== undefined &&
    course.discountPrice < originalPrice;
  const savePct = hasDiscount
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
    : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-400 tracking-wide">
            Loading course...
          </span>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen  font-sans pb-24 lg:pb-0  md:mb-6">
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-1.5 text-[12px] font-semibold text-slate-400 overflow-x-auto whitespace-nowrap">
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors shrink-0"
          >
            Home
          </Link>
          <ChevronRight size={12} className="text-slate-300 shrink-0" />
          <Link
            href="/courses"
            className="hover:text-blue-600 transition-colors shrink-0"
          >
            Courses
          </Link>
          {course.category && (
            <>
              <ChevronRight size={12} className="text-slate-300 shrink-0" />
              <span className="text-slate-600 truncate font-bold">
                {course.category}
              </span>
            </>
          )}
          <ChevronRight size={12} className="text-slate-300 shrink-0" />
          <span className="text-slate-800 truncate font-bold max-w-[160px]">
            {course.title}
          </span>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="relative bg-[#0A0F1E] text-white pt-10 sm:pt-14 pb-28 sm:pb-32 overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none -translate-x-1/2" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-center">
            {/* Left text block */}
            <div>
              {/* Badge row */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {course.category && (
                  <span className="bg-blue-500/20 text-blue-300 border border-blue-400/25 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                    {course.category}
                  </span>
                )}
                {course.level && (
                  <span className="flex items-center gap-1 bg-white/8 border border-white/15 px-3 py-1 rounded-full text-[11px] font-bold text-slate-300">
                    <BarChart2 size={11} /> {course.level}
                  </span>
                )}
                {course.isPremium && (
                  <span className="flex items-center gap-1 bg-amber-500/20 border border-amber-400/25 px-3 py-1 rounded-full text-[11px] font-bold text-amber-300">
                    <Trophy size={11} /> Premium
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-emerald-400 text-[12px] font-bold">
                  <ShieldCheck size={14} /> Certified
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-[1.1] tracking-tight mb-5 bg-gradient-to-br from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                {course.title}
              </h1>

              {course.desc && (
                <p className="text-[15px] sm:text-base text-slate-400 leading-relaxed mb-6 max-w-lg">
                  {course.desc}
                </p>
              )}

              {/* Stars + meta */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[13px] mb-6">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={
                          i < Math.floor(course.rating)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                  </div>
                  <span className="font-bold text-white">{course.rating}</span>
                  <span className="text-slate-500">
                    ({course.reviews} reviews)
                  </span>
                </div>
                <span className="hidden sm:block h-4 w-px bg-slate-700" />
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock size={13} /> {course.duration}
                </span>
                {course.enrollmentCount > 0 && (
                  <>
                    <span className="hidden sm:block h-4 w-px bg-slate-700" />
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Users size={13} className="text-blue-400" />
                      {course.enrollmentCount.toLocaleString()} enrolled
                    </span>
                  </>
                )}
              </div>

              {/* Earning potential pill */}
              <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-400/25 px-4 py-2 rounded-full mb-5">
                <TrendingUp size={14} className="text-emerald-400" />
                <span className="text-emerald-300 text-[13px] font-bold">
                  {course.potential}
                </span>
              </div>

              {/* Instructor */}
              {course.instructor && (
                <p className="text-slate-500 text-[13px]">
                  Instructor:{" "}
                  <span className="text-slate-200 font-semibold">
                    {course.instructor.name}
                  </span>
                </p>
              )}
            </div>

            {/* Hero thumbnail card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/30 to-violet-600/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 aspect-video lg:aspect-[4/3] shadow-2xl">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 via-slate-800 to-[#0A0F1E] flex items-center justify-center">
                    <BookOpen size={56} className="text-slate-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/15 hover:bg-blue-600 backdrop-blur-md border border-white/25 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-110 cursor-pointer">
                    <PlayCircle size={28} className="text-white ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* ── LEFT column ── */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Mobile pricing card */}
            <div className="lg:hidden bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 flex items-center justify-between">
                <span className="text-white text-[11px] font-black tracking-widest uppercase">
                  Lifetime Access
                </span>
                {savePct && (
                  <span className="bg-white/20 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full">
                    {savePct}% OFF
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-end gap-2 mb-1">
                  {hasDiscount && (
                    <span className="text-lg font-bold text-slate-400 line-through">
                      ৳{originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-4xl font-black text-slate-900 tracking-tight">
                    ৳{displayPrice.toLocaleString()}
                  </span>
                </div>
                {savePct && (
                  <p className="text-[13px] font-semibold text-emerald-600 mb-4">
                    You save ৳{(originalPrice - displayPrice).toLocaleString()}{" "}
                    — limited time
                  </p>
                )}
                <button
                  onClick={handleEnroll}
                  disabled={isPaying}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98] text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 transition-all text-[15px] flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isPaying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Initiating...
                    </>
                  ) : (
                    <>
                      Enroll Now <ChevronRight size={17} />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-3 font-medium">
                  🔒 30-Day Money-Back Guarantee
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  icon: TrendingUp,
                  label: "Potential",
                  value: course.potential,
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                  iconColor: "text-emerald-500",
                },
                {
                  icon: Users,
                  label: "Enrolled",
                  value: `${course.enrollmentCount.toLocaleString()}+`,
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                  iconColor: "text-blue-500",
                },
                {
                  icon: Star,
                  label: "Rating",
                  value: `${course.rating}/5`,
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                  iconColor: "text-amber-500",
                },
                {
                  icon: Clock,
                  label: "Duration",
                  value: "14.5 hrs",
                  color: "text-violet-600",
                  bg: "bg-violet-50",
                  iconColor: "text-violet-500",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 border border-slate-200/60 shadow-sm"
                >
                  <div
                    className={`w-8 h-8 ${s.bg} rounded-xl flex items-center justify-center mb-2.5`}
                  >
                    <s.icon size={16} className={s.iconColor} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {s.label}
                  </p>
                  <p
                    className={`text-base font-black ${s.color} mt-0.5 leading-tight`}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            {/* What you'll learn */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/60 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Zap size={16} className="text-blue-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  What you'll learn
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Develop high-conversion funnels and landing pages that turn visitors into paying customers.",
                  "Master the psychology of high-ticket sales and closing techniques.",
                  "Automate client acquisition using advanced AI tools and frameworks.",
                  "Build a predictable, recurring revenue engine from scratch.",
                  "Create scalable design systems to charge premium enterprise rates.",
                  "Leverage performance marketing to scale rapidly across platforms.",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500 shrink-0 mt-0.5"
                    />
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Course includes */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/60 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 bg-violet-50 rounded-xl flex items-center justify-center">
                  <BookOpen size={16} className="text-violet-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  This course includes
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    icon: PlayCircle,
                    text: "14.5 hours on-demand video",
                    color: "text-blue-500",
                    bg: "bg-blue-50",
                  },
                  {
                    icon: Download,
                    text: "22 downloadable resources & templates",
                    color: "text-violet-500",
                    bg: "bg-violet-50",
                  },
                  {
                    icon: Infinity,
                    text: "Full lifetime access",
                    color: "text-emerald-500",
                    bg: "bg-emerald-50",
                  },
                  {
                    icon: Globe,
                    text: "Access on mobile and TV",
                    color: "text-orange-500",
                    bg: "bg-orange-50",
                  },
                  {
                    icon: Award,
                    text: "Certificate of completion",
                    color: "text-amber-500",
                    bg: "bg-amber-50",
                  },
                  {
                    icon: ShieldCheck,
                    text: "30-day money-back guarantee",
                    color: "text-teal-500",
                    bg: "bg-teal-50",
                  },
                ].map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
                  >
                    <div
                      className={`w-8 h-8 ${feat.bg} rounded-xl flex items-center justify-center shrink-0`}
                    >
                      <feat.icon size={15} className={feat.color} />
                    </div>
                    <span className="text-[13px] font-semibold text-slate-700">
                      {feat.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* About course */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/60 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
                  <BadgeCheck size={16} className="text-slate-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  About this course
                </h2>
              </div>
              <div className="space-y-4 text-[14px] text-slate-600 leading-relaxed">
                <p>
                  This intensive program is designed for ambitious professionals
                  who want to escape the trap of low-ticket services. You will
                  learn the exact blueprint to architect a premium offer,
                  position yourself as an authority, and execute strategies that
                  command high fees.
                </p>
                <p>
                  Whether you are starting from zero or looking to scale an
                  existing business,{" "}
                  <span className="font-bold text-slate-800">
                    {course.title}
                  </span>{" "}
                  provides you with the tools, templates, and community support
                  you need.
                </p>
                <p>
                  By the end of this course you will have a deployed,
                  functioning system capable of generating{" "}
                  {course.potential.toLowerCase().replace(" potential", "")}.
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT column (sticky desktop card) ── */}
          <div className="hidden lg:block w-[360px] shrink-0">
            <div className="sticky top-24 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/80 border border-slate-200/60">
              {/* Gradient header */}
              <div className="bg-gradient-to-br from-[#0047FF] to-blue-700 p-7 text-white text-center">
                <div className="inline-block bg-white/15 text-white text-[10px] font-black px-3 py-1 rounded-full mb-4 tracking-widest uppercase border border-white/20">
                  Lifetime Access
                </div>
                <div className="flex items-end justify-center gap-2 mb-1">
                  {hasDiscount && (
                    <span className="text-xl font-bold text-blue-200 line-through">
                      ৳{originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-5xl font-black tracking-tight">
                    ৳{displayPrice.toLocaleString()}
                  </span>
                </div>
                {savePct && (
                  <div className="inline-flex items-center gap-1.5 bg-emerald-400/20 border border-emerald-300/30 text-emerald-300 text-[12px] font-bold px-3 py-1.5 rounded-full mt-2 mb-5">
                    <Zap size={12} /> Save {savePct}% — limited time offer
                  </div>
                )}
                {!savePct && <div className="mb-5" />}
                <button
                  onClick={handleEnroll}
                  disabled={isPaying}
                  className="w-full bg-white text-blue-700 hover:bg-blue-50 font-black py-4 rounded-2xl transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-xl text-[15px] flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
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
                <p className="text-blue-200/70 text-[11px] font-medium mt-3">
                  🔒 30-Day Money-Back Guarantee
                </p>
              </div>

              {/* Features */}
              <div className="bg-white p-6">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
                  What's included
                </p>
                <div className="space-y-3">
                  {[
                    {
                      icon: PlayCircle,
                      text: "14.5 hours on-demand video",
                      color: "text-blue-500",
                      bg: "bg-blue-50",
                    },
                    {
                      icon: Download,
                      text: "22 resources & templates",
                      color: "text-violet-500",
                      bg: "bg-violet-50",
                    },
                    {
                      icon: Infinity,
                      text: "Full lifetime access",
                      color: "text-emerald-500",
                      bg: "bg-emerald-50",
                    },
                    {
                      icon: Globe,
                      text: "Mobile & TV access",
                      color: "text-orange-500",
                      bg: "bg-orange-50",
                    },
                    {
                      icon: Award,
                      text: "Certificate of completion",
                      color: "text-amber-500",
                      bg: "bg-amber-50",
                    },
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 ${feat.bg} rounded-lg flex items-center justify-center shrink-0`}
                      >
                        <feat.icon size={14} className={feat.color} />
                      </div>
                      <span className="text-[13px] font-medium text-slate-700">
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Social proof */}
                <div className="mt-5 pt-5 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 border-2 border-white flex items-center justify-center text-[9px] font-black text-white"
                        >
                          {["A", "B", "C", "D"][i]}
                        </div>
                      ))}
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] font-black text-slate-800">
                        {course.enrollmentCount.toLocaleString()}+ students
                      </p>
                      <div className="flex items-center justify-end gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            className="text-amber-400"
                            fill="currentColor"
                          />
                        ))}
                        <span className="text-[11px] font-bold text-slate-500 ml-1">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile bottom bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              {hasDiscount && (
                <span className="text-sm text-slate-400 line-through font-medium">
                  ৳{originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-2xl font-black text-slate-900">
                ৳{displayPrice.toLocaleString()}
              </span>
            </div>
            {savePct && (
              <p className="text-[11px] text-emerald-600 font-bold">
                Save {savePct}%
              </p>
            )}
          </div>
          <button
            onClick={handleEnroll}
            disabled={isPaying}
            className="flex-1 max-w-[200px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98] text-white font-black py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-[15px] shadow-lg shadow-blue-200"
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
    </div>
  );
}
