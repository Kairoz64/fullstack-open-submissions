const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({ error: 'malformed user' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    name,
    passwordHash
  });

  try {
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (e) {
    if (e.errors
      && e.errors.username
      && e.errors.username.kind === 'unique'
    ) {
      res.status(400).json({ error: 'duplicate username' });
    } else {
      res.status(400).json({ error: 'unknown error' });
    }
  }
});

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { user: 0 });
  res.json(users);
});

module.exports = usersRouter;