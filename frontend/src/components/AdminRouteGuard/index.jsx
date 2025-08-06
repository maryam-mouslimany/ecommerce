import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminRouteGuard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const isAdminRoute = location.pathname.startsWith('/admin');
    
    if (isAdminRoute) {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        navigate('/login', { replace: true });
        return;
      }
      
      // If authenticated but not admin, show error and redirect
      if (user && user.role !== 'admin') {
        alert('Access denied! You do not have permission to access admin pages.');
        navigate('/', { replace: true });
        return;
      }
    }
  }, [location.pathname, user, isAuthenticated, navigate]);

  return children;
};

export default AdminRouteGuard;
