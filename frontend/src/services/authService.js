import api from "./api";

let userStateListeners = [];

export const authService = {
  onUserStateChange(callback) {
    userStateListeners.push(callback);
    return () => {
      userStateListeners = userStateListeners.filter(
        (listener) => listener !== callback
      );
    };
  },

  notifyUserStateChange() {
    const user = this.getCurrentUser();
    userStateListeners.forEach((callback) => callback(user));
  },

  async login(credentials) {
    try {
      console.log("API Request - Login:", credentials);
      const response = await api.post("/v1/guest/login", credentials);
      console.log("API Response - Login:", response.data);

      if (response.data.success === false) {
        console.error("Login failed:", response.data.message);
        throw new Error(response.data.message || "Invalid credentials");
      }

      if (response.data.data && response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data.token}`;

        this.notifyUserStateChange();
      }

      return response.data;
    } catch (error) {
      console.error("AuthService login error:", error);

      if (error instanceof Error) {
        throw error;
      }
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      throw new Error(errorMessage);
    }
  },

  async register(userData) {
    try {
      console.log("API Request - Register:", userData);
      const response = await api.post("/v1/guest/register", userData);
      console.log("API Response - Register:", response.data);

      if (response.data.data && response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data.token}`;

        this.notifyUserStateChange();
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Registration failed" };
    }
  },

  async logout() {
    try {
      console.log("API Request - Logout");
      await api.post("/v1/user/logout");
      console.log("API Response - Logout: Success");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete api.defaults.headers.common["Authorization"];

      this.notifyUserStateChange();
    }
  },

  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getToken() {
    return localStorage.getItem("token");
  },

  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  },

  setupInterceptors() {
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

    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response?.status === 401 &&
          !error.config?.url?.includes("/guest/login") &&
          this.getToken()
        ) {
          console.log("Token expired, logging out...");
          this.logout();
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  },
};

authService.setupInterceptors();

export default authService;
