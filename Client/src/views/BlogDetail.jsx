import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BlogDetail() {
  const { id } = useParams(); // Obtén el ID del blog desde los parámetros de la URL
  const [blog, setBlog] = useState({});

  useEffect(() => {
    // Realiza una solicitud GET para obtener los detalles del blog por su ID desde tu servidor
    axios.get(`http://localhost:3333/blogs/${id}`) // Ajusta la URL a tu endpoint de blogs
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del blog:', error);
      });
  }, [id]); // Dependencia del efecto en el ID

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {blog.image && (
          <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover mb-4" />
        )}
        <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
        <p className="text-gray-600">{blog.content}</p>
     
      </div>
    </div>
  );
}

export default BlogDetail;
