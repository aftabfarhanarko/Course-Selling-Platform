"use client";

export default function Skeleton() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex items-center gap-2">
          <div className="h-4 w-12 bg-slate-200 rounded"></div>
          <div className="h-4 w-4 bg-slate-200 rounded"></div>
          <div className="h-4 w-16 bg-slate-200 rounded"></div>
          <div className="h-4 w-4 bg-slate-200 rounded"></div>
          <div className="h-4 w-24 bg-slate-200 rounded"></div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-[800px] space-y-6">
            <div className="h-6 w-32 bg-slate-800 rounded"></div>
            <div className="h-10 w-3/4 bg-slate-800 rounded"></div>
            <div className="h-6 w-5/6 bg-slate-800 rounded"></div>
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="h-5 w-24 bg-slate-800 rounded"></div>
              <div className="h-5 w-32 bg-slate-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Layout Skeleton */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 -mt-10 relative z-20 flex flex-col lg:flex-row gap-8">
        {/* Main Column */}
        <div className="flex-1 space-y-8">
          {/* Metrics Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between gap-6">
            <div className="flex-1 space-y-3">
              <div className="h-4 w-20 bg-slate-200 rounded"></div>
              <div className="h-8 w-28 bg-slate-200 rounded"></div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="h-4 w-20 bg-slate-200 rounded"></div>
              <div className="h-8 w-28 bg-slate-200 rounded"></div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="h-4 w-20 bg-slate-200 rounded"></div>
              <div className="h-8 w-28 bg-slate-200 rounded"></div>
            </div>
          </div>

          {/* What You Learn Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
            <div className="h-6 w-48 bg-slate-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-5 w-5 bg-slate-200 rounded-full shrink-0"></div>
                  <div className="h-5 w-full bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Pricing Card */}
        <div className="lg:w-[380px] shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 space-y-6">
            <div className="aspect-video w-full bg-slate-200 rounded-xl"></div>
            <div className="space-y-3">
              <div className="h-8 w-1/3 bg-slate-200 rounded"></div>
              <div className="h-10 w-full bg-slate-200 rounded-xl"></div>
            </div>
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <div className="h-4 w-full bg-slate-200 rounded"></div>
              <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
