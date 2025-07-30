import { Routes, Route } from "react-router-dom";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { adminRoutes } from "./adminRoutes";

const allRoutes = [...authRoutes, ...userRoutes, ...adminRoutes];

export const AppRoutes = () => (
  <Routes>
    {allRoutes.map(({ path, element }, i) => (
      <Route key={i} path={path} element={element} />
    ))}
  </Routes>
);
