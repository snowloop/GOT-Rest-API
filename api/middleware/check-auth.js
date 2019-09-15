const JWT = require('jsonwebtoken');

// Midlleware that check is the user is authenticated
const checkAuthUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    JWT.verify(token, process.env.JWT_KEY, (err, result) => {
      if (err || !result) {
        res.status(401).json({
          message: "Unauthorized"
        });
      } else {
        next();
      }
    })
  } catch (error) {
    if (error instanceof TypeError) {
      res.status(401).json({
        message: "Unauthorized"
      });
    } else {
      next(error);
    }
  }
};

// Midlleware that check is the user is authenticated and is admin.
const checkAuthAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    JWT.verify(token, process.env.JWT_KEY, (err, result) => {
      if (err || !result.isAdmin) {
        res.status(401).json({
          message: "Unauthorized"
        });
      } else {
        next();
      }
    })
  } catch (error) {
    if (error instanceof TypeError) {
      res.status(401).json({
        message: "Unauthorized"
      });
    } else {
      next(error);
    }
  }
};

module.exports = {
  checkAuthUser: checkAuthUser,
  checkAuthAdmin: checkAuthAdmin
}
