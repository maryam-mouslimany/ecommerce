import AdminOrderManagement from "../features/AdminOrderManagament";
import CreateProduct from "../features/AdminProductManagement/pages/CreateProduct";
import ViewProducts from "../features/AdminProductManagement/pages/ViewProducts";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../components/AdminLayout";

// Protected admin routes (require authentication)
export const adminRoutes = [
  {
    path: "/admin/orders",
    element: (
      <ProtectedRoute requireAuth={true}>
        <AdminLayout>
          <AdminOrderManagement />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <ProtectedRoute requireAuth={true}>
        <AdminLayout>
          <ViewProducts />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/create",
    element: (
      <ProtectedRoute requireAuth={true}>
        <AdminLayout>
          <CreateProduct />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
];
