import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: String,
  startDate: String,
  duration: String,
  price: String,
  modalities: [String],
  teachers: String,
  summary: String,
  link: String,
  imgUrl: String,
  category: String,
});

const Course = mongoose.model('course', CourseSchema, 'cursos_UTN');


module.exports = Course;



 

