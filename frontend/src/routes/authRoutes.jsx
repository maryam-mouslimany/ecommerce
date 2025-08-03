import CreateProduct from "../features/AdminProductManagement/pages/CreateProduct";
import ViewProducts from "../features/AdminProductManagement/pages/ViewProducts";
import { LoginPage } from "../features/Auth/pages/LoginPage";
import { RegisterPage } from "../features/Auth/pages/RegisterPage";
import CheckoutPage from "../features/Checkout";

export const authRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/admin-view-products", element: <ViewProducts /> },
  { path: "/admin-create-products", element: <CreateProduct /> },
  { path: "/checkout", element: <CheckoutPage /> },
];
