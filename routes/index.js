const router = require("express").Router();
const user = require("./user");
const movies = require("./movies");

router.post("/signup", (req, res) => {
  res.send("register");
});
router.post("/signin", (req, res) => {
  res.send("log");
});
router.use("/users", user);
router.use("/movies", movies);

module.exports = router;
