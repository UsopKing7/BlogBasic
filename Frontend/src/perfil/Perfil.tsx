import { usePerfil } from './PerfilFetch'
import { formatearFecha } from '../../config'
import '../styles/perfil.css'
import { useCerrar, useVolver } from '../config'
import {
  FaSignOutAlt,
  FaArrowLeft,
  FaEnvelope,
  FaCalendarAlt,
  FaClock
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const Perfil = () => {
  const { username, posts } = usePerfil()
  const { cerraSession } = useCerrar()
  const { volver } = useVolver()

  return (
    <div className="perfil-wrap">
      <div className="perfil-grid">
        {/* Tarjeta de usuario */}
        <div className="usuario-card">
          <img
            className="usuario-avatar"
            src={
              username?.perfil_logo ||
              `https://ui-avatars.com/api/?name=${username?.username}&background=6C5CE7&color=fff`
            }
            alt={`${username?.username || 'Usuario'}`}
          />
          <h1 className="usuario-nombre">{username?.username || 'Usuario'}</h1>
          <p className="usuario-info">
            <FaEnvelope /> {username?.email || 'email@ejemplo.com'}
          </p>
          <p className="usuario-info">
            <FaCalendarAlt /> Miembro desde:{' '}
            {formatearFecha(String(username?.registrado_en)) ||
              'Fecha no disponible'}
          </p>

          <div className="usuario-actions">
            <button onClick={volver} className="btn-action btn-outline">
              <FaArrowLeft /> Volver al Feed
            </button>
            <button onClick={cerraSession} className="btn-action btn-primary">
              <FaSignOutAlt /> Cerrar sesión
            </button>
            <Link
              to={`/perfil/update/${username?.id}`}
              className="btn-action btn-primary"
            >
              Actualizar datos
            </Link>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="posts-container">
          <div className="section-header">
            <h2 className="section-title">Mis Publicaciones</h2>
          </div>

          <div className="posts-list">
            {posts?.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <img
                      src={
                        post.perfil_logo ||
                        `https://ui-avatars.com/api/?name=${post.username}&background=6C5CE7&color=fff`
                      }
                      alt={post.username}
                      className="post-avatar"
                    />
                    <span className="post-author">{post.username}</span>
                  </div>
                  <h3 className="post-title">{post.titulo}</h3>
                  <p className="post-content">{post.contenido}</p>
                  <p className="post-meta">
                    <FaClock /> Publicado el: {formatearFecha(post.creado_en)}
                  </p>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No hay publicaciones para mostrar</p>
                <button onClick={volver} className="btn-action btn-outline">
                  <FaArrowLeft /> Explorar publicaciones
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
