const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Product = require('../models/product')
const User = require('../models/user')

// Get show route for checkout
// router.get('/show', async (req, res, next) => {
//   res.render('checkouts/show.ejs', {
//     userId: req.session.userId
//   })
// })


router.get('/show', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.session.userId).populate('products')

    console.log("Here is the foundUser at checkout/show")
    console.log(foundUser);

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

    console.log("FoundUserATCheckout");
    console.log(findUser);

      console.log("All the findSellerProducts by User")
      console.log(findAllSelectedProducts)
      findUser.products.push(findAllSelectedProducts)

      await findUser.save()

      console.log('Here is checkout user route')
      console.log(findUser)
      res.redirect('/products')
  }
  catch (err) {
      next (err)
  }
})


module.exports = router
