// Importación con la sintaxis de import
import Blog from '../models/blog.model';

exports.findAllBlogs = async () => {
  try {
    return await Blog.find().sort('-date'); // Ordena los blogs por fecha descendente
  } catch (error) {
    throw error;
  }
};

exports.createBlog = async (blogData) => {
  try {
    const newBlog = new Blog(blogData);
    return await newBlog.save();
  } catch (error) {
    throw error;
  }
};
