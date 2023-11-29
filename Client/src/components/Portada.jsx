import PropTypes from 'prop-types';
import defaultImage from '../assets/logo-utn.jpg';

function Portada({ title, description, totalCourses, imageSrc }) {
  const computedImageSrc = imageSrc || defaultImage;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 rounded-lg mb-6 w-full mx-auto max-w-screen-xl">
      <div className="md:w-1/2 md:pr-8">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-2">{description}</p>
        {/* <span className="text-sm bg-gray-200 py-2 px-4 rounded-full">Cursos totales: {totalCourses}</span> */}
      </div>
      <img src={computedImageSrc} alt="UTN Logo" className="w-full md:w-80 h-auto mt-4 md:mt-0" />
    </div>
  );
}

Portada.defaultProps = {
  title: "Universidad Tecnológica Nacional (UTN)",
  description:
    "Esta es una universidad argentina que viene de la Universidad Obrera Nacional. Es la única en Argentina que se enfoca principalmente en ingenierías y que está en todo el país. Aunque su oficina principal está en Buenos Aires, tiene 30 sedes en diferentes lugares de Argentina. Es la universidad de ingeniería con más estudiantes en el país.",
  totalCourses: 0,
  imageSrc: defaultImage,
};

Portada.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  totalCourses: PropTypes.number,
  imageSrc: PropTypes.string,
};

export default Portada;
