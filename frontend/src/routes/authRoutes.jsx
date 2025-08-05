import { LoginPage } from "../features/Auth/pages/LoginPage";
import { RegisterPage } from "../features/Auth/pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";

// Public routes (for unauthenticated users)
export const authRoutes = [
  { 
    path: "/login", 
    element: (
      <ProtectedRoute requireAuth={false}>
        <LoginPage />
      </ProtectedRoute>
    ) 
  },
  { 
    path: "/register", 
    element: (
      <ProtectedRoute requireAuth={false}>
        <RegisterPage />
      </ProtectedRoute>
    ) 
  },
];
