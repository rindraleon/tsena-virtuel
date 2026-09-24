import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardRoute } from '../shared/data/permissions';

/**
 * Redirects authenticated users away from login/register pages
 * to their respective dashboard.
 */
export default function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user, status } = useAuth();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  return <>{children}</>;
}
