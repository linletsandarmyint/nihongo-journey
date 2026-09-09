import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until Supabase finishes checking the session
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pink-50">
        <div className="text-center">
          <div className="text-5xl animate-bounce">🌸</div>

          <p className="mt-4 text-sm font-medium text-pink-500">
            Loading your journey...
          </p>
        </div>
      </div>
    );
  }

  // Not logged in → go to Login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in → allow access
  return <Outlet />;
}

export default ProtectedRoute;
