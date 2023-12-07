import express from 'express';
import { addComment, deleteComment, getCommentsByCourse } from '../controllers/comments.controller.js';
import authenticate from '../middleware/auth.middleware.js'; // Asegúrate de usar la ruta correcta al middleware
import { requireAdmin } from '../middleware/admin.middleware.js'; // Asegúrate de usar la ruta correcta al middleware

const router = express.Router();

// Ruta para agregar un nuevo comentario (accesible por usuarios autenticados)
router.post('/', authenticate, addComment);

// Ruta para eliminar un comentario por su ID (opcionalmente restringida a administradores)
router.delete('/:commentId', authenticate, requireAdmin, deleteComment);

router.get('/por-curso/:cursoId', getCommentsByCourse);

export default router;
