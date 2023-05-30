const express = require("express");
const helmet = require("helmet");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const route = require("./routes/index");
const cors = require("./middlewares/cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { MSG_SERVER_NOW_FELL } = require("./utils/constants");
const errorHandler = require("./middlewares/errorHandler");
const { limiter } = require("./middlewares/rateLimit");
const { endpoint } = require("./utils/config");

const { PORT = 3000, NODE_ENV } = process.env;
const app = express();
app.use(helmet());

mongoose.connect(endpoint);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors);

if (NODE_ENV === "production") {
  app.use(limiter);
}
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error(MSG_SERVER_NOW_FELL);
  }, 0);
});

app.use(route);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT);
