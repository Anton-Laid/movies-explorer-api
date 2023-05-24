const { celebrate, Joi } = require("celebrate");

module.exports.profileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});
