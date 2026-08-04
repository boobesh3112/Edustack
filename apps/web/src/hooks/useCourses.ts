import { useEffect, useState, useCallback } from "react";
import { apiFetch } from "../lib/api";
import { Course } from "../types";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    const { courses } = await apiFetch("/courses");
    setCourses(courses);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const createCourse = async (payload: Partial<Course>) => {
    const { course } = await apiFetch("/courses", { method: "POST", body: JSON.stringify(payload) });
    setCourses((c) => [course, ...c]);
    return course;
  };

  const deleteCourse = async (id: string) => {
    await apiFetch(`/courses/${id}`, { method: "DELETE" });
    setCourses((c) => c.filter((x) => x.id !== id));
  };

  return { courses, loading, createCourse, deleteCourse, refetch: fetchCourses };
}
