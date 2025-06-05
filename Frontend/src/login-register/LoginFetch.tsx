import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch('http://localhost:3333/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      alert('Inicio de sesión exitoso')
      navigate('/')
    } else {
      alert('Error al iniciar sesión')
    }
  }

  return { email, setEmail, password, setPassword, handleLogin }
}
