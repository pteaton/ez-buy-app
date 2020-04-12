const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema ({
  created_on: {
    type: Date,
    default: Date.now()
  },
  shipping: {
    type: String
    },
  buyer: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User'
  },
 products: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
}]
})

const Checkout = mongoose.model('Checkout', checkoutSchema)

module.exports = Checkout
