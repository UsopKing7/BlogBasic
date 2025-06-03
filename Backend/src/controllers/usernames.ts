import { Router } from 'express'
import { pool } from '../models/db'
import { UsuarioConsulta, UpdateUsuario } from '../config'
import { validacionUsuarioUpdate } from '../routers/validaciones'

export const routerUsername = Router()

routerUsername.get('/usuarios', async (_req, res) => {
  try {
    const { rows: usuarios } = await pool.query<UsuarioConsulta>(
      'SELECT * FROM usuarios'
    )

    if (usuarios.length === 0) {
      res.status(404).json({ message: 'No se encontro ningun usuario' })
      return
    }

    res.status(200).json({
      message: 'Usuarios encontrados',
      data: usuarios.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        fechaRegistro: user.registrado_en
      }))
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error interno de el servidor',
      error: error instanceof Error ? error.message : error
    })
  }
})

routerUsername.get('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params

    const { rows: usuario } = await pool.query<UsuarioConsulta>(
      'SELECT * FROM usuarios WHERE id = $1', [id]
    )

    if (usuario.length === 0) {
      res.status(404).json({ message: 'No se encontro el usuario' })
      return
    }

    res.status(200).json({
      message: 'Usuario encontrodo',
      data: usuario.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        perfil_logo: user.perfil_logo,
        registrado_en: user.registrado_en
      }))
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error interno de el servidor',
      error: error instanceof Error ? error.message : error
    })
  }
})

routerUsername.patch('/usuario/update/:id', async (req, res) => {
  try {
    const { id } = req.params

    const vUsuarioUpdate: UpdateUsuario = validacionUsuarioUpdate.parse(req.body)
    const { rows: usuarioExiste } = await pool.query<UsuarioConsulta>(
      'SELECT * FROM usuarios WHERE id = $1', [id]
    )

    if (usuarioExiste.length === 0) {
      res.status(404).json({ meesage: 'El usuario no existe' })
      return
    }

    await pool.query(
      'UPDATE usuarios SET username = $1, email = $2, perfil_logo = $3', [
        vUsuarioUpdate.username,
        vUsuarioUpdate.email,
        vUsuarioUpdate.perfil_logo
      ]
    )

    res.status(200).json({ message: 'Usuario actualizado correctamente' })
  } catch (error) {
    res.status(500).json({
      message: 'Error interno en el servidor',
      error: error instanceof Error ? error.message : error
    })
  }
})

routerUsername.delete('/usuario/delete/:id', async (req, res) => {
  try {
    const { id } = req.params

    const { rows: usuarioExiste } = await pool.query<UsuarioConsulta>(
      'SELECT * FROM usuarios WHERE id = $1', [id]
    )

    if (usuarioExiste.length === 0) {
      res.status(404).json({ message: 'No se econtro el usuario' })
      return
    }

    await pool.query(
      'DELETE FROM usuarios WHERE id = $1', [id]
    )

    res.status(200).json({
      message: 'Se elimino correctamente el usuario',
      username: usuarioExiste.map((user) => ({
        username: user.username
      }))
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error interno en el servidor',
      error: error instanceof Error ? error.message : error
    })
  }
})