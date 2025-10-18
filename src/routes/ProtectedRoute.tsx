import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};
