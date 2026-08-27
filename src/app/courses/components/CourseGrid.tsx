import { Course } from "./types";
import CourseCard from "./CourseCard";

interface Props {
  courses: Course[];
  categoryMeta?: Record<
    string,
    { icon: any; color: string; bg: string }
  >;
}

export default function CourseGrid({ courses }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, i) => (
        <CourseCard
          key={course.id}
          course={course}
          index={i}
        />
      ))}
    </div>
  );
}
