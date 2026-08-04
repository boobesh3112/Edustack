import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../../lib/api";
import { StudentProgressTable } from "../../components/teacher/StudentProgressTable";

interface CourseDetail {
  id: string;
  title: string;
  description?: string;
  chapters: { id: string; title: string; materials: any[] }[];
  enrollments: { student: { id: string; fullName: string; email: string } }[];
}

export function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseDetail | null>(null);

  useEffect(() => {
    apiFetch(`/courses/${id}`).then((res) => setCourse(res.course));
  }, [id]);

  if (!course) return <p className="text-sm text-slate-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p className="mt-1 text-sm text-slate-500">{course.description}</p>

      <div className="mt-8">
        <h2 className="font-semibold text-lg">Chapters</h2>
        <div className="mt-3 space-y-2">
          {course.chapters.map((ch) => (
            <div key={ch.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <p className="font-medium text-sm">{ch.title}</p>
              <p className="text-xs text-slate-500">{ch.materials.length} materials</p>
            </div>
          ))}
          {!course.chapters.length && <p className="text-sm text-slate-500">No chapters yet.</p>}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-lg">Enrolled Students</h2>
        <div className="mt-3">
          <StudentProgressTable students={course.enrollments.map((e) => e.student)} />
        </div>
      </div>
    </div>
  );
}
