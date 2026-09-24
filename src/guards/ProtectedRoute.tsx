import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { canAccessRole } from '../shared/data/permissions';
import { getDashboardRoute } from '../shared/data/permissions';

interface ProtectedRouteProps {
  readonly children: React.ReactNode;
  readonly requiredRole?: 'client' | 'seller' | 'admin';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, status } = useAuth();
  const location = useLocation();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login, preserving the intended URL
    return <Navigate to="/connexion" state={{ from: location.pathname }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to the correct dashboard for their role
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  // Additional check: can this role access this route?
  if (requiredRole && !canAccessRole(user.role, location.pathname)) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  return <>{children}</>;
}
