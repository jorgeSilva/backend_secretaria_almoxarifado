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
  secretaria: {
    type: Schema.Types.ObjectId,
    ref: 'Secretaria'
  }
})

module.exports = mongoose.model('Usuario', UserSchema)