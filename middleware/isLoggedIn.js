const CustomError = require("../errors/CustomError");

const isLoggedIn = (req, res, next) => {
  const userAuth = req.userAuth;
  if (!userAuth) {
    const err = new CustomError('You are not logged in', 401);
    
    return next(err);
  }
  next();
}

module.exports = isLoggedIn;
