//CardCurso.jsx
import { Link } from 'react-router-dom';
import CategoriaTag from '../components/CategoriaTag'; // Asegúrate de que CategoriaBadge también esté convertido a React

function CardCurso({ course }) {
  return (
    <div className="block bg-white shadow-md mt-2 min-w-max rounded-lg p-4 hover:shadow-lg transition-shadow">
      {/* Contenido Principal de la Card */}
      <div className="flex items-center">
        <img src={course.imgUrl} alt="Imagen del curso" className="w-1/4 rounded mr-4" />
        <div className="w-3/4">
          <Link to={`/curso/${course._id}`}>
            <h2 className="text-xl mb-2">{course.title}</h2>
          </Link>
          <div className="flex justify-between items-center mt-4">
            <Link to={`/modalidad/${course.modalidad}`} className="text-blue-500 hover:underline">{course.modalidad}</Link>
            <span className="text-gray-500">{course.price}</span>
          </div>
          <CategoriaTag categoria={course.category} />
          <div className="mt-2 text-sm text-gray-400">{course.startDate}</div>
        </div>
      </div>
    </div>
  );
}

export default CardCurso;