const express = require('express')
const router = express.Router()
const multer = require('multer')
const Product = require('../models/product')
const requireAuth = require('../lib/requireAuth')

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
    const findProducts = await Product.find({})

    console.log("here is product find route");
    console.log(findProducts);
    res.render('products/home.ejs', {
      products: findProducts
    })
  } catch (err) {
    next (err)
  }
})

// New route
router.get('/new', (req, res) => {
  res.render('products/new.ejs')
})

// show from GET route log in
router.get('/:id', async (req, res, next) => {
  try {
    const foundProduct = await Product.findById(req.params.id)
    // will get back on this after completing user route
    // .populate('user')
    // .populate('reviews.user')
    // console.log("here is product from show route")
    // console.log(foundProduct)
    res.render('products/show.ejs', {
      product: foundProduct,
      // userId: req.session.userId
    })
  }
  catch(err) {
    next(err)
  }

})

// POST route -- product image create route
router.post('/', upload.single('productImage'), async (req, res, next) => {

  console.log(req.file);
  try {
    const createNewProduct = ({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      productImage: req.file.path

    })
    const createdNewProduct = await Product.create(createNewProduct)
    console.log("here is product created");
    console.log(createNewProduct);
    res.redirect('/products')
  }
  catch (err) {
    next (err)
  }
})


// Delete route
router.delete('/:id', async (req, res, next) => {
  try {

    const deletedProduct = await
    Product.findOneAndRemove(req.params.id)
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
    res.render('products/edit.ejs', {product: editedProduct})
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
    catch (e) {
      next (e)
    }

  })



module.exports = router
