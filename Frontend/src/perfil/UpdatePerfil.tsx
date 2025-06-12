import { useUpdateUsuario } from './useCtualizar'
import { useVolver } from '../config'
import { FaArrowRight, FaEnvelope, FaIcons, FaUser } from 'react-icons/fa'

export const UpdatePerfil = () => {
  const {
    email,
    handleUpdate,
    setEmail,
    setUsername,
    username,
    perfil_logo,
    setPerfilLogo
  } = useUpdateUsuario()
  const { volver } = useVolver()
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Actualizar perfil</h2>
          <p>Datos a Actualizar</p>
        </div>
        <form onSubmit={handleUpdate} className="login-form">
          <div className="form-group">
            <label htmlFor="username">
              <FaUser className="form-icon" />
              Username
            </label>
            <input
              type="username"
              id="username"
              value={username?.username}
              onChange={(e) => setUsername({ username: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="form-icon" />
              email
            </label>
            <input
              type="email"
              id="email"
              value={email?.email}
              onChange={(e) => setEmail({ email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="Perfil Logo">
              <FaIcons className="form-icon" />
              Perfil Logo
            </label>

            <input
              type="text"
              value={perfil_logo?.perfil_logo}
              onChange={(e) => setPerfilLogo({ perfil_logo: e.target.value })}
            />
          </div>

          {perfil_logo && (
            <div className="image-preview">
              <img
                src={perfil_logo.perfil_logo}
                alt="Vista previa de imagen de perfil"
              />
              <span>Vista previa</span>
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              <FaArrowRight className="btn-icon" /> Actualizar
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
