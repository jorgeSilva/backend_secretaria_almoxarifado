const mongoose = require('../config/database')
const Schema = mongoose.Schema

const LicitacaoSchema = new Schema({
  nome: String,
  quantidadeProduto: Number,
  unidadeMedida: String,
  quantidadeProdutoENV: Number,
  secretaria: {
    type: Schema.Types.ObjectId,
    ref: 'Secretaria'
  }
})

module.exports = mongoose.model('Licitacao', LicitacaoSchema)