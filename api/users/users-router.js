const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const users = require('./users/users-model.js');
const posts = require('./posts/posts-model.js');

// The middleware functions also need to be required
const {
  logger,
  validatePost,
  validateUser,
  validateUserId,
} = require('./middleware/middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  users
    .get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get('/:id', validateUserId(), logger, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post('/', validateUser(), logger, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  users
    .insert(req.body.text)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.put('/:id', validateUserId(), logger, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  users
    .update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.delete('/:id', validateUserId(), logger, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  users
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.json(count);
      }
    })
    .catch(next);
});

router.get('/:id/posts', validateUserId(), logger, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  users
    .getUserPosts(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(next);
});

router.post(
  '/:id/posts',
  validateUserId(),
  validatePost(),
  logger,
  (req, res, next) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    const postInfo = { ...req.body, user_id: req.params.id };

    posts
      .add(postInfo)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch(next);
  }
);

// do not forget to export the router
module.exports = router;
