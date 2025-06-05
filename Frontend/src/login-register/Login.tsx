import { FaArrowRight, FaEnvelope, FaLock } from 'react-icons/fa'
import { useLogin } from './LoginFetch'
import { useVolver } from '../config'
import '../styles/register.css' 

export const Login = () => {
  const { email, setEmail, password, setPassword, handleLogin } = useLogin()
  const { volver } = useVolver()

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
          <p>Ingrese sus credenciales</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
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

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              <FaArrowRight className="btn-icon" /> Iniciar Sesión
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
