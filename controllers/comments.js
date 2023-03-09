const commentsRouter = require('express').Router();
const { userExtractor } = require('../utils/middleware');
const Blog = require('../models/blog');
const Comment = require('../models/comment');

commentsRouter.get('/', async (req, res) => {
  const blogId = req.body.blogId;
  if (!blogId) {
    const comments = await Comment.find({}).populate('blog',
      { title: 1, author: 1, url: 1, likes: 1 });
    return res.json(comments);
  }

  try {
    const comments = await Comment.find({ blog: blogId }).populate('blog',
      { title: 1, author: 1, url: 1, likes: 1 });
    return res.json(comments);
  } catch(e) {
    return res.status(404).end();
  }
});

commentsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findById(id).populate('blog',
      { title: 1, author: 1, url: 1, likes: 1 });
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).end();
    }
  } catch(e) {
    res.status(400).end();
  }
});

commentsRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body;

  if (!body.content || !body.blogId) {
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

  const blog = await Blog.findById(body.blogId);

  if (!blog) {
    return res.status(400).json({
      error: 'blog does not exist'
    });
  }

  const comment = new Comment({
    content: body.content,
    blog: body.blogId
  });

  const savedComment = await comment.save();
  await savedComment.populate('blog',
    { title: 1, author: 1, url: 1, likes: 1 });
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  res.status(201).json(savedComment);
});

module.exports = commentsRouter;