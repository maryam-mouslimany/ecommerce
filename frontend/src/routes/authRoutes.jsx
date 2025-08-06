import { LoginPage } from "../features/Auth/pages/LoginPage";
import { RegisterPage } from "../features/Auth/pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateProduct from "../features/AdminProductManagement/pages/CreateProduct";
import ViewProducts from "../features/AdminProductManagement/pages/ViewProducts";
import CheckoutPage from "../features/Checkout";
import Layout from "../components/Layout";
import ProductDetails from "../features/AdminProductManagement/pages/ProductDetails";

// Public routes (for unauthenticated users)
export const authRoutes = [
  {
    path: "/login",
    element: (
      <ProtectedRoute requireAuth={false}>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectedRoute requireAuth={false}>
        <RegisterPage />
      </ProtectedRoute>
    ),
  },
  { path: "/admin-view-products", element: <ViewProducts /> },
  { path: "/admin-create-products", element: <CreateProduct /> },
  {
    path: "/checkout",
    element: (
      <Layout>
        <CheckoutPage />
      </Layout>
    ),
  },
  { path: "/admin-update-product/:id", element: <CreateProduct /> },
  { path: "/admin-view-product/:id", element: <ProductDetails /> },
  { path: "/checkout", element: <CheckoutPage /> },
];
