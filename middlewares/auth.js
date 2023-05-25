const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");
const { MSG_AUTHORIZATION_REQUIRED } = require("../utils/constants");
const { JWT_SECRET, NODE_ENV } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError(MSG_AUTHORIZATION_REQUIRED);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    return next(new UnauthorizedError(MSG_AUTHORIZATION_REQUIRED));
  }

  req.user = payload;

  next();
};
