const router = require("express").Router();
const user = require("./user");
const movies = require("./movies");
const { createUsers, login } = require("../controllers/users");
const { signupValidator } = require("../validators/signup-validator");
const { signinValidator } = require("../validators/signin-validator");
const auth = require("../middlewares/auth");

router.post("/signup", signupValidator, createUsers);
router.post("/signin", signinValidator, login);
router.use(auth);
router.use("/users", user);
router.use("/movies", movies);

module.exports = router;
