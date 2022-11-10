// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

const app = express()
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)

const capitalize = require('./utils/capitalize')
const projectName = 'super-manager-movies'

app.locals.appTitle = `${capitalize(projectName)}`

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes')
app.use('/', indexRoutes)

const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

const moviesRoutes = require('./routes/movies.routes')
app.use('/movies', moviesRoutes)


  

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app


