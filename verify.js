const jwt = require("jsonwebtoken");

const error = require("./controller/errorController");
module.exports = verifyToken = async (req, res, next) => {
  const userToken = req.cookies.token;
  if (!userToken) {
    return next(error(401, "You are not login"));
  }
  console.log(req.cookies, "scscsc");
  await jwt.verify(userToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(error(403, "Toke is invallid"));
    }
    req.user = user;
    next();
  });
};
