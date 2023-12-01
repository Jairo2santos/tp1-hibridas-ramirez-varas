import Comment from '../models/comments.models'; // Asegúrate de usar la ruta correcta al modelo de comentarios
import User from '../models/user.models'; 

// Agregar un nuevo comentario
const addComment = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ mensaje: 'No autorizado' });
      }
      const calificacionNumerica = parseInt(req.body.calificacion);

      if (isNaN(calificacionNumerica)) {
        // Si calificación no es un número, enviar un error
        return res.status(400).json({ mensaje: 'Calificación inválida' });
      }

      console.log(req.body); // Imprimir para depuración

      // Obtén el ID del usuario autenticado desde tu sistema de autenticación
      const nuevoComentario = new Comment({
        contenido: req.body.contenido,
        calificación: calificacionNumerica, // Usar el valor numérico
        usuario: req.user._id,
        curso: req.body.cursoId
    });
  
      await nuevoComentario.save();
      res.status(201).json({ mensaje: 'Comentario agregado con éxito' });
    } catch (error) {
      console.error('Error al agregar el comentario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };
  
  
// Eliminar un comentario por su ID
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params; // Obtén el ID del comentario desde los parámetros de la URL
    // Verificar si el comentario existe
    const comentario = await Comment.findById(commentId);
    if (!comentario) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    }
    // Verificar si el usuario autenticado es el propietario del comentario (o si es un admin u otra lógica de autorización)
    if (comentario.usuario.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ mensaje: 'No tienes permiso para eliminar este comentario' });
    }
    await Comment.findByIdAndDelete(commentId); // Eliminar el comentario
    res.json({ mensaje: 'Comentario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el comentario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// En comments.controller.js o un archivo similar

const getCommentsByCourse = async (req, res) => {
    try {
      const { cursoId } = req.params;
      const comentarios = await Comment.find({ curso: cursoId })
                                       .populate('usuario', 'profilePicture username');
      res.json(comentarios);
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };

module.exports = {
  addComment,
  deleteComment,
  getCommentsByCourse
  // Otros controladores aquí, como obtener comentarios para un curso, etc.
};