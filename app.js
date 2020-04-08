require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

// db connection
require('./db/db')


// Middleware
app.use(express.static('public'))


// Controllers
const authController = require('./controllers/authController')
app.use('/auth', authController)



// Get route for home
app.get('/', (req, res) => {
  res.render('home.ejs')
})









app.listen(PORT, () => {
  const date = new Date()
  console.log(`Time is ${date.toLocaleString()} and server is running on ${PORT}`);
})
