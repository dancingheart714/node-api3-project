const express = require('express');

const userRouter = require('./users/users-router');
const postsRouter = require('./posts/posts-router');

const { logger } = require('./middleware/middleware');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/users', userRouter);
server.use('/posts', postsRouter);

server.use('*', (req, res) => {
  res.status(404).json({
    message: 'not found',
  });
});

module.exports = server;
