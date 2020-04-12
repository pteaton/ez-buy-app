const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
 username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  email: String,
  address: String,

  products: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Product'
  }]
})

const User   = mongoose.model('User', userSchema)
module.exports = User
