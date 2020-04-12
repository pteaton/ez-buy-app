const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Product = require('../models/product')
const User = require('../models/user')
const Checkout = require('../models/user')


// Get show route for checkout
router.get('/show', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.session.userId).populate('products')

    res.render('checkouts/show.ejs', {
      user: foundUser,
      userId: req.session.userId
    })
}
catch (err) {
  next (err)
  }
})


// display all the product of the current user
router.post('/select/:id', async (req, res, next) => {
  try {
    const findUser = await User.findById(req.session.userId)
    const findAllSelectedProducts = await Product.findById(req.params.id) //.populate('user')

      findUser.products.push(findAllSelectedProducts)

      await findUser.save()

      res.redirect('/products')
  }
  catch (err) {
      next (err)
  }
})

// Get route for Checkout thank you page
router.get('/thankyou', async (req, res, next) => {
try {
   res.render('checkouts/thankyou.ejs', {
     userId: req.session.userId
   })

}
catch (err) {
  next (err)
}
})

// Post route for thankyou when user complets the purchase
router.post('/thankyou', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.session.userId).populate('products')

    console.log("here is all the found product to delete")

    foundUser.products = []

    await foundUser.save()
    console.log(foundUser);
    res.redirect('/checkouts/thankyou')
  }

  catch (err) {
      next (err)
  }
})

module.exports = router
