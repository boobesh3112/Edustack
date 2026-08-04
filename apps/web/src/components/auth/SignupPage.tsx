import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { Button } from "../../components/ui/Button";
import { supabase } from "../../lib/supabaseClient";
import { apiFetch } from "../../lib/api";
import { Role } from "../../context/AuthContext";

export function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "STUDENT" as Role });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.fullName, role: form.role } },
      });
      if (signUpError) throw signUpError;
      if (!data.user) throw new Error("Signup failed");

      // Create the matching profile row in our DB
      await apiFetch("/auth/complete-profile", {
        method: "POST",
        body: JSON.stringify({
          id: data.user.id,
          email: form.email,
          fullName: form.fullName,
          role: form.role,
        }),
      });

      navigate("/verify-email");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start teaching or learning today">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {(["STUDENT", "TEACHER"] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setForm({ ...form, role: r })}
              className={`h-11 rounded-lg border text-sm font-medium transition-colors ${
                form.role === r
                  ? "border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-900/30"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            >
              {r === "STUDENT" ? "I'm a Student" : "I'm a Teacher"}
            </button>
          ))}
        </div>

        <input required placeholder="Full name" value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4" />

        <input required type="email" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4" />

        <input required type="password" minLength={8} placeholder="Password (min 8 characters)" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4" />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account? <Link to="/login" className="text-brand-600 font-medium">Log in</Link>
      </p>
    </AuthLayout>
  );
}
