const bcrypt = require('bcrypt');
const saltRounds = 10;

// Middleware para hashear la contraseña
const hashPassword = async function(next) {
  const user = this;
  // Solo hashea la contraseña si ha sido modificada (o es nueva)
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
};

module.exports = hashPassword;