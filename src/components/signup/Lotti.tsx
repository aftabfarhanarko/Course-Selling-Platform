"use client";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function SignupLotti(): React.JSX.Element {
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/Login.json")
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
    <div className="w-full max-w-md">
      {animationData ? (
        <Lottie animationData={animationData} loop autoplay />
      ) : (
        <div className="h-[340px] w-full" />
      )}
    </div>
  );
}

