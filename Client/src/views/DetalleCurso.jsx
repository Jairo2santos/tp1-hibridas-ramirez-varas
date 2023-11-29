import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DetalleCurso() {
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/cursos/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error obteniendo el detalle del curso:", error);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const goToEdit = () => {
    navigate(`/editar-titulo/${id}`);
  };

  if (!course) return <div>Cargando...</div>;

  return (
    <div className="bg-gray-100 p-6 max-w-screen-full md:px-8 lg:px-16 xl:px-40 mx-auto">
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24" class="ml-2">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" fill="#fff" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default DetalleCurso;
