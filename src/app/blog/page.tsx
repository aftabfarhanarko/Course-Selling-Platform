"use client";

import Link from "next/link";
import { FileText, Calendar, Clock, ArrowRight, User, Tag } from "lucide-react";

export default function BlogPage() {
  const blogs = [
    {
      id: "1",
      title: "Mastering Next.js 14 App Router and Server Actions",
      excerpt: "A comprehensive guide on leveraging server actions and optimized routing for modern full-stack web applications.",
      author: "Maruf Hosain",
      date: "Aug 24, 2026",
      readTime: "6 min read",
      category: "Development",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "2",
      title: "10 Essential CSS & Tailwind Tricks for Premium UIs",
      excerpt: "Learn how to use modern CSS backdrop filters, smooth glassmorphic shadows, and micro-interactions.",
      author: "Aftab Farhan",
      date: "Aug 20, 2026",
      readTime: "4 min read",
      category: "UI Design",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "3",
      title: "Building Scalable Microservices with Node.js & Docker",
      excerpt: "Discover patterns for decoupling backend microservices and maintaining high resilience in production environments.",
      author: "Sarah Jenkins",
      date: "Aug 15, 2026",
      readTime: "8 min read",
      category: "Backend",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-10 pb-20 overflow-hidden" style={{ fontFamily: "var(--font-bai-jamjuree)" }}>
      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[750px] h-[300px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] text-xs font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4" /> EduNova Articles & Insights
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Latest News & <span className="bg-gradient-to-r from-[#4F46E5] via-purple-600 to-indigo-600 bg-clip-text text-transparent">Tech Tutorials</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
            Stay updated with industry trends, expert coding tips, and step-by-step developer guides.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article
              key={post.id}
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Thumbnail Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#4F46E5] shadow-md">
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" /> {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#4F46E5] transition-colors duration-200 line-clamp-2 mb-3">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer info */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-[#4F46E5] flex items-center justify-center font-bold text-xs">
                      {post.author[0]}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{post.author}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#4F46E5] group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
