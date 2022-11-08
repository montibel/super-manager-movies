module.exports = (req, res, next) => {
<<<<<<< HEAD
=======
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
>>>>>>> 22e7e0d (Go one folder up)
  if (req.session.currentUser) {
    return res.redirect("/auth/loginout");
  }
  next();
};
