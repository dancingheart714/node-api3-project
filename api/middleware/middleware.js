const users = require('../users/users-model');

function logger(req, res, next) {
  return (req, res, next) => {
    console.log(`
  Method: ${req.method},
  URL: ${req.url},
  Timestamp: ${Date().toISOSString()}
  `);
    next();
  };
}

function validateUserId(req, res, next) {
  return (req, res, next) => {
    users
      .getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({
            message: 'user not found',
          });
        }
      })
      .catch((err) => {
        console.log(error);
      });
  };
}

function validateUser(req, res, next) {
  return (req, res, next) => {
    if (!req.body.name) {
      res.status(400).json({
        message: 'missing required name field',
      });
    }
  };
}

function validatePost(req, res, next) {
  return (req, res, next) => {
    if (!req.body.text) {
      res.status(400).json({
        message: 'missing required text field',
      });
    } else {
      res.postEdit = res.body;
      next();
    }
  };
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId,
};
