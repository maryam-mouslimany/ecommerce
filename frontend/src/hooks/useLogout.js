import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still navigate to login even if logout fails
      navigate('/login');
    }
  };

  return handleLogout;
};

export default useLogout;
