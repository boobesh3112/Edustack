import { useState } from "react";
import { Plus, Video } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { ScheduleClassModal } from "../../components/teacher/ScheduleClassModal";
import { useLiveClasses } from "../../hooks/useLiveClasses";
import { useCourses } from "../../hooks/useCourses";

export function LiveClassesPage() {
  const { classes, scheduleClass } = useLiveClasses();
  const { courses } = useCourses();
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Live Classes</h1>
        <Button onClick={() => setShowModal(true)}><Plus size={18} /> Schedule Class</Button>
      </div>

      <div className="mt-6 space-y-3">
        {classes.map((c) => (
          <Card key={c.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
                <Video size={18} className="text-brand-600" />
              </div>
              <div>
                <p className="font-medium text-sm">{c.title}</p>
                <p className="text-xs text-slate-500">{c.course?.title} • {new Date(c.scheduledAt).toLocaleString()} • {c.durationMin} min</p>
              </div>
            </div>
            <Button size="sm" variant="outline">Start Class</Button>
          </Card>
        ))}
        {!classes.length && <p className="text-sm text-slate-500 text-center py-10">No classes scheduled yet.</p>}
      </div>

      {showModal && <ScheduleClassModal courses={courses} onClose={() => setShowModal(false)} onSchedule={scheduleClass} />}
    </div>
  );
}
