const mongoose = require('mongoose')

const institutionSchema = new mongoose.Schema({
  access_token: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  item_id: String,
  name: String,
})

institutionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Institution', institutionSchema)
