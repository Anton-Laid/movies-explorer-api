// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith("Bearer ")) {
//     throw new UnauthorizedError("нет такого аккаунта");
//   }

//   const token = authorization.replace("Bearer ", "");
//   let payload;

//   try {
//     payload = jwt.verify(token, "super-strong-secret");
//   } catch (err) {
//     return next(new UnauthorizedError("нет автоизации"));
//   }

//   req.user = payload;

//   next();
// };
