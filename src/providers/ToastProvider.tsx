"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={3000}
      expand
      visibleToasts={4}
      offset={16}
      toastOptions={{
        classNames: {
          toast:
            "bg-white text-slate-900 border border-slate-200 shadow-xl shadow-slate-900/10 rounded-xl",
          title: "text-[13px] font-black",
          description: "text-[12px] text-slate-500 font-medium",
          actionButton:
            "bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-black",
          cancelButton:
            "bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-black",
          closeButton:
            "bg-white text-slate-500 hover:text-slate-900 border border-slate-200",
          icon: "text-blue-600",
        },
      }}
    />
  );
}
