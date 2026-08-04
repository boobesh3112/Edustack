import { Container } from "../components/ui/Container";
import { Card } from "../components/ui/Card";

const testimonials = [
  { name: "Anita Sharma", role: "Physics Teacher", quote: "The whiteboard feels as natural as a real classroom board. My students engage far more now." },
  { name: "Rohit Verma", role: "JEE Mentor", quote: "Test creation and auto-evaluation saved me hours every week." },
  { name: "Priya Nair", role: "Student, Class 12", quote: "I can revisit recorded classes and download notes anytime. Huge help before exams." },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold">Loved by teachers and students</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name}>
              <p className="text-sm text-slate-600 dark:text-slate-300">"{t.quote}"</p>
              <div className="mt-4">
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
