// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

// Simulador de autenticación (mejor usar context o estado global real)
const isAuthenticated = (): boolean => {
  return document.cookie.includes('token=');
};

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
