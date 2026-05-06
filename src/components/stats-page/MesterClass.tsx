import React from "react";
import {
  Users,
  Clock,
  Award,
  MessageSquare,
  Layers,
  FileCode,
} from "lucide-react";

const MesterClass = () => {
  return (
    <section className=" py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            The Masterclass Curriculum
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Module 01 - Large White Card */}
          <div className="md:col-span-2 bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-4 block">
                MODULE 01
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6">
                The UI Framework
              </h3>
              <p className="text-[#64748B] text-base md:text-lg leading-relaxed max-w-xl mb-8">
                Establish the foundations of systematic design. We cover grid
                hierarchies, atomic component logic, and the "Infinity Variable"
                system for spacing and colors.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
                12 Lessons
              </span>
              <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
                4.5 Hours
              </span>
            </div>
          </div>

          {/* Module 02 - Blue Card */}
          <div className="bg-[#0047FF] p-8 md:p-10 rounded-[40px] text-white flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-blue-200 font-bold text-[10px] uppercase tracking-[0.2em] mb-4 block">
                MODULE 02
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
                The $10k Sales Script
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed opacity-80">
                Psychological closing techniques specifically for high-ticket
                interface projects.
              </p>
            </div>
            <div className="mt-8 flex justify-end">
              <MessageSquare className="w-12 h-12 text-blue-400 opacity-40" />
            </div>
            {/* Background pattern/effect */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
          </div>

          {/* Module 03 - Small Light Card */}
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-[40px] border border-white shadow-sm">
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4 block">
              MODULE 03
            </span>
            <h3 className="text-xl font-extrabold text-[#0F172A] mb-3">
              User Flow Logic
            </h3>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Mapping complex dashboard journeys without losing the user.
            </p>
          </div>

          {/* Module 04 - Small Light Card */}
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-[40px] border border-white shadow-sm">
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4 block">
              MODULE 04
            </span>
            <h3 className="text-xl font-extrabold text-[#0F172A] mb-3">
              Handoff Systems
            </h3>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Using dev-ready tokens to eliminate friction with engineers.
            </p>
          </div>

          {/* Certification - Green Card */}
          <div className="bg-[#057A32] p-8 rounded-[40px] text-white flex flex-col items-center justify-center text-center shadow-lg shadow-emerald-900/10">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-emerald-300" />
            </div>
            <h3 className="text-xl font-extrabold mb-2">Certification</h3>
            <p className="text-emerald-100/70 text-sm">
              Become a verified IncomeArchitect.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MesterClass;
