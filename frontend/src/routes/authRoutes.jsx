import { LoginPage } from "../features/Auth/pages/LoginPage";
import { RegisterPage } from "../features/Auth/pages/RegisterPage";

export const authRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];
