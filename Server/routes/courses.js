const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller.js');

router.get('/', coursesController.getAllCourses);

module.exports = router;
