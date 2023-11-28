import { useState, useEffect } from 'react';
import axios from 'axios';


function Profile() {
  const [userData, setUserData] = useState({});
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [editing, setEditing] = useState(false);
  

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
    try {
      await axios.put(`http://localhost:3333/users/profile/${userData._id}`, userData);
      console.log('Perfil actualizado exitosamente');
      setEditing(false);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="profile-card-container flex justify-center items-center h-screen bg-gray-200">
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

              <label className="mb-3">Contraseña</label>
              <div className="relative">
                <input
                  type={isPasswordShown ? 'text' : 'password'}
                  value={userData.password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  placeholder="Contraseña"
                  className="block w-full border p-2 rounded pr-10 mb-3"
                />
                <button onClick={togglePasswordVisibility} className="absolute inset-y-0 right-2 text-blue-500">
                  {isPasswordShown ? 'Ocultar' : 'Ver'}
                </button>
              </div>
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


{/* <style scoped>
.profile-card {
  min-width: 600px;
  min-height: 500px;
}
</style> */}
