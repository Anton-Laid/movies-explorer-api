const { celebrate, Joi } = require("celebrate");
const { LINK_PATTERN } = require("../utils/constants");

module.exports.validateCreateMovies = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number().required(),
    year: Joi.string().min(2).max(4).required(),
    description: Joi.string().min(1).max(5000).required(),
    image: Joi.string().pattern(LINK_PATTERN).required(),
    trailer: Joi.string().pattern(LINK_PATTERN).required(),
    thumbnail: Joi.string().pattern(LINK_PATTERN).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().min(2).max(30).required(),
    nameEN: Joi.string().min(2).max(30).required(),
  }),
});
