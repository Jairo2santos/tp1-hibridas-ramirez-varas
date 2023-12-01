import express from 'express';
const router = express.Router();
import blogController from '../controllers/blog.controller';

// Obtener todos los blogs
router.get('/', blogController.getAllBlogs);

// Obtener un blog por su ID
router.get('/:blogId', blogController.getBlogById);
router.delete('/:blogId', blogController.deleteBlogById);

// Crear un nuevo blog sin autenticación
router.post('/', blogController.createBlog);

module.exports = router;
