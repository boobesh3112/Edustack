import { BookOpen, Video, Users, FileText } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { useCourses } from "../../hooks/useCourses";
import { useLiveClasses } from "../../hooks/useLiveClasses";

export function TeacherOverview() {
  const { courses } = useCourses();
  const { classes } = useLiveClasses();

  const totalStudents = courses.reduce((sum, c) => sum + (c._count?.enrollments ?? 0), 0);
  const totalMaterials = courses.reduce((sum, c) => sum + (c._count?.materials ?? 0), 0);

  const stats = [
    { label: "Courses", value: courses.length, icon: BookOpen },
    { label: "Upcoming Classes", value: classes.length, icon: Video },
    { label: "Total Students", value: totalStudents, icon: Users },
    { label: "Materials", value: totalMaterials, icon: FileText },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome back 👋</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <s.icon className="text-brand-600" size={22} />
            <p className="mt-3 text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-lg">Upcoming Classes</h2>
        <div className="mt-3 space-y-2">
          {classes.slice(0, 5).map((c) => (
            <Card key={c.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-sm">{c.title}</p>
                <p className="text-xs text-slate-500">{c.course?.title} • {new Date(c.scheduledAt).toLocaleString()}</p>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/30">
                {c.status}
              </span>
            </Card>
          ))}
          {!classes.length && <p className="text-sm text-slate-500">No upcoming classes scheduled.</p>}
        </div>
      </div>
    </div>
  );
}
