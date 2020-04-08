const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema ({
  created_on: Date,
  shipping: {
    type: String
    },
  buyer: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  },
 product: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'Product'
}
})

const Checkout = mongoose.model('Checkout', checkoutSchema)

module.exports = Checkout
