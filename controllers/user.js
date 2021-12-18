let User = require("../models/user");
let passport = require("passport");
const jwt = require("jsonwebtoken");

const config = require("../config/db");

function getErrorMessage(err) {
  console.log("===> Erro: " + err);
  let message = "";

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = "Username already exists";
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
}

module.exports.signup = function (req, res, next) {
  console.log(req.body);

  let user = new User(req.body);
  user.provider = "local";
  console.log(user);

  user.save((err) => {
    if (err) {
      let message = getErrorMessage(err);
      return res.json({ success: false, message: message });
    }
    return res.json({ success: true, message: "User created successfully!" });
  });
};

module.exports.signin = function (req, res, next) {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        return res.json({ success: false, message: err || info.message });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, config.SecretOrKey, {algorithm: 'HS512', expiresIn: 1900});

        return res.json({ success: true, token: token, userID: user._id });
      });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: error });
    }
  })(req, res, next);
};
