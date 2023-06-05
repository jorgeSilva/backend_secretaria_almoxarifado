const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  fkEscola:{
    type: Schema.Types.ObjectId,
    ref: 'Escola'
  },
})

module.exports = mongoose.model('Usuario', UserSchema)