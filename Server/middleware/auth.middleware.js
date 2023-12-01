//auth.middleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ mensaje: 'Acceso denegado. No se proporcionó token.' });
  }

  const token = authHeader.split(' ')[1]; // Bearer TOKEN

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    res.status(401).send({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = authenticate;
