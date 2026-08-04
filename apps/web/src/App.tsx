import { DashboardLayout } from "./layouts/DashboardLayout";
import { TeacherOverview } from "./pages/teacher/TeacherOverview";
import { CoursesPage } from "./pages/teacher/CoursesPage";
import { CourseDetailPage } from "./pages/teacher/CourseDetailPage";
import { LiveClassesPage } from "./pages/teacher/LiveClassesPage";
import { MaterialsPage } from "./pages/teacher/MaterialsPage";
import { StudentsPage } from "./pages/teacher/StudentsPage";

// Inside <Routes>, replace the placeholder /dashboard route with:
<Route
  path="/dashboard"
  element={
    <ProtectedRoute allowedRoles={["TEACHER"]}>
      <DashboardLayout><TeacherOverview /></DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/dashboard/courses"
  element={<ProtectedRoute allowedRoles={["TEACHER"]}><DashboardLayout><CoursesPage /></DashboardLayout></ProtectedRoute>}
/>
<Route
  path="/dashboard/courses/:id"
  element={<ProtectedRoute allowedRoles={["TEACHER"]}><DashboardLayout><CourseDetailPage /></DashboardLayout></ProtectedRoute>}
/>
<Route
  path="/dashboard/live-classes"
  element={<ProtectedRoute allowedRoles={["TEACHER"]}><DashboardLayout><LiveClassesPage /></DashboardLayout></ProtectedRoute>}
/>
<Route
  path="/dashboard/materials"
  element={<ProtectedRoute allowedRoles={["TEACHER"]}><DashboardLayout><MaterialsPage /></DashboardLayout></ProtectedRoute>}
/>
<Route
  path="/dashboard/students"
  element={<ProtectedRoute allowedRoles={["TEACHER"]}><DashboardLayout><StudentsPage /></DashboardLayout></ProtectedRoute>}
/>
