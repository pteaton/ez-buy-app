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
 posted: Date,
 // url: [{
 //   type: mongoose.SchemaTypes.Url,
 //   required: true
 // }],
 seller: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User"
 }
})

const Product =  mongoose.model('Product', productSchema)

module.exports = Product
