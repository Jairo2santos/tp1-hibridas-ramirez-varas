//AppHeader.jsx
import  { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo-curseek.png'; // Asegúrate de que la ruta al logo es correcta

function AppHeader() {
  const [loggedInUsername, setLoggedInUsername] = useState(localStorage.getItem('loggedInUsername'));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Cada vez que cambia la ubicación (ruta), actualiza el estado
    setLoggedInUsername(localStorage.getItem('loggedInUsername'));
  }, [location]); // Dependencia del efecto en la ubicación actual

  const logout = () => {
    localStorage.removeItem('loggedInUsername');
    setLoggedInUsername(null);
    navigate('/login');
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xl font-semibold text-indigo-900">
            <Link to="/">
              <img src={logo} alt="logo curseek" width="220" />
            </Link>
            <Link to="/cursos" className="ml-4 hover:bg-indigo-200 px-3 py-1 rounded transition text-lg">Cursos</Link>
          </div>
          <nav className="space-x-4">
            {loggedInUsername ? (
              <>
                <Link to="/profile" className="hover:bg-indigo-200 px-3 py-1 rounded transition text-lg font-bold">Mi Perfil</Link>
                {/* <span className="mr-2">{loggedInUsername}</span> */}
                <button onClick={logout} className="hover:bg-red-200 text-red-700 px-3 py-1 rounded transition text-lg font-bold">Logout</button>
              </>
            ) : (
              <Link to="/login" className="hover:bg-indigo-200 px-3 py-1 rounded transition text-lg font-bold">Login</Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
