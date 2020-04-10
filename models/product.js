const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({
  title: {
   type: String,
   required: true
 },
 description: {
   type: String,
 },
 price: {
   type: Number,
   // required: true
 },
 productImage: {
   type: String,
   required: true
 },
 posted: {
   type: Date,
   default: Date.now()
 },
 user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true
 }
})

const Product =  mongoose.model('Product', productSchema)

module.exports = Product
