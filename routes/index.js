const router = require("express").Router();
const user = require("./user");
const movies = require("./movies");
const { createUsers, login } = require("../controllers/users");
const { signupValidator } = require("../validators/signup-validator");
const { signinValidator } = require("../validators/signin-validator");
const auth = require("../middlewares/auth");
const NotFoundError = require("../errors/NotFoundError");
const { MSG_PAGE_NOT_FOUND } = require("../utils/constants");
const { logout } = require("../controllers/users");

router.post("/signup", signupValidator, createUsers);
router.post("/signin", signinValidator, login);

router.use(auth);

router.use("/users", user);
router.use("/movies", movies);

router.post("/signout", logout);

router.use((req, res, next) => {
  next(new NotFoundError(MSG_PAGE_NOT_FOUND));
});

module.exports = router;
