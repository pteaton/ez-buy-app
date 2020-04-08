const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

const Product = require('../models/product')

// new route
router.get('/new', (req, res) => {
  res.render('products/new.ejs')
})


router.post('/', upload.single('productImage'), async (req, res, next) => {

  console.log(req.file);
  try {

  } catch (e) {
    next (e)
  }
})









module.exports = router
