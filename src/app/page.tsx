"use client";

import HomeHero from "@/components/homepage/Hero";
import TrustedCompanies from "@/components/homepage/TrustedCompanies";
import CategorySection from "@/components/homepage/CategorySection";
import CourseSection from "@/components/homepage/CoursSection";
import PrecisionWorkflow from "@/components/homepage/WorkFlow";
import ArchitectureProgress from "@/components/homepage/ArchitectureProgress";
import LiveInsight from "@/components/homepage/LiveInsight";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import FAQSection from "@/components/homepage/FAQSection";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-white overflow-hidden">
      {/* Universal Soft Decorative Ambient Light Blobs across Home Page */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -right-48 w-[600px] h-[600px] rounded-full bg-[#E0E7FF]/40 blur-3xl opacity-70" />
        <div className="absolute top-2/4 -left-48 w-[550px] h-[550px] rounded-full bg-[#EEF2FF]/50 blur-3xl opacity-70" />
        <div className="absolute top-3/4 -right-48 w-[600px] h-[600px] rounded-full bg-[#E0E7FF]/40 blur-3xl opacity-70" />
      </div>

      <div className="relative z-10">
        <HomeHero />
        <TrustedCompanies />
        <CategorySection />
        <CourseSection />
        <PrecisionWorkflow />
        <ArchitectureProgress />
        <LiveInsight />
        <FAQSection />
        <TestimonialsSection />
      </div>
    </main>
  );
}
