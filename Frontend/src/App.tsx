import { Route, Routes } from 'react-router-dom'
import { Inicio } from './inicio/inicioHTML'
import { Register } from './login-register/Register'
import { Login } from './login-register/Login'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
