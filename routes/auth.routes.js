const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const saltRounds = 10
const User = require('../models/User.model')
const isLoggedOut = require('../middleware/isLoggedOut')
const isLoggedIn = require('../middleware/isLoggedIn')


// GET /auth/signup
router.get('/signup', isLoggedOut, (req, res) => {
  res.render('auth/signup')
})

// POST /auth/signup
router.post('/signup', isLoggedOut, (req, res) => {
  const { username, password } = req.body
  res.redirect('/auth/login')
  
// Check that username, email, and password are provided
if (username === '' || password === '') {
    res.status(400).render('auth/signup', {
      errorMessage: 'All fields are mandatory. Please provide your username, email and password.',
    })

return
}

 /*  if (password.length < 6) {
    res.status(400).render('auth/signup', {
      errorMessage: 'Your password needs to be at least 6 characters long.',
    }) */

  /*   return
  } */

  //   ! This regular expression checks password for special characters and minimum length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(400)
      .render("auth/signup", {
        errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
    });
    return;
  }
  */

  // Search the database for a user 
  User.findOne({ username }).then(found => {
  // username already taken
    if (found) {
      return res.status(400).render('auth/signup', { errorMessage: 'Username already taken.' })
    } else {
  // create a new user with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then(salt => bcrypt.hash(password, salt))
      .then(hashedPassword => {
        // Create a user and save it in DB
        return User.create({
          username,
          password: hashedPassword,
        })
      })
      .then(user => {
      
        /* req.session.user = user */
        res.redirect('/')
      })
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(401).render('auth/signup', { errorMessage: error.message })
        }
        if (error.code === 11000) {
          return res
            .status(402)
            .render('auth/signup', {
              errorMessage: 'Username need to be unique. The username you chose is already in use.',
            })
        }
        return res.status(500).render('auth/signup', { errorMessage: error.message })
      })
    }
  })
});

// GET /auth/login
router.get('/login', isLoggedOut, (req, res) => {
  res.render('auth/login')
});


// POST /auth/login
router.post('/login', isLoggedOut, (req, res, next) => {
  const { username, password } = req.body

  if (!username) {
    return res.status(400).render('auth/login', { errorMessage: 'Please provide your username.' })
  }


  // Search the database for a user with the username submitted in the form
  User.findOne({ username: username})
    .then(user => {
      // user isn't found
      if (!user) {
        return res.status(400).render('auth/login', { errorMessage: 'Wrong credentials.' })
      }

      //  check password matches and saved in the database
      bcrypt.compare(password, user.password).then(isSamePassword => {
        if (!isSamePassword) {
          return res.status(401).render('auth/login', { errorMessage: 'Wrong credentials.' })
        }
        req.session.user = user;
        return res.redirect('/auth/profile')
      })
    })

    .catch(err => {
      next(err)
      return res.status(500).render("auth/login", { errorMessage: err.message });
    })
})

router.get("/profile", (req, res) => {
  console.log("hey", req.session);
  res.render('auth/profile', {user: req.session.user});
})

// GET /auth/logout
router.get('/logout', isLoggedIn, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(501).render('auth/logout', { errorMessage: err.message })
      return
    }

    res.redirect('/auth/logout')
  })
})

module.exports = router
