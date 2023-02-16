const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

//fungsi untuk authentication
async function authenticate(username, password, done) {
  try {
    //memanggil method dari user.js
    const user = await User.authenticate({ username, password });
    return done(null, user);
  } catch (err) {
    return done(null, false, { message: err.message });
  }
}

passport.use(new LocalStrategy({ usernameField: "username", passwordField: "password" }, authenticate));

//serialize dan deserialize untuk membuat sesi dan menghapus sesi
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => done(null, await User.findByPk(id)));

//exports karena akan digunakan sebagai middleware
module.exports = passport;
