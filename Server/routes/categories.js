// Después (usando import)
import express from 'express';
const router = express.Router();
import categoriesController from '../controllers/categories.controller.js';

router.get('/', categoriesController.getCategories);

module.exports = router;
