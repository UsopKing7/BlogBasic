import { useRegister } from './RegisterFetch'
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  /*  FaArrowRight */
} from 'react-icons/fa'
import { useVolver } from '../config'

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
    <div>
      <div>
        <div>
          <h2>Registrate</h2>
          <p>Ingrese sus datos</p>
        </div>

        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="username">
              <FaUser />
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

          <div>
            <label htmlFor="img-perfil">
              <FaImage />
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
            <div>
              <img
                src={perfil_logo}
                alt="Vista previa de imagen de perfil"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <span>Vista previa</span>
            </div>
          )}

          <button type="submit" >Registrarme</button>
          <button onClick={volver}>Canselar</button>
        </form>
      </div>
    </div>
  )
}