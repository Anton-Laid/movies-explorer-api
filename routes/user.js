const router = require("express").Router();
const { getCurrentUser, updataUser } = require("../controllers/users");
const { profileValidator } = require("../validators/users");

router.get("/me", getCurrentUser);
router.patch("/me", profileValidator, updataUser);

module.exports = router;
