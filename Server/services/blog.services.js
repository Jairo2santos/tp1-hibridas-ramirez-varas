import Blog from '../models/blog.model.js';

export const findAllBlogs = async () => {
  try {
    return await Blog.find().sort('-date'); // Ordena los blogs por fecha descendente
  } catch (error) {
    throw error;
  }
};

export const createBlog = async (blogData) => {
  try {
    const newBlog = new Blog(blogData);
    return await newBlog.save();
  } catch (error) {
    throw error;
  }
};