const mongoose = require('mongoose')

const scriptSchema = new mongoose.Schema({
  timestamp: {
    type: String,
    required: true
  },
  entry: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('transModel', scriptSchema, 'leonnoel.courseVids')
