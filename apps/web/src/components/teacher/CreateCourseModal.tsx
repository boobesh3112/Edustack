import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/Button";
import { Course } from "../../types";

interface Props {
  onClose: () => void;
  onCreate: (data: Partial<Course>) => Promise<void>;
}

export function CreateCourseModal({ onClose, onCreate }: Props) {
  const [form, setForm] = useState({ title: "", subject: "", gradeLevel: "", description: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onCreate(form);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create Course</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <input required placeholder="Course title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4" />
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="Subject" value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4" />
            <input placeholder="Grade level" value={form.gradeLevel}
              onChange={(e) => setForm({ ...form, gradeLevel: e.target.value })}
              className="h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4" />
          </div>
          <textarea placeholder="Description" rows={3} value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2" />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Course"}
          </Button>
        </form>
      </div>
    </div>
  );
}
