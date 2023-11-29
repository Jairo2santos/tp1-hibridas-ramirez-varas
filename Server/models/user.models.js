const mongoose = require('mongoose');
const hashPassword = require('../middleware/user.middleware');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePicture: String,
  address: String
  // Puedes añadir más campos según sea necesario
});

userSchema.pre('save', hashPassword);
module.exports = mongoose.model('User', userSchema);
