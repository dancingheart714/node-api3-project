const express = require('express');
const { logger } = require('./middleware/middleware');
const server = express();
const usersRouter = require('./users/users-router');

server.use(express.json());

server.use(logger);

server.use('/api/users', usersRouter);

server.use('*', (req, res) => {
  res.status(404).json({
    message: 'not found',
  });
});

module.exports = server;
