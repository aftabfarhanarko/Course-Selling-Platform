// app/courses/[id]/components/WhatYouLearn.tsx
import { CheckCircle2 } from "lucide-react";

const LEARNING_POINTS = [
  "Develop high-conversion funnels and landing pages that turn visitors into paying customers.",
  "Master the psychology of high-ticket sales and closing techniques.",
  "Automate client acquisition using advanced AI tools and frameworks.",
  "Build a predictable, recurring revenue engine from scratch.",
  "Create scalable design systems to charge premium enterprise rates.",
  "Leverage performance marketing to scale rapidly across platforms.",
];

export default function WhatYouLearn() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        What you'll learn
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {LEARNING_POINTS.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2
              size={20}
              className="text-emerald-500 shrink-0 mt-0.5"
            />
            <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
