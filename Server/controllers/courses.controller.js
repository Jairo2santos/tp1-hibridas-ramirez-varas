
const courseService = require('../services/courses.services');

exports.updateCourseTitle = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
        const updatedCourse = await courseService.updateCourseTitle(id, title);
        res.status(200).json({ message: "Título actualizado con éxito.", updatedCourse });
    } catch (error) {
        console.error("Error al actualizar el título:", error);
        res.status(500).send("Error interno del servidor");
    }
};

exports.getSingleCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await courseService.getSingleCourse(id);
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).send("Curso no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener el curso:", error);
        res.status(500).send("Error interno del servidor");
    }
};

exports.getAllCourses = async (req, res) => {
    const { category, page = 1, limit = 6 } = req.query;

    try {
      const result = await courseService.getCoursesByCategory(category, parseInt(page), parseInt(limit));
      res.json(result);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
      res.status(500).send("Error interno del servidor");
    }
  };
exports.searchCourses = async (req, res) => {
    const query = req.query.q;

    try {
        const courses = await courseService.searchCourses(query);
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error al buscar cursos:", error);
        res.status(500).send("Error interno del servidor");
    }
};
