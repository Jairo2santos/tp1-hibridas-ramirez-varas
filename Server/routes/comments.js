// Importaciones con la sintaxis de import
import express from 'express';
const router = express.Router();
import { addComment, deleteComment, getCommentsByCourse } from '../controllers/comments.controller';
import authenticate from '../middleware/auth.middleware'; // Asegúrate de usar la ruta correcta al middleware
import { requireAdmin } from '../middleware/admin.middleware'; // Asegúrate de usar la ruta correcta al middleware

// Ruta para agregar un nuevo comentario (accesible por usuarios autenticados)
router.post('/', authenticate, addComment);

// Ruta para eliminar un comentario por su ID (opcionalmente restringida a administradores)
router.delete('/:commentId', authenticate, requireAdmin, deleteComment);


router.get('/por-curso/:cursoId', getCommentsByCourse);

module.exports = router;
