import { AuthLayout } from "../../components/auth/AuthLayout";
import { MailCheck } from "lucide-react";

export function VerifyEmailPage() {
  return (
    <AuthLayout title="Verify your email">
      <div className="text-center">
        <MailCheck className="mx-auto text-brand-600" size={48} />
        <p className="mt-4 text-sm text-slate-500">
          We've sent a verification link to your email. Please confirm your address before logging in.
        </p>
      </div>
    </AuthLayout>
  );
}
