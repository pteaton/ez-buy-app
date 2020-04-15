const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const Product = require('../models/product')
const User = require('../models/user')
const storage = multer.memoryStorage()
const uploads = multer({storage: storage})
const requireAuth = require('../lib/requireAuth')

// MULTER CONFIGURATION
// Saving image and uploading image using multer

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function(req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname)
//     }
// })

// Filter by image size/file type
const fileFilter = (req, file, cb) => {

    //if the filetype is not right
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

// render picture @ /rating-pictures/:id/img
router.get("/img", async (req, res, next) => {
  try {
    const findProduct = await Product.find().populate('user');

    console.log("res");
    console.log(res);
    res.set("Content-Type", findProduct.productImage.contentType);


    res.send(findProduct.image.data);
  } catch (err) {
    next(err);
  }
});

// Get home route
router.get('/', async (req, res, next) => {
    try {

        const findProducts = await Product.find().populate('user')
        res.render('products/home.ejs', {
            products: findProducts,
            userId: req.session.userId
        })
    } catch (err) {
        next(err)
    }
})

// New route
router.get('/new', (req, res) => {

    res.render('products/new.ejs', {
        userId: req.session.userId
    })
})

// show from GET route log in
router.get('/:id', requireAuth, async (req, res, next) => {
    try {
        const foundProduct = await Product.findById(req.params.id).populate('user').populate('reviews')
        res.render('products/show.ejs', {
            product: foundProduct,
            userId: req.session.userId
        })
    } catch (err) {
        next(err)
    }

})

// POST route -- product image create route
router.post('/', upload.single('productImage'), async (req, res, next) => {

    try {

        // define user here
        let currentUser = await User.findById(req.session.userId)

        const createNewProduct = ({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            user: currentUser,
            productImage: {
              data: req.file.buffer,
              contentType: req.file.mimetype
            }
            // req.file.path // change Schema to store in the database

        })
        if (req.session.loggedIn == true) {
            const createdNewProduct = await Product.create(createNewProduct)
            res.locals.message = `Product was added.`
            res.redirect('/products')
        } else {
            res.locals.message = `Please log in first to add photos`
            res.redirect('/auth/login')
        }
    } catch (err) {
        next(err)
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
        res.redirect('/products')
    } catch (err) {
        next(err)
    }
})

// GET route -- edit route
router.get('/:id/edit', async (req, res, next) => {
    try {
        const editedProduct = await
        Product.findById(req.params.id)
        res.render('products/edit.ejs', {
            product: editedProduct,
            userId: req.session.userId
        })
    } catch (err) {
        next(err)
    }
})

// Router - update routes
router.put('/:id', upload.single('productImage'), async (req, res, next) => {
    try {
        const updatedProduct = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            productImage: req.file.path
        }

        const productToBeUpdated = await Product.findByIdAndUpdate(req.params.id, updatedProduct, {
            new: true
        })
        res.redirect('/products')
    } catch (err) {
        next(err)
    }

})



module.exports = router
