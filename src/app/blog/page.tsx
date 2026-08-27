"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  User,
  Tag,
  Search,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Bookmark,
} from "lucide-react";
import { BLOG_POSTS } from "@/data/blogData";

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Development", "UI Design", "Backend", "AI & Tech", "Career"];

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Ultra-slow & smooth transition helper (1.8s duration)
  const getSmoothTransition = (delay: number = 0) => ({
    duration: 1.8,
    delay,
    ease: "easeInOut" as const,
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8FAFC] pt-14 sm:pt-20 pb-24 overflow-hidden">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full bg-[#E0E7FF]/50 blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[#EEF2FF]/60 blur-3xl" />
      </div>

      <div className="w-10/12 mx-auto relative z-10 md:px-11">
        
        {/* ── HERO & FEATURED STORY UNIFIED GLASS BANNER ── */}
        {featuredPost && (
          <div className="mb-12">
            <div className="group relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 min-h-[420px] sm:min-h-[460px] md:min-h-[500px] flex flex-col justify-end">
              {/* Full Bleed Image Background with Gradient Overlay */}
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/30" />

              {/* Top Glass Header Pill */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>EduNova Featured Story</span>
                </div>
                <span className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 text-xs font-extrabold">
                  {featuredPost.category}
                </span>
              </div>

              {/* Bottom Glass Content Card Overlay */}
              <div className="relative z-10 p-6 sm:p-8 md:p-10 max-w-3xl space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" /> {featuredPost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" /> {featuredPost.readTime}
                  </span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white group-hover:text-indigo-300 transition-all duration-700 ease-out leading-tight tracking-tight">
                    {featuredPost.title}
                  </h1>
                </Link>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium line-clamp-2 max-w-2xl">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/15">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-2xl object-cover border border-white/30 shadow-md"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{featuredPost.author.name}</h4>
                      <p className="text-[11px] text-slate-400 font-medium">{featuredPost.author.role}</p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-[#5B50E6] hover:bg-[#4D42DB] text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg shadow-[#5B50E6]/40 hover:scale-105 gap-2"
                  >
                    Read Full Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SEARCH & CATEGORY FILTER BAR (Glassmorphic Bar) ── */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-xl p-3.5 sm:p-4 rounded-3xl border border-white/60 shadow-lg shadow-slate-200/50">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-300 shrink-0 ${
                  selectedCategory === cat
                    ? "bg-[#5B50E6] text-white shadow-md shadow-[#5B50E6]/30 scale-105"
                    : "bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/60 shadow-xs"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/80 border border-slate-200/80 rounded-2xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5B50E6] focus:bg-white focus:ring-2 focus:ring-[#5B50E6]/20 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* ── DYNAMIC VARIED GLASSMORPHIC CARDS GRID ── */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredPosts.map((post, idx) => {
              // 1. Horizontal Wide Card (Col-span 2)
              if (idx === 0) {
                return (
                  <article
                    key={post.id}
                    className="md:col-span-2 group bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#5B50E6]/40 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                      <div className="sm:col-span-5 relative h-52 sm:h-full min-h-[220px] bg-slate-100/60 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#5B50E6] shadow-sm border border-white/50">
                          {post.category}
                        </span>
                      </div>

                      <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-[#5B50E6]" /> {post.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#5B50E6]" /> {post.readTime}
                            </span>
                          </div>

                          <Link href={`/blog/${post.slug}`}>
                            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#5B50E6] transition-colors duration-300 leading-snug">
                              {post.title}
                            </h3>
                          </Link>

                          <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-8 h-8 rounded-xl object-cover border border-slate-200 shadow-sm"
                            />
                            <div>
                              <h4 className="text-xs font-bold text-slate-900">{post.author.name}</h4>
                              <p className="text-[10px] text-slate-400 font-medium">{post.author.role}</p>
                            </div>
                          </div>

                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-50 group-hover:bg-[#5B50E6] text-slate-700 group-hover:text-white font-bold text-xs transition-all duration-300 gap-1.5 shadow-sm"
                          >
                            Read Article <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }

              // 2. Dark Glassmorphic Card Style
              if (idx === 3) {
                return (
                  <article
                    key={post.id}
                    className="group bg-gradient-to-br from-slate-900/90 via-indigo-950/90 to-slate-900/90 backdrop-blur-md border border-slate-700/60 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between text-white"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold text-indigo-300 border border-white/10">
                          {post.category}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">{post.readTime}</span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-slate-300 text-xs leading-relaxed font-medium line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-xl object-cover border border-slate-700 shadow-sm"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-slate-200">{post.author.name}</h4>
                            <p className="text-[10px] text-slate-400 font-medium">{post.author.role}</p>
                          </div>
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl bg-white/10 group-hover:bg-indigo-600 text-white font-bold text-xs transition-all duration-300 gap-1 border border-white/10 shadow-sm"
                        >
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              }

              // 3. Standard Glass Vertical Card (Short Image)
              return (
                <article
                  key={post.id}
                  className="group bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#5B50E6]/40 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Glass Image Container */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100/60">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#5B50E6] shadow-sm border border-white/50">
                        {post.category}
                      </span>
                    </div>

                    {/* Glass Body Content */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#5B50E6]" /> {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#5B50E6]" /> {post.readTime}
                        </span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#5B50E6] transition-colors duration-300 line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="p-5 sm:p-6 pt-0">
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-xl object-cover border border-slate-200 shadow-sm"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{post.author.name}</h4>
                          <p className="text-[10px] text-slate-400 font-medium">{post.author.role}</p>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl bg-slate-50 group-hover:bg-[#5B50E6] text-slate-700 group-hover:text-white font-bold text-xs transition-all duration-300 gap-1 shadow-sm"
                      >
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 space-y-3">
            <h3 className="text-lg font-bold text-slate-900">No articles found</h3>
            <p className="text-xs text-slate-500">Try adjusting your search query or selecting a different category filter.</p>
          </div>
        )}

      </div>
    </div>
  );
}
