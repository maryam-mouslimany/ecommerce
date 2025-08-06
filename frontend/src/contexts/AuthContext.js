import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthContext: useEffect called - initializing auth');
    
    const handleUserStateChange = (user) => {
      console.log('AuthContext: User state changed:', user);
      setUser(user);
      setLoading(false);
    };

    const unsubscribe = authService.onUserStateChange(handleUserStateChange);

    // Initialize auth state
    const currentUser = authService.getCurrentUser();
    const token = authService.getToken();
    console.log('AuthContext: Initial auth check - user:', currentUser, 'token:', !!token);
    
    if (currentUser && token) {
      setUser(currentUser);
    }
    setLoading(false);

    return () => {
      console.log('AuthContext: Unsubscribing from user state changes');
      unsubscribe();
    };
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.data.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.data.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
