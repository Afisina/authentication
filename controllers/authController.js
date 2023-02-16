const { User } = require("../models");
const passport = require("../lib/passport");

module.exports = {
  register: (req, res, next) => {
    //panggil static method register yang sudah dibuat di create user
    User.register(req.body)
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => next(err));
  },
  login: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  whoami: (req, res) => {
    //req.user adalah instance dari User Model, hasil autentikasi dari passport
    res.render("profile", req.user.dataValues);
    successRedirect: "/whoami";
  },
};
