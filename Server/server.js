import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
import coursesRoutes from './routes/courses.js';
import categoriesRoutes from './routes/categories.js';
import usersRoutes from './routes/users.js';
import blogRoutes from './routes/blog.js';
import commentsRoutes from './routes/comments.js';

// Montar las rutas 
app.use('/cursos', coursesRoutes);
app.use('/categorias', categoriesRoutes);
app.use('/users', usersRoutes);
app.use('/blogs', blogRoutes);
app.use('/comentarios', commentsRoutes);

// Conectar con MongoDB
mongoose.connect('mongodb://localhost:27017/cursosApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Manejador de errores globales
app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(500).send("Error interno del servidor");
});

// Iniciar el servidor en el puerto 3333
app.listen(3333, () => {
  console.log('Servidor escuchando en el puerto 3333');
});
