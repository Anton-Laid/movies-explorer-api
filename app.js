const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const route = require("./routes/index");
const { requestLogger, errorLoger } = require("./middlewares/logger");

const { PORT = 3000 } = process.env;
const app = express();

//mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(route);
app.use(errorLoger);

app.get("/", function (req, res) {
  res.send("Hollo");
});

app.listen(PORT);
