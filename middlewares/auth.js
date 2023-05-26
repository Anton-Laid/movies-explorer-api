const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");
const {
  MSG_AUTHORIZATION_REQUIRED,
  MSG_TOKEN_NOT_TEST,
} = require("../utils/constants");

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError(MSG_AUTHORIZATION_REQUIRED);
  }

  let payload;
  try {
    payload = jwt.verify(token, "jwt_secret");
  } catch (err) {
    throw new UnauthorizedError(MSG_TOKEN_NOT_TEST);
  }

  req.user = payload;
  next();
};
