const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({
  title: {
   type: String,
   required: true
 },
 description: {
   type: String,
 },
 price: Number,
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
