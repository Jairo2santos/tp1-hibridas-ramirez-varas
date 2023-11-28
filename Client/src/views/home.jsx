import{ useState } from 'react';
import axios from 'axios';
import CardCurso from '../components/CardCurso'; 

function Home() {
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState([]);

  const search = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3333/cursos/search?q=${query}`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error al buscar cursos:", error);
    }
  };

  return (
    
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-center">Curseek: Buscador de Cursos</h1>
      {/* Campo de búsqueda */}
      <div className="max-w-lg mx-auto">
        <form onSubmit={search} className="flex items-center border rounded-lg overflow-hidden">
          <input 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar cursos..." 
            className="p-2 flex-grow outline-none"
          />
          <button type="submit" className="px-4 bg-blue-600 text-white">Buscar</button>
        </form>
      </div>

      {/* Resultados */}
      <div className="mt-6">
        {courses.map((course) => (
          <CardCurso key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Home;
