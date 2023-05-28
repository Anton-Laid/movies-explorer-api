const router = require("express").Router();
const {
  getMovies,
  createMovies,
  deleteMovie,
} = require("../controllers/movies");

const {
  validateCreateMovies,
  movieIdValidator,
} = require("../validators/movies");

router.get("/", getMovies);
router.post("/", validateCreateMovies, createMovies);
router.delete("/:id", movieIdValidator, deleteMovie);

module.exports = router;
