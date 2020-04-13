const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Product = require('../models/product')
const User = require('../models/user')
const Checkout = require('../models/user')
const requireAuth = require('../lib/requireAuth')

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
router.post('/select/:id', requireAuth, async (req, res, next) => {
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


// Delete route for user tto be able to delete products
// router.delete('/delete/:id', async (req, res, next) => {
//     try {
//       const foundUser = await User.findById(req.session.userId).populate('products')
//       //
//       // console.log("req.params.id");
//       // console.log(req.params.id);
//
//
//       // foundUser.products.forEach((product) => {
//       //   if (product.id == req.params.id) {
//       //     product.filter()
//         }
//         // product.filter(product => product.title !== 'Pikachu the detective	')
//       })
//       // console.log("here is the deleted products");
//       // console.log(product);
//
//
//       // if (foundUser.products.id == req.params.id) {
//       //   foundUser.products = function() {
//       //     foundUser.products.splice(foundUser.products.indexOf(foundUser.products), 1)
//       //   }
//       //
//       // }
//       // let products = foundUser.products
//       // products.filter(product => product.title !== 'Pikachu the detective	')
//       //
//       //   console.log("here is the first products");
//       // console.log(products);
//
//       // for (let i = 0; i < foundUser.products.len tgh; i++) {
//       //   if (foundUser.products[i].id == req.params.id) {
//       //
//       //     foundUser.products.splice(foundUser.products, 1)
//       //   }
//       // }
//       // console.log("here is the products");
//       // console.log(products)
//
//
//       // STILL WORKING ON IT -- TA HELP
//       // await foundUser.save()
//       //
//       // console.log("here is the foundUser product");
//       // console.log(foundUser);
//       // res.redirect('/checkouts/show')
//     }
//     catch (err) {
//         next (err)
//     }
// })

module.exports = router
