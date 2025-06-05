import { FaArrowRight, FaEnvelope, FaLock } from 'react-icons/fa'
import { useLogin } from './LoginFetch'
import { useVolver } from '../config'

export const Login = () => {
  const { email, setEmail, password, setPassword, handleLogin } = useLogin()
  const { volver } = useVolver()
  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Registrate</h2>
            <p>Ingrese sus datos</p>
          </div>

          <form onSubmit={handleLogin}>
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
            <button type="submit" className="submit-btn">
              <FaArrowRight className="arrow-icon" />
            </button>
            <button onClick={volver} className="submit-btn">
              Canselar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
