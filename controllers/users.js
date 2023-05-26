const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../modules/user");
const {
  STATUS_OK,
  STATUS_CREATED,
  VALIDATION_ERROR,
  MSG_INVALID_DATA,
  USER_NOT_UNIQUE_ERROR,
  MSG_EMAIL_DUPLICATION,
  MSG_REGISTERED_USER_EMAIL,
  MSG_REQUESTED_USER_NOT_FOUND,
  MSG_AUTHORIZATION_OK,
  MSG_USER_UNAUTHORIZED,
  MSG_EXIT_USER,
} = require("../utils/constants");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const ConflictError = require("../errors/ConflictError");
const { JWT_SECRET, NODE_ENV } = require("../utils/config");

const createUsers = (req, res, next) => {
  const { name, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.status(STATUS_CREATED).send({
        name: user.name,
        about: user.about,
        _id: user.id,
      })
    )
    .catch((err) => {
      if (err.code === USER_NOT_UNIQUE_ERROR) {
        next(new ConflictError(MSG_REGISTERED_USER_EMAIL));
      }
      if (err.code === VALIDATION_ERROR) {
        next(new BadRequestError(MSG_INVALID_DATA));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "jwt_secret", {
        expiresIn: "7d",
      });

      res
        .cookie("token", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: "none",
          secure: NODE_ENV === "production",
        })
        .status(STATUS_OK)
        .send({ token });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const users = req.user._id;

  User.findById(users)
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

const updataUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MSG_REQUESTED_USER_NOT_FOUND);
      }
      return res.status(STATUS_OK).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((error) => {
      if (error.code === USER_NOT_UNIQUE_ERROR) {
        return next(new ConflictError(MSG_EMAIL_DUPLICATION));
      }
      if (error.name === VALIDATION_ERROR) {
        return next(new BadRequestError(MSG_INVALID_DATA));
      }
      return next(error);
    });
};

const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .status(STATUS_OK)
    .send({ message: MSG_EXIT_USER })
    .end();
};

module.exports = {
  createUsers,
  login,
  getCurrentUser,
  updataUser,
  logout,
};
