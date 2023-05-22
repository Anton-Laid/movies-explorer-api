const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const {
  MSG_USER_UNAUTHORIZED,
  MSG_INVALID_LINK_FORMAT,
  MSG_INVALID_MAIL_FORMAT,
} = require("../utils/constants");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    validate: {
      validator: (v) => validator.isLength(v, { min: 2, max: 30 }),
      message: MSG_INVALID_MAIL_FORMAT,
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: MSG_INVALID_MAIL_FORMAT,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isStrongPassword(v),
      message: MSG_INVALID_MAIL_FORMAT,
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(MSG_USER_UNAUTHORIZED));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error(MSG_USER_UNAUTHORIZED));
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
