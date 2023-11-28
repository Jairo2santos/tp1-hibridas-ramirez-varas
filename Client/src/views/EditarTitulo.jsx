import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


function EditarTitulo() {
  const [newTitle, setNewTitle] = useState('');
  const [message, setMessage] = useState('');
  const { courseId } = useParams(); // Obtiene el ID del curso de la URL
  const navigate = useNavigate();

  const updateTitle = async () => {
    try {
      const response = await axios.put(`http://localhost:3333/cursos/${courseId}/title`, {
        title: newTitle
      });
      setMessage(response.data.message);
      // Redirige al usuario a la página anterior
      navigate(-1);
    } catch (error) {
      console.error("Error al actualizar el título:", error);
      setMessage("Error al actualizar el título.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-1/2 bg-white p-6 rounded shadow">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 w-full"
          placeholder="Nuevo título"
        />
        <button onClick={updateTitle} className="mt-4 bg-blue-500 text-white p-2 rounded w-full">
          Actualizar
        </button>
        {message && <div className="mt-4">{message}</div>}
      </div>
    </div>
  );
}

export default EditarTitulo;
