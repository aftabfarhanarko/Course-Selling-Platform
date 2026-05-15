"use client";

import React, { useEffect, useState } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate a realistic top progress bar (like YouTube / GitHub)
    const timings = [
      { target: 30, delay: 0,   duration: 400 },
      { target: 60, delay: 400, duration: 600 },
      { target: 80, delay: 1000,duration: 800 },
      { target: 92, delay: 1800,duration: 1200 },
    ];

    const timers = timings.map(({ target, delay, duration }) =>
      setTimeout(() => {
        setProgress(target);
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#e8e8f5]">

      {/* ── Top progress bar (YouTube-style) ── */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[9999]">
        <div
          className="h-full bg-[#4f46e5] rounded-r-full shadow-[0_0_10px_rgba(79,70,229,0.6)] transition-all ease-out"
          style={{
            width: `${progress}%`,
            transitionDuration: progress === 30 ? "400ms" : progress === 60 ? "600ms" : "800ms",
          }}
        />
      </div>

      {/* ── Center content ── */}
      <div className="flex flex-col items-center gap-8 select-none">

        {/* Brand */}
        <span className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
          <span className="text-[#1a1a2e]">JEV</span>
          <span className="text-[#4f46e5]">XO</span>
        </span>

        {/* Spinner ring */}
        <div className="relative w-14 h-14">
          {/* Outer track */}
          <div className="absolute inset-0 rounded-full border-[3px] border-[#d0d0e8]" />
          {/* Spinning arc */}
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#4f46e5] animate-spin" />
          {/* Inner dot pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#4f46e5] animate-pulse" />
          </div>
        </div>

        {/* Animated loading text */}
        <div className="flex items-center gap-1 text-[#7878a0] text-sm font-medium tracking-wide">
          <span>Loading</span>
          <span className="flex gap-[3px] items-end pb-[1px]">
            <span
              className="w-[3px] h-[3px] rounded-full bg-[#7878a0] animate-bounce"
              style={{ animationDelay: "0ms", animationDuration: "1s" }}
            />
            <span
              className="w-[3px] h-[3px] rounded-full bg-[#7878a0] animate-bounce"
              style={{ animationDelay: "150ms", animationDuration: "1s" }}
            />
            <span
              className="w-[3px] h-[3px] rounded-full bg-[#7878a0] animate-bounce"
              style={{ animationDelay: "300ms", animationDuration: "1s" }}
            />
          </span>
        </div>
      </div>

      {/* ── Decorative background blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#4f46e5]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#4f46e5]/5 blur-3xl" />
      </div>
    </div>
  );
};

export default Loading;