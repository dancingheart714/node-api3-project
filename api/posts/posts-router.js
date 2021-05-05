const express = require('express');

const router = express.Router();

const { validatePost } = require('../middleware/middleware');

const posts = require('./posts-model');

router.get('/', (req, res, next) => {
  posts
    .get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  post
    .getById(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
      next();
    })
    .catch(next);
});

module.exports = router;
