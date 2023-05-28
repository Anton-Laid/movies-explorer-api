const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");
const { MSG_AUTHORIZATION_REQUIRED } = require("../utils/constants");

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!token) {
    return next(new UnauthorizedError(MSG_AUTHORIZATION_REQUIRED));
  }

  try {
    req.user = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "secret-key"
    );

    next();
  } catch (error) {
    next(new UnauthorizedError(MSG_AUTHORIZATION_REQUIRED));
  }
};
