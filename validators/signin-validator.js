const { celebrate, Joi } = require("celebrate");

module.exports.signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});
