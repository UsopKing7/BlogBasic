import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const usePerfil = () => {
  const { id } = useParams()
  const [username, setUsername] = useState<{
    id: string
    username: string
    email: string
    perfil_logo: string
    registrado_en: string | number
  } | null>(null)
  const [posts, setPosts] = useState<
    Array<{
      id: string
      titulo: string
      contenido: string
      creado_en: string
      perfil_logo: string
      username: string
    }>
  >([])

  useEffect(() => {
    const user = async () => {
      try {
        const res = await fetch(`http://localhost:3333/api/usuario/${id}`, {
          method: 'GET',
          credentials: 'include'
        })

        if (res.ok) {
          const data = await res.json()
          setUsername(data.data)
        } else {
          setUsername(null)
        }
      } catch {
        setUsername(null)
      }
    }
    user()
  }, [id])

  useEffect(() => {
    const postUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:3333/api/username/posts/${id}`,
          {
            method: 'GET',
            credentials: 'include'
          }
        )

        if (res.ok) {
          const data = await res.json()
          setPosts(data.data)
        } else {
          setPosts([])
        }
      } catch {
        setPosts([])
      }
    }

    postUser()
  }, [id])

  return { username, posts }
}
