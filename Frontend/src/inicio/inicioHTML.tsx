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
import '../styles/Inicio.css'

export const Inicio = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{
    id: string
    usuario: string
    email: string
    perfil_logo: string
  } | null>(null)
  const { posts } = usePostsMostrar()
  const [searchQuery, setSearchQuery] = useState('')

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
    <div className="inicio-app">
      {/* Header */}
      <header className="app-header">
        <div className="header-container">
          <Link to="/" className="brand-wrapper">
            <FaCode className="brand-icon" />
            <h1 className="brand-title">
              Dev<span className="brand-highlight">Hub</span>
            </h1>
          </Link>

          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar publicaciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar publicaciones"
            />
          </div>

          <div className="user-actions">
            {isAuthenticated ? (
              <div className="auth-authenticated">
                <Link to={`/new-post/${user?.id}`} className="new-post-btn">
                  Crear Post
                </Link>
                <Link to={`/perfil/${user?.id}`} className="profile-link">
                  {user?.perfil_logo ? (
                    <img
                      src={user.perfil_logo}
                      alt={`Avatar de ${user.usuario}`}
                      className="user-avatar"
                    />
                  ) : (
                    <div className="avatar-fallback">
                      <FaUser />
                    </div>
                  )}
                </Link>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="auth-btn login-btn">
                  <FaSignInAlt />
                  <span>Iniciar sesión</span>
                </Link>
                <Link to="/register" className="auth-btn register-btn">
                  <FaUserPlus />
                  <span>Regístrate</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="main-container">
          {/* Posts Feed */}
          <section className="posts-feed">
            <div className="feed-header">
              <h2>Publicaciones Recientes</h2>
              {filteredPosts.length > 0 && (
                <div className="results-count">
                  {filteredPosts.length}{' '}
                  {filteredPosts.length === 1 ? 'resultado' : 'resultados'}
                </div>
              )}
            </div>

            {filteredPosts.length > 0 ? (
              <div className="posts-grid">
                {filteredPosts.map((post, idx) => (
                  <article key={idx} className="post-card">
                    <div className="post-header">
                      <div className="author-info">
                        <div className="author-avatar">
                          {post.perfil_logo ? (
                            <img
                              src={post.perfil_logo}
                            />
                          ) : (
                            <FaUser />
                          )}
                        </div>
                        <div className="author-details">
                          <h4 className="author-name">
                            {post.username || 'Anónimo'}
                          </h4>
                          <span className="post-date">{post.creado_en}</span>
                        </div>
                      </div>
                    </div>

                    <div className="post-content">
                      <h3 className="post-title">{post.titulo}</h3>
                      <p className="post-text">{post.contenido}</p>
                    </div>

                    <div className="post-footer">
                      <button
                        className="action-btn like-btn"
                        aria-label="Dar like"
                      >
                        <FaHeart />
                        <span>Like</span>
                      </button>
                      <button
                        className="action-btn comment-btn"
                        aria-label="Comentar"
                      >
                        <FaRegComment />
                        <span>Comentar</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3>No se encontraron publicaciones</h3>
                <p>
                  {searchQuery
                    ? 'No hay resultados para tu búsqueda. Intenta con otros términos.'
                    : 'Aún no hay publicaciones. Sé el primero en compartir algo.'}
                </p>
                {isAuthenticated && (
                  <Link to={`/new-post/${user?.id}`} className="create-post-btn">
                    Crear mi primer post
                  </Link>
                )}
                {!isAuthenticated && (
                  <div className="auth-prompt">
                    <Link to="/login" className="auth-btn login-btn">
                      Iniciar sesión
                    </Link>
                    <Link to="/register" className="auth-btn register-btn">
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
