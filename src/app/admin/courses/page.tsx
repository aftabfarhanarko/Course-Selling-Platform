"use client";

import { useState } from "react";

interface Course {
  id: number;
  title: string;
  desc: string;
  price: number;
  potential: string;
  commission: string;
  commissionVal: number;
  rating: number;
  reviews: string;
  image: string;
  category: string;
  earnings: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "AI-First Agency: The 2024 Playbook",
    desc: "The definitive guide to building an automated service agency leveraging LLMs and custom GPTs.",
    price: 1200,
    potential: "$15,000/MO POTENTIAL",
    commission: "25% COMMISSION",
    commissionVal: 25,
    rating: 5,
    reviews: "340",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    category: "AI Automation",
    earnings: "$5k - $15k /mo",
  },
  {
    id: 2,
    title: "SaaS Interface Architect Masterclass",
    desc: "Master high-conversion SaaS design and build a recurring revenue agency from scratch.",
    price: 499,
    potential: "$8,500/MO POTENTIAL",
    commission: "40% COMMISSION",
    commissionVal: 40,
    rating: 4.9,
    reviews: "1.2k",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    category: "Digital Design",
    earnings: "$1k - $5k /mo",
  },
  {
    id: 3,
    title: "Full-Stack Web Dev Bootcamp 2024",
    desc: "Build modern web applications with React, Node.js, and cloud deployment strategies.",
    price: 799,
    potential: "$12,000/MO POTENTIAL",
    commission: "30% COMMISSION",
    commissionVal: 30,
    rating: 4.8,
    reviews: "2.1k",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
    category: "Development",
    earnings: "$3k - $12k /mo",
  },
  {
    id: 4,
    title: "Crypto & DeFi Investment Strategy",
    desc: "Navigate the crypto markets with proven DeFi protocols, yield farming, and risk management.",
    price: 349,
    potential: "$20,000/MO POTENTIAL",
    commission: "20% COMMISSION",
    commissionVal: 20,
    rating: 4.6,
    reviews: "890",
    image:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80",
    category: "Finance",
    earnings: "$2k - $20k /mo",
  },
  {
    id: 5,
    title: "YouTube Automation Empire",
    desc: "Scale a faceless YouTube channel using AI scripts, voiceovers, and outsourced editing.",
    price: 299,
    potential: "$6,000/MO POTENTIAL",
    commission: "35% COMMISSION",
    commissionVal: 35,
    rating: 4.7,
    reviews: "560",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
    category: "Content Creator",
    earnings: "$500 - $6k /mo",
  },
  {
    id: 6,
    title: "Email Marketing Mastery & Funnels",
    desc: "Build high-converting email sequences, automations, and sales funnels that run 24/7.",
    price: 199,
    potential: "$5,000/MO POTENTIAL",
    commission: "50% COMMISSION",
    commissionVal: 50,
    rating: 4.5,
    reviews: "430",
    image:
      "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=600&q=80",
    category: "Marketing",
    earnings: "$500 - $5k /mo",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`text-xs ${i <= Math.floor(rating) ? "text-amber-400" : "text-gray-300"}`}
        >
          ★
        </span>
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating}</span>
    </div>
  );
}

function CourseCard({
  course,
  onClick,
}: {
  course: Course;
  onClick: (course: Course) => void;
}) {
  return (
    <div
      onClick={() => onClick(course)}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col group"
    >
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Top badges */}
        <div className="absolute top-3 left-3 bg-[#0f172a] text-green-400 text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {course.potential}
        </div>

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-medium px-2.5 py-1 rounded-full">
          {course.category}
        </div>

        {/* Bottom badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          {course.commission}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 leading-tight mb-2 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
          {course.desc}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ${course.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Stars rating={course.rating} />
            <span className="text-xs text-gray-500">({course.reviews})</span>
          </div>
        </div>

        <button className="mt-4 w-full py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-sm font-medium transition-colors">
          View Details →
        </button>
      </div>
    </div>
  );
}

function Modal({
  course,
  onClose,
}: {
  course: Course | null;
  onClose: () => void;
}) {
  if (!course) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] overflow-hidden shadow-2xl">
        <div className="relative">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-56 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-2 mb-4">
            <span className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {course.category}
            </span>
            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              👥 {course.reviews} students
            </span>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            {course.title}
          </h2>
          <p className="text-gray-600 leading-relaxed">{course.desc}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 my-6">
            {[
              { label: "Price", value: `$${course.price.toLocaleString()}` },
              { label: "Rating", value: `⭐ ${course.rating}` },
              { label: "Reviews", value: course.reviews },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 rounded-2xl p-4 text-center"
              >
                <div className="text-xs text-gray-500">{item.label}</div>
                <div className="font-semibold text-lg mt-1">{item.value}</div>
              </div>
            ))}
          </div>

          <button className="w-full py-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl font-semibold text-base hover:scale-[1.02] transition-transform">
            Enroll Now — ${course.price.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CourseMarketplace() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Course Marketplace
            </h1>
            <p className="text-gray-600 mt-1">
              Discover high-ticket digital products
            </p>
          </div>
          <div className="text-sm text-gray-500 mt-3 sm:mt-0">
            🗂 {courses.length} premium courses
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={setSelectedCourse}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
}
