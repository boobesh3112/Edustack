import { Link } from "react-router-dom";
import { PlayCircle, ArrowRight } from "lucide-react";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-white dark:from-slate-900 dark:to-slate-950" />
      <Container className="text-center">
        <span className="inline-block rounded-full bg-brand-100 px-4 py-1 text-sm font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
          Live classes • Interactive whiteboard • Real results
        </span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight">
          Teach and Learn <span className="text-brand-600">Without Limits</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          EduStack brings live classes, a professional whiteboard, tests, and progress tracking
          into one platform built for serious teaching.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup">
            <Button size="lg">Start Teaching Free <ArrowRight size={18} /></Button>
          </Link>
          <Button size="lg" variant="outline"><PlayCircle size={18} /> Watch Demo</Button>
        </div>
      </Container>
    </section>
  );
}
