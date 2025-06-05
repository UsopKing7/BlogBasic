import { FaArrowRight, FaEnvelope, FaLock } from 'react-icons/fa'
import { useLogin } from './LoginFetch'
import { useVolver } from '../config'

export const Login = () => {
  const { email, setEmail, password, setPassword, handleLogin } = useLogin()
  const { volver } = useVolver()
  return (
    <>
      <div>
        <div>
          <div>
            <h2>Registrate</h2>
            <p>Ingrese sus datos</p>
          </div>

          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email">
                <FaEnvelope />
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

            <div>
              <label htmlFor="password">
                <FaLock />
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
            <button type="submit">
              <FaArrowRight /> iniciar session
            </button>
            <button onClick={volver}>
              Canselar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}