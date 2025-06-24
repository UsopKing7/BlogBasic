import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaCode,
  FaSearch,
  FaHeart,
  FaRegComment
} from 'react-icons/fa'
import { usePostsMostrar } from './inicioFetch'
import { formatearFecha } from '../../config'
import '../styles/Inicio.css'

export const Inicio = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{
    id: string
    usuario: string
    email: string
    perfil_logo: string
  } | null>(null)
  const [mostrarFormulario, setMostrarFormulario] = useState<{
    [postId: number]: boolean
  }>({})
  const {
    posts,
    likesPorPost,
    hadnleDarLike,
    contenido,
    hadnleComentario,
    setContenido,
    comentariosPorPost
  } = usePostsMostrar()
  const [searchQuery, setSearchQuery] = useState('')

  const toggleFormularioComentario = (postId: number) => {
    setMostrarFormulario((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:3333/api/check-auth', {
          credentials: 'include'
        })

        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
          setIsAuthenticated(true)
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch {
        setUser(null)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  const filteredPosts = posts.filter(
    (post) =>
      post.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.contenido.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="app-container">
      {/* Header */}
      <header className="main-header">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <FaCode className="logo-icon" />
            <h1 className="logo-text">
              Dev<span className="logo-highlight">Hub</span>
            </h1>
          </Link>

          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar publicaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar publicaciones"
              className="search-input"
            />
          </div>

          <div className="user-nav">
            {isAuthenticated ? (
              <div className="user-authenticated">
                <Link to={`/new-post/${user?.id}`} className="create-post-btn">
                  Crear Post
                </Link>
                <Link to={`/perfil/${user?.id}`} className="user-profile">
                  {user?.perfil_logo ? (
                    <img
                      src={user.perfil_logo}
                      alt={`Avatar de ${user.usuario}`}
                      className="profile-image"
                    />
                  ) : (
                    <div className="default-avatar">
                      <FaUser />
                    </div>
                  )}
                </Link>
              </div>
            ) : (
              <div className="auth-options">
                <Link to="/login" className="login-button">
                  <FaSignInAlt />
                  <span>Iniciar sesión</span>
                </Link>
                <Link to="/register" className="register-button">
                  <FaUserPlus />
                  <span>Regístrate</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="content-area">
        <div className="content-wrapper">
          {/* Posts Feed */}
          <section className="posts-section">
            <div className="section-header">
              <h2>Publicaciones Recientes</h2>
              {filteredPosts.length > 0 && (
                <div className="results-info">
                  {filteredPosts.length}{' '}
                  {filteredPosts.length === 1 ? 'resultado' : 'resultados'}
                </div>
              )}
            </div>

            {filteredPosts.length > 0 ? (
              <div className="posts-list">
                {filteredPosts.map((post, idx) => (
                  <article key={idx} className="post-item">
                    <div className="post-header">
                      <div className="post-author">
                        <div className="author-avatar">
                          {post.perfil_logo ? (
                            <img
                              src={post.perfil_logo}
                              alt={`Avatar de ${post.username}`}
                              className="avatar-image"
                            />
                          ) : (
                            <FaUser className="avatar-icon" />
                          )}
                        </div>
                        <div className="author-info">
                          <h4 className="author-name">
                            {post.username || 'Anónimo'}
                          </h4>
                          <span className="post-time">
                            {formatearFecha(post.creado_en)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="post-body">
                      <h3 className="post-title">{post.titulo}</h3>
                      <p className="post-content">{post.contenido}</p>
                    </div>

                    {isAuthenticated && (
                      <div className="post-actions">
                        <button
                          className={`like-button ${
                            likesPorPost[post.id] ? 'user-liked' : ''
                          }`}
                          aria-label="Dar like"
                          onClick={() => hadnleDarLike(post.id)}
                        >
                          <span className="like-icon-container">
                            <FaHeart className="like-icon" />
                          </span>
                          <span className="like-count">
                            {likesPorPost[post.id] ?? 0}
                          </span>
                          <span className="like-label">Me gusta</span>
                        </button>

                        <button
                          className="comment-toggle"
                          aria-label="Comentar"
                          onClick={() => toggleFormularioComentario(post.id)}
                        >
                          <span className="comment-icon-container">
                            <FaRegComment className="comment-icon" />
                          </span>
                          <span className="comment-label">Comentar</span>
                        </button>
                      </div>
                    )}

                    {/* Nueva sección de comentarios */}
                    {mostrarFormulario[post.id] && (
                      <div className="comments-container">
                        <form
                          className="comment-form"
                          onSubmit={(e) => hadnleComentario(e, post.id)}
                        >
                          <label
                            htmlFor={`comment-field-${post.id}`}
                            className="comment-label"
                          >
                            Añadir comentario
                          </label>
                          <textarea
                            id={`comment-field-${post.id}`}
                            className="comment-input"
                            placeholder="Escribe tu comentario aquí..."
                            value={contenido?.contenido}
                            onChange={(e) =>
                              setContenido({ contenido: e.target.value })
                            }
                            rows={3}
                          />
                          <button type="submit" className="submit-comment">
                            Publicar comentario
                          </button>
                        </form>

                        <div className="comments-list">
                          {comentariosPorPost[post.id]?.length > 0 ? (
                            comentariosPorPost[post.id].map((comentario) => (
                              <div key={comentario.id} className="comment-card">
                                <div className="comment-header">
                                  <div className="comment-author">
                                    <span className="commenter-name">
                                      {comentario.username}
                                    </span>
                                    <span className="comment-date">
                                      {formatearFecha(comentario.creado_en)}
                                    </span>
                                  </div>
                                </div>
                                <div className="comment-content">
                                  <p>{comentario.contenido}</p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="no-comments-message">
                              Sé el primero en comentar
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-results">
                <div className="empty-icon">📭</div>
                <h3 className="empty-title">No se encontraron publicaciones</h3>
                <p className="empty-message">
                  {searchQuery
                    ? 'No hay resultados para tu búsqueda. Intenta con otros términos.'
                    : 'Aún no hay publicaciones. Sé el primero en compartir algo.'}
                </p>
                {isAuthenticated ? (
                  <Link
                    to={`/new-post/${user?.id}`}
                    className="create-first-post"
                  >
                    Crear mi primer post
                  </Link>
                ) : (
                  <div className="auth-suggestion">
                    <Link to="/login" className="suggestion-login">
                      Iniciar sesión
                    </Link>
                    <Link to="/register" className="suggestion-register">
                      Regístrate
                    </Link>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
