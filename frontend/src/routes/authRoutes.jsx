import CreateProduct from "../features/AdminProductManagement/pages/CreateProduct";
import ViewProducts from "../features/AdminProductManagement/pages/Viewproducts";
import { LoginPage } from "../features/Auth/pages/LoginPage";
import { RegisterPage } from "../features/Auth/pages/RegisterPage";

export const authRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/admin-view-products", element: <ViewProducts /> },
    { path: "/admin-create-products", element: <CreateProduct /> },


];
