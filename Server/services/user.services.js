//user.services.js
import User from '../models/user.models';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const userService = {
    
  findAllUsers: async () => {
    return await User.find();
  },

  authenticateUser: async (username, password) => {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  },

  getUserProfile: async (username) => {
    return await User.findOne({ username });
  },

  updateUserProfile: async (id, updatedData) => {
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, saltRounds);
    }
    return await User.findByIdAndUpdate(id, updatedData, { new: true });
  },

  registerUser: async (userData) => {
    const existingUser = await User.findOne({ username: userData.username });
    if (existingUser) {
      throw new Error('El nombre de usuario ya está en uso');
    }
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  }
};

module.exports = userService;
