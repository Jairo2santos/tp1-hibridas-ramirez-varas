
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePicture: String,
  address: String
  // Puedes añadir más campos según sea necesario
});

// Middleware de Mongoose que se ejecuta antes de guardar ('save') un usuario
userSchema.pre('save', async function(next) {
  // Solo hashea la contraseña si ha sido modificada (o es nueva)
  if (this.isModified('password')) {
    // Hashea la contraseña y sustitúyela
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
