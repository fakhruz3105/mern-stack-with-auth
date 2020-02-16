const { Router } = require("express");
const router = Router();
const User = require("../../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/Auth");

//@route          GET /api/users
//@description    add new user
//@access         public
router.get("/", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//@route          POST /api/users/register
//@description    add new user
//@access         public
router.post("/register", async (req, res, next) => {
  //Destructure req body
  const { name, email, password, password2 } = req.body;

  //All fields are required || later remove this, validation will be done at frontend
  if (!name || !email || !password) {
    const err = new Error("All fields are required");
    res.status(400);
    next(err);
  } else if (password !== password2) {
    const err = new Error("Password does not match");
    res.status(400);
    next(err);
  }

  //Find if user already registered
  try {
    const user = await User.findOne({ email });
    if (user) {
      const err = new Error("User already existed");
      res.status(409); //409 status code for conflicting data in server
      // res.json({ message: "User already existed" })
      next(err);
    } else {
      //Hashing password using bcryptjs
      //Generate salt first
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        //Hashing password using generated salt
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          if (err) throw err;
          //Password hashed
          req.body.password = hash;

          //New user with hashed password saved into database
          const { id, name, email } = await User.create(req.body);
          jwt.sign(
            { id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id,
                  name,
                  email
                }
              });
            }
          );
        });
      });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(422);
    }
    next(err);
  }
});

//@route          POST /api/users/login
//@description    authenticate user
//@access         public
router.post("/login", async (req, res, next) => {
  //Destructure req body
  const { email, password } = req.body;

  //All fields are required || later remove this, validation will be done at frontend
  if (!email || !password) {
    const err = new Error("All fields are required");
    res.status(400);
    // res.json({ message: "All fields are required" });
    next(err);
  }

  //Find if user exist
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("User does not exist");
      res.status(400);
      next(err);
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        const err = new Error("Invalid credentials");
        res.status(400);
        next(err);
      } else {
        jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          }
        );
      }
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(422);
    }
    next(err);
  }
});

module.exports = router;
