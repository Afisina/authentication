const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("express-flash");
const { PORT = 8000 } = process.env;

//1. setting request body parser-> harus di paling atas
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//2. setting session handler
app.use(
  session({
    secret: "Buat ini jadi rahasia",
    resave: false,
    saveUninitialized: false,
  })
);

//3. setting passport (sebelum router dan view engine)
const passport = require("./lib/passport");
app.use(passport.initialize());
app.use(passport.session());

//4. setting flash
app.use(flash());

//5. setting view engine
app.set("view engine", "ejs");

//6. setting router
const router = require("./router");
app.use(router);
app.listen(PORT, () => {
  console.log(`Server nyala di port ${PORT}`);
});
