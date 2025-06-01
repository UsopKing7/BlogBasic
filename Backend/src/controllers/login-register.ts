import { Router, Request, Response } from 'express'
import { pool } from '../models/db'
import { NewUsuarioInterface, SAL } from '../config'
import { validacionRegister } from '../routers/validaciones'
import bcrypt from 'bcrypt'

export const routerLoginRegister = Router()

routerLoginRegister.post('/register', async (req: Request, res: Response) => {
  try {
    const vRegister: NewUsuarioInterface = validacionRegister.parse(req.body)
    const passwordHash = await bcrypt.hash(vRegister.password, SAL)

    await pool.query(
      'INSERT INTO usuarios (username, email, password, perfil_logo) VALUES ($1, $2, $3, $4))', 
      [
        vRegister.username,
        vRegister.email,
        passwordHash,
        vRegister.perfil_logo
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