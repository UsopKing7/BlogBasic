import { Router } from 'express'
import { pool } from '../models/db'
import { PostsConsulta, UsuarioConsulta } from '../config'
import { validacionPosts } from '../routers/validaciones'

export const routerPosts = Router()

routerPosts.get('/posts', async (_req, res) => {
  try {
    const { rows: posts } = await pool.query<PostsConsulta>(
      'SELECT * FROM posts'
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

routerPosts.post('/usuario/agregar/post/:id', async (req, res) => {
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
})

routerPosts.delete('/usuario/eliminar/post/:id', async (req, res) => {
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
      error: error instanceof Error ? error.message : error
    })
  }
})
