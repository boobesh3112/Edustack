import { PropsWithChildren, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, Video, FileText, Users, LogOut, Menu, X, Moon, Sun, GraduationCap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../lib/cn";

const teacherLinks = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/courses", label: "Courses", icon: BookOpen },
  { to: "/dashboard/live-classes", label: "Live Classes", icon: Video },
  { to: "/dashboard/materials", label: "Materials", icon: FileText },
  { to: "/dashboard/students", label: "Students", icon: Users },
];

export function DashboardLayout({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const { profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform lg:translate-x-0 lg:static",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200 dark:border-slate-800">
          <span className="flex items-center gap-2 font-bold"><GraduationCap className="text-brand-600" size={22} /> EduStack</span>
          <button className="lg:hidden" onClick={() => setOpen(false)}><X size={20} /></button>
        </div>
        <nav className="p-4 space-y-1">
          {teacherLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              <l.icon size={18} /> {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <button className="lg:hidden" onClick={() => setOpen(true)}><Menu size={22} /></button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{profile?.fullName}</p>
              <p className="text-xs text-slate-500">{profile?.role}</p>
            </div>
            <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Log out">
              <LogOut size={18} />
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
