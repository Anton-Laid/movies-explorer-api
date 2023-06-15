const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");
const { MSG_AUTHORIZATION_REQUIRED } = require("../utils/constants");
const { NODE_ENV, JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const { token } = req.cookies;

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
