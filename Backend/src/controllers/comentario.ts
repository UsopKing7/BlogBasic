import { Router, Request, Response } from 'express'
import { pool } from '../models/db'
import { validacionComentario, } from '../routers/validaciones'
import { Comentario, PostsConsulta, UsuarioConsulta } from '../config'

export const routerComentario = Router()

routerComentario.post('/:id_usuario/comentario/:id_post', async (req: Request, res: Response) => {
  try {
    const { id_usuario, id_post } = req.params

    const vComentario: Comentario = validacionComentario.parse(req.body)

    const { rows: usuarioExiste } = await pool.query<UsuarioConsulta>(
      'SELECT * FROM usuarios WHERE id = $1',
      [id_usuario]
    )

    if (usuarioExiste.length === 0) {
      res.status(404).json({ message: 'El usurio no existe en la base de datos' })
      return
    }

    const { rows: postExiste } = await pool.query<PostsConsulta>(
      'SELECT * FROM posts WHERE id = $1',
      [id_post]
    )

    if (postExiste.length === 0) {
      res.status(404).json({ message: 'El post no existe' })
      return
    }

    await pool.query(
      'INSERT INTO comentarios (contenido, post_id, autor_id) VALUES ($1, $2, $3)',
      [vComentario.contenido, id_post, id_usuario]
    )

    res.status(201).json({ message: 'Comentario agregado correctamente' })
   } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Error al comentar',
      error: error instanceof Error ? error.message || error.stack : error
    })
  }
})

routerComentario.get('/comentarios/:id_post', async (req: Request, res: Response) => {
  try {
    const { id_post } = req.params
    
    const { rows: postExiste } = await pool.query(
      'SELECT * FROM posts WHERE id = $1',
      [id_post]
    )

    if (postExiste.length === 0) {
      res.status(404).json({ message: 'No se encontro el post' })
      return
    }

    const { rows: comentarios } = await pool.query(
      'SELECT * FROM comentarios WHERE post_id = $1',
      [id_post]
    )

    if (comentarios.length === 0) throw new Error('Error al encontrar los comentarios')

    res.status(200).json({
      message: 'Comentarios encontrados',
      data: comentarios
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error al mostrar los comentarios',
      error: error instanceof Error ? error.message || error.stack : error
    })
  }
})