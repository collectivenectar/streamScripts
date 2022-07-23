const mongoose = require('mongoose')

const scriptSchema = new mongoose.Schema({
  data/timestamp: {
    type: String,
    required: true
  },
  data/entry: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('transModel', scriptSchema, 'transcript')
