// Dependencies
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')
const PORT = process.env.PORT

// Database Connection
require('./db/db')



// Middleware
app.use(express.static('public'))

// uploads folder for productsImage
app.use('/uploads', express.static('uploads'))

// Body-Parser
app.use(bodyParser.urlencoded({ extended: false }))

// Method-Override
app.use(methodOverride('_method'))

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))


// Session contd.
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn
  res.locals.username = req.session.username
  res.locals.message = req.session.message
  req.session.message = undefined
  next()
})

// Controllers
const authController = require('./controllers/authController')
app.use('/auth', authController)
const productController = require('./controllers/productController')
app.use('/products', productController)


// Get route for home
app.get('/', (req, res) => {
  res.render('home.ejs')
})


// 404 page
app.get('*', (req, res) => {
  res.status(404).render('404.ejs')
})




app.listen(PORT, () => {
  const date = new Date()
  console.log(`Time is ${date.toLocaleString()} and server is running on ${PORT}`);
})
