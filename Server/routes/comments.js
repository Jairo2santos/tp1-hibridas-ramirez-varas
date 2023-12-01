const express = require('express');
const router = express.Router();
const { addComment, deleteComment, getCommentsByCourse } = require('../controllers/comments.controller');
const authenticate = require('../middleware/auth.middleware'); // Asegúrate de usar la ruta correcta al middleware
const { requireAdmin } = require('../middleware/admin.middleware'); // Asegúrate de usar la ruta correcta al middleware

// Ruta para agregar un nuevo comentario (accesible por usuarios autenticados)
router.post('/', authenticate, addComment);

// Ruta para eliminar un comentario por su ID (opcionalmente restringida a administradores)
router.delete('/:commentId', authenticate, requireAdmin, deleteComment);


router.get('/por-curso/:cursoId', getCommentsByCourse);

module.exports = router;
