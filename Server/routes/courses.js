const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller.js');

router.get('/:id', coursesController.getSingleCourse);
router.get('/', coursesController.getAllCourses);
router.put('/:id/title', coursesController.updateCourseTitle);



module.exports = router;
