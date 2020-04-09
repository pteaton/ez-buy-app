// const express = require('express')
// const router = express.Router()
// const Product = require('../models/product')
// const User = require('../models/user')
//
// // GET /users/:userId/products
// router.get('/:userId/products', async (req, res, next) => {
//   try {
//     const productsToBeSoldByUser = await Product.find({ user: req.params.userId }).populate('user')
//     const user = await User.findById(req.params.userId)
//
//     res.render('users/productDisplay.ejs', {
//       username: username,
//       products: productsToBeSoldByUser,
//       userId: user.id
//     })
//
//   } catch(err) {
//     next(err)
//   }
// })
//
// module.exports = router
