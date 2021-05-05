const express = require('express');

const userRouter = require('./users/users-router');

const { logger } = require('./middleware/middleware');

const server = express();

server.use(logger);
server.use(userRouter);
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({
    message: 'Successful',
  });
});

module.exports = server;
