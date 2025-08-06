import HomePage from "../features/Home/pages/HomePage";
import TheyPage from "../features/Home/pages/TheyPage";
import { ProductListingPage } from "../features/Products/pages/ProductListingPage";
import { OrderHistoryPage } from "../features/OrderHistory/pages/OrderHistory";
import { OrderConfirmation } from "../features/OrderConfirmation/pages";
import ProtectedRoute from "../components/ProtectedRoute";

// User routes (some public, some protected)
export const userRoutes = [
  // Public routes
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products",
    element: <ProductListingPage />,
  },
  {
    path: "/about",
    element: <TheyPage />,
  },
  
  // Protected user routes (require authentication)
  {
    path: "/orders",
    element: (
      <ProtectedRoute requireAuth={true}>
        <OrderHistoryPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/order-confirmation",
    element: (
      <ProtectedRoute requireAuth={true}>
        <OrderConfirmation />
      </ProtectedRoute>
    ),
  },
];
