"use client";

import CountDownTrust from "@/components/homepage/Countdown";
import PrecisionWorkflow from "@/components/homepage/WorkFlow";
import CourseSection from "@/components/homepage/CoursSection";
import ArchitectureProgress from "@/components/homepage/ArchitectureProgress";
import LiveInsight from "@/components/homepage/LiveInsight";
import HomeHero from "@/components/homepage/Hero";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <HomeHero />
      
      <PrecisionWorkflow />
      <CourseSection />
      <ArchitectureProgress />
      <LiveInsight />
    </main>
  );
}

