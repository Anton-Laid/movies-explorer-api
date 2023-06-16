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
  MSG_EXIT_USER,
  MSG_USER_NOT_FOUND,
  MSG_POSITIVE_REGISTERED,
} = require("../utils/constants");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");

const { NODE_ENV, JWT_SECRET } = require("../utils/config");

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
      res.status(STATUS_CREATED).send({ message: MSG_POSITIVE_REGISTERED })
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
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "secret-key",
        { expiresIn: "7d" }
      );
      res
        .cookie("token", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          secure: NODE_ENV === "production",
          sameSite: false,
        })
        .status(STATUS_OK)
        .send({
          _id: user._id,
          email: user.email,
          name: user.name,
          token,
        });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const users = req.user._id;

  User.findById(users)
    .orFail(new NotFoundError(MSG_USER_NOT_FOUND))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
        id: user._id,
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
