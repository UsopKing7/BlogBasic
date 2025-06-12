import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export const useUpdateUsuario = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [username, setUsername] = useState<{ username: string } | null >(null)
  const [email, setEmail] = useState<{ email: string } | null>(null)
  const [perfil_logo, setPerfilLogo] = useState<{ perfil_logo: string } | null >(null)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`http://localhost:3333/api/usuario/update/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username?.username,
        email: email?.email,
        perfil_logo: perfil_logo?.perfil_logo
      })
    })

    const data = await res.json()
    if (res.ok) {
      alert('Usuario creado correctamente')
      navigate(-1)
    } else {
      alert(data.message + 'Error al Actualizar el usuario')
    }
  }

  useEffect(() => {
    const usuarioUnico = async () => {
      const res = await fetch(`http://localhost:3333/api/usuario/${id}`, {
        method: 'GET',
        credentials: 'include'
      })

      const data = await res.json()

      if (res.ok) {
        setUsername({ username: data.data.username })
        setEmail({ email: data.data.email })
        setPerfilLogo({ perfil_logo: data.data.perfil_logo })
      }
    }
    usuarioUnico()
  }, [id])

  return { username, setUsername, email, setEmail, perfil_logo, setPerfilLogo, handleUpdate }
}
