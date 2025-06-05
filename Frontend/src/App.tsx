import { Route, Routes } from 'react-router-dom'
import { Inicio } from './inicio/inicioHTML'
import { Register } from './login-register/Register'
import { Login } from './login-register/Login'
import ProtectedRoute from './routers/ProtectedRouter'
import { Perfil } from './perfil/Perfil'
import { CrearPost } from './posts/PostsNew'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/perfil/:id"
        element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-post/:id"
        element={
          <ProtectedRoute>
            <CrearPost />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
