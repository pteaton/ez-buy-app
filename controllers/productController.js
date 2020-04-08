const express = require('express')
const router = express.Router()
const multer = require('multer')
// const upload = multer({dest: './uploads/'})


const storage = multer.diskStorage({
  destonation: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {

  //if the filetype is not right
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
    cb(new Error('File was not saved'))
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

const Product = require('../models/product')

// Get home route
router.get('/', (req, res) => {
  res.render('products/home.ejs')
})


// new route
router.get('/new', (req, res) => {
  res.render('products/new.ejs')
})


router.post('/', upload.single('productImage'), async (req, res, next) => {

  console.log(req.file);
  try {
      res.json({
        success: true,
        message: "Product was added"
      })
  } catch (e) {
    next (e)
  }
})









module.exports = router
