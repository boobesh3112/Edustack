import { Link } from "react-router-dom";
import { Users, FileText, Video, Trash2 } from "lucide-react";
import { Card } from "../ui/Card";
import { Course } from "../../types";

export function CourseCard({ course, onDelete }: { course: Course; onDelete: (id: string) => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-brand-600 bg-brand-50 dark:bg-brand-900/30 px-2 py-0.5 rounded-full">
            {course.subject}
          </span>
          <h3 className="mt-2 font-semibold text-lg">{course.title}</h3>
          <p className="mt-1 text-sm text-slate-500 line-clamp-2">{course.description || "No description"}</p>
        </div>
        <button onClick={() => onDelete(course.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1"><Users size={14} /> {course._count?.enrollments ?? 0}</span>
        <span className="flex items-center gap-1"><FileText size={14} /> {course._count?.materials ?? 0}</span>
        <span className="flex items-center gap-1"><Video size={14} /> {course._count?.liveClasses ?? 0}</span>
      </div>

      <Link to={`/dashboard/courses/${course.id}`} className="mt-4 block text-center text-sm font-medium text-brand-600 hover:underline">
        Manage Course →
      </Link>
    </Card>
  );
}
