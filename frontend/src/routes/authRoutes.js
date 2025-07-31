import { LoginPage } from "../features/Auth/pages/LoginPage";
import { RegisterPage } from "../features/Auth/pages/RegisterPage";
import HomePage from "../features/Home/pages/HomePage";
import { ProductListingPage } from "../features/Products/pages/ProductListingPage";

export const authRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/Home", element: <HomePage /> },
  { path: "/product-list", element: <ProductListingPage /> },
];
