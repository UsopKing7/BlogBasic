import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const useNewPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [titulo, setTIitulo] = useState('')
  const [contenido, setContenido] = useState('')

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch(`http://localhost:3333/api/usuario/agregar/post/${id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo, contenido
      })
    })

    if (res.ok) {
      alert('Post creado correctamente')
      navigate(-1)
    } else {
      alert('Error al crear nuevo post')
    }
  }

  return { titulo, setTIitulo, contenido, setContenido, handlePost}
}