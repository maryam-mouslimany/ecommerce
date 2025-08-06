import { Routes, Route } from "react-router-dom";
import { authRoutes } from "./authRoutes.jsx";
import { adminRoutes } from "./adminRoutes.js";
import { userRoutes } from "./userRoutes.jsx";

// Combine all routes - now including adminRoutes
const allRoutes = [...authRoutes, ...adminRoutes, ...userRoutes];

// Debug: Check if routes are properly loaded
console.log('authRoutes:', authRoutes);
console.log('adminRoutes:', adminRoutes);
console.log('userRoutes:', userRoutes);
console.log('allRoutes:', allRoutes);

export const AppRoutes = () => (
  <Routes>
    {allRoutes.map(({ path, element }, i) => (
      <Route key={i} path={path} element={element} />
    ))}
  </Routes>
);
