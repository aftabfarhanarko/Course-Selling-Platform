import React from "react";

const Profltpathway = () => {
  const projects = [
    {
      id: "V",
      name: "VelocityCRM Startup",
      task: "Design System Setup",
      amount: "$3,500",
      color: "bg-blue-50",
      textColor: "text-blue-600",
      rotate: "-rotate-2",
    },
    {
      id: "F",
      name: "Fintech Dashboard",
      task: "User Flow Optimization",
      amount: "$2,800",
      color: "bg-blue-100",
      textColor: "text-blue-700",
      rotate: "rotate-1 translate-x-4",
    },
    {
      id: "A",
      name: "AuthFlow Platform",
      task: "MVP Launch Partner",
      amount: "$2,200",
      color: "bg-slate-50",
      textColor: "text-slate-600",
      rotate: "-rotate-1",
    },
  ];

  return (
    <section className=" py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left Side: Floating Cards */}
        <div className="relative w-full lg:w-1/2 flex flex-col gap-6 py-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-between transition-transform duration-500 hover:scale-105 hover:z-10 cursor-pointer ${project.rotate}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 ${project.color} rounded-full flex items-center justify-center font-bold ${project.textColor}`}
                >
                  {project.id}
                </div>
                <div>
                  <h4 className="font-bold text-[#1E293B] text-lg">
                    {project.name}
                  </h4>
                  <p className="text-[#64748B] text-sm font-medium">
                    {project.task}
                  </p>
                </div>
              </div>
              <div className="text-emerald-600 font-black text-xl tracking-tight">
                {project.amount}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-1/2">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#065F46] text-white text-[11px] font-black uppercase tracking-widest mb-8">
            PROFIT PATHWAY
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold text-[#0F172A] leading-[1.1] mb-8">
            The $8,500/mo <br />
            <span className="text-emerald-600 font-black">Prosperity</span>{" "}
            Model
          </h2>

          <p className="text-[#64748B] text-lg leading-relaxed mb-12 max-w-xl">
            You don't need dozens of clients to replace your 9-5. You need three
            specific high-value relationships. We teach you how to target
            startups who have just raised funding and need architectural
            precision.
          </p>

          <div className="flex items-center gap-12 border-t border-slate-200 pt-10">
            <div>
              <div className="text-3xl font-black text-[#0F172A] mb-1">
                $102k
              </div>
              <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest">
                ANNUAL CAPACITY
              </div>
            </div>
            <div className="w-px h-12 bg-slate-200" />
            <div>
              <div className="text-3xl font-black text-[#0F172A] mb-1">
                3 Clients
              </div>
              <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest">
                MONTHLY WORKLOAD
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profltpathway;
