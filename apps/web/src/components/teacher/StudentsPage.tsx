import { useCourses } from "../../hooks/useCourses";

export function StudentsPage() {
  const { courses } = useCourses();
  const totalStudents = courses.reduce((sum, c) => sum + (c._count?.enrollments ?? 0), 0);

  return (
    <div>
      <h1 className="text-2xl font-bold">Students</h1>
      <p className="mt-2 text-sm text-slate-500">{totalStudents} total students across {courses.length} courses.</p>
      <p className="mt-8 text-sm text-slate-500">
        Full per-course progress tables are available on each course's detail page.
      </p>
    </div>
  );
}
