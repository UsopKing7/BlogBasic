import express from 'express'
import { PORT } from './config'
import { midelware } from './routers/midelware'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({ 
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(midelware)

app.listen(PORT.Port, () => {
  console.table({
    URL: `http://localhost:${PORT.Port}`
  })
})
