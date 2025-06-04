import { QueryResultRow } from 'pg'

// interface para Port del servidor
interface Port {
  Port: number
}

export const PORT: Port = {
  Port: Number(process.env.PORT) || 3333
}

// interface para Usuarios en consulta
export interface UsuarioConsulta extends QueryResultRow {
  id: `${string}-${string}-${string}-${string}-${string}`
  username: string
  email: string
  password: string
  perfil_logo: string
  registrado_en: string
}

// interface para Posts en consulta
export interface PostsConsulta extends QueryResultRow {
  id: `${string}-${string}-${string}-${string}-${string}`
  titulo: string
  contenido: string
  autor_id: `${string}-${string}-${string}-${string}-${string}`
}

// interface para validacion de datos para insert en usuarios
export interface NewUsuarioInterface {
  username: string
  email: string
  password: string
  perfil_logo?: string
}

export const SAL = Number(process.env.SAL) || 10

// interface para Login
export interface Login {
  email: string
  password: string
}

// interface para Recuperar cuenta
export interface RecuperaraCuenta {
  username: string
  email: string
  password: string
}

// interface para Update Usuario
export interface UpdateUsuario {
  username?: string
  email?: string
  perfil_logo?: string
}

// interface para Agregar Posts
export interface AgregraPosts {
  titulo?: string
  contenido?: string
}

// secret
export const SECRET = String(process.env.SECRET)