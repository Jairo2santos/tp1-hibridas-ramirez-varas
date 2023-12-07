import express from 'express';
import { getAllBlogs, getBlogById, deleteBlogById, createBlog } from '../controllers/blog.controller.js';

const router = express.Router();

// Obtener todos los blogs
router.get('/', getAllBlogs);

// Obtener un blog por su ID
router.get('/:blogId', getBlogById);
router.delete('/:blogId', deleteBlogById);

// Crear un nuevo blog sin autenticación
router.post('/', createBlog);

export default router;
