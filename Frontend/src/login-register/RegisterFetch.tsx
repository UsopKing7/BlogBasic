import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [perfil_logo, setPerfilLogo] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch('http://localhost:3333/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password,
        perfil_logo
      })
    })

    if (res.ok) {
      alert('usuario creado correctamente')
      navigate(-1)
    } else {
      alert('error al crear el usuario')
    }
  }

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    perfil_logo,
    setPerfilLogo,
    handleLogin
  }
}
