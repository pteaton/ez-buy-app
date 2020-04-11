const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Product = require('../models/product')
const User = require('../models/user')

// Get show route for checkout
router.get('/show', async (req, res, next) => {
  res.render('checkouts/show.ejs', {
    userId: req.session.userId
  })
})

// display all the product of the current user




module.exports = router
