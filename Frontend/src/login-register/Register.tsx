import { useRegister } from './RegisterFetch'
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaArrowRight
} from 'react-icons/fa'
import { useState } from 'react'
import { useVolver } from '../config'
import '../styles/register.css'

export const Register = () => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    perfil_logo,
    setPerfilLogo,
    handleLogin
  } = useRegister()
  const { volver } = useVolver()

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await handleLogin(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Registrate</h2>
          <p>Ingrese sus datos</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">
              <FaUser className="input-icon" />
              <span>Nombre de Usuario</span>
            </label>
            <input
              type="text"
              id="username"
              placeholder="Ingresa tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">
              <FaEnvelope className="input-icon" />
              <span>Correo Electrónico</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">
              <FaLock className="input-icon" />
              <span>Contraseña</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="img-perfil">
              <FaImage className="input-icon" />
              <span>Foto de Perfil (URL)</span>
            </label>
            <input
              type="text"
              id="img-perfil"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={perfil_logo}
              onChange={(e) => setPerfilLogo(e.target.value)}
            />
          </div>

          {perfil_logo && (
            <div className="image-preview">
              <img
                src={perfil_logo}
                alt="Vista previa de imagen de perfil"
              />
              <span>Vista previa</span>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              <>
                <span>Registrar</span>
                <FaArrowRight className="arrow-icon" />
              </>
            )}
          </button>
          <button onClick={volver} className='submit-btn'>Canselar</button>
        </form>
      </div>
    </div>
  )
}
