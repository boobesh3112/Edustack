import { useState } from "react";
import { X, UploadCloud } from "lucide-react";
import { Button } from "../ui/Button";
import { Course, Material } from "../../types";
import { useMaterials } from "../../hooks/useMaterials";

interface Props {
  courses: Course[];
  onClose: () => void;
  onUploaded: (material: Material) => void;
}

export function UploadMaterialModal({ courses, onClose, onUploaded }: Props) {
  const { uploadMaterial, uploading } = useMaterials();
  const [courseId, setCourseId] = useState(courses[0]?.id || "");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<Material["type"]>("PDF");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setError("Please select a file");
    setError("");
    try {
      const material = await uploadMaterial(file, courseId, title, type);
      onUploaded(material);
      onClose();
    } catch (err: any) {
      setError(err.message || "Upload failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Upload Material</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <select required value={courseId} onChange={(e) => setCourseId(e.target.value)}
            className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4">
            {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
          <input required placeholder="Material title" value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4" />
          <select value={type} onChange={(e) => setType(e.target.value as Material["type"])}
            className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4">
            <option value="PDF">PDF</option>
            <option value="VIDEO">Video</option>
            <option value="NOTE">Note</option>
          </select>
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 cursor-pointer hover:border-brand-500">
            <UploadCloud size={24} className="text-slate-400" />
            <span className="text-sm text-slate-500">{file ? file.name : "Click to select a file"}</span>
            <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={uploading || !courses.length}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </div>
    </div>
  );
}
