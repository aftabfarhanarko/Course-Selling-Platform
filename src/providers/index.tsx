"use client";

import React from "react";
import { ThemeProvider } from "./theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="course-platform-theme">
      {children}
    </ThemeProvider>
  );
}

export * from "./theme-provider";
