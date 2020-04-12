const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
