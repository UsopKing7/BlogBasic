import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuthStatus } from '../config'

interface Props {
  children: ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { isLoading, isAuthenticated } = useAuthStatus()

  if (isLoading) {
    return <div>Cargando...</div> // O un spinner, lo que prefieras
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
