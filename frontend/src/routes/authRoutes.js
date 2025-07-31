import { LoginPage } from "../features/Auth/pages/LoginPage";
import { RegisterPage } from "../features/Auth/pages/RegisterPage";
import HomePage from "../features/Home/pages/HomePage";
import { ProductListingPage } from "../features/Products/pages/ProductListingPage";
import TheyPage from "../features/Home/pages/TheyPage";

export const authRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/Home", element: <HomePage /> },
  { path: "/product-list", element: <ProductListingPage /> },
  { path: "/They", element: <TheyPage /> },
];
