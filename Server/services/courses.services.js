//courses.services.js


const Course = require('../models/course.models');

const courseService = {
    updateCourseTitle: async (id, title) => {
        return await Course.findByIdAndUpdate(id, { title }, { new: true });
    },

    getSingleCourse: async (id) => {
        return await Course.findById(id);
    },

    getCoursesByCategory: async (category, page, limit) => {
        let query = {};
        if (category) {
          query.category = category;
        }
    
        // Obtener el total de cursos que coinciden con el query
        const totalCursos = await Course.countDocuments(query);
    
        // Obtener los cursos que coinciden con el query
        let cursos = await Course.find(query).skip((page - 1) * limit).limit(limit);
    
        // Calcular el total de páginas
        const totalPages = Math.ceil(totalCursos / limit);
    
        // Devolver el resultado
        return { cursos, totalPages, totalCourses: totalCursos };
      },
    
  
    getAllCourses: async ( page, limit) => {
        let query = {};
    
        const totalCursos = await Course.countDocuments(query);
        let cursos = await Course.find(query).skip((page - 1) * limit).limit(limit);


        const totalPages = Math.ceil(totalCursos / limit);
        return { cursos, totalPages, totalCourses: totalCursos };
    },

    searchCourses: async (query) => {
        return await Course.find({
            title: { $regex: new RegExp(query, 'i') }
        });
    }
};

module.exports = courseService;
