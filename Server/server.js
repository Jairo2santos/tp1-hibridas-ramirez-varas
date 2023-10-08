const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const coursesRoutes = require('./routes/courses.js');
const categoriesRoutes = require('./routes/categories.js');


// Montar las rutas en la aplicaciónalug
app.use('/cursos', coursesRoutes);
app.use('/categorias', categoriesRoutes);


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
