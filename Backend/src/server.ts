import express from 'express'
import { PORT } from './config'
import { midelware } from './routers/midelware'

const app = express()

app.use(midelware)

app.listen(PORT.Port, () => {
  console.table({
    URL: `http://localhost:${PORT.Port}`
  })
})