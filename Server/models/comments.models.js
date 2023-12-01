//comments.models.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  contenido: String,
  calificación: Number,
  fecha: { type: Date, default: Date.now },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Referencia al modelo User
  curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }, // Referencia al modelo Curso
});

const Comment = mongoose.model('Comment', commentSchema, 'comments');

module.exports = Comment;
