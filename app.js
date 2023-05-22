const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const route = require("./routes/index");
const cors = require("./middlewares/cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const NotFoundError = require("./errors/NotFoundError");
const {
  ERROR_SERVER,
  MSG_PAGE_NOT_FOUND,
  MSG_DEFAULT,
} = require("./utils/constants");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/movies");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.use(route);

app.use((req, res, next) => {
  next(new NotFoundError(MSG_PAGE_NOT_FOUND));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = ERROR_SERVER, message } = err;

  res.status(statusCode).send({
    message: statusCode === ERROR_SERVER ? MSG_DEFAULT : message,
  });
});

app.listen(PORT);
