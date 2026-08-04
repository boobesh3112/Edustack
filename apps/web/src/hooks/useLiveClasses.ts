import { useEffect, useState, useCallback } from "react";
import { apiFetch } from "../lib/api";
import { LiveClass } from "../types";

export function useLiveClasses() {
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClasses = useCallback(async () => {
    setLoading(true);
    const { classes } = await apiFetch("/live-classes/upcoming");
    setClasses(classes);
    setLoading(false);
  }, []);

  useEffect(() => { fetchClasses(); }, [fetchClasses]);

  const scheduleClass = async (payload: { courseId: string; title: string; scheduledAt: string; durationMin: number }) => {
    const { liveClass } = await apiFetch("/live-classes", { method: "POST", body: JSON.stringify(payload) });
    setClasses((c) => [...c, liveClass].sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt)));
    return liveClass;
  };

  return { classes, loading, scheduleClass, refetch: fetchClasses };
}
