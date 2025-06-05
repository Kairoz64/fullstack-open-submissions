const blogsRouter = require('express').Router();
const { userExtractor } = require('../utils/middleware');
const Blog = require('../models/blog');
const Comment = require('../models/comment');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { blog: 0 });
  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id)
      .populate('user', { username: 1, name: 1 })
      .populate('comments', { blog: 0 });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
    await blog.populate('comments', { blog: 0 });
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
  await savedBlog.populate('comments', { blog: 0 });
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
    await updatedBlog.populate('comments', { blog: 0 });
    if (updatedBlog === null) {
      return res.status(404).end();
    }

    res.json(updatedBlog);

  } catch(e) {
    res.status(400).end();
  }
});

blogsRouter.get('/:id/comments', async (req, res) => {
  const blogId = req.params.id;

  try {
    const comments = await Comment.find({ blog: blogId }).populate('blog',
      { title: 1, author: 1, url: 1, likes: 1 });
    return res.json(comments);
  } catch(e) {
    return res.status(404).end();
  }
});

blogsRouter.post('/:id/comments', userExtractor, async (req, res) => {
  const blogId = req.params.id;
  const body = req.body;

  if (!body.content || !blogId) {
    return res.status(400).json({
      error:  'content missing'
    });
  }

  const user = req.user;

  if (!user) {
    return res.status(400).json({
      error:  'no user created the comment'
    });
  }

  const blog = await Blog.findById(blogId);

  if (!blog) {
    return res.status(400).json({
      error: 'blog does not exist'
    });
  }

  const comment = new Comment({
    content: body.content,
    blog: blogId
  });

  const savedComment = await comment.save();
  await savedComment.populate('blog',
    { title: 1, author: 1, url: 1, likes: 1 });
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  res.status(201).json(savedComment);
});

module.exports = blogsRouter;