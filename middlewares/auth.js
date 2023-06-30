const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");
const { MSG_AUTHORIZATION_REQUIRED } = require("../utils/constants");
const { NODE_ENV, JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    next(new UnauthorizedError());
    return;
  }

  req.user = payload;

  next();
};
