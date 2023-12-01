import Blog from '../models/blog.models';

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort('-date'); // Ordena los blogs por fecha descendente
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error al obtener los blogs:', error);
    res.status(500).send('Error interno del servidor');
  }
};
exports.getBlogById = async (req, res) => {
    const blogId = req.params.blogId;
    try {
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ message: 'Blog no encontrado' });
      }
      res.status(200).json(blog);
    } catch (error) {
      console.error('Error al obtener el blog por ID:', error);
      res.status(500).send('Error interno del servidor');
    }
  };
  exports.createBlog = async (req, res) => {
    const { title, content, author, image } = req.body; // Asegúrate de incluir image aquí si estás enviando la imagen en el cuerpo de la solicitud
  
    try {
      const newBlog = new Blog({ title, content, author, image });
      await newBlog.save();
      res.status(201).json(newBlog);
    } catch (error) {
      console.error('Error al crear un nuevo blog:', error);
      res.status(500).send('Error interno del servidor');
    }
  };

  
exports.deleteBlogById = async (req, res) => {
  const blogId = req.params.blogId;
  
  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog no encontrado' });
    }
    res.status(200).json({ message: 'Blog eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el blog por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
};