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

// GET route view account page -- /:id
router.get('/:userId/viewProfile', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    console.log("here is view account page for user")
    console.log(user)
    res.render('users/viewProfile.ejs', {
      user: user,
      userId: req.session.userId
    })

  } catch(err) {
    next(err)
  }
})




// GET route edit page
router.get('/:userId/updateProfile', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id)

    res.render('users/updateProfile.ejs', {
      user: foundUser,
      userId: req.session.useId
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
	const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

  console.log("updatedUser");
  console.log(updatedUser);
    res.render('users/viewProfile.ejs', {
      user: updatedUser,
      userId: req.session.userId
    })
  }
  catch (err) {
    next (err)
  }
})



module.exports = router
