import { LoginPage } from "../features/Auth/pages/LoginPage";
import { RegisterPage } from "../features/Auth/pages/RegisterPage";
import HomePage from "../features/Home/pages/HomePage";
import { ProductListingPage } from "../features/Products/pages/ProductListingPage";
import { OrderConfirmation } from "../features/OrderConfirmation/pages";
import CreateProduct from "../features/AdminProductManagement/pages/CreateProduct";
import ViewProducts from "../features/AdminProductManagement/pages/ViewProducts";
import { OrderHistoryPage } from "../features/OrderHistory/pages/OrderHistory";
import CheckoutPage from "../features/Checkout";

import TheyPage from "../features/Home/pages/TheyPage";

export const authRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/Home", element: <HomePage /> },
  { path: "/product-list", element: <ProductListingPage /> },
  { path: "/order-confrimation", element: <OrderConfirmation /> },
  { path: "/admin-view-products", element: <ViewProducts /> },
  { path: "/admin-create-products", element: <CreateProduct /> },
  { path: "/admin-update-product/:id", element: <CreateProduct /> },
  { path: "/order-history", element: <OrderHistoryPage /> },

  { path: "/They", element: <TheyPage /> },
  { path: "/checkout", element: <CheckoutPage /> },
];
