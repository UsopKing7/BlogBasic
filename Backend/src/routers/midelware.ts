import { Router } from 'express'
import { routerLoginRegister } from '../controllers/login-register'
import { routerUsername } from '../controllers/usernames'
import { routerPosts } from '../controllers/posts'
import { routerLikes } from '../controllers/likes'
import { routerComentario } from '../controllers/comentario'
export const midelware = Router()

midelware.use('/api', routerLoginRegister) //login register
midelware.use('/api', routerUsername)
midelware.use('/api', routerPosts)
midelware.use('/api', routerLikes)
midelware.use('/api', routerComentario)