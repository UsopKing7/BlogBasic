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