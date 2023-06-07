const mongoose = require('../config/database')
const Schema = mongoose.Schema

const Secretaria = new Schema({
  estado: String,
  municipio: String,
})

module.exports = mongoose.model('Secretaria', Secretaria)