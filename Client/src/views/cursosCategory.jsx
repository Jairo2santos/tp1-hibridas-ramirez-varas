import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardCurso from '../components/CardCurso';
import Paginacion from '../components/Paginacion';
import { useParams } from 'react-router-dom';

function CursosCategory() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { categoria } = useParams();

  useEffect(() => {
    const loadCursos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/cursos?categoria=${categoria}&page=${currentPage}`
        );
        setCourses(response.data.cursos);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };

    loadCursos();
  }, [categoria, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Renderizar "Cargando..." o un mensaje similar mientras se cargan los cursos
  if (!courses) return <div>Cargando...</div>;

  return (
    <div>
      <h1 className="text-2xl mb-4 text-center">Cursos de {categoria} de la UTN</h1>
      {courses.map((course) => (
        <CardCurso key={course._id} course={course} />
      ))}
      <Paginacion
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={handlePageChange}
      />
    </div>
  );
}

export default CursosCategory;
