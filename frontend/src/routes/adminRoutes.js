import AdminOrderManagement from "../features/AdminOrderManagament";
import CreateProduct from "../features/AdminProductManagement/pages/CreateProduct";
import ViewProducts from "../features/AdminProductManagement/pages/ViewProducts";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../components/AdminLayout";

// Protected admin routes (require authentication and admin role)
export const adminRoutes = [
  {
    path: "/admin-view-products",
    element: (
      <ProtectedRoute requireAuth={true} requireAdmin={true}>
        <ViewProducts />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedRoute requireAuth={true} requireAdmin={true}>
        <AdminLayout>
          <AdminOrderManagement />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <ProtectedRoute requireAuth={true} requireAdmin={true}>
        <AdminLayout>
          <ViewProducts />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/create",
    element: (
      <ProtectedRoute requireAuth={true} requireAdmin={true}>
        <AdminLayout>
          <CreateProduct />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
];
