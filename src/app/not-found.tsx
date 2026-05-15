"use client";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Home, ChevronLeft } from "lucide-react";

function NotFound(): React.JSX.Element {
  const [animationData, setAnimationData] = useState<Record<
    string,
    unknown
  > | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/Not-Found.json")
      .then((res) => res.json())
      .then((data) => {
        if (active) setAnimationData(data as Record<string, unknown>);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-base-bg px-4 py-16">

      {/* ── Brand logo ── */}
      <a
        href="/"
        className="absolute top-6 left-6 sm:top-8 sm:left-10 font-syne text-xl font-extrabold tracking-tight select-none"
      >
        <span className="text-base-dark">JEV</span>
        <span className="text-brand-500">XO</span>
      </a>

      {/* ── Main content ── */}
      <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center gap-6 sm:gap-8">

        {/* Lottie animation / skeleton */}
        <div className="w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px]">
          {animationData ? (
            <Lottie
              animationData={animationData}
              loop
              autoplay
              className="w-full h-auto"
            />
          ) : (
            <div className="h-64 sm:h-72 md:h-80 w-full rounded-2xl bg-base-card animate-pulse" />
          )}
        </div>

        {/* 404 badge */}
        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-500 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
          Error 404
        </div>

        {/* Heading + subtext */}
        <div className="flex flex-col gap-3">
          <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-500 leading-tight">
            Page Not Found
          </h1>
          <p className="text-base-mid text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
            Looks like this page took a detour. The link might be broken, or the
            page may have been moved or deleted.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">

          {/* Go Home — fixed: removed text-black conflict */}
          <a
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                       bg-brand-500 hover:bg-brand-600 active:scale-95
                       text-white font-semibold text-sm
                       px-7 py-3 rounded-full
                       shadow-md shadow-brand-500/30
                       transition-all duration-200"
          >
            <Home size={16} strokeWidth={2.2} />
            Go Home
          </a>

          {/* Go Back */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                       bg-white hover:bg-base-hover active:scale-95
                       text-base-dark font-semibold text-sm
                       px-7 py-3 rounded-full
                       border border-base-line
                       transition-all duration-200"
          >
            <ChevronLeft size={16} strokeWidth={2.2} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;