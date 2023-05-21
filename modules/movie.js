const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const movieShema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
    maxlength: 30,
    minlength: 2,
  },
  director: {
    type: String,
    require: true,
    maxlength: 30,
    minlength: 2,
  },
  duration: {
    type: Number,
    require: true,
    maxlength: 30,
    minlength: 2,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
    maxlength: 30,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(:?(?:https?:\/\/)?(?:www\.)?)?[-a-z0-9]+\.\w/gi.test(v);
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(:?(?:https?:\/\/)?(?:www\.)?)?[-a-z0-9]+\.\w/gi.test(v);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(:?(?:https?:\/\/)?(?:www\.)?)?[-a-z0-9]+\.\w/gi.test(v);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movie",
    required: true,
  },
  nameRU: {
    type: String,
    require: true,
    maxlength: 30,
    minlength: 2,
  },
  nameEN: {
    type: String,
    require: true,
    maxlength: 30,
    minlength: 2,
  },
});
