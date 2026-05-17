// app/courses/[id]/components/CourseMetrics.tsx
interface Props {
  course: {
    potential: string;
    commission: string;
  };
}

export default function CourseMetrics({ course }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-wrap sm:flex-nowrap divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
      <div className="w-full sm:flex-1 pb-4 sm:pb-0 sm:px-6 first:pl-0 last:pr-0 text-center sm:text-left">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          Earning Potential
        </p>
        <p className="text-2xl font-black text-emerald-600">
          {course.potential}
        </p>
      </div>
      <div className="w-full sm:flex-1 py-4 sm:py-0 sm:px-6 text-center sm:text-left">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">
          Affiliate Commission
        </p>
        <p className="text-2xl font-black text-blue-600">{course.commission}</p>
      </div>
    </div>
  );
}
