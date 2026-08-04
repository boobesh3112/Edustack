import { useState } from "react";
import { apiFetch } from "../lib/api";
import { Material } from "../types";

export function useMaterials() {
  const [uploading, setUploading] = useState(false);

  const uploadMaterial = async (file: File, courseId: string, title: string, type: Material["type"]) => {
    setUploading(true);
    try {
      // 1. Get signed upload URL
      const { signedUrl, path } = await apiFetch("/materials/upload-url", {
        method: "POST",
        body: JSON.stringify({ courseId, fileName: file.name }),
      });

      // 2. Upload directly to Supabase Storage
      const uploadRes = await fetch(signedUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
      if (!uploadRes.ok) throw new Error("Upload failed");

      // 3. Register material record
      const { material } = await apiFetch("/materials", {
        method: "POST",
        body: JSON.stringify({ title, type, path, courseId, fileSize: file.size }),
      });
      return material as Material;
    } finally {
      setUploading(false);
    }
  };

  return { uploadMaterial, uploading };
}
