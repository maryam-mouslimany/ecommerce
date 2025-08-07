import { Routes, Route } from "react-router-dom";
import { authRoutes } from "./authRoutes.jsx";
import { adminRoutes } from "./adminRoutes.jsx";
import { userRoutes } from "./userRoutes.jsx";

const allRoutes = [...authRoutes, ...adminRoutes, ...userRoutes];

export const AppRoutes = () => (
  <Routes>
    {allRoutes.map(({ path, element }, i) => (
      <Route key={i} path={path} element={element} />
    ))}
  </Routes>
);
