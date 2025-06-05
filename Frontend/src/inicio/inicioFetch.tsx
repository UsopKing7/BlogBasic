import { useEffect, useState } from 'react'

export const usePostsMostrar = () => {
  const [posts, setPosts] = useState<Array<{ titulo: string, contenido: string, creado_en: string, perfil_logo: string, username: string }>>([])

  useEffect(() => { 
    const posts = async () => {
      try {
        const res = await fetch('http://localhost:3333/api/posts', {
          method: 'GET',
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


  return { posts }
}