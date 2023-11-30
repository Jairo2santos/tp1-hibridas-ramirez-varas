import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link desde React Router

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);

  useEffect(() => {
    // Realiza una solicitud GET para obtener la lista de blogs desde tu servidor
    axios.get('http://localhost:3333/blogs') // Ajusta la URL a tu endpoint de blogs
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de blogs:', error);
      });
  }, []);

  const handleDelete = async (blogId) => {
    try {
      // Realizar una solicitud DELETE para eliminar el artículo
      await axios.delete(`http://localhost:3333/blogs/${blogId}`);
  
      // Eliminar el blog de la lista localmente
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error('Error al eliminar el artículo:', error);
    }
  };
  

  return (
    <div className="container mb-9 mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6">Blogs Relacionados con la Educación y Cursos</h1>
      {loggedIn && ( // Muestra el botón solo si el usuario está autenticado
        <div className="mb-6">
          <Link to="/createBlog" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Subir un Artículo
          </Link>
        </div>
      )}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {blogs.map((blog) => (
    <div key={blog._id} className="bg-white rounded-lg shadow-lg p-6">
      {blog.image && (
        <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover mb-4" />
      )}
      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
      <p className="text-gray-600">{blog.content.slice(0, 40)}...</p>
      <div className="mt-4">
        <Link to={`/blogs/${blog._id}`} className="text-blue-500 hover:underline">
          Leer más
        </Link>
        {loggedIn && ( // Mostrar el botón de eliminar solo si el usuario está autenticado
          <button
            onClick={() => handleDelete(blog._id)}
            className="text-red-500 ml-2"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  ))}
</div>
    </div >
  );
}

export default BlogList;

