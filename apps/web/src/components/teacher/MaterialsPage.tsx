import { useState } from "react";
import { Plus, FileText, Video as VideoIcon, StickyNote } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { UploadMaterialModal } from "../../components/teacher/UploadMaterialModal";
import { useCourses } from "../../hooks/useCourses";
import { Material } from "../../types";

const icons = { PDF: FileText, VIDEO: VideoIcon, NOTE: StickyNote };

export function MaterialsPage() {
  const { courses } = useCourses();
  const [showModal, setShowModal] = useState(false);
  const [uploaded, setUploaded] = useState<Material[]>([]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Materials</h1>
        <Button onClick={() => setShowModal(true)}><Plus size={18} /> Upload Material</Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {uploaded.map((m) => {
          const Icon = icons[m.type];
          return (
            <Card key={m.id} className="flex items-center gap-3">
              <Icon className="text-brand-600" size={20} />
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{m.title}</p>
                <p className="text-xs text-slate-500">{m.type}</p>
              </div>
            </Card>
          );
        })}
        {!uploaded.length && <p className="text-sm text-slate-500 col-span-full text-center py-10">No materials uploaded in this session yet.</p>}
      </div>

      {showModal && (
        <UploadMaterialModal
          courses={courses}
          onClose={() => setShowModal(false)}
          onUploaded={(m) => setUploaded((prev) => [m, ...prev])}
        />
      )}
    </div>
  );
}
