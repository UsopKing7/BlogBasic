import { Route, Routes } from 'react-router-dom'
import { Inicio } from './inicio/inicioHTML'
import { Register } from './login-register/Register'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
