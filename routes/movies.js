const router = require("express").Router();
const {
  getCards,
  createMovies,
  deleteMovie,
} = require("../controllers/movies");

const { validateCreateMovies } = require("../validators/movies");

router.get("/", getCards);
router.post("/", validateCreateMovies, createMovies);
router.delete("/:movieId", deleteMovie);

module.exports = router;
