import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export function AuthLayout({ children, title, subtitle }: PropsWithChildren<{ title: string; subtitle?: string }>) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-brand-600 to-brand-900 text-white p-12">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <GraduationCap size={28} /> EduStack
        </Link>
        <div>
          <h2 className="text-3xl font-bold leading-snug">Teach. Learn. Grow.<br />All in one place.</h2>
          <p className="mt-4 text-brand-100 max-w-sm">
            Join thousands of teachers and students already using EduStack for live, interactive classes.
          </p>
        </div>
        <p className="text-sm text-brand-200">© {new Date().getFullYear()} EduStack</p>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
