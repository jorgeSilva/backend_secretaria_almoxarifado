const mongoose = require('../config/database')
const Schema = mongoose.Schema

const Solicitacao = new Schema({
  nome: String,
  quantidadeProduto: Number,
  unidadeMedida:String,
  rt: {type: Boolean, required: false, default: false}, 
  solicitado: {type: Boolean, required: false, default: false},
  entregue: {type: Boolean, required: false, default: false},
  horario: String,
  merendeira: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  produto: {
    type:Schema.Types.ObjectId,
    ref: 'Produto'
  },
  secretaria: {
    type: Schema.Types.ObjectId,
    ref: 'Secretaria'
  }
})

module.exports = mongoose.model('Solicitacoes', Solicitacao)