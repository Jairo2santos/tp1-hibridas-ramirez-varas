import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardCurso from '../components/CardCurso'; // Asegúrate de convertir CardCurso.vue a CardCurso.jsx
import Paginacion from '../components/Paginacion'; // Asegúrate de convertir Paginacion.vue a Paginacion.jsx
import Portada from '../components/Portada'; // Asegúrate de convertir Portada.vue a Portada.jsx
import Sidebar from '../components/Sidebar'; // Asegúrate de convertir Sidebar.vue a Sidebar.jsx
//import Filtros from '../components/Filtros'; // Asegúrate de convertir Filtros.vue a Filtros.jsx

function Cursos() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);  // Añade este estado


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

  const loadCursos = async (page) => {
    const categoryQueryParam = selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : "";
    try {
      const response = await axios.get(`http://localhost:3333/cursos?page=${page}${categoryQueryParam}`);
      console.log("Respuesta de la API:", response.data);
  
      if (response.data && Array.isArray(response.data.cursos)) {
        setCourses(response.data.cursos); 
        setTotalPages(response.data.totalPages);
        setTotalCourses(response.data.totalCourses);
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
    <div>
      <Portada totalCourses={courses.length} /> 

      <div className="flex container mx-auto p-4">
        <div>
        <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />       
       </div>
        <div className="flex flex-col w-full ml-4">
          <div>
            {/* <Filtros onFilterChange={handleFilterChange} /> */}
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
