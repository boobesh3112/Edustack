import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun, GraduationCap } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { useTheme } from "../../hooks/useTheme";

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <GraduationCap className="text-brand-600" size={26} />
          EduStack
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-300">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <Link to="/login"><Button variant="outline" size="sm">Log In</Button></Link>
          <Link to="/signup"><Button size="sm">Get Started</Button></Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="block text-sm font-medium" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <Link to="/login" className="flex-1"><Button variant="outline" className="w-full">Log In</Button></Link>
            <Link to="/signup" className="flex-1"><Button className="w-full">Get Started</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}
