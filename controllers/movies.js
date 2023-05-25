const Movies = require("../modules/movie");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");

const {
  STATUS_CREATED,
  VALIDATION_ERROR,
  MSG_INVALID_CARD_DATA,
  MSG_INCORRECT_DATA,
  STATUS_OK,
  MSG_MOVIE_DELETE,
  MSG_NOT_YOUR_OWN_CARD,
} = require("../utils/constants");

const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movies.find({ owner })
    .then((movies) => res.status(STATUS_OK).send(movies))
    .catch(next);
};

const createMovies = (req, res, next) => {
  const owner = req.user._id;

  Movies.create({
    owner,
    ...req.body,
  })
    .then((movie) => {
      res.status(STATUS_CREATED).send(movie);
    })
    .catch((error) => {
      if (error.name === VALIDATION_ERROR) {
        return next(new BadRequestError(MSG_INCORRECT_DATA));
      }
      return next(error);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const UserId = req.user._id;

  Movies.findById(movieId)
    .then((movie) => {
      if (!movie) next(new NotFoundError(MSG_INVALID_CARD_DATA));
      const idOwner = movie.owner.toString();

      if (UserId !== idOwner) {
        throw new ForbiddenError(MSG_NOT_YOUR_OWN_CARD);
      }

      if (UserId === idOwner) {
        Movies.deleteOne({ _id: movie.id }).then(() =>
          res.status(STATUS_OK).send({ message: MSG_MOVIE_DELETE })
        );
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovies,
  deleteMovie,
};
