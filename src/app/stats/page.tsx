import ArchitectBlueprint from "@/components/stats-page/ArchitectBlueprint";
import BonusAssets from "@/components/stats-page/BonusAssets";
import Build from "@/components/stats-page/Build";
import Fqs from "@/components/stats-page/Fqs";
import HeroSection from "@/components/stats-page/Hero";
import MesterClass from "@/components/stats-page/MesterClass";
import Profltpathway from "@/components/stats-page/Profltpathway";
import Review from "@/components/stats-page/Review";

export default function StatsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <HeroSection />
      <ArchitectBlueprint />
      <Profltpathway />
      <MesterClass />
      <BonusAssets/>
      <Review/>
      <Fqs/>
      <Build/>
    </div>
  );
}
