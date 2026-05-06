import ArchitectBlueprint from "@/components/stats-page/ArchitectBlueprint";
import HeroSection from "@/components/stats-page/Hero";
import MesterClass from "@/components/stats-page/MesterClass";
import Profltpathway from "@/components/stats-page/Profltpathway";

export default function StatsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <HeroSection />
      <ArchitectBlueprint />
      <Profltpathway />
      <MesterClass />
    </div>
  );
}
