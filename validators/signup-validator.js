const { celebrate, Joi } = require("celebrate");

module.exports.signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2).max(30),
    name: Joi.string().required().min(2).max(30),
  }),
});
