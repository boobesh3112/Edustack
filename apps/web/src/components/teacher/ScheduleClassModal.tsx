import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/Button";
import { Course } from "../../types";

interface Props {
  courses: Course[];
  onClose: () => void;
  onSchedule: (data: { courseId: string; title: string; scheduledAt: string; durationMin: number }) => Promise<void>;
}

export function ScheduleClassModal({ courses, onClose, onSchedule }: Props) {
  const [form, setForm] = useState({ courseId: courses[0]?.id || "", title: "", scheduledAt: "", durationMin: 60 });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSchedule(form);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Schedule Live Class</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <select required value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })}
            className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4">
            {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
          <input required placeholder="Class title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4" />
          <input required type="datetime-local" value={form.scheduledAt}
            onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
            className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4" />
          <input required type="number" min={15} placeholder="Duration (minutes)" value={form.durationMin}
            onChange={(e) => setForm({ ...form, durationMin: Number(e.target.value) })}
            className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4" />
          <Button type="submit" className="w-full" disabled={loading || !courses.length}>
            {loading ? "Scheduling..." : "Schedule Class"}
          </Button>
          {!courses.length && <p className="text-xs text-red-500">Create a course first.</p>}
        </form>
      </div>
    </div>
  );
}
