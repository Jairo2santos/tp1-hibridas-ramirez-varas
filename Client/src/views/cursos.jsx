import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardCurso from '../components/CardCurso'; // Asegúrate de convertir CardCurso.vue a CardCurso.jsx
import Paginacion from '../components/Paginacion'; // Asegúrate de convertir Paginacion.vue a Paginacion.jsx
import Portada from '../components/Portada'; // Asegúrate de convertir Portada.vue a Portada.jsx
// import Sidebar from '../components/Sidebar'; // Asegúrate de convertir Sidebar.vue a Sidebar.jsx
import Filtros from '../components/Filtros'; // Asegúrate de convertir Filtros.vue a Filtros.jsx
import { debounce } from 'lodash'; // Lodash es una librería útil para esto

function Cursos() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [totalCourses, setTotalCourses] = useState(0);
  // const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // Agregué esta línea

  useEffect(() => {
    loadCursos(currentPage);
    loadCategories();
  }, [currentPage]);

  const loadCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/categorias`);
      setCategories(response.data);
    } catch (error) {
      //console.error("Error al obtener las categorías:", error);
    }
  };

  const loadCursos = async (page, filterType = null) => {
    const filterQueryParam = filterType ? `&filter=${filterType}` : "";
    try {
      const response = await axios.get(`http://localhost:3333/cursos?page=${page}${filterQueryParam}`);
      setCourses(response.data.courses);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  };

  const handleFilterChange = (filterType) => {
    setCurrentPage(1);
    loadCursos(1, filterType);
    console.log('Filtro recibido en Cursos:', filterType);
  };
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  const handleCategoryFilter = async (selectedCategories) => {
    setCourses([]);
    setCurrentPage(1);
    console.log('Categorías recibidas en Cursos:', selectedCategories);

    const categoryQuery = selectedCategories.join(',');
    const url = `http://localhost:3333/cursos?categories=${encodeURIComponent(categoryQuery)}`;

    try {
      const response = await axios.get(url);
      console.log('Respuesta del servidor:', response.data);

      setCourses(response.data.courses);
      setTotalPages(response.data.totalPages);
      setTotalCourses(response.data.totalCourses);
    } catch (error) {
      console.error('Error al filtrar los cursos:', error);
    }
  };

  useEffect(() => {
    if (currentPage === 1) {
      // Evitar solicitudes adicionales si currentPage es 1
      loadCursos(currentPage);
    }
  }, [currentPage]);
  
  const debouncedCategoryFilter = debounce((selectedCategories) => {
    handleCategoryFilter(selectedCategories);
  }, 500); // Espera 500 ms después del último cambio antes de ejecutar
  
  useEffect(() => {
    if (selectedCategories.length > 0) {
      debouncedCategoryFilter(selectedCategories);
    }
  }, [selectedCategories, debouncedCategoryFilter]);

  return (
    <div>
      <Portada totalCourses={courses.length} />
      <div className="flex container mx-auto p-4">
        <div>
          {/* <Sidebar categories={categories} onFilterByCategory={handleCategoryFilter} /> */}
        </div>
        <div className="flex flex-col w-full ml-4">
          <div>
            <Filtros onFilterChange={handleFilterChange} />
          </div>
          <div>
            {courses.map((course) => (
              <div key={course._id} className="mb-4 min-w-max">
                <CardCurso course={course} />
              </div>
            ))}
            <Paginacion
              currentPage={currentPage}
              totalPages={totalPages}
              onChangePage={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cursos;
