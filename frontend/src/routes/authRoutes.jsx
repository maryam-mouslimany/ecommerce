<<<<<<< HEAD
import { LoginPage } from "../features/Auth/pages/LoginPage";
import { RegisterPage } from "../features/Auth/pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
=======
import CreateProduct from "../features/AdminProductManagement/pages/CreateProduct";
import ViewProducts from "../features/AdminProductManagement/pages/ViewProducts";
import { LoginPage } from "../features/Auth/pages/LoginPage";
import { RegisterPage } from "../features/Auth/pages/RegisterPage";
import CheckoutPage from "../features/Checkout";
>>>>>>> ff6661fae8748fd9832753d8a251d64f6dafe5fc

// Public routes (for unauthenticated users)
export const authRoutes = [
<<<<<<< HEAD
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
=======
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/admin-view-products", element: <ViewProducts /> },
  { path: "/admin-create-products", element: <CreateProduct /> },
  { path: "/checkout", element: <CheckoutPage /> },
>>>>>>> ff6661fae8748fd9832753d8a251d64f6dafe5fc
];
