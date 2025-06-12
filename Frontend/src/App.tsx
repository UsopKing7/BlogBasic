import { Route, Routes } from 'react-router-dom'
import { Inicio } from './inicio/inicioHTML'
import { Register } from './login-register/Register'
import { Login } from './login-register/Login'
import ProtectedRoute from './routers/ProtectedRouter'
import { Perfil } from './perfil/Perfil'
import { CrearPost } from './posts/PostsNew'
import { UpdatePerfil } from './perfil/UpdatePerfil'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/:id" element={<Inicio />} />
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
      <Route
        path="/perfil/update/:id"
        element={
          <ProtectedRoute>
            <UpdatePerfil />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
