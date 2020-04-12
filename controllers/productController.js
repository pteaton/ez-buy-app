const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const Product = require('../models/product')
const User = require('../models/user')
const requireAuth = require('../lib/requireAuth')

// MULTER CONFIGURATION
// Saving image and uploading image using multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

// Filter by image size/file type
const fileFilter = (req, file, cb) => {

  //if the filetype is not right
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
}
const upload =  multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})



// Get home route
router.get('/', async (req, res, next ) => {
  try {

    const findProducts = await Product.find().populate('user')

    console.log("here is product find route");
    console.log(findProducts);
    res.render('products/home.ejs', {
      products: findProducts,
      userId: req.session.userId
    })
  } catch (err) {
    next (err)
  }
})

// New route
router.get('/new', (req, res) => {

  res.render('products/new.ejs', {
    userId: req.session.userId
  })
})

// show from GET route log in
router.get('/:id', async (req, res, next) => {
  try {
    const foundProduct = await Product.findById(req.params.id).populate('user').populate('reviews')
    console.log("here is product from show route")
    console.log(foundProduct)
    console.log(req.session);
    res.render('products/show.ejs', {
      product: foundProduct,
      userId: req.session.userId
    })
  }
  catch(err) {
    next(err)
  }

})

// POST route -- product image create route
router.post('/', upload.single('productImage'), async (req, res, next) => {

  try {

    // define user here
    let currentUser = await User.findById( req.session.userId )
    console.log("Here is the current user")
    console.log(currentUser);

    const createNewProduct = ({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      user: currentUser,
      productImage: req.file.path

    })
    if (req.session.loggedIn == true) {
      const createdNewProduct = await Product.create(createNewProduct)
      console.log("here is product created");
      console.log(createNewProduct);
      res.locals.message = `Product was added.`
      res.redirect('/products')
    }
    else {
      res.locals.message = `Please log in first to add photos`
      res.redirect('/auth/login')
    }
  }
  catch (err) {
    next (err)
  }
})


// Delete route
router.delete('/:id', async (req, res, next) => {
  try {
      const foundProduct = await Product.findById(req.params.id)

    fs.unlink(`./${foundProduct.productImage}`, (err) => {
      if (err) throw err;
    });

    const deletedProduct = await Product.findByIdAndRemove(req.params.id)
    console.log('here is the deleted product')
    console.log(deletedProduct)
    res.redirect('/products')
  }
  catch(err) {
    next(err)
  }
})

// GET route -- edit route
router.get('/:id/edit', async (req, res, next) => {
  try {
    const editedProduct = await
    Product.findById(req.params.id)
    console.log(editedProduct)
    res.render('products/edit.ejs', {
      product: editedProduct,
      userId: req.session.userId
    })
  }
  catch(err) {
    next(err)
  }
})

// Router - update routes
router.put('/:id',upload.single('productImage'), async (req, res, next) => {
  try {
    const updatedProduct = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      productImage: req.file.path
    }

    const productToBeUpdated = await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true })
      console.log(productToBeUpdated);
      res.redirect('/products')
    }
    catch (err) {
      next (err)
    }

  })


//
// router.get('/checkouts/show', async (req, res, next) => {
//   try {
//     const findAllSelectedProducts = await Product.find({ user: req.session.userId }).populate('user')
//
//     res.render('checkouts/show.ejs', {
//       products: findAllSelectedProducts,
//       userId: req.session.userId
//     })
//   } catch (e) {
//     next (e)
//   }
// })

// find specific product selected by user -- need buy button
// router.put('/select/:id',requireAuth, async (req, res, next) => {
//   try {
//
//     console.log("Here is product id for item being bought")
//     const findUser = await User.findById(req.session.userId)
//     const selectedProduct = await Product.findByIdAndUpdate(req.params.id, {user: findUser._id})
//     console.log(req.params.id)
//
//     console.log(req.session)
//     console.log("here is the checkout user info")
//     console.log(selectedProduct)
//     res.redirect('/products')
//   }
//   catch(err) {
//     next (err)
//   }
//
// })


// Complete purchase route
// router.post('/checkouts/show', async (res, req, next) => {
//   try {
//       // const findAllSelectedProducts = await Product.remove({ user: req.session.userId }).populate('user')
//
//     res.redirect('/products/checkouts/thankyou')
//   }
//   catch (err) {
//       next (err)
//   }
// })


module.exports = router
