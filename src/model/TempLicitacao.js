const mongoose = require('../config/database')
const Schema = mongoose.Schema

const LicitacaoSchema = new Schema({
  create: {type: Date, required: false, default: new Date()}
})

module.exports = mongoose.model('Licitacao', LicitacaoSchema)