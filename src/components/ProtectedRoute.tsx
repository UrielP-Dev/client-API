import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode; // Tipo explícito para 'children'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/login" />;
  }

  // Si hay token, muestra el contenido solicitado
  return <>{children}</>;
};

export default ProtectedRoute;
