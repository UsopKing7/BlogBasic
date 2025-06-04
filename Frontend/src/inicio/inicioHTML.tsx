import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUser, FaSignInAlt, FaUserPlus, FaCode } from "react-icons/fa";
import "../styles/inicio.css";

export const Inicio = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie.split(';').map(cookie => cookie.trim());
      setIsAuthenticated(cookies.some(cookie => cookie.startsWith("access_token=")));
    };

    checkAuth();
    
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <nav className="navbar" role="navigation" aria-label="Menú principal">
      <div className="navbar-container">
        <div className="navbar-logo">
          <FaCode className="logo-icon" />
          <span className="logo-text"></span>
        </div>
        <div className="navbar-buttons">
          {isAuthenticated ? (
            <Link 
              to="/perfil" 
              className="nav-btn profile-btn"
              aria-label="Ir a perfil"
            >
              <FaUser className="btn-icon" />
              <span className="btn-text">Perfil</span>
            </Link>
          ) : (
            <>
              <Link 
                to="/login" 
                className="nav-btn login-btn"
                aria-label="Iniciar sesión"
              >
                <FaSignInAlt className="btn-icon" />
                <span className="btn-text">Iniciar sesión</span>
              </Link>
              <Link 
                to="/register" 
                className="nav-btn register-btn"
                aria-label="Registrarse"
              >
                <FaUserPlus className="btn-icon" />
                <span className="btn-text">Registrarse</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
    </>
  )
}