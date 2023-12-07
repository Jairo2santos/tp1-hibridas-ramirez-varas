import express from 'express';
import { getAllCourses, searchCourses, updateCourseTitle, getSingleCourse } from '../controllers/courses.controller.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/search', searchCourses);
router.put('/:id/title', updateCourseTitle);
router.get('/:id', getSingleCourse);

export default router;
