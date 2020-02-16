const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  //Check if token exist
  if (!token) {
    const err = new Error("No token, authorization denied");
    res.status(401);
    next(err);
  } else {
    try {
      //Verify token
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      res.status(400);
      next(err);
    }
  }
};

module.exports = auth;
