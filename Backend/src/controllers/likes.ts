import { Router, Request, Response } from 'express'
import { pool } from '../models/db'
import { PostsConsulta, UsuarioConsulta, LikesConsulta } from '../config'

export const routerLikes = Router()

routerLikes.post(
  '/usuario/like/:id_usuarios/post/:id_post',
  async (req: Request, res: Response) => {
    try {
      const { id_post, id_usuarios } = req.params

      const { rows: usuarioExiste } = await pool.query<UsuarioConsulta>(
        'SELECT * FROM usuarios WHERE id = $1',
        [id_usuarios]
      )

      if (usuarioExiste.length === 0) {
        res.status(404).json({
          message: 'El usuario no existe'
        })
        return
      }

      const { rows: postExiste } = await pool.query<PostsConsulta>(
        'SELECT * FROM posts WHERE id = $1',
        [id_post]
      )

      if (postExiste.length === 0) {
        res.status(404).json({
          message: 'No existe el post'
        })
        return
      }

      const { rows: validarLike } = await pool.query<LikesConsulta>(
        'SELECT 1 FROM likes WHERE usuario_id = $1 AND post_id = $2',
        [id_usuarios, id_post]
      )

      if (validarLike.length > 0) {
        res.status(400).json({
          message: 'El post ya tiene like del usuario'
        })
        return
      }

      await pool.query(
        'INSERT INTO likes (usuario_id, post_id) VALUES ($1, $2)',
        [id_usuarios, id_post]
      )

      res.status(201).json({
        message: 'Like resgistrado correctamente'
      })
    } catch (error) {
      res.status(500).json({
        message: 'Error interno en el servidor',
        error: error instanceof Error ? error.message : error
      })
    }
  }
)

routerLikes.get('/likes/post/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const { rows: postExiste } = await pool.query<PostsConsulta>(
      'SELECT * FROM posts WHERE id = $1',
      [id]
    )

    if (postExiste.length === 0) {
      res.status(404).json({ message: 'El post no existe o se perdio' })
      return
    }

    const { rows: likes } = await pool.query<LikesConsulta>(
      'SELECT COUNT(*)::int AS total_likes FROM likes WHERE post_id = $1',
      [id]
    )

    if (likes.length === 0) {
      res.status(400).json({ message: 'El post no tiene Likes ' })
      return
    }

    res.status(200).json({
      message: 'Total de Likes',
      data: likes[0].total_likes
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error interno en el servidor',
      error: error instanceof Error ? error.message : error
    })
  }
})
