// app/courses/[id]/CourseDetailsClient.tsx
"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAdminCourseQuery } from "@/lib/api/admin/course";
import CourseHero from "./components/CourseHero";
import CourseMetrics from "./components/CourseMetrics";
import WhatYouLearn from "./components/WhatYouLearn";
import CourseDescription from "./components/CourseDescription";
import PricingCard from "./components/PricingCard";
import Skeleton from "./components/Skeleton";

export default function CourseDetailsClient() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError, error } = useAdminCourseQuery(id);

  // Normalise API response (same logic as in admin table)
  const course = data?.data ?? data;

  if (isLoading) return <Skeleton />;

  if (isError || !course) {
    // If the API returns a 404-like error, show Next.js not-found
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

  // Build a consistent course object (adjust field names if your API differs)
  const normalized = {
    id: course.id ?? id,
    title: course.name ?? course.title ?? "Untitled",
    desc: course.description ?? course.desc ?? "",
    image: course.image ?? course.thumbnail ?? "/placeholder.jpg",
    price: course.price ?? 0,
    category: course.category?.name ?? course.categoryName ?? "Uncategorized",
    potential: course.potential ?? "High",
    commission: course.commission ?? "0%",
    rating: course.rating ?? 4.5,
    reviews: course.reviews ?? "0",
  };

  const courseList = normalized;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-[13px] font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <Link
            href="/courses"
            className="hover:text-blue-600 transition-colors"
          >
            Courses
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 truncate">{courseList.category}</span>
        </div>
      </div>

      <CourseHero course={courseList} />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 -mt-10 relative z-20 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <CourseMetrics course={courseList} />
          <WhatYouLearn />
          <CourseDescription course={courseList} />
        </div>
        <div className="lg:w-[380px] shrink-0">
          <PricingCard course={courseList} />
        </div>
      </div>
    </div>
  );
}
