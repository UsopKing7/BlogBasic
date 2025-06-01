interface Port {
  Port: number
}

export const PORT: Port = {
  Port: Number(process.env.PORT) || 3333
}