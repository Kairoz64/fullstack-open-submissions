const blogsRouter = require('express').Router();
const { userExtractor } = require('../utils/middleware');
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id).populate('user',
      { username: 1, name: 1 });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch(e) {
    res.status(400).end();
  }
});

blogsRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body;

  if (!body.title || !body.author) {
    return res.status(400).json({
      error:  'content missing'
    });
  }

  const user = req.user;

  if (!user) {
    return res.status(400).json({
      error:  'no user created the blog'
    });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });

  const savedBlog = await blog.save();
  await savedBlog.populate('user', { username: 1, name: 1 });
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  try {
    const blogToDelete = await Blog.findById(id);
    if (blogToDelete.user.toString() === user._id.toString()) {
      await blogToDelete.remove();
      return res.status(204).end();
    } else {
      return res.status(403).end();
    }
  } catch(e) {
    res.status(400).end();
  }
});

blogsRouter.put('/:id', userExtractor, async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (!body.author || !body.title) {
    return res.status(400).json({
      error:  'content missing'
    });
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    await updatedBlog.populate('user', { username: 1, name: 1 });
    if (updatedBlog === null) {
      return res.status(404).end();
    }

    res.json(updatedBlog);

  } catch(e) {
    res.status(400).end();
  }
});

module.exports = blogsRouter;