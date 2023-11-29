import { Link } from 'react-router-dom';
import CategoriaTag from '../components/CategoriaTag';

function CardCurso({ course }) {
  return (
    <div className="block bg-white shadow-md mt-2 rounded-lg p-4 max-w-5xl hover:shadow-lg transition-shadow">
      {/* Contenido Principal de la Card */}
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={course.imgUrl}
          alt="Imagen del curso"
          className="w-full md:w-1/4 flex-shrink-0 rounded mb-4 md:mb-0 md:mr-4"
        />
        <div className="w-full md:w-3/4 flex-grow">
          <Link to={`/curso/${course._id}`}>
            <h1 className="text-xl mb-2">{course.title}</h1>
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <Link
              to={`/modalidad/${course.modalidad}`}
              className="text-blue-500 hover:underline mb-2 md:mb-0 md:mr-4"
            >
              {course.modalidad}
            </Link>
            <span className="text-green-700">{course.price}</span>
          </div>
          <CategoriaTag categoria={course.category} />
          <div className="mt-2 text-sm text-red-700">{course.startDate}</div>
        </div>
      </div>
    </div>
  );
}

export default CardCurso;
