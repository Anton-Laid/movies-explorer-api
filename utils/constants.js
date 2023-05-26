const STATUS_OK = 200;
const STATUS_CREATED = 201;
const ERROR_SERVER = 500;
const USER_NOT_UNIQUE_ERROR = 11000;

const OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/;
const LINK_PATTERN =
  /https?:\/\/(www\.)?[\w-@:%.\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([\w-.~:/[?%#@!\]$&'()*+,;=]*)/;

const VALIDATION_ERROR = "ValidationError";
const CAST_ERROR = "CastError";

const MSG_REGISTERED_USER_EMAIL = "Пользователь уже зарегистрирован";
const MSG_UPDATE_USERS_DATA = "Невозможно обновить данные пользователя";
const MSG_USER_UNAUTHORIZED = "Неверная почта или пароль";
const MSG_INVALID_CARD_DATA = "Фильм не найден";
const MSG_INCORRECT_DATA = "Некорректные данные";
const MSG_FORBIDDEN = "Невозможно удалить фильм";
const MSG_INVALID_LINK_FORMAT = "Неверный формат ссылки";
const MSG_PAGE_NOT_FOUND = "Страница не найтена";
const MSG_DEFAULT = "На сервере произошла ошибка";
const MSG_AUTHORIZATION_REQUIRED = "Необходима авторизация";
const MSG_NOT_YOUR_OWN_CARD = "У вас нет прав на удаление этого фильма";
const MSG_INVALID_DATA = "Переданы некорректные данные пользователя";
const MSG_EMAIL_DUPLICATION = "Такая почта уже зарегистрирована";
const MSG_SERVER_NOW_FELL = "Сервер сейчас упадёт";
const MSG_REQUESTED_USER_NOT_FOUND = "Запрашиваемый пользователь не найден";
const MSG_MOVIE_DELETE = "Фильм удален";
const MSG_AUTHORIZATION_OK = "Вы успешно авторизовались";
const MSG_EXIT_USER = "Вы вышли из аккаунта";
const MSG_TOKEN_NOT_TEST = "токен не прошел проверку";

module.exports = {
  MSG_TOKEN_NOT_TEST,
  MSG_EXIT_USER,
  MSG_AUTHORIZATION_OK,
  MSG_MOVIE_DELETE,
  MSG_REQUESTED_USER_NOT_FOUND,
  STATUS_OK,
  STATUS_CREATED,
  OBJECT_ID_PATTERN,
  LINK_PATTERN,
  ERROR_SERVER,
  MSG_REGISTERED_USER_EMAIL,
  MSG_UPDATE_USERS_DATA,
  MSG_USER_UNAUTHORIZED,
  VALIDATION_ERROR,
  CAST_ERROR,
  MSG_INVALID_CARD_DATA,
  MSG_INCORRECT_DATA,
  MSG_FORBIDDEN,
  MSG_INVALID_LINK_FORMAT,
  MSG_PAGE_NOT_FOUND,
  MSG_DEFAULT,
  MSG_AUTHORIZATION_REQUIRED,
  MSG_NOT_YOUR_OWN_CARD,
  MSG_INVALID_DATA,
  USER_NOT_UNIQUE_ERROR,
  MSG_EMAIL_DUPLICATION,
  MSG_SERVER_NOW_FELL,
};
