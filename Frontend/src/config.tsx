import { useNavigate } from 'react-router-dom'

export const useVolver = () => {
  const navigate = useNavigate()

  const volver = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate(-1)
  }

  return { volver }
}

export const useCerrar = () => {
  const navigate = useNavigate()

  const cerraSession = async () => {
    const res = await fetch('http://localhost:3333/api/logout', {
      method: 'POST',
      credentials: 'include'
    })
  
    if (res.ok) {
      alert('Cierre de session exitoso')
      navigate('/')
    }
  }
  return { cerraSession }
}

import { useEffect, useState } from 'react'

export const useAuthStatus = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:3333/api/check-auth', {
          credentials: 'include',
        })

        if (res.ok) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { isLoading, isAuthenticated }
}
