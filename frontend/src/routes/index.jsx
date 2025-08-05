import { Routes, Route } from "react-router-dom";
import { authRoutes } from "./authRoutes.jsx";
// import { adminRoutes } from "./adminRoutes.js";
import { userRoutes } from "./userRoutes.jsx";

// Combine all routes - temporarily exclude adminRoutes to debug
const allRoutes = [...authRoutes, ...userRoutes];

// Debug: Check if routes are properly loaded
console.log('authRoutes:', authRoutes);
console.log('userRoutes:', userRoutes);
console.log('allRoutes:', allRoutes);

export const AppRoutes = () => (
  <Routes>
    {allRoutes.map(({ path, element }, i) => (
      <Route key={i} path={path} element={element} />
    ))}
  </Routes>
);
