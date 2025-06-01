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
  perfil_logo: string | null
}
