const express = require('express')
const router = express.Router()
const fs = require('fs')
const Product = require('../models/product')
const User = require('../models/user')

// GET route show page for user's product -- /:id
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

// GET route view profile page -- /:id
router.get('/:userId/viewProfile', async (req, res, next) => {
  try {
    // find all products by user
    const foundProducts = await Product.find(req.params.id).populate('user')

    // find user here
    const user = await User.findById(req.params.userId)
    console.log("here is view account page for user")
    console.log(user)
    res.render('users/viewProfile.ejs', {
      user: user,
      products: foundProducts,
      userId: req.session.userId
    })

  } catch(err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const foundProducts = await Product.find({user: req.params.userId})
    console.log('Here is found products from user')
    console.log(foundProducts)

    for (const foundProduct of foundProducts) {
      fs.unlink(`./${foundProduct.productImage}`, (err) => {
        if (err) throw err;
      });
    } // forLoop for fs

    const deletedProducts = await Product.remove({ user: req.params.userId })
    const deletedUser = await User.findOneAndRemove(req.params.userId)
    await req.session.destroy()
    console.log('here is the deleted product')
    console.log(deletedProducts)
    res.redirect('/auth/signup')
  }
  catch (err) {
    next (err)
  }
})


// GET route edit page
router.get('/:userId/updateProfile', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.userId)

    res.render('users/updateProfile.ejs', {
      user: foundUser,
      userId: req.session.userId
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
	const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true})

  req.session.message = "Profile has been updated"
  res.redirect('/products')
    }
    catch (err) {
      next (err)
    }
})



module.exports = router
