import { LoginPage } from "../features/Auth/pages/LoginPage";
import { RegisterPage } from "../features/Auth/pages/RegisterPage";
import HomePage from "../features/Home/pages/HomePage";
import { ProductListingPage } from "../features/Products/pages/ProductListingPage";
// import { OrderConfirmation } from "../features/OrderConfirmation/pages";
import CreateProduct from "../features/AdminProductManagement/pages/CreateProduct";
import ViewProducts from "../features/AdminProductManagement/pages/ViewProducts";
import { OrderHistoryPage } from "../features/OrderHistory/pages/OrderHistory";
import ProductDetails from "../features/AdminProductManagement/pages/ProductDetails";
import CheckoutPage from "../features/Checkout";
import TheyPage from "../features/Home/pages/TheyPage";
import AdminOrderManagement from "../features/AdminOrderManagament";

export const authRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/Home", element: <HomePage /> },
  { path: "/product-list", element: <ProductListingPage /> },
  // { path: "/order-confrimation", element: <OrderConfirmation /> },
  { path: "/admin-view-products", element: <ViewProducts /> },
  { path: "/admin-create-products", element: <CreateProduct /> },
  { path: "/admin-update-product/:id", element: <CreateProduct /> },
  { path: "/admin-view-product/:id", element: <ProductDetails /> },
  { path: "/order-history", element: <OrderHistoryPage /> },
  { path: "/admin/orders", element: <AdminOrderManagement /> },

  { path: "/They", element: <TheyPage /> },
  { path: "/checkout", element: <CheckoutPage /> },
];
