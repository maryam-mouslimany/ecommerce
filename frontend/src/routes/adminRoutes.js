import AdminOrderManagement from "../features/AdminOrderManagament";
import CreateProduct from "../features/AdminProductManagement/pages/CreateProduct";
import ViewProducts from "../features/AdminProductManagement/pages/ViewProducts";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../components/AdminLayout";

// Protected admin routes (require authentication and admin role)
export const adminRoutes = [
  // Temporary test route - remove after testing
  {
    path: "/admin-test",
    element: (
      <AdminLayout>
        <div style={{padding: '20px'}}>
          <h1>Admin Test Page</h1>
          <p>If you can see this page with the sidebar, then the sidebar is working!</p>
        </div>
      </AdminLayout>
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
