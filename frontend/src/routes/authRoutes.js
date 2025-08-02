import { LoginPage } from "../features/Auth/pages/LoginPage";
import { RegisterPage } from "../features/Auth/pages/RegisterPage";
import HomePage from "../features/Home/pages/HomePage";
import { ProductListingPage } from "../features/Products/pages/ProductListingPage";
import { OrderConfirmation } from "../features/OrderConfirmation/pages";
<<<<<<< HEAD
import CreateProduct from "../features/AdminProductManagement/pages/CreateProduct";
import ViewProducts from "../features/AdminProductManagement/pages/ViewProducts";
=======
import { OrderHistoryPage } from "../features/OrderHistory/pages/OrderHistory";
>>>>>>> feature/order-history

import TheyPage from "../features/Home/pages/TheyPage";

export const authRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/Home", element: <HomePage /> },
  { path: "/product-list", element: <ProductListingPage /> },
  { path: "/order-confrimation", element: <OrderConfirmation /> },
<<<<<<< HEAD
  { path: "/admin-view-products", element: <ViewProducts /> },
  { path: "/admin-create-products", element: <CreateProduct /> },
=======
  { path: "/order-history", element: <OrderHistoryPage /> },
>>>>>>> feature/order-history

  { path: "/They", element: <TheyPage /> },
];
