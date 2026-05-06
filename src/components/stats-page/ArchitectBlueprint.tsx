import React from "react";
import { 
  Compass, 
  Handshake, 
  Share2, 
  Banknote, 
  Brain, 
  Rocket 
} from "lucide-react";

interface BlueprintCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const blueprintData: BlueprintCard[] = [
  {
    title: "UI Architecture",
    icon: <Compass className="w-5 h-5 text-blue-600" />,
    description:
      "Learn to build systematic design frameworks that remain consistent across 1,000+ screens.",
  },
  {
    title: "Client Acquisition",
    icon: <Handshake className="w-5 h-5 text-blue-600" />,
    description:
      "The exact outreach strategy to land high-ticket SaaS founders who value design systems over templates.",
  },
  {
    title: "Scaling Systems",
    icon: <Share2 className="w-5 h-5 text-blue-600" />,
    description:
      "Automation workflows for handoff, documentation, and asset management to double your productivity.",
  },
  {
    title: "Value-Based Pricing",
    icon: <Banknote className="w-5 h-5 text-blue-600" />,
    description:
      "Stop billing hourly. Learn to price based on the ROI your interfaces bring to the product.",
  },
  {
    title: "UX Psych",
    icon: <Brain className="w-5 h-5 text-blue-600" />,
    description:
      'Understand user cognitive load and friction points to create "sticky" SaaS experiences.',
  },
  {
    title: "Launch Protocols",
    icon: <Rocket className="w-5 h-5 text-blue-600" />,
    description:
      "A step-by-step guide to navigating the final stages of a project for maximum client satisfaction.",
  },
];

const ArchitectBlueprint: React.FC = () => {
  return (
    <section className=" py-24 px-4">
      <div className="max-w-10/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            The Architect's Blueprint
          </h2>
          <p className="mt-6 text-lg text-[#64748B] max-w-3xl mx-auto leading-relaxed">
            Go beyond pixels. Master the logic, psychology, and systems required
            to build world-class SaaS products.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blueprintData.map((card) => (
            <div
              key={card.title}
              className="bg-white p-10 rounded-[32px] shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow duration-300"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center mb-8">
                {card.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-[#1E293B] mb-4">
                {card.title}
              </h3>
              
              <p className="text-[#64748B] leading-relaxed text-[17px]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectBlueprint;
