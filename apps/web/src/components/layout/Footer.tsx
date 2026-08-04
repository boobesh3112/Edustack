import { Link } from "react-router-dom";
import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-10">
      <Container className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} EduStack. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/contact">Contact</Link>
          <a href="#pricing">Pricing</a>
          <a href="#features">Features</a>
        </div>
      </Container>
    </footer>
  );
}
