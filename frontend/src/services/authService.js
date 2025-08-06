import api from './api';

// Authentication service
let userStateListeners = [];

export const authService = {
  // Subscribe to user state changes
  onUserStateChange(callback) {
    userStateListeners.push(callback);
    return () => {
      userStateListeners = userStateListeners.filter(listener => listener !== callback);
    };
  },

  // Notify all listeners about user state change
  notifyUserStateChange() {
    const user = this.getCurrentUser();
    userStateListeners.forEach(callback => callback(user));
  },
  // Login user
  async login(credentials) {
    try {
      console.log('API Request - Login:', credentials);
      const response = await api.post('/v1/guest/login', credentials);
      console.log('API Response - Login:', response.data);
      
      // Check if login was successful
      if (response.data.success === false) {
        console.error('Login failed:', response.data.message);
        throw new Error(response.data.message || 'Invalid credentials');
      }
      
      if (response.data.data && response.data.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.data.token);
        console.log(response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        // Set default authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
        
        // Notify listeners about user state change
        this.notifyUserStateChange();
      }
      
      return response.data;
    } catch (error) {
      console.error('AuthService login error:', error);
      // If it's already an Error object (from our check above), re-throw it
      if (error instanceof Error) {
        throw error;
      }
      // Handle axios errors
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      throw new Error(errorMessage);
    }
  },

  // Register user
  async register(userData) {
    try {
      console.log('API Request - Register:', userData);
      const response = await api.post('/v1/guest/register', userData);
      console.log('API Response - Register:', response.data);
      
      if (response.data.data && response.data.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        // Set default authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
        
        // Notify listeners about user state change
        this.notifyUserStateChange();
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // Logout user
  async logout() {
    try {
      console.log('API Request - Logout');
      await api.post('/v1/user/logout');
      console.log('API Response - Logout: Success');
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local storage and headers
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
      
      // Notify listeners about user state change
      this.notifyUserStateChange();
    }
  },

  // Get current user from localStorage
  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Get token from localStorage
  getToken() {
    return localStorage.getItem("token");
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  },

  // Set up axios interceptor for automatic token attachment
  setupInterceptors() {
    // Request interceptor
    api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for handling token expiration
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Only handle 401 for authenticated requests, not login attempts
        if (error.response?.status === 401 && 
            !error.config?.url?.includes('/guest/login') &&
            this.getToken()) {
          // Token expired or invalid for authenticated user
          console.log('Token expired, logging out...');
          this.logout();
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  },
};

// Initialize interceptors when the service is imported
authService.setupInterceptors();

export default authService;
