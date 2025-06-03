import { Router } from "express"
import { routerLoginRegister } from '../controllers/login-register'
import { routerUsername } from '../controllers/usernames'

export const midelware = Router()

midelware.use('/api', routerLoginRegister)
midelware.use('/api', routerUsername)
