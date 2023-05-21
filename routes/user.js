const router = require("express").Router();

router.get("/me", (req, res) => {
  res.send("get user");
});
router.patch("/me", (req, res) => {
  res.send("pathc user");
});

module.exports = router;
