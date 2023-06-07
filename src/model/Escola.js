const mongoose = require('../config/database')
const Schema = mongoose.Schema

const EscolaSchema = new Schema({
  nome: { type: String, required: true },
  tipoEnsino: { type: String, required: true },
  nAlunos: { type: Number, required: true },
  secretaria: {
    type: Schema.Types.ObjectId,
    ref: 'Secretaria'
  }
})

module.exports = mongoose.model('Escola', EscolaSchema)