const { Admin } = require("../models");

function format(admin) {
  const { id, username } = admin;
  return {
    id,
    username,
    accessToken: admin.generateToken(),
  };
}

module.exports = {
  register: (req, res, next) => {
    //panggil static method register yang sudah dibuat di create user
    Admin.register(req.body)
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        res.status(401).json({ error: err });
      });
  },
  login: (req, res) => {
    console.log(req.body);
    Admin.authenticate(req.body)
      .then((admin) => {
        res.json(format(admin));
      })
      .catch((err) => {
        res.status(401).json({ error: err.message });
      });
  },
  whoami: (req, res) => {
    const currentAdmin = req.admin;
    res.json(currentAdmin);
  },
};
