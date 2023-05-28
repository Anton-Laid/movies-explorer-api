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
  MSG_SAVE_MOVIE,
} = require("../utils/constants");

const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movies.find({ owner })
    .then((movies) => res.status(STATUS_OK).send(movies))
    .catch(next);
};

const createMovies = (req, res, next) => {
  Movies.create({
    owner: req.user._id,
    ...req.body,
  })
    .then((movie) => {
      res.status(STATUS_CREATED).send({ message: MSG_SAVE_MOVIE });
    })
    .catch((error) => {
      if (error.name === VALIDATION_ERROR) {
        return next(new BadRequestError(MSG_INCORRECT_DATA));
      }
      return next(error);
    });
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const UserId = req.user._id;

  Movies.findById(id)
    .orFail(new NotFoundError(MSG_INVALID_CARD_DATA))
    .then((movie) => {
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
