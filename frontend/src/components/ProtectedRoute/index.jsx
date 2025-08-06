import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './index.module.css';

const ProtectedRoute = ({ children, requireAuth = true, requireAdmin = false }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>Loading...</div>
      </div>
    );
  }

  // If route requires authentication and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If route requires admin role and user is not admin
  if (requireAdmin && (!user || user.role !== 'admin')) {
    // Show unauthorized message for logged-in non-admin users
    if (user && user.role === 'customer') {
      return (
        <div className={styles.unauthorizedContainer}>
          <div className={styles.unauthorizedMessage}>
            <h2>Access Denied</h2>
            <p>You don't have permission to access this page.</p>
            <p>This page is for administrators only.</p>
            <button onClick={() => window.location.href = '/'} className={styles.homeButton}>
              Go to Homepage
            </button>
          </div>
        </div>
      );
    }
    // Redirect unauthenticated users to login
    return <Navigate to="/login" replace />;
  }

  // If route is for unauthenticated users (like login/register) and user is authenticated
  if (!requireAuth && isAuthenticated) {
    // Redirect to home page or intended destination
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return children;
};

export default ProtectedRoute;
