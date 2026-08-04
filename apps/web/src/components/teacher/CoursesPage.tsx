import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { CourseCard } from "../../components/teacher/CourseCard";
import { CreateCourseModal } from "../../components/teacher/CreateCourseModal";
import { useCourses } from "../../hooks/useCourses";

export function CoursesPage() {
  const { courses, loading, createCourse, deleteCourse } = useCourses();
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Button onClick={() => setShowModal(true)}><Plus size={18} /> New Course</Button>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-slate-500">Loading courses...</p>
      ) : courses.length ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => <CourseCard key={c.id} course={c} onDelete={deleteCourse} />)}
        </div>
      ) : (
        <p className="mt-10 text-center text-sm text-slate-500">No courses yet. Create your first one!</p>
      )}

      {showModal && <CreateCourseModal onClose={() => setShowModal(false)} onCreate={createCourse} />}
    </div>
  );
}
