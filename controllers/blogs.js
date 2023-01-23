const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {

  if (!req.body.title || !req.body.author) {
    return res.status(400).json({
      error:  'content missing'
    });
  }

  const blog = new Blog(req.body);
  const savedBlog = await blog.save();

  res.status(201).json(savedBlog);
});

module.exports = blogsRouter;