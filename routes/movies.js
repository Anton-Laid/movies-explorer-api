const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("get movie");
});
router.post("/", (req, res) => {
  res.send("post movie");
});
router.delete("/:_id", (req, res) => {
  res.send("del movie");
});

module.exports = router;
