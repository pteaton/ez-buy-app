const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const User = require('../models/user')

// GET route -- /:id
router.get('/:id', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id)
    const productsToBeSoldByUser = await Product.find({ foundUser: req.params.id }).populate('user')
    console.log("here is show page for user")
    console.log(foundUser)
    console.log(productsToBeSoldByUser)
    res.render('users/show.ejs', {
      user: foundUser,
      products: productsToBeSoldByUser,
      userId: req.session.userId
    })

  } catch(err) {
    next(err)
  }
})

module.exports = router
