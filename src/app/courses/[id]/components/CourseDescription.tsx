// app/courses/[id]/components/CourseDescription.tsx
interface Props {
  course: {
    title: string;
    desc: string;
    potential: string;
  };
}

export default function CourseDescription({ course }: Props) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        About this course
      </h2>
      <div className="space-y-4 text-[15px] text-slate-600 leading-relaxed">
        <p>{course.desc}</p>
        <p>
          This intensive program is designed for ambitious professionals who
          want to escape the trap of low-ticket services. You will learn the
          exact blueprint to architect a premium offer, position yourself as an
          authority, and execute strategies that command high fees.
        </p>
        <p>
          By the end of this course, you won't just have theoretical knowledge;
          you will have a deployed, functioning system capable of generating{" "}
          {course.potential.toLowerCase().replace(" potential", "")}.
        </p>
      </div>
    </div>
  );
}
