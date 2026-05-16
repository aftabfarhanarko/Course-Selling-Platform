import { COURSES } from "@/lib/courses";

export default function Head({ params }: { params: { id: string } }) {
  const courseId = Number(params.id);
  const course = COURSES.find((c) => c.id === courseId);

  const title = course
    ? `${course.title} | Course Selling Platform`
    : "Course Details | Course Selling Platform";

  const description = course
    ? `${course.title} course details (${course.category}).`
    : "Course details page.";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
}