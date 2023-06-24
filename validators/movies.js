const { celebrate, Joi } = require("celebrate");
const { LINK_PATTERN, OBJECT_ID_PATTERN } = require("../utils/constants");

module.exports.validateCreateMovies = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(LINK_PATTERN),
    trailerLink: Joi.string().required().pattern(LINK_PATTERN),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(LINK_PATTERN),
    movieId: Joi.number().required(),
  }),
});

module.exports.movieIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().pattern(OBJECT_ID_PATTERN),
  }),
});
