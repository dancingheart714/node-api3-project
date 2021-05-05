const users = require('../users/users-model');
const post = require('../posts/posts-model');

function logger() {
  //DO YOUR MAGIC
  return (req, res, next) => {
    newTime = newDate().toISOSString();
    console.log(`
  Method: ${req.method},
  URL: ${req.url},
  Timestamp: [${newTime}]`);
    next();
  };
}

function validateUserId() {
  //DO YOUR MAGIC
  return (req, res, next) => {
    users.getById(req.params.id).then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({
          message: 'user not found',
        });
      }
    });
  };
}

function validateUser() {
  //DO YOUR MAGIC
  return (req, res, next) => {
    if (!req.body.name) {
      res.status(400).json({
        message: 'missing required name field',
      });
    }
    next();
  };
}

function validatePost() {
  //DO YOUR MAGIC
  return (req, res, next) => {
    if (!req.body.text) {
      res.status(400).json({
        message: 'missing required text field',
      });
    }
    next();
  };
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId,
};
