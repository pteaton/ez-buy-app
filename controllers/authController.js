const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


// route to signup
router.get('/signup', (req, res) => {
    res.render('auth/signup.ejs', {
      userId: req.session.userId
    })
})

// specify route to signup
router.post('/signup', async (req, res, next) => {
    try {
        const createdUsername = req.body.username
        const createdPassword = req.body.password

        // if username already exists
        const userWithThisUsername = await User.findOne({
            username: createdUsername
        })

        // if username is already taken
        if (userWithThisUsername) {
            req.session.message = `Username ${createdUsername} already taken.`
            res.redirect('/auth/signup')
        }

        // else aka user name is available
        else {
            const ingredient = bcrypt.genSaltSync(10)
            const securedPassword = bcrypt.hashSync(createdPassword, ingredient)

            // create user
            const createdUser = await User.create({
                username: createdUsername,
                password: securedPassword
            })

            req.session.loggedIn = true
            req.session.userId = createdUser._id
            res.session.userId = userId
            req.session.username = createdUser.username
            req.session.message = `Thanks for signing up, ${createdUser.username}`
            res.redirect('/')
        }
    } catch (err) {
        next(err)
    }
})

// route to log in
router.get('/login', (req, res) => {
    res.render('auth/login.ejs')
})

// specify route to log in
router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        })

        // if user does not exist
        if (!user) {
          console.log(user);
            req.session.message = "Username or Password is invalid"
            res.redirect('/auth/login')
        }
        else {
          const ifUserInfoIsValid = bcrypt.compareSync(req.body.password, user.password)

          if (ifUserInfoIsValid) {
            req.session.loggedIn = true
            req.session.userId = user.id
            req.session.username = user.username
            req.session.message = `Welcome back ${user.username}, What do you want to buy?`

            // remmeber to redirect on the profuct's home page
            res.redirect('/products')
          }
          else  {
            req.session.message = `Username or Password is not correct.`
            res.redirect('/auth/login')
          }

        }

    }
    catch (err) {
        next(err)
    }
})


router.get('/logout', async (req, res) => {
  await req.session.destroy()
  res.redirect('/auth/login')
})



module.exports = router
