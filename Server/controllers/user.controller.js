import userService from '../services/user.services.js';
import jwt from 'jsonwebtoken';


export const getAllUsers = async (req, res)  => {
    try {
        const users = await userService.findAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).send("Error interno del servidor");
    }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userService.authenticateUser(username, password);
    if (user) {
      let role = "usuario"; 
      if (user.role === "admin") {
        role = "admin";
      }

      const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, role }); 
    } else {
      res.status(401).send('Usuario o contraseña incorrectos');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error interno del servidor');
  }
};


export const getUserProfile = async (req, res)  => {
  const { username } = req.params;
  try {
    const user = await userService.getUserProfile(username);
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

export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const user = await userService.updateUserProfile(id, updatedData);
    if (user) {
      // No devolver la contraseña hasheada
      user.password = undefined;
      res.status(200).json(user);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    res.status(500).send('Error al actualizar el perfil');
  }
};

export  const register = async (req, res) => {
  try {
    const newUser = req.body;
    await userService.registerUser(newUser);
    res.status(201).send('Usuario creado exitosamente');
  } catch (error) {
    if (error.message === 'El nombre de usuario ya está en uso') {
      res.status(400).send(error.message);
    } else {
      console.error('Error al registrar el usuario:', error);
      res.status(500).send('Error interno del servidor');
    }
  }
};
