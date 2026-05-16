"use client";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function ForgetLottie(): React.JSX.Element {
  const [animationData, setAnimationData] = useState<Record<
    string,
    unknown
  > | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/DATASECURITY.json")
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
    <div className="w-full max-w-7xl">
      {animationData ? (
        <Lottie animationData={animationData} loop autoplay />
      ) : (
        <div className="h-[440px] w-full" />
      )}
    </div>
  );
}
