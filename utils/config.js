require("dotenv").config();

const { JWT_SECRET, NODE_ENV, MONGODB_PATH } = process.env;
const CURRENT_BD_ADRESS = "mongodb://127.0.0.1:27017/movies";
const endpoint = NODE_ENV === "production" ? MONGODB_PATH : CURRENT_BD_ADRESS;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  CURRENT_BD_ADRESS,
  endpoint,
};
