import { Router } from "express"
import { routerLoginRegister, rutaProtected } from '../controllers/login-register'
import { routerUsername } from '../controllers/usernames'
import { routerPosts } from '../controllers/posts'

export const midelware = Router()

midelware.use('/api', routerLoginRegister) //login register
midelware.use('/api', rutaProtected, routerUsername)
midelware.use('/api', rutaProtected, routerPosts)