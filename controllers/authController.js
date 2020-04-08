const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')



router.get('/signup', (req, res) => {
    res.render('auth/signup.ejs')
})

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
            req.session.username = createdUser.username
            req.session.message = `Thanks for signing up, ${createdUser.username}`
            res.redirect('/')
        }
    } catch (err) {
        next(err)
    }
})




module.exports = router