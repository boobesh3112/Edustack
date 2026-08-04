import { Check } from "lucide-react";
import { Container } from "../components/ui/Container";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/cn";

const plans = [
  { name: "Starter", price: "Free", features: ["Up to 10 students", "1 live class/week", "Basic whiteboard"], highlight: false },
  { name: "Pro", price: "₹999/mo", features: ["Unlimited students", "Unlimited live classes", "Full whiteboard + PDF tools", "Tests & analytics"], highlight: true },
  { name: "Institute", price: "Custom", features: ["Multiple teachers", "Admin dashboard", "Priority support", "Custom branding"], highlight: false },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900/40">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold">Simple, transparent pricing</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3 items-start">
          {plans.map((p) => (
            <Card key={p.name} className={cn("relative", p.highlight && "border-brand-600 border-2 shadow-lg md:-translate-y-2")}>
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-semibold text-xl">{p.name}</h3>
              <p className="mt-2 text-3xl font-bold">{p.price}</p>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Check size={16} className="text-brand-600 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-8" variant={p.highlight ? "primary" : "outline"}>
                Choose {p.name}
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
