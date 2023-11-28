import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DetalleCurso() {
  const [course, setCourse] = useState(null);
  const { id } = useParams(); // Accede al parámetro de URL
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

  // Renderizar "Cargando..." o un mensaje similar mientras se carga el curso
  if (!course) return <div>Cargando...</div>;

  return (
    <div className="bg-gray-100 p-6 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded shadow-lg mb-4 items-center justify-between">
            <div className="flex">
              <h1 className="text-3xl inline-block mr-4">{course.title}</h1>
              <button onClick={goToEdit} className="text-purple-600 underline hover:text-purple-700">
                Editar Título
              </button>
            </div>
            <div>
              <p className="text-xl mb-2">{course.duration}</p>
              <h2 className="text-2xl text-purple-600">{course.price}</h2>
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow-lg mb-4">
            <h3 className="text-xl mb-2">Resumen del curso</h3>
            <p>{course.summary}</p>
          </div>
          <div className="bg-white p-6 rounded shadow-lg mb-4">
            <h3 className="text-xl mb-2">Modalidades</h3>
            {Array.isArray(course.modalities) && course.modalities.length > 0 ? (
              <ul className="list-disc pl-8">
                {course.modalities.map((modality, index) => (
                  <li key={index}>{modality}</li>
                ))}
              </ul>
            ) : (
              <p>No hay modalidades disponibles.</p>
            )}
          </div>
          <div className="bg-white p-6 rounded shadow-lg mb-4">
            <h3 className="text-xl mb-2">Profesores</h3>
            <p>{course.teachers}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow-lg">
          <img src={course.imgUrl} alt="Imagen del Curso" className="mb-4" />
          <a href={course.link} target="_blank" rel="noopener noreferrer" className="block bg-purple-600 text-white text-center py-2 px-4 rounded hover:bg-purple-700 w-full">
            Ir al curso
          </a>
        </div>
      </div>
    </div>
  );
}

export default DetalleCurso;
