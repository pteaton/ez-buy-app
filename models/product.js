const mongoose = require('mognoose')

const productSchema = new mongoose.Schema ({
  title: {
   type: String,
   required: true
 },
 description: {
   type: String,
 },
 price: Number,
 posted: Date
 url: [{
   type: mongoose.SchemaTypes.Url,
   required: true
 }],
 seller: {
   ref: "User"
 }
})

const Product new mongoose.model('Product', 'productSchema')

module.exports = Product
