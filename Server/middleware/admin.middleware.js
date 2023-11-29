//admin.middleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Obtiene el token del encabezado
  
    if (!token) {
      return res.status(403).send('Se requiere un token para autenticación.');
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId);
      next();
    } catch (error) {
      res.status(401).send('Token inválido.');
    }
  };

const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).send('Acceso denegado. Se requiere rol de administrador.');
    }
  };
  
  module.exports = {
    verifyToken,
    requireAdmin
  };
  