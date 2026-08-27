"use client";

import HomeHero from "@/components/homepage/Hero";
import TrustedCompanies from "@/components/homepage/TrustedCompanies";
import CategorySection from "@/components/homepage/CategorySection";
import CourseSection from "@/components/homepage/CoursSection";
import PrecisionWorkflow from "@/components/homepage/WorkFlow";
import ArchitectureProgress from "@/components/homepage/ArchitectureProgress";
import InstructorSection from "@/components/homepage/InstructorSection";
import LiveInsight from "@/components/homepage/LiveInsight";
import CareerOutcomes from "@/components/homepage/CareerOutcomes";
import CTASection from "@/components/homepage/CTASection";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <HomeHero />
      <TrustedCompanies />
      <CategorySection />
      <CourseSection />
      <PrecisionWorkflow />
      <ArchitectureProgress />
      <InstructorSection />
      <LiveInsight />
      <CareerOutcomes />
      <CTASection />
    </main>
  );
}
