import { FaQuora } from 'react-icons/fa'
import { useVolver } from '../config'
import { useUpdatePost } from './useActualizarPost'

export const UpdatePost = () => {
  const { volver } = useVolver()
  const { contenido, handleUpdatePost, setContenido, setTitulo, titulo } =
    useUpdatePost()
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Post a editar</h2>
        </div>
        <form onSubmit={handleUpdatePost} className="login-form">
          <div className="form-group">
            <label htmlFor="titulo">
              <FaQuora className="form-icon" />
              Tutulo
            </label>
            <input
              type="text"
              value={titulo?.titulo}
              onChange={(e) => setTitulo({ titulo: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contenido">Contenido</label>
            <textarea
              id="contenido"
              placeholder="Desarrolla tu contenido aquí..."
              value={contenido?.contenido}
              onChange={(e) => setContenido({ contenido: e.target.value })}
              rows={5}
              required
            />
          </div>

          <div className='form-actions'>
            <button type='submit' className='btn-primary'>Editar</button>
            <button onClick={volver} className='btn-secondary'>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
