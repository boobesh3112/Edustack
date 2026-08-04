import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { Button } from "../../components/ui/Button";
import { supabase } from "../../lib/supabaseClient";

// Supabase redirects here with a recovery token already set as the session
export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: err } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (err) return setError(err.message);
    navigate("/login");
  };

  return (
    <AuthLayout title="Set a new password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required type="password" minLength={8} placeholder="New password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-11 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-4" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </AuthLayout>
  );
}
