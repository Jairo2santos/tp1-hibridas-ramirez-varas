import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black md:pb-40 pb-20 pt-12 px-20 md:px-40">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div className="block">
          {/* Logo */}
          <div className="mb-4 md:mb-0 pb-2">
            <h1 className='text-3xl font-bold text-indigo-700'>CurSeek</h1>
            <p className="text-center text-indigo-800">&copy; Copyright 2023</p>
          </div>
        </div>

        {/* Enlaces de navegación */}
        <div className="flex flex-col md:flex-row">
          {/* Sección de Ayuda */}
          <div className="mb-4 md:mb-0 md:mr-8">
            <h4 className="text-md font-bold mb-2">Ayuda</h4>
            <ul>
              <li className="text-sm text-gray-700 hover:text-indigo-500 transition pb-1"><a href="#">Preguntas frecuentes</a></li>
              <li className="text-sm text-gray-700 hover:text-indigo-500 transition pb-1"><a href="#">Soporte técnico</a></li>
            </ul>
          </div>

          {/* Sección de Nosotros */}
          <div className="mb-4 md:mb-0 md:mr-8">
            <h4 className="text-md font-bold mb-2">Nosotros</h4>
            <ul>
              <li className="text-sm text-gray-700 hover:text-indigo-500 transition pb-1"><a href="#">Sobre nosotros</a></li>
              <li className="text-sm text-gray-700 hover:text-indigo-500 transition pb-1"><a href="#">Nuestro equipo</a></li>
            </ul>
          </div>

          {/* Sección de Términos y Condiciones */}
          <div className="mb-4 md:mb-0 md:mr-8">
            <h4 className="text-md font-bold mb-2">Términos y Condiciones</h4>
            <ul>
              <li className="text-sm text-gray-700 hover:text-indigo-500 transition pb-1"><a href="#">Política de privacidad</a></li>
              <li className="text-sm text-gray-700 hover:text-indigo-500 transition pb-1"><a href="#">Términos y condiciones</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
