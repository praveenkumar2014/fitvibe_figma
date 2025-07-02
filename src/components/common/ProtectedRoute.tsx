import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}