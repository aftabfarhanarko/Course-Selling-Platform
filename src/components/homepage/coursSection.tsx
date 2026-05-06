"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const CourseSection = () => {
  const courses = [
    {
      id: 1,
      tag: "$2k+/mo Potential",
      category: "DESIGN & STRATEGY",
      title: "High Income Skill: UI/UX Architecture",
      price: "$499",
      rating: "4.9",
    },
    {
      id: 2,
      tag: "$5k+/mo Potential",
      category: "MARKETING & SCALE",
      title: "High Income Skill: Growth Systems",
      price: "$699",
      rating: "4.9",
    },
    {
      id: 3,
      tag: "$10k+/mo Potential",
      category: "BUSINESS DEVELOPMENT",
      title: "High Income Skill: Elite Tech Sales",
      price: "$899",
      rating: "5.0",
    },
  ];

  return (
    <section className={`py-20 bg-[#f3f4f6] ${plusJakarta.className}`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
     <div className="md:flex items-start justify-between mb-12 gap-4">
  
  <div className="max-w-[70%]">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
      Master Your Future
    </h2>
    <p className="text-gray-500 mt-2">
      Curated paths to high-income mastery.
    </p>
  </div>

  <Link href="/courses">
    <button className="text-blue-600 whitespace-nowrap cursor-pointer font-semibold  items-center gap-1">
      View All Courses →
    </button>
  </Link>

</div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-end">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {course.tag}
                </span>
              </div>

              <div className="bg-gray-100 rounded-xl h-40 mt-4 mb-6" />

              <p className="text-xs font-semibold text-blue-600 tracking-wide mb-2">
                {course.category}
              </p>

              <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-4">
                {course.title}
              </h3>

              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-bold text-gray-900">
                  {course.price}
                </span>
                <span className="text-sm text-yellow-500 font-semibold">
                  ★ {course.rating}
                </span>
              </div>

            <Link href={`/courses/${course.id}`}>
              <button className="w-full bg-[#e5e7eb] cursor-pointer hover:bg-[#d1d5db] text-blue-600 font-semibold py-3 rounded-xl transition">
                Enroll Now
              </button>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
