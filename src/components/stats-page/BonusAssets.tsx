import React from "react";
import { FileText, Users, Box } from "lucide-react";

const BonusAssets = () => {
  const assets = [
    {
      title: "Contract Pack",
      icon: <FileText className="w-5 h-5 text-white" />,
      description:
        "Legally vetted master service agreements & SOW templates designed for SaaS projects.",
    },
    {
      title: "The Architect Hub",
      icon: <Users className="w-5 h-5 text-white" />,
      description:
        "Lifetime access to our private community of top-tier designers and developers.",
    },
    {
      title: "UI Component Vault",
      icon: <Box className="w-5 h-5 text-white" />,
      description:
        "A master Figma file with 500+ pre-built, responsive SaaS interface components.",
    },
  ];

  return (
    <section className=" py-20 px-4 max-w-11/12 mx-auto">
      <div className="">
        <div className="bg-[#1E293B] rounded-[48px] p-12 md:p-20 relative overflow-hidden">
          {/* Background Gradient Effect */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[100px] -mr-40 -mt-40 rounded-full" />

          <div className="relative z-10">
            {/* Header */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-20 tracking-tight">
              Elite Bonus Assets (Included)
            </h2>

            {/* Assets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {assets.map((asset, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon Container */}
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/10 shadow-xl">
                    {asset.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                    {asset.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-[280px]">
                    {asset.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BonusAssets;
