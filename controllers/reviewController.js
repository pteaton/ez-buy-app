const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Product = require('../models/product')
const User = require('../models/user')
const Review = require('../models/reviews')
const requireAuth = require('../lib/requireAuth')


// Create route for reviews
router.post('/:productId', async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body)
    const selectedProduct = await Product.findById(req.params.productId)


    selectedProduct.reviews.push(newReview)

    await selectedProduct.save()

    console.log('selectedProduct')
    console.log(selectedProduct);

    res.redirect('/products/' + selectedProduct.id)
  }
  catch (err) {
    next (err)
  }
})






module.exports = router
