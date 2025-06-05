const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user');

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('Authorization');

  if (authorization
      && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '');
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = async (req, res, next) => {
  let decodedToken;

  try {
    decodedToken = jwt.verify(req.token, process.env.SECRET);
  } catch(e) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }

  req.user = await User.findById(decodedToken.id);

  next();
};

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor
};