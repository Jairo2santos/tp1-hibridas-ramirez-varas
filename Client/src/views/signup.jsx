import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate


function Signup() {
  const [username, setUsername] = useState('');

  const navigate = useNavigate(); // Hook para la navegación

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
const [isAlertVisible, setIsAlertVisible] = useState(false);
const [alertType, setAlertType] = useState(''); // 'success', 'error', 'warning'

const registerUser = async (event) => {
  event.preventDefault();
  if (password !== confirmPassword) {
    showAlert('Las contraseñas no coinciden.', 'error');
    return;
  }

  try {
    const response = await axios.post('http://localhost:3333/users/register', {
      username, email, password, address, profilePicture
    });
    showAlert('Registro exitoso. Redirigiendo...', 'success');
    setTimeout(() => navigate('/login'), 4000); 
    // Redirige al usuario o maneja la respuesta como prefieras
  } catch (error) {
    if (error.response && error.response.status === 400) {
      showAlert('El nombre de usuario o email ya está en uso.', 'warning');
    } else {
      showAlert('Error al registrar el usuario. Inténtalo de nuevo.', 'error');
    }
  }
};

const showAlert = (message, type) => {
  setAlertMessage(message);
  setAlertType(type);
  setIsAlertVisible(true);
  setTimeout(() => setIsAlertVisible(false), 5000); // Oculta el mensaje después de 5 segundos
};


const Alert = ({ message, type, isVisible }) => {
  if (!isVisible) return null;
  const bgColor = type === 'success' ? 'bg-green-200' : type === 'error' ? 'bg-red-200' : 'bg-yellow-200';
  const textColor = type === 'success' ? 'text-green-800' : type === 'error' ? 'text-red-800' : 'text-yellow-800';
  return (
    <div className={`${bgColor} ${textColor} p-3 rounded-md mb-4`}>
      {message}
    </div>
  );
};
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form className="bg-white p-6 rounded-lg shadow-lg max-w-screen-md w-full" onSubmit={registerUser}>
      <Alert message={alertMessage} type={alertType} isVisible={isAlertVisible} />

        <h2 className="text-xl font-bold mb-4 text-center">Regístrate</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">Nombre de Usuario</label>
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Contraseña</label>
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

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Contraseña"
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
          {passwordsDoNotMatch && <p className="text-sm text-red-500 mt-1">Las contraseñas no coinciden.</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-600">Dirección</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Dirección"
            className="mt-1 p-2 w-full border rounded-md h-24"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-600">Link de Imagen</label>
          <input
            type="text"
            id="profilePicture"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            placeholder="URL de tu imagen"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Registrarse</button>
      </form>
    </div>
  );
}

export default Signup;