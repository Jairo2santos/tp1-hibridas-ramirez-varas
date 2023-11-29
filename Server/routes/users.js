const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../middleware/admin.middleware');
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);  // Aquí es donde defines la ruta GET para /users
router.post('/login', userController.login);
router.get('/profile/:username', userController.getUserProfile);
router.put('/profile/:id', userController.updateUserProfile); // Aquí es donde defines la ruta PUT para actualizar el perfil
router.post('/register', userController.register);
router.get('/admin/users', verifyToken, requireAdmin, userController.getAllUsers);


module.exports = router;