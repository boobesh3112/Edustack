import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { useAuth, Role } from "../../context/AuthContext";

export function ProtectedRoute({ children, allowedRoles }: PropsWithChildren<{ allowedRoles?: Role[] }>) {
  const { session, profile, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-slate-500">Loading...</div>;
  }
  if (!session) return <Navigate to="/login" replace />;
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
