const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch(e) {
    res.status(400).end();
  }
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