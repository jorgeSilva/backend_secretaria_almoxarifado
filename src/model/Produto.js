const mongoose = require('../config/database')
const Schema = mongoose.Schema

const ProdutoSchema = new Schema({
  nome: String,
  quantidadeProduto: Number,
  unidadeMedida: String,
  tempLicitacao: {
    type: Schema.Types.ObjectId,
    ref: 'TempLicitacao'
  }
})

module.exports = mongoose.model('Produto', ProdutoSchema)