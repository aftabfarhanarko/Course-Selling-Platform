import ArchitectureProgress from "@/components/homepage/ArchitectureProgress";
import CountDownTrust from "@/components/homepage/countdown";
import CourseSection from "@/components/homepage/coursSection";
import HomeHero from "@/components/homepage/hero";
import LiveInsight from "@/components/homepage/liveInsight";
import PrecisionWorkflow from "@/components/homepage/workFlow";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <CountDownTrust />
      <PrecisionWorkflow />
      <CourseSection />
      <ArchitectureProgress />
      <LiveInsight />
    </div>
  );
}
