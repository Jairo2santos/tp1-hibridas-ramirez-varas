import express from 'express';
import { getAllUsers, login, getUserProfile, updateUserProfile, register } from '../controllers/user.controller.js';
import { verifyToken, requireAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

router.get('/', getAllUsers);  // Ruta GET para /users
router.post('/login', login);
router.get('/profile/:username', getUserProfile);
router.put('/profile/:id', updateUserProfile); // Ruta PUT para actualizar el perfil
router.post('/register', register);
router.get('/admin/users', verifyToken, requireAdmin, getAllUsers);

export default router;
