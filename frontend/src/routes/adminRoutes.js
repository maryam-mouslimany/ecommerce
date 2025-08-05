import AdminOrderManagement from "../features/AdminOrderManagament";
import CreateProduct from "../features/AdminProductManagement/pages/CreateProduct";
import ViewProducts from "../features/AdminProductManagement/pages/ViewProducts";
import ProtectedRoute from "../components/ProtectedRoute";

// Protected admin routes (require authentication)
export const adminRoutes = [
  {
    path: "/admin/orders",
    element: (
      <ProtectedRoute requireAuth={true}>
        <AdminOrderManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <ProtectedRoute requireAuth={true}>
        <ViewProducts />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/create",
    element: (
      <ProtectedRoute requireAuth={true}>
        <CreateProduct />
      </ProtectedRoute>
    ),
  },
];
