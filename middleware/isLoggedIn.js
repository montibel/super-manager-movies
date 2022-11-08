module.exports = (req, res, next) => {
<<<<<<< HEAD
=======
  // checks if the user is logged in when trying to access a specific page
>>>>>>> 22e7e0d (Go one folder up)
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }

  next();
};
