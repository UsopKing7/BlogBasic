import { Router, Request, Response } from 'express'
import { pool } from '../models/db'
import { Login, NewUsuarioInterface, SAL, UsuarioConsulta, RecuperaraCuenta } from '../config'
import { validacionRegister, validacionLogin, validacionRecuperar } from '../routers/validaciones'
import bcrypt from 'bcrypt'

export const routerLoginRegister = Router()

routerLoginRegister.post('/register', async (req: Request, res: Response) => {
  try {
    const vRegister: NewUsuarioInterface = validacionRegister.parse(req.body)
    const passwordHash = await bcrypt.hash(vRegister.password, SAL)

    await pool.query(
      'INSERT INTO usuarios (username, email, password, perfil_logo) VALUES ($1, $2, $3, $4)',
      [
        vRegister.username,
        vRegister.email,
        passwordHash,
        vRegister.perfil_logo ?? null
      ]
    )

    res.status(201).json({
      message: 'Se creo correctamente el usuario'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error al registar',
      error: error instanceof Error ? error.message : error
    })
  }
})

routerLoginRegister.post('/login', async (req, res) => {
  try {
    const vLogin: Login = validacionLogin.parse(req.body)

    const { rows: user } = await pool.query<UsuarioConsulta>(
      'SELECT * FROM usuarios WHERE email = $1', [vLogin.email]
    )

    if (user.length === 0) {
      res.status(404).json({ message: 'no existe una cuenta asociado a este email' })
      return
    }

    const passwordUser = await bcrypt.compare(vLogin.password, user[0].password)

    if (!passwordUser) {
      res.status(404).json({ message: 'El email o la contraseña son incorectas' })
      return
    }

    res.status(200).json({
      message: 'Login exitoso'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error interno en el servidor',
      error: error instanceof Error ? error.message : error
    })
  }
})

// endpoind para cambiar la contraseña del user
routerLoginRegister.post('/recuperar', async (req, res) => {
  try {
    const vRecuperar: RecuperaraCuenta = validacionRecuperar.parse(req.body)
    const hashPassword = await bcrypt.hash(vRecuperar.password, SAL)

    const { rows: userRecuperar } = await pool.query<UsuarioConsulta>(
      'SELECT * FROM usuarios WHERE username = $1 AND email = $2',
      [
        vRecuperar.username,
        vRecuperar.email
      ]
    )

    if (userRecuperar.length === 0) {
      res.status(404).json({ message: 'Error no se econtro el usuario '})
      return
    }

    await pool.query(
      'UPDATE usuarios SET password = $1 WHERE username = $2 AND email = $3',
      [
        hashPassword,
        vRecuperar.username,
        vRecuperar.email
      ]
    )

    res.status(200).json({
      message: 'Se actualizo correctamente la contraseña'
    })
  } catch (error) {
    console.log(error)   
    res.status(500).json({
      message: 'Error interno en el servidor',
      error: error instanceof Error ? error.message : error
    })
  }
})
