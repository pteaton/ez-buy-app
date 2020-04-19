const express = require('express')
const router = express.Router()
const fs = require('fs')
const Product = require('../models/product')
const User = require('../models/user')
const multer = require('multer')
const storage = multer.memoryStorage()
const uploads = multer({storage: storage})

// Multer settings
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


// GET route show page for user's product -- /:id
router.get('/:userId/products', async (req, res, next) => {
    try {
        const productsToBeSoldByUser = await Product.find({
            user: req.params.userId
        }).populate('user')
        const user = await User.findById(req.params.userId)
        res.render('users/show.ejs', {
            user: user,
            products: productsToBeSoldByUser,
            userId: user.id
        })

    } catch (err) {
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
        res.render('users/viewProfile.ejs', {
            user: user,
            products: foundProducts,
            userId: req.session.userId
        })

    } catch (err) {
        next(err)
    }
})

// Delete Route for - User profile
router.delete('/:userId', async (req, res, next) => {
    try {
        const foundProducts = await Product.remove({
            user: req.params.userId
        })

        // for (const foundProduct of foundProducts) {
        //     fs.unlink(`./${foundProduct.productImage}`, (err) => {
        //         if (err) throw err;
        //     });
        // } // forLoop for fs

        // const deletedProducts = await Product.remove({
        //     user: req.params.userId
        // })
        const deletedUser = await User.findOneAndRemove(req.params.userId)
        await req.session.destroy()
        res.redirect('/auth/signup')
    } catch (err) {
        next(err)
    }
})


// GET route edit page
router.get('/update/:userId/updateProfile', async (req, res, next) => {
    try {
        const foundUser = await User.findById(req.params.userId)

        res.render('users/updateProfile.ejs', {
            user: foundUser,
            userId: req.session.userId
        })
    } catch (err) {
        next(err)
    }
})


// Update route for User Profile
router.put('/:userId', async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true
        })

        req.session.message = "Profile has been updated"

        console.log("this route is getting hit");
        res.redirect('/products')
    } catch (err) {
        next(err)
    }
})


// Delete route for User's Products
router.delete('/:userId/products', async (req, res, next) => {
  try {
    const findUser = await User.findById(req.params.userId)
    const productsTobeDeleted = await Product.findOneAndRemove({ user: req.params.userId })

    res.redirect(`/users/${findUser._id}/products`)
  }
  catch (err) {
      next (err)
  }
})

// Edit route for products
router.get('/:userId/products/updateProduct', async (req, res, next) => {
  try {
    const findUser = await User.findById(req.params.userId)
    const findProductToEdit = await Product.findOne({ user: req.params.userId })

    res.render('users/updateProduct.ejs', {
      product: findProductToEdit,
      user: req.session.userId
    })
  }
  catch (err) {
      next (err)
  }

})

// Update Route for user to update product
router.put('/:userId/product/:productId', upload.single('productImage'), async (req, res, next) => {
  try {
    console.log(req.body);
      const updatedProduct = {
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
            productImage: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
      }
      console.log("before updatedProduct");
      console.log(updatedProduct);
      const findUser = await User.findById(req.params.userId)
      const productToBeUpdated = await Product.findOneAndUpdate(
        req.params.productId,
        updatedProduct,
        { new: true }
      )
      console.log("updated Product");
      console.log(productToBeUpdated);
      res.redirect(`/users/${findUser._id}/products`)
}
    catch (err) {
        next (err)
    }
})

module.exports = router
