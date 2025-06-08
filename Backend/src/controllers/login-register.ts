import { Router, Request, Response, NextFunction } from 'express'
import { pool } from '../models/db'
import {
  Login,
  NewUsuarioInterface,
  SAL,
  UsuarioConsulta,
  RecuperaraCuenta,
  SECRET,
  UsuarioToken
} from '../config'
import {
  validacionRegister,
  validacionLogin,
  validacionRecuperar
} from '../routers/validaciones'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const routerLoginRegister = Router()

// enpoind para registrar users
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

// enpoind para logearte
routerLoginRegister.post('/login', async (req, res) => {
  try {
    const vLogin: Login = validacionLogin.parse(req.body)

    const { rows: user } = await pool.query<UsuarioConsulta>(
      'SELECT * FROM usuarios WHERE email = $1',
      [vLogin.email]
    )

    if (user.length === 0) {
      res
        .status(404)
        .json({ message: 'no existe una cuenta asociado a este email' })
      return
    }

    const passwordUser = await bcrypt.compare(vLogin.password, user[0].password)

    if (!passwordUser) {
      res
        .status(404)
        .json({ message: 'El email o la contraseña son incorectas' })
      return
    }

    const payload = {
      id: user[0].id,
      usuario: user[0].username,
      email: user[0].email,
      perfil_logo: user[0].perfil_logo
    }
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' })

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000
    })

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
      [vRecuperar.username, vRecuperar.email]
    )

    if (userRecuperar.length === 0) {
      res.status(404).json({ message: 'Error no se econtro el usuario ' })
      return
    }

    await pool.query(
      'UPDATE usuarios SET password = $1 WHERE username = $2 AND email = $3',
      [hashPassword, vRecuperar.username, vRecuperar.email]
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

// enpoind para hacer cierre de session
routerLoginRegister.post('/logout', (_req, res) => {
  res.clearCookie('access_token')
  res.status(200).json({ message: 'Session cerrada' })
})

// endpoint para cubrir rutas protected
export const rutaProtected = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.access_token

  if (!token) {
    res.status(401).json({ message: 'Token no encontrado' })
    return
  }

  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded as UsuarioToken
    next()
  } catch (error) {
    res.status(500).json({
      message: 'Token invalido o expirado'
    })
  }
}

// enpoind para check de token
routerLoginRegister.get('/check-auth', (req, res) => {
  const token = req.cookies.access_token

  if (!token) res.sendStatus(401)

  try {
    const decoded = jwt.verify(token, SECRET)
    res.status(200).json({ user: decoded })
  } catch (err) {
    res.sendStatus(401)
  }
})

//enpoind para mandar el id
routerLoginRegister.get('/id', rutaProtected, async (req, res) => {
  const user = req.user as UsuarioToken
  const { id, email, username } = user
  res.status(200).json({ id, email, username })
})