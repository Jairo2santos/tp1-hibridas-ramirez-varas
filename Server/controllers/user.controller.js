const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).send("Error interno del servidor");
    }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json(user);
    } else {
      res.status(401).send('Usuario o contraseña incorrectos');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.getUserProfile = async (req, res) => {
    const { username } = req.params;
    
    try {
        const user = await User.findOne({ username: username });
        
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
};


exports.updateUserProfile = async (req, res) => {
  const { id } = req.params;
  let updatedData = req.body;

  // Hashear la nueva contraseña si se ha proporcionado
  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(updatedData.password, saltRounds);
  }

  try {
    // Actualizar el documento del usuario en la base de datos
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    // No devolver la contraseña hasheada en la respuesta
    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Error al actualizar el perfil');
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, address, profilePicture } = req.body;
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('El nombre de usuario ya está en uso');
    }

    // Más console.log para depuración aquí si es necesario
    const newUser = new User({ username, email, password, address, profilePicture });
    await newUser.save();
    res.status(201).send('Usuario creado exitosamente');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};