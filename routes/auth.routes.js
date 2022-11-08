const express = require('express')
const router = express.Router()
<<<<<<< HEAD
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const saltRounds = 10
const User = require('../models/User.model')
=======


// ℹ️ Handles password encryption
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10

// Require the User model in order to interact with the database
const User = require('../models/User.model')

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
>>>>>>> 22e7e0d (Go one folder up)
const isLoggedOut = require('../middleware/isLoggedOut')
const isLoggedIn = require('../middleware/isLoggedIn')


// GET /auth/signup
router.get('/signup', isLoggedOut, (req, res) => {
  res.render('auth/signup')
})

// POST /auth/signup
router.post('/signup', isLoggedOut, (req, res) => {
<<<<<<< HEAD
  const { username, password } = req.body
  
// Check that username, email, and password are provided
if (username === '' || password === '') {
=======
  console.log("hello",req.body)
  const { username, password } = req.body

  // Check that username, email, and password are provided
  if (username === '' || password === '') {
>>>>>>> 22e7e0d (Go one folder up)
    res.status(400).render('auth/signup', {
      errorMessage: 'All fields are mandatory. Please provide your username, email and password.',
    })

<<<<<<< HEAD
return
}
=======
    return
  }
>>>>>>> 22e7e0d (Go one folder up)

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

<<<<<<< HEAD
  // Search the database for a user 
  User.findOne({ username }).then(found => {
  // username already taken
    if (found) {
      return res.status(400).render('auth/signup', { errorMessage: 'Username already taken.' })
    } else {
  // create a new user with hashing the password
=======
  // Search the database for a user with the username submitted in the form
  User.findOne({ username }).then(found => {
    // If the user is found, send the message username is taken
    if (found) {
      return res.status(400).render('auth/signup', { errorMessage: 'Username already taken.' })
    }

    // if user is not found, create a new user - start with hashing the password
>>>>>>> 22e7e0d (Go one folder up)
    return bcrypt
      .genSalt(saltRounds)
      .then(salt => bcrypt.hash(password, salt))
      .then(hashedPassword => {
<<<<<<< HEAD
        // Create a user and save it in DB
=======
        // Create a user and save it in the database
>>>>>>> 22e7e0d (Go one folder up)
        return User.create({
          username,
          password: hashedPassword,
        })
      })
      .then(user => {
<<<<<<< HEAD
      
=======
        // Bind the user to the session object
>>>>>>> 22e7e0d (Go one folder up)
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
<<<<<<< HEAD
    }
  })
});
=======
  })
})
>>>>>>> 22e7e0d (Go one folder up)

// GET /auth/login
router.get('/login', isLoggedOut, (req, res) => {
  res.render('auth/login')
<<<<<<< HEAD
});
=======
})
>>>>>>> 22e7e0d (Go one folder up)


// POST /auth/login
router.post('/login', isLoggedOut, (req, res, next) => {
  const { username, password } = req.body

  if (!username) {
    return res.status(400).render('auth/login', { errorMessage: 'Please provide your username.' })
  }

<<<<<<< HEAD
=======
  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
 /*  if (password.length < 8) {
    return res
      .status(400)
      .render('auth/login', {
        errorMessage: 'Your password needs to be at least 8 characters long.',
      })
  } */
>>>>>>> 22e7e0d (Go one folder up)

  // Search the database for a user with the username submitted in the form
  User.findOne({ username: username})
    .then(user => {
<<<<<<< HEAD
      // user isn't found
=======
      // If the user isn't found, send an error message that user provided wrong credentials
>>>>>>> 22e7e0d (Go one folder up)
      if (!user) {
        return res.status(400).render('auth/login', { errorMessage: 'Wrong credentials.' })
      }

<<<<<<< HEAD
      //  check password matches and saved in the database
=======
      // If user is found based on the username, check if the in putted password matches the one saved in the database
>>>>>>> 22e7e0d (Go one folder up)
      bcrypt.compare(password, user.password).then(isSamePassword => {
        if (!isSamePassword) {
          return res.status(401).render('auth/login', { errorMessage: 'Wrong credentials.' })
        }
<<<<<<< HEAD
        req.session.user = user;
=======

        req.session.user = user
        // req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
>>>>>>> 22e7e0d (Go one folder up)
        return res.redirect('/auth/profile')
      })
    })

    .catch(err => {
<<<<<<< HEAD
      next(err)
      return res.status(500).render("auth/login", { errorMessage: err.message });
=======
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err)
      // return res.status(500).render("auth/login", { errorMessage: err.message });
>>>>>>> 22e7e0d (Go one folder up)
    })
})

router.get("/profile", (req, res) => {
<<<<<<< HEAD
  console.log("hey", req.session);
=======
  console.log("HEY",req.session);
>>>>>>> 22e7e0d (Go one folder up)
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
