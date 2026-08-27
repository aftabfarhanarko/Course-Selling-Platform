"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  ThumbsUp,
  Tag,
  MessageSquare,
  User,
  Sparkles,
  ChevronRight,
  Send,
  CheckCircle,
  Eye,
  Heart,
  BookOpen,
} from "lucide-react";
import { BLOG_POSTS } from "@/data/blogData";

interface BlogDetailsProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailsPage({ params }: BlogDetailsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  const post = BLOG_POSTS.find((p) => p.slug === params.slug) || BLOG_POSTS[0];

  if (!post) {
    notFound();
  }

  // Related articles (excluding current)
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  // Ultra-slow & smooth transition helper (1.8s duration)
  const getSmoothTransition = (delay: number = 0) => ({
    duration: 1.8,
    delay,
    ease: "easeInOut" as const,
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8FAFC] pt-10 sm:pt-14 pb-24 overflow-hidden">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-[#E0E7FF]/50 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-[550px] h-[550px] rounded-full bg-[#EEF2FF]/60 blur-3xl" />
      </div>

      <div className="w-10/12 mx-auto relative z-10 md:px-11 space-y-10">
        
        {/* ── BREADCRUMB NAV ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={getSmoothTransition(0)}
          className="flex items-center justify-between gap-4"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#5B50E6] transition-all duration-500 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-[#5B50E6] text-white text-xs font-bold shadow-sm">
              {post.category}
            </span>
          </div>
        </motion.div>

        {/* ── FULL WIDTH HERO HEADER BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={getSmoothTransition(0.2)}
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex flex-col justify-end group"
        >
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/40" />

          {/* Banner Meta Content */}
          <div className="relative z-10 p-6 sm:p-10 md:p-12 space-y-5 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" /> {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> {post.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Eye className="w-3.5 h-3.5" /> 2.4k Views
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Author Info Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/15">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-11 h-11 rounded-2xl object-cover border border-white/30 shadow-md"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{post.author.name}</h4>
                  <p className="text-[11px] text-slate-300 font-medium">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigator.clipboard?.writeText(window.location.href)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs border border-white/20 transition-all duration-500 flex items-center gap-1.5 shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── FULL WIDTH MAIN CONTENT LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Article Body (Col-span 8) */}
          <motion.article
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
            transition={getSmoothTransition(0.4)}
            className="lg:col-span-8 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 hover:shadow-lg transition-all duration-700"
          >
            
            {/* Article Intro Lead Box */}
            <div className="p-5 sm:p-6 bg-slate-50/80 backdrop-blur-md border-l-4 border-[#5B50E6] rounded-r-2xl space-y-2 border-slate-200/60 shadow-xs">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#5B50E6]" /> Key Takeaways
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            {/* Rich Formatted Article Content */}
            <div
              className="prose prose-slate max-w-none prose-headings:font-extrabold prose-headings:text-slate-900 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-p:mb-4 prose-p:leading-relaxed prose-p:text-slate-600 prose-li:mb-2 prose-blockquote:border-l-4 prose-blockquote:border-[#5B50E6] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-700 prose-code:bg-indigo-50/80 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[#5B50E6] prose-code:font-mono"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags Section */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-500 mr-1">Topic Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1 rounded-full bg-slate-100/80 backdrop-blur-md text-slate-700 text-xs font-bold border border-slate-200/60"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Bio Card */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start gap-4 bg-slate-50/70 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-14 h-14 rounded-2xl object-cover shadow-sm border border-slate-200"
              />
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-slate-900">{post.author.name}</h4>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#5B50E6] font-bold">
                    Author
                  </span>
                </div>
                <p className="text-xs text-[#5B50E6] font-bold">{post.author.role}</p>
                <p className="text-xs text-slate-500 font-medium leading-relaxed pt-1">
                  Passionate tech educator and software developer building interactive learning experiences for developers worldwide at EduNova.
                </p>
              </div>
            </div>
          </motion.article>

          {/* Sidebar Widgets (Col-span 4) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Table of Contents Widget */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={getSmoothTransition(0.55)}
              className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4 hover:shadow-md transition-all duration-700"
            >
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#5B50E6]" /> Article Outline
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium border-l-2 border-slate-100 pl-3">
                <li className="hover:text-[#5B50E6] cursor-pointer transition-colors duration-500 font-bold text-[#5B50E6]">
                  1. Executive Overview & Core Concepts
                </li>
                <li className="hover:text-[#5B50E6] cursor-pointer transition-colors duration-500">
                  2. Architectural Performance Highlights
                </li>
                <li className="hover:text-[#5B50E6] cursor-pointer transition-colors duration-500">
                  3. Production Code Implementation
                </li>
                <li className="hover:text-[#5B50E6] cursor-pointer transition-colors duration-500">
                  4. Summary & Best Practices
                </li>
              </ul>
            </motion.div>

            {/* Course Promo Glass Widget */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={getSmoothTransition(0.65)}
              className="bg-gradient-to-br from-slate-900/90 via-indigo-950/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-xl text-white space-y-4 border border-slate-700/60"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold text-indigo-300 border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> EduNova Course Track
              </div>
              <h3 className="text-lg font-extrabold leading-snug">
                Master Full-Stack Software Engineering
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Enroll in project-based courses with 1-on-1 mentor code reviews and verified certifications.
              </p>
              <Link
                href="/courses"
                className="inline-flex w-full items-center justify-center py-3 rounded-2xl bg-[#5B50E6] hover:bg-[#4D42DB] text-white font-bold text-xs transition-all duration-500 shadow-md shadow-[#5B50E6]/30 hover:scale-105"
              >
                Explore All Courses
              </Link>
            </motion.div>

            {/* Newsletter Subscription Box */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={getSmoothTransition(0.75)}
              className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-3 hover:shadow-md transition-all duration-700"
            >
              <h3 className="text-sm font-extrabold text-slate-900">Subscribe to Tech Weekly</h3>
              <p className="text-xs text-slate-500 font-medium">Get the latest developer tutorials delivered directly to your inbox.</p>
              <div className="space-y-2 pt-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#5B50E6] transition-all"
                />
                <button className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all duration-500">
                  Subscribe Free
                </button>
              </div>
            </motion.div>

          </aside>
        </div>

        {/* ── FULL WIDTH RELATED ARTICLES SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={getSmoothTransition(0.85)}
          className="pt-10 border-t border-slate-200/80 space-y-8"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#5B50E6] uppercase tracking-wider">More Articles</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Recommended Related Articles
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#5B50E6] transition-all duration-500 shadow-xs"
            >
              View All Insights <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rPost, idx) => (
              <motion.div
                key={rPost.id}
                initial={{ opacity: 0, y: 35 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
                transition={getSmoothTransition(0.9 + idx * 0.15)}
              >
                <Link
                  href={`/blog/${rPost.slug}`}
                  className="group bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#5B50E6]/40 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="h-44 w-full overflow-hidden bg-slate-100/60">
                      <img
                        src={rPost.image}
                        alt={rPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <span className="text-[11px] font-bold text-[#5B50E6] uppercase tracking-wider">{rPost.category}</span>
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#5B50E6] transition-colors duration-500 line-clamp-2 leading-snug">
                        {rPost.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 font-medium">
                        {rPost.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
                      <span>{rPost.date}</span>
                      <span>{rPost.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
