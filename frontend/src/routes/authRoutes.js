import { LoginPage } from "../features/Auth/pages/LoginPage";
import { RegisterPage } from "../features/Auth/pages/RegisterPage";
import HomePage from "../features/Home/pages/HomePage";
import TheyPage from "../features/Home/pages/TheyPage";

export const authRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/They", element: <TheyPage /> },
];
