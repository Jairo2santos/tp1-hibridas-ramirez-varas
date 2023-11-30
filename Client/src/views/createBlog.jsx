import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UploadBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [articlePosted, setArticlePosted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      image: imageURL,
    };

    try {
      // Realizar una solicitud POST para subir el artículo
      const response = await axios.post('http://localhost:3333/blogs', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Manejar la respuesta, redirigir o mostrar un mensaje de éxito
      console.log('Artículo subido con éxito:', response.data);
      setArticlePosted(true);

      // Redirigir a la lista de blogs después del éxito
      setTimeout(() => {
        navigate('/blogs');
      }, 2000); // 2000 milisegundos = 2 segundos
    } catch (error) {
      console.error('Error al subir el artículo:', error);
    }
  };

  // Verifica si el usuario tiene un token en localStorage
  const userHasToken = localStorage.getItem('token');

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6">Subir un Nuevo Artículo</h1>
      {/* Mostrar el formulario solo si el usuario tiene un token */}
      {userHasToken && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-600">
              Contenido
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              rows="5"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageURL" className="block text-sm font-medium text-gray-600">
              URL de la Imagen
            </label>
            <input
              type="text"
              id="imageURL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="URL de la imagen"
              required
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Subir Artículo
            </button>
          </div>
        </form>
      )}
        {articlePosted && (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Éxito!</strong>
        <span className="block sm:inline"> El artículo se ha subido con éxito.</span>
      </div>
    )}
    </div>
  );
}

export default UploadBlog;
