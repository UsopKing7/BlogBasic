import z from 'zod'

export const validacionRegister = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  perfil_logo: z.string().optional()
})