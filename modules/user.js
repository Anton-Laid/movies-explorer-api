const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
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
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject("Нет такого юзера");
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject("Не верный email или пароль");
      }

      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
