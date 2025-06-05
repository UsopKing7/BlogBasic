import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FaUser, FaSignInAlt, FaUserPlus, FaCode } from 'react-icons/fa'

export const Inicio = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{
    id: number
    usuario: string
    email: string
    perfil_logo: string
  } | null>(null)

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
    <nav role="navigation" aria-label="Menú principal">
      <div>
        <div>
          <FaCode />
          <span>
            <a href=""></a>
          </span>
        </div>
        <div>
          {isAuthenticated ? (
            <Link to="/perfil" aria-label="Ir a perfil">
              {user?.perfil_logo ? <img src={user.perfil_logo} /> : <FaUser />}
              <span>{user?.usuario}</span>
            </Link>
          ) : (
            <>
              <Link to="/login" aria-label="Iniciar sesión">
                <FaSignInAlt />
                <span>Iniciar sesión</span>
              </Link>
              <Link to="/register" aria-label="Registrarse">
                <FaUserPlus />
                <span>Registrarse</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
