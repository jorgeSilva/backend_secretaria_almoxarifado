const mongoose = require('../config/database')
const Schema = mongoose.Schema

const SecretariaSchema = new Schema({
  estado: String,
  municipio: String,
})

module.exports = mongoose.model('Secretaria', SecretariaSchema)