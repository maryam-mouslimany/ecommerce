import LoginPage from "../features/Auth/pages/LoginPage";
import RegisterPage from "../features/Auth/pages/RegisterPage";

const authRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];

export default authRoutes;
