import { Routes, Route } from "react-router-dom";
import { authRoutes } from "./authRoutes";

const allRoutes = [...authRoutes];

export const AppRoutes = () => (
  <Routes>
    {allRoutes.map(({ path, element }, i) => (
      <Route key={i} path={path} element={element} />
    ))}
  </Routes>
);
