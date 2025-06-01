import { Router } from "express"
import { routerLoginRegister } from '../controllers/login-register'

export const midelware = Router()

midelware.use('/api', routerLoginRegister)