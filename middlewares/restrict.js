module.exports = (req, res, next) => {
  //jika request berasal dari user yang terautentikasi maka akan lanjut menjalankan handler berikutnya
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};
