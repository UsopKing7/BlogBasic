import { Router } from 'express'
import { pool } from '../models/db'
import { PostsConsulta, UsuarioConsulta } from '../config'
import {
  validacionPosts
} from '../routers/validaciones'
import { rutaProtected } from './login-register'

export const routerPosts = Router()

routerPosts.get('/posts', async (_req, res) => {
  try {
    const { rows: posts } = await pool.query(
      `
      SELECT 
        posts.id,
        posts.titulo,
        posts.contenido,
        posts.creado_en,
        usuarios.username AS username,
        usuarios.perfil_logo AS perfil_logo
      FROM posts
      INNER JOIN usuarios ON posts.autor_id = usuarios.id
      ORDER BY posts.creado_en DESC
      `
    )

    if (posts.length === 0) {
      res.status(404).json({ message: 'No se encontraron Posts' })
      return
    }

    res.status(200).json({
      message: 'Posts encontrados',
      data: posts
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error interno en el servidor',
      error: error instanceof Error ? error.message : error
    })
  }
})

routerPosts.get('/username/posts/:id', rutaProtected, async (req, res) => {
  try {
    const { id } = req.params

    const { rows: userExiste } = await pool.query<UsuarioConsulta>(
      'SELECT * FROM usuarios WHERE id = $1',
      [id]
    )

    if (userExiste.length === 0) {
      res.status(404).json({
        message: 'No se encontro el usuario'
      })
    }

    const { rows: PostUser } = await pool.query(
      `
      SELECT 
        posts.id,
        posts.titulo,
        posts.contenido,
        posts.creado_en,
        usuarios.username AS username,
        usuarios.perfil_logo AS perfil_logo
      FROM posts
      INNER JOIN usuarios ON posts.autor_id = usuarios.id
      WHERE usuarios.id = $1
      ORDER BY posts.creado_en DESC
      `,
      [id]
    )

    if (PostUser.length === 0) {
      res.status(404).json({ message: 'El usuario no tiene posts' })
      return
    }

    res.status(200).json({
      message: 'Posts del usuario encontrados',
      data: PostUser,
      username: req.user
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error interno en el servidor',
      error: error instanceof Error ? error.message : error
    })
  }
})

routerPosts.post(
  '/usuario/agregar/post/:id',
  rutaProtected,
  async (req, res) => {
    try {
      const { id } = req.params
      const vPosts = validacionPosts.parse(req.body)

      const { rows: usuario } = await pool.query<UsuarioConsulta>(
        'SELECT * FROM usuarios WHERE id = $1',
        [id]
      )

      if (usuario.length === 0) {
        res.status(200).json({ message: 'No se encontro el usuario' })
        return
      }

      await pool.query(
        'INSERT INTO posts (titulo, contenido, autor_id) VALUES ($1, $2, $3)',
        [vPosts.titulo, vPosts.contenido, id]
      )

      res.status(201).json({
        message: 'Tarea creada correctamente'
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: 'Error interno en el servidor',
        error: error instanceof Error ? error.message : error
      })
    }
  }
)

routerPosts.delete(
  '/usuario/eliminar/post/:id',
  rutaProtected,
  async (req, res) => {
    try {
      const { id } = req.params

      const { rows: postExiste } = await pool.query<PostsConsulta>(
        'SELECT * FROM posts WHERE id = $1',
        [id]
      )

      if (postExiste.length === 0) {
        res.status(404).json({ message: 'Error no existe el Posts' })
        return
      }

      await pool.query('DELETE FROM posts WHERE id = $1', [id])

      res.status(200).json({ message: 'Post Eliminado' })
    } catch (error) {
      res.status(500).json({
        message: 'Error interno en el servidor',
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }
)
