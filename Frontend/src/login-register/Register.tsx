import { useRegister } from './RegisterFetch'
import { FaUser, FaEnvelope, FaLock, FaImage } from 'react-icons/fa'
import { useVolver } from '../config'
import '../styles/register.css' // Archivo CSS separado

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
    handleRegister
  } = useRegister()
  const { volver } = useVolver()

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Regístrate</h2>
          <p>Ingrese sus datos para crear una cuenta</p>
        </div>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">
              <FaUser className="form-icon" />
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

          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="form-icon" />
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

          <div className="form-group">
            <label htmlFor="password">
              <FaLock className="form-icon" />
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

          <div className="form-group">
            <label htmlFor="img-perfil">
              <FaImage className="form-icon" />
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
              <img src={perfil_logo} alt="Vista previa de imagen de perfil" />
              <span>Vista previa</span>
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Registrarme
            </button>
            <button type="button" onClick={volver} className="btn-secondary">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
