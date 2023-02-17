const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User, Admin } = require("../models");
const admin = require("../models/admin");

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

//Passport JWT Options
const options = {
  //untuk mengekstrak JWT dari request, dan mengambil tokennya dari header yang bernama Authorization
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),

  /*harus sama seperti dengan apa yang dimasukkan sbg parameter kedua dari jwt.sign di Admin Model.
  Ini yang dipakai untuk memverifikasi apakah tokennya dibuat oleh sistem ini*/
  secretOrKey: "Ini rahasia ga boleh disebar-sebar",
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    //payload adalah hasil terjemahan JWT, sesuai dengan apa yg  dimasukkan di parameter pertama di jwt.sign
    User.findByPk(payload.id)
      .then((admin) => done(null, admin))
      .catch((err) => done(err, false));
  })
);

//exports karena akan digunakan sebagai middleware
module.exports = passport;
