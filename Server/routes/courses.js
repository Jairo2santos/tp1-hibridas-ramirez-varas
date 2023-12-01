// Importaciones con la sintaxis de import
import express from 'express';
const router = express.Router();
import coursesController from '../controllers/courses.controller.js';

router.get('/', coursesController.getAllCourses);
router.get('/search', coursesController.searchCourses);

router.put('/:id/title', coursesController.updateCourseTitle);
// Dentro de courses.jss

router.get('/:id', coursesController.getSingleCourse);



module.exports = router;
