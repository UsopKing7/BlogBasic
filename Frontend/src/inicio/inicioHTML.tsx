import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaUser, FaSignInAlt, FaUserPlus, FaCode } from 'react-icons/fa'
import '../styles/inicio.css'

export const Inicio = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ id: number, usuario: string, email: string } | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:3333/api/check-auth', {
          credentials: 'include'
        })

        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
          setIsAuthenticated(true)
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch {
        setUser(null)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  return (
    <nav className="navbar" role="navigation" aria-label="Menú principal">
      <div className="navbar-container">
        <div className="navbar-logo">
          <FaCode className="logo-icon" />
          <span className="logo-text"><a href=""></a></span>
        </div>
        <div className="navbar-buttons">
          {isAuthenticated ? (
            <Link to="/perfil" className="nav-btn profile-btn" aria-label="Ir a perfil">
              <FaUser className="btn-icon" />
              <span className="btn-text">{user?.usuario || 'Perfil'}</span>
            </Link>
          ) : (
            <>
              <Link to="/login" className="nav-btn login-btn" aria-label="Iniciar sesión">
                <FaSignInAlt className="btn-icon" />
                <span className="btn-text">Iniciar sesión</span>
              </Link>
              <Link to="/register" className="nav-btn register-btn" aria-label="Registrarse">
                <FaUserPlus className="btn-icon" />
                <span className="btn-text">Registrarse</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
