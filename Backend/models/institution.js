const mongoose = require('mongoose')

const institutionSchema = new mongoose.Schema({
  access_token: String,
  user_id: String,
  name: String,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Institution', institutionSchema)
