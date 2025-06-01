import express from 'express'

const app = express()

app.get('/', (_req, res) => {
  res.send('hola mundo')
})

app.listen(3333)