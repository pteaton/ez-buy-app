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
   data: Buffer,
   contentType: String
 },
 posted: {
   type: Date,
   default: Date.now()
 },
 user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true
 },
 reviews: [{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Review'
 }]
})

const Product =  mongoose.model('Product', productSchema)

module.exports = Product
