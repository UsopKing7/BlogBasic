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