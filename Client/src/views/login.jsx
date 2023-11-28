import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState(localStorage.getItem('loggedInUsername') || '');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario

    try {
      const response = await axios.post('http://localhost:3333/users/login', {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('loggedInUsername', username); // Almacenar el nombre de usuario en el localStorage
        navigate('/profile'); // Navegar al perfil
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <form className="bg-gray-100 p-6 rounded-md shadow-md" onSubmit={login}>
      <h2 className="text-2xl font-semibold mb-4">Iniciar Sesión</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
          Nombre de Usuario
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de Usuario"
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <p className="text-gray-600 mb-2">Usuario: user | Contraseña: 12345</p>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
      >
        Ingresar
      </button>
      <p className="mt-3 text-sm">
        ¿No tienes una cuenta? <a href="/signup" className="text-blue-600">Regístrate</a>
      </p>
    </form>
  </div>
  );
}

export default Login;
  
