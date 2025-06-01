import z from 'zod'

export const validacionRegister = z.object({
  username: z
    .string()
    .min(3, {
      message: 'El nombre de usuario debe tener al menos 3 caracteres'
    })
    .max(20, {
      message: 'El nombre de usuario no debe superar los 20 caracteres'
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        'El nombre de usuario solo puede contener letras, números y guiones bajos'
    }),
  email: z
    .string()
    .min(5, { message: 'El email debe tener al menos 5 caracteres' })
    .max(50, { message: 'El email no debe superar los 50 caracteres' })
    .email({ message: 'El email no es válido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .max(36, { message: 'La contraseña no debe superar los 36 caracteres' }),
  perfil_logo: z
    .string()
    .url({ message: 'El logo de perfil debe ser una URL válida' })
    .optional()
})

export const validacionLogin = z.object({
  email: z
    .string()
    .min(5, { message: 'El email debe tener al menos 5 caracteres' })
    .max(50, { message: 'El email no debe superar los 50 caracteres' })
    .email({ message: 'El email no es válido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .max(36, { message: 'La contraseña no debe superar los 36 caracteres' })
})

export const validacionRecuperar = z.object({
  username: z
    .string()
    .min(3, {
      message: 'El nombre de usuario debe tener al menos 3 caracteres'
    })
    .max(20, {
      message: 'El nombre de usuario no debe superar los 20 caracteres'
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        'El nombre de usuario solo puede contener letras, números y guiones bajos'
    }),
  email: z
    .string()
    .min(5, { message: 'El email debe tener al menos 5 caracteres' })
    .max(50, { message: 'El email no debe superar los 50 caracteres' })
    .email({ message: 'El email no es válido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .max(36, { message: 'La contraseña no debe superar los 36 caracteres' })
})
