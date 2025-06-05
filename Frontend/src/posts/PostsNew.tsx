import { useVolver } from '../config'
import { useNewPost } from './PostFetch'

export const CrearPost = () => {
  const { titulo, setTIitulo, contenido, setContenido, handlePost } = useNewPost()
  const { volver } = useVolver()
  
  return (
    <div className="post-container">
      <div className="post-card">
        <h2 className="post-title">Crear Nuevo Post</h2>
        
        <form className="post-form" onSubmit={handlePost}>
          <div className="form-group">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              placeholder="Escribe un título interesante"
              value={titulo}
              onChange={(e) => setTIitulo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contenido">Contenido</label>
            <textarea
              id="contenido"
              placeholder="Desarrolla tu contenido aquí..."
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              rows={5}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Publicar Post</button>
            <button type="button" onClick={volver} className="btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}