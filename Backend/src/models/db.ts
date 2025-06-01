import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

const verifiConnect = async () => {
  try {
    const connec = await pool.connect()
    console.log('[+] Coneccion database realizada')
    connec.release()
  } catch (error) {
    console.log('[-] Error coneccion database')
  }
}

verifiConnect()