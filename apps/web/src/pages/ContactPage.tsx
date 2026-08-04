import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";

export function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true); // will call API in Module 2+
  };

  return (
    <div>
      <Navbar />
      <Container className="py-20 max-w-lg">
        <h1 className="text-3xl font-bold text-center">Get in touch</h1>
        {sent ? (
          <p className="mt-8 text-center text-brand-600 font-medium">Thanks! We'll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input required placeholder="Name" className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4" />
            <input required type="email" placeholder="Email" className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4" />
            <textarea required placeholder="Message" rows={4} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2" />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        )}
      </Container>
      <Footer />
    </div>
  );
}
