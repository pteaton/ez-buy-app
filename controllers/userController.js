const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const User = require('../models/user')

// GET route show page -- /:id
router.get('/:userId/products', async (req, res, next) => {
  try {
    const productsToBeSoldByUser = await Product.find({ user: req.params.userId }).populate('user')
    const user = await User.findById(req.params.userId)
    console.log("here is show page for user")
    console.log(user)
    console.log(productsToBeSoldByUser)
    res.render('users/show.ejs', {
      user: user,
      products: productsToBeSoldByUser,
      userId: user.id
    })

  } catch(err) {
    next(err)
  }
})

module.exports = router

GET route edit page
router.get('/:userId/edit', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id)
    // const currentUser = req.session.userId
    // const session = req.session

    messageToDisplay = req.session.message
    res.render('user/edit.ejs', {
      user: foundUser,
      userId: req.session.userId
    })
  } catch (error) {
    next(error)
  }
})