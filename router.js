const router = require("express").Router();

//controllers
const auth = require("./controllers/authController");
const jwtauth = require("./controllers/jwtauthController");
const restrict = require("./middlewares/restrict");

//homepage
router.get("/", (req, res) => res.render("index"));

//register page
router.get("/register", (req, res) => res.render("register"));
router.post("/register", auth.register);
router.post("/api/v1/auth/register", jwtauth.register);

//login page
router.get("/login", (req, res) => res.render("login"));
router.post("/login", auth.login);
router.get("/whoami", restrict, auth.whoami);
router.post("/whoami", auth.whoami);
router.post("/api/v1/auth/login", jwtauth.login);

module.exports = router;
