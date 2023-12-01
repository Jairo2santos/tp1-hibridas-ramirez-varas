import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DetalleCurso() {
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [comments, setComments] = useState([]);


  useEffect(() => {  
    // Obtener comentarios del curso
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/comentarios/por-curso/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error obteniendo comentarios del curso:", error);
      }
    };
    // Obtener cursos
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/cursos/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error obteniendo el detalle del curso:", error);
      }
    };

    
    fetchComments();
    fetchCourseDetails();
  }, [id]);

  const goToEdit = () => {
    navigate(`/editar-titulo/${id}`);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!token) {
      // No está logueado
      setNotification({ message: 'Por favor, inicia sesión para dejar un comentario.', type: 'error' });

      return;
    }
  
    // Recopilar los datos del formulario
    const contenido = e.target.contenido.value;
    const calificacion = e.target.calificacion.value;
  
    // Obtener el rol del usuario desde el LocalStorage
    const userRole = localStorage.getItem('userRole');
  
    if (userRole === 'usuario') {
      try {
        const response = await axios.post('http://localhost:3333/comentarios', {
    contenido,
    calificacion,
    cursoId: id,
}, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
    
        if (response.status === 201) {
          setNotification({ message: 'Comentario agregado con éxito', type: 'success' });
          closeCommentModal();
        } else {
          // Manejo de errores si es necesario
          console.error('Error al crear el comentario');
        }
      } catch (error) {
        setNotification({ message: 'Error al crear el comentario', type: 'error' });
        console.error('Error al crear el comentario:', error);
      }
    } else {
      setNotification({ message: 'Error al crear el comentario', type: 'error' });
      console.error('No tienes permiso para agregar comentarios');
    }
  };
  
  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };
  
  <div className="notification-container">
    {notification.message && (
        <div className={`notification p-4 rounded-lg shadow-md mb-4 ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {notification.message}
            <button onClick={() => setNotification({ message: '', type: '' })} className="ml-2">Cerrar</button>
        </div>
    )}
</div>

  const openCommentModal = () => {
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
  };
  if (!course) return <div>Cargando...</div>;


  return (


    
    <div className="bg-gray-100 p-6 max-w-screen-full md:px-8 lg:px-16 xl:px-40 mx-auto">
 <div className="notification-container">
  {notification.message && (
    <div className={`notification ${notification.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
      {notification.message}
      <button onClick={() => setNotification({ message: '', type: '' })} className="ml-2">cerrar❎</button>
    </div>
  )}
</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded border border-gray-200 mb-2">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 md:mb-6">{course.title}</h1>
              <button onClick={goToEdit} className="text-indigo-600 underline hover:text-indigo-700 text-sm md:text-base">
                Editar Título
              </button>
              

            </div>
            <div className="mb-2 md:mb-6">
              <p className="text-lg md:text-xl">{course.duration}</p>
              <h2 className="text-2xl md:text-3xl text-green-600">{course.price}</h2>
              <button onClick={openCommentModal} className="bg-blue-500 text-white px-4 py-2 rounded mt-3 hover:bg-blue-600">
        Dejar Comentario
      </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded border border-gray-200 mb-2">
            <h3 className="text-xl md:text-2xl mb-2">Resumen del curso</h3>
            <p className="text-sm md:text-base">{course.summary}</p>
          </div>
          <div className="bg-white p-6 rounded border border-gray-200 mb-2">
            <h3 className="text-xl md:text-2xl mb-2">Modalidades</h3>
            {Array.isArray(course.modalities) && course.modalities.length > 0 ? (
              <ul className="list-disc pl-8">
                {course.modalities.map((modality, index) => (
                  <li key={index} className="text-sm md:text-base">{modality}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm md:text-base">No hay modalidades disponibles.</p>
            )}
          </div>
          <div className="bg-white p-6 rounded border border-gray-200 mb-2">
            <h3 className="text-xl md:text-2xl mb-2">Profesores</h3>
            <p className="text-sm md:text-base">{course.teachers}</p>
          </div>
        </div>





        <div className="bg-white p-6 rounded border border-gray-200 order-first lg:order-last">
          <img src={course.imgUrl} alt="Imagen del Curso" className="mb-2 w-full" />
          <a href={course.link} target="_blank" rel="noopener noreferrer" className="flex bg-indigo-600 text-white text-center py-2 px-4 rounded hover:bg-indigo-800 transition-colors duration-300 ease-in-out w-full items-center text-md justify-center font-semibold">
            Ir al curso
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24" className="ml-2">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" fill="#fff" />
            </svg>
          </a>
        </div>
      </div>

      {/* card de comentarios */}
      <div className="comentarios space-y-4">
        <h2 >Comentarios</h2>
  {comments.map((comentario) => (
  <div key={comentario._id} className="card-comentario bg-white shadow-lg rounded-lg p-4 flex items-start space-x-4">
  <img
    src={'https://placekitten.com/200/300'}
    alt="Perfil"
    className="rounded-full w-12 h-12"
  />
  <div className="flex-1">
    <div className="text-lg font-semibold">{comentario.usuario.username}</div>
    <div className="estrellas text-yellow-400 text-sm">
      {'★'.repeat(comentario.calificación) + '☆'.repeat(5 - comentario.calificación)}
    </div>
    <p className="text-gray-600 mt-1">{comentario.contenido}</p>
    <div className="text-sm text-gray-500 mt-2">
      {new Date(comentario.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
    </div>
  </div>
</div>
))}
</div>
     {isCommentModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-10">
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Dejar un Comentario</h2>
      <form onSubmit={handleCommentSubmit}>
        <div className="mb-4">
          <label htmlFor="contenido" className="block text-gray-700 font-medium">Comentario:</label>
          <textarea
            id="contenido"
            name="contenido"
            rows="4"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="calificacion" className="block text-gray-700 font-medium">Calificación:</label>
          <select
            id="calificacion"
            name="calificacion"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="5">5 (Excelente)</option>
            <option value="4">4 (Bueno)</option>
            <option value="3">3 (Regular)</option>
            <option value="2">2 (Malo)</option>
            <option value="1">1 (Muy Malo)</option>
          </select>
        </div>
        <div className="mb-4">
          {/* Otros campos si los necesitas */}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={closeCommentModal}
            className="px-4 py-2 mr-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            Cerrar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Enviar Comentario
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
    
  );
}

export default DetalleCurso;
