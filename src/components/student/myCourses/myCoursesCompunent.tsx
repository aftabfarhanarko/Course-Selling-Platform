"use client";

import { Flame, MessageCircle, Play } from "lucide-react";
import { useState } from "react";

export default function StudentCoursesPage() {
  const [courses] = useState([
    {
      id: 1,
      title: "Master the Digital Economy",
      description:
        "You have 4 active enrollments. Keep moving forward to reach Level 5 status and unlock premium affiliate bonuses.",
      progress: 84,
      lessonsCompleted: 12,
      streak: 5,
      isFeatured: true,
      badge: "LEARNING PATHWAY",
      accentColor: "from-blue-600 to-indigo-600",
    },
    {
      id: 2,
      title: "High-Ticket Affiliate Funnel Mastery",
      progress: 92,
      instructor: "Expert Trainer",
      badge: "ADVANCED",
      gradientFrom: "from-indigo-100",
      gradientTo: "to-blue-50",
      iconColor: "text-indigo-600",
      progressColor: "from-indigo-600 to-blue-500",
      badgeBg: "bg-indigo-100 text-indigo-700",
    },
    {
      id: 3,
      title: "Advanced Crypto Arbitrage Strategies",
      progress: 65,
      instructor: "Expert Trainer",
      badge: null,
      gradientFrom: "from-purple-100",
      gradientTo: "to-pink-50",
      iconColor: "text-purple-600",
      progressColor: "from-purple-600 to-pink-500",
      badgeBg: "bg-purple-100 text-purple-700",
    },
    {
      id: 4,
      title: "Psychology of the Top 1% Earner",
      description:
        "Master the cognitive frameworks and habits that distinguish high-performing professionals from the rest of the market.",
      hours: 14,
      units: 24,
      badge: "POPULAR",
      gradientFrom: "from-amber-100",
      gradientTo: "to-orange-50",
      iconColor: "text-amber-600",
      progressColor: "from-amber-500 to-orange-500",
      badgeBg: "bg-amber-100 text-amber-700",
    },
  ]);

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white">
          My Courses
        </h1>
      </div>

      {/* Featured Course Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl -mr-20 -mt-20"></div>

        <div className="relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 sm:mb-6">
            {courses[0].badge}
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
            Master the Digital <span className="text-emerald-300">Economy</span>
          </h2>

          <p className="text-sm sm:text-base text-blue-100 mb-6 sm:mb-8 max-w-lg leading-relaxed">
            {courses[0].description}
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            <div>
              <p className="text-3xl sm:text-4xl font-black leading-none mb-1">
                {courses[0].progress}%
              </p>
              <p className="text-[11px] sm:text-xs font-semibold text-blue-100 uppercase tracking-wider">
                Overall Progress
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black leading-none mb-1">
                {courses[0].lessonsCompleted}
              </p>
              <p className="text-[11px] sm:text-xs font-semibold text-blue-100 uppercase tracking-wider">
                Lessons Completed
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <p className="text-xl sm:text-2xl font-black leading-none mb-1 flex items-center gap-1">
                  {courses[0].streak}
                  <Flame size={20} className="text-orange-300" />
                </p>
                <p className="text-[11px] sm:text-xs font-semibold text-blue-100 uppercase tracking-wider">
                  Active Streak
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {courses.slice(1).map((course, index) => {
          const isSpecialCard = index === 2;

          return (
            <div
              key={course.id}
              // flex flex-col যুক্ত করা হয়েছে কার্ডের হাইট সমান রাখতে
              className={`bg-white dark:bg-zinc-900 rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow flex flex-col ${
                isSpecialCard ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Course Image Placeholder */}
              <div
                className={`w-full h-40 sm:h-48 bg-gradient-to-br ${course.gradientFrom} ${course.gradientTo} dark:opacity-80 flex items-center justify-center shrink-0`}
              >
                <div className="text-center">
                  <Play
                    size={32}
                    className={`${course.iconColor} mx-auto opacity-50 mb-2`}
                  />
                  <p className={`text-xs ${course.iconColor} font-medium`}>
                    {course.title.split(" ").slice(0, 2).join(" ")}
                  </p>
                </div>
              </div>

              {/* Card Content - flex-1 দিলে এটি জায়গা দখল করে নিচের অংশকে ঠেলে দেবে */}
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                
                <div className="mb-4">
                  {course.badge && (
                    <div
                      className={`inline-block ${course.badgeBg} dark:bg-opacity-20 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-3`}
                    >
                      {course.badge}
                    </div>
                  )}
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  {course.instructor && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {course.instructor}
                    </p>
                  )}
                  {course.description && (
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {course.description}
                    </p>
                  )}
                </div>

                {/* 
                  mt-auto যুক্ত করা হয়েছে। এর কারণে উপরের কন্টেন্ট যত ছোটই হোক, 
                  Progress এবং Buttons সবসময় কার্ডের একদম নিচে সমানভাবে থাকবে। 
                */}
                <div className="mt-auto">
                  {/* Progress Bar বা Hours/Units */}
                  {course.progress ? (
                    <div className="mb-5">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          Course Progress
                        </span>
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${course.progressColor} rounded-full`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 pb-5 border-b border-zinc-200 dark:border-zinc-800">
                      <div>
                        <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                          {course.hours}
                        </p>
                        <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400 uppercase font-semibold">
                          Hours
                        </p>
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                          {course.units}
                        </p>
                        <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400 uppercase font-semibold">
                          Units
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex  gap-2 sm:gap-3">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                      <Play size={16} />
                      {course.progress ? "Continue Class" : "Start Course"}
                    </button>
                    <button className="w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                      <MessageCircle size={16} />
                      Go to Telegram
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}