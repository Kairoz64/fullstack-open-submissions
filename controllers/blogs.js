const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

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

blogsRouter.post('/', async (req, res) => {
  let decodedToken;

  try {
    decodedToken = jwt.verify(req.token, process.env.SECRET);
  } catch(e) {
    return res.status(400).json({ error: 'token missing or invalid' });
  }

  const body = req.body;

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }

  if (!body.title || !body.author) {
    return res.status(400).json({
      error:  'content missing'
    });
  }

  const user = await User.findById(decodedToken.id);

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
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
  let decodedToken;

  try {
    decodedToken = jwt.verify(req.token, process.env.SECRET);
  } catch(e) {
    return res.status(400).json({ error: 'token missing or invalid' });
  }

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }

  const id = req.params.id;

  try {
    const blogToDelete = await Blog.findById(id);
    if (blogToDelete.user.toString() === decodedToken.id.toString()) {
      await blogToDelete.remove();
      return res.status(204).end();
    } else {
      return res.status(403).end();
    }
  } catch(e) {
    res.status(400).end();
  }
});

blogsRouter.put('/:id', async (req, res) => {
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
    if (updatedBlog === null) {
      return res.status(404).end();
    }

    res.json(updatedBlog);

  } catch(e) {
    res.status(400).end();
  }
});

module.exports = blogsRouter;