import HomePage from "../features/Home/pages/HomePage";
import TheyPage from "../features/Home/pages/TheyPage";
import { ProductListingPage } from "../features/Products/pages/ProductListingPage";
import { OrderHistoryPage } from "../features/OrderHistory/pages/OrderHistory";
import { OrderConfirmation } from "../features/OrderConfirmation/pages";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";

export const userRoutes = [
  // Public routes
  {
    path: "/",
    element: <TheyPage />,
  },
  {
    path: "/home",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/products",
    element: (
      <Layout>
        <ProductListingPage />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: <TheyPage />,
  },

  // Protected user routes
  {
    path: "/order-history",
    element: (
      <Layout>
        <ProtectedRoute requireAuth={true}>
          <OrderHistoryPage />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/order-confirmation",
    element: (
      <Layout>
        <ProtectedRoute requireAuth={true}>
          <OrderConfirmation />
        </ProtectedRoute>
      </Layout>
    ),
  },
];
