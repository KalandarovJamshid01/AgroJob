const jwt = require("jsonwebtoken");

const error = require("./controller/errorController");
const AppError = require("./utility/appError");
module.exports = verifyToken = async (req, res, next) => {
  const userToken = req.cookies.token;
  if (!userToken) {
    return next(new AppError("You are not login", 404));
  }
  await jwt.verify(userToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(error(403, "Token is invallid"));
    }
    req.user = user;
    next();
  });
};
