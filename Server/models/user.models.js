import mongoose from 'mongoose';
import hashPassword from '../middleware/user.middleware';

//user.models.js
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePicture: String,
  address: String,
  role: { 
    type: String, 
    enum: ['user', 'admin'], // Define los roles permitidos
    default: 'user' // El rol por defecto es 'user'
  },
  // Puedes añadir más campos según sea necesario
});

userSchema.pre('save', hashPassword);
module.exports = mongoose.model('User', userSchema);
