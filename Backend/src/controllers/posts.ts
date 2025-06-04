import { Router } from 'express'
import { pool } from '../models/db'
import { PostsConsulta } from '../config'

const routerPosts = Router()

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
