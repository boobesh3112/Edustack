import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { Button } from "../../components/ui/Button";
import { supabase } from "../../lib/supabaseClient";

export function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword(form);
    setLoading(false);
    if (signInError) return setError(signInError.message);
    navigate("/dashboard");
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required type="email" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4" />

        <input required type="password" placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4" />

        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-brand-600 font-medium">Forgot password?</Link>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account? <Link to="/signup" className="text-brand-600 font-medium">Sign up</Link>
      </p>
    </AuthLayout>
  );
}
