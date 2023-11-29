//profile.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';


function Profile() {
  const [userData, setUserData] = useState({});
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [editing, setEditing] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [newPassword, setNewPassword] = useState(''); // Añade esta línea
  const [isAdmin, setIsAdmin] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertVisible(true);
    setTimeout(() => setIsAlertVisible(false), 5000);
  };


  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/users/profile/${localStorage.getItem("loggedInUsername")}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
    }
  };

  const saveProfile = async () => {
    if (newPassword && newPassword !== confirmNewPassword) {
      showAlert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const updatedData = {
        username: userData.username,
        email: userData.email,
        address: userData.address,
        ...(newPassword && { password: newPassword }) // Solo incluye la contraseña si ha sido ingresada
      };
      await axios.put(`http://localhost:3333/users/profile/${userData._id}`, updatedData);
      showAlert('Perfil actualizado exitosamente', 'success');
      setEditing(false);
      setNewPassword(''); // Limpia los campos de contraseña
      setConfirmNewPassword('');
     
    } catch (error) {
      showAlert('Error al actualizar perfil');
    }
  };
  const fetchAllUsers = async () => {
    console.log("Fetching all users..."); // Agrega esta línea para verificar si se ejecuta la función
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3333/users/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAllUsers(response.data);
      console.log("Respuesta del servidor:", response.data); // Agrega esta línea para verificar la respuesta
     
    } catch (error) {
      console.error("Error al obtener todos los usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    // Aquí verifica si el usuario es administrador
    const userRole = localStorage.getItem('userRole'); // Asegúrate de que el rol se guarda en localStorage cuando el usuario inicia sesión
    if (userRole === 'admin') {
      setIsAdmin(true);
      console.log("Fetching all users from useEffect..."); // Agrega esta línea para verificar si se ejecuta el useEffect

      fetchAllUsers();
    }
  }, []);

  return (
    <div className="profile-card-container flex justify-center items-center h-screen bg-gray-200">
    {isAlertVisible && (
      <div className={`absolute top-0 left-0 right-0 bg-${alertType === 'success' ? 'green' : 'red'}-200 text-${alertType === 'success' ? 'green' : 'red'}-800 p-3 rounded-md text-center`}>
        {alertMessage}
      </div>
    )}
      <div className="profile-card bg-white p-6 rounded-lg shadow-lg max-w-xl">
        <img
          src={userData.profilePicture || 'ruta/a/imagen/placeholder.png'}
          alt="Foto de perfil"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />

        <div className="text-center mx-auto">
          <h2 className="text-xl font-bold mb-3">
            {editing ? 'Editando perfil de ' + userData.username : userData.username}
          </h2>
          <p className="text-gray-600 mb-6">{!editing && userData.email}</p>
          <p className="text-gray-500 mb-6">{!editing && userData.address}</p>

          <div className="password-section m-auto mb-6 text-center items-center">
            {!editing && (
              <>
                <input
                  value={isPasswordShown ? userData.password : '*****'}
                  readOnly
                  className="border bg-gray-100 px-3 py-2 rounded"
                />
                <button onClick={togglePasswordVisibility} className="ml-2 text-blue-500">
                  {isPasswordShown ? 'Ocultar' : 'Ver'}
                </button>
              </>
            )}
          </div>

          {isAdmin && (
        <div className="admin-section">
          <h2 className="text-2xl font-bold mb-4">Usuarios Registrados</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}



          {/* Campos editables */}
          {editing && (
            <div className="space-y-4">
              <label className="mb-3">Nombre de Usuario</label>
              <input
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                className="block w-full border p-2 rounded mb-3"
              />

              <label className="mb-3">Correo Electrónico</label>
              <input
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="block w-full border p-2 rounded mb-3"
              />

              <label className="mb-3">Dirección</label>
              <input
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                className="block w-full border p-2 rounded mb-3"
              />

<label className="mb-3">Nueva Contraseña</label>
        <input
          type="password"
          placeholder="Nueva Contraseña"
          value={newPassword} // Usa el valor de newPassword aquí
          onChange={(e) => setNewPassword(e.target.value)}
          className="block w-full border p-2 rounded mb-3"
        />

        <label className="mb-3">Confirmar Nueva Contraseña</label>
        <input
          type="password"
          placeholder="Confirmar Nueva Contraseña"
          value={confirmNewPassword} // Usa el valor de confirmNewPassword aquí
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="block w-full border p-2 rounded mb-3"
        />
      </div>
          )}

          {/* Botones */}
          {!editing && (
            <div className="mt-4">
              <button onClick={() => setEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Editar
              </button>
            </div>
          )}

          {editing && (
            <div className="mt-4 space-x-2">
              <button onClick={saveProfile} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Guardar
              </button>
              <button onClick={() => setEditing(false)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Profile;



