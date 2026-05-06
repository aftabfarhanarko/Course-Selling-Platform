"use client";
import React from "react";
import { Lock, ShieldCheck } from "lucide-react";

const Build = () => {
  return (
    <section className="bg-white py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#0047FF] rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,71,255,0.3)]">
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Main Title */}
            <h2 className="text-3xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Build Your High-Ticket Future.
            </h2>

            {/* Price */}
            <div className="text-5xl md:text-7xl font-black text-white mb-3">
              $499
            </div>

            {/* Price Subtext */}
            <p className="text-blue-100/70 text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] mb-12">
              ONE-TIME PAYMENT � LIFETIME ACCESS
            </p>

            {/* CTA Button */}
            <button className="bg-white text-[#0047FF] px-10 py-5 rounded-full text-lg font-black hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 mb-12 cursor-pointer">
              Secure Your Spot
            </button>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <div className="flex items-center gap-2 text-blue-100/60">
                <Lock className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  SECURE CHECKOUT
                </span>
              </div>
              <div className="flex items-center gap-2 text-blue-100/60">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  VERIFIED PROGRAM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Build;
