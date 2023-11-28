import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState(localStorage.getItem('loggedInUsername') || '');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const navigate = useNavigate();

  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertVisible(true);
    setTimeout(() => setIsAlertVisible(false), 5000); // Oculta el mensaje después de 5 segundos
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3333/users/login', { username, password });

      if (response.status === 200) {
        localStorage.setItem('loggedInUsername', username);
        navigate('/profile');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showAlert('Usuario o contraseña incorrectos.');
      } else {
        showAlert('Error al iniciar sesión. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {isAlertVisible && (
        <div className="absolute top-0 left-0 right-0 bg-red-200 text-red-800 p-3 rounded-md text-center">
          {alertMessage}
        </div>
      )}
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
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Ingresar</button>
        <p className="mt-3 text-sm">
          ¿No tienes una cuenta? <a href="/signup" className="text-blue-600">Regístrate</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
