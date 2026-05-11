"use client";

import React from "react";
import ReduxProvider from "./redux/ReduxProvider";
import QueryProvider from "./query/QueryProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import ToastProvider from "./ToastProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider defaultTheme="system" storageKey="course-platform-theme">
          <ToastProvider />
          {children}
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}

export * from "./theme/ThemeProvider";
