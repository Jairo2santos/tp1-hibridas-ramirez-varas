import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardCurso from '../components/CardCurso';
import Paginacion from '../components/Paginacion';
import Portada from '../components/Portada';
import Sidebar from '../components/Sidebar';

function Cursos() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCursos(currentPage);
    loadCategories();
  }, [currentPage]);

  const loadCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/categorias`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const loadCursos = async (page) => {
    const categoryQueryParam = selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : "";
    try {
      const response = await axios.get(`http://localhost:3333/cursos?page=${page}${categoryQueryParam}`);

      if (response.data && Array.isArray(response.data.cursos)) {
        setCourses(response.data.cursos);
        setTotalPages(response.data.totalPages);
      } else {
        // Manejar cuando no hay cursos o el formato es incorrecto
        setCourses([]);
      }
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    // Siempre carga la página 1 cuando cambia la categoría
    loadCursos(1);
  }, [selectedCategory]);

  return (
    <div className='px-4 md:px-40 bg-white'>
      <Portada totalCourses={courses.length} />

      <div className="flex flex-col md:flex-row container mx-auto">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          className="md:w-1/4"
        />
        <div className="flex flex-col w-full ml-0 md:ml-4">
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
