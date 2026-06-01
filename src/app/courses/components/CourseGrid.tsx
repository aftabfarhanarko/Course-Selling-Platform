import { Course } from "./types";
import CourseCard from "./CourseCard";

interface Props {
  courses: Course[];
  categoryMeta: Record<
    string,
    { icon: any; color: string; bg: string }
  >;
}

export default function CourseGrid({ courses, categoryMeta }: Props) {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {courses.map((course, i) => (
        <CourseCard
          key={course.id}
          course={course}
          index={i}
          categoryMeta={categoryMeta}
        />
      ))}
    </div>
  );
}
