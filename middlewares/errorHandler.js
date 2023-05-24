const { ERROR_SERVER, MSG_DEFAULT } = require("../utils/constants");

module.exports = (err, req, res, next) => {
  const { statusCode = ERROR_SERVER, message } = err;

  res.status(statusCode).send({
    message: statusCode === ERROR_SERVER ? MSG_DEFAULT : message,
  });
};
