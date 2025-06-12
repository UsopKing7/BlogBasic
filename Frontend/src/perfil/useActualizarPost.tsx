import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export const useUpdatePost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState<{ titulo: string } | null>(null)
  const [contenido, setContenido] = useState<{ contenido: string } | null>(null)

  useEffect(() => {
    const postUnico = async () => {
      const res = await fetch(
        `http://localhost:3333/api/usuario/post/${id}`,
        {
          method: 'GET',
          credentials: 'include'
        }
      )

      const data = await res.json()
      if (res.ok) {
        setTitulo({ titulo: data.data.titulo })
        setContenido({ contenido: data.data.contenido })
      } else {
        alert(data.message)
      }
    }

    postUnico()
  }, [id])

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch(
      `http://localhost:3333/api/usuario/update/post/${id}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titulo: titulo?.titulo,
          contenido: contenido?.contenido
        })
      }
    )

    const data = await res.json()

    if (res.ok) {
      alert('Post Actualizado correctamente')
      navigate(-1)
    } else {
      alert(data.message)
    }
  }

  return { handleUpdatePost, titulo, contenido, setTitulo, setContenido }
}
