import express from 'express'
import { PORT } from './config'
import { midelware } from './routers/midelware'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(midelware)

app.listen(PORT.Port, () => {
  console.table({
    URL: `http://localhost:${PORT.Port}`
  })
})