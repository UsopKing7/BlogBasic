import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const usePostsMostrar = () => {
  const { id } = useParams<{ id: string }>()
  const [likesPorPost, setLikesPorPost] = useState<{
    [postId: number]: number
  }>({})

  const [posts, setPosts] = useState<
    Array<{
      id: number
      titulo: string
      contenido: string
      creado_en: string
      perfil_logo: string
      username: string
    }>
  >([])

  useEffect(() => {
    const posts = async () => {
      try {
        const res = await fetch('http://localhost:3333/api/posts', {
          method: 'GET'
        })

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
    posts()
  }, [])

  useEffect(() => {
    const likes = async () => {
      const nuevosLikes: { [postId: number]: number } = {}
      for (const post of posts) {
        try {
          const res = await fetch(
            `http://localhost:3333/api/likes/post/${post.id}`,
            {
              method: 'GET',
              credentials: 'include'
            }
          )

          if (res.ok) {
            const data = await res.json()
            nuevosLikes[post.id] = data.data
          } else {
            nuevosLikes[post.id] = 0
          }
        } catch {
          nuevosLikes[post.id] = 0
        }
      }

      setLikesPorPost(nuevosLikes)
    }

    if (posts.length > 0) {
      likes()
    }
  }, [posts])

  const hadnleDarLike = async (postId: number) => {
    const res = await fetch(
      `http://localhost:3333/api/usuario/like/${id}/post/${postId}`,
      {
        method: 'POST',
        credentials: 'include'
      }
    )

    if (res.ok) {
      console.log('like puestoy')      
    } else {
      alert('ya tiene el like puesto no puedes poner otro')
    }
  }

  return { posts, likesPorPost, hadnleDarLike }
}
