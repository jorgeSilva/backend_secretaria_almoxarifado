const express = require('express')
const solicitacaoRoutes = express.Router()

const SolicitacaoController = require('../controller/SolicitacaoController')

solicitacaoRoutes.post('/mr', SolicitacaoController.store)

solicitacaoRoutes.get('/rt/:_id', SolicitacaoController.show)
solicitacaoRoutes.get('/rt/secretaria/:_id', SolicitacaoController.index)
solicitacaoRoutes.get('/gl/secretaria/:_id', SolicitacaoController.aindaNaoAprovado)
solicitacaoRoutes.get('/rtFalse/:_id', SolicitacaoController.rtFalse)
solicitacaoRoutes.get('/rt/gl/aprovados/:_id', SolicitacaoController.aprovados)


solicitacaoRoutes.put('/mr/gl/:_id', SolicitacaoController.update)
solicitacaoRoutes.put('/rt/gl/produto/quantidade/:_id', SolicitacaoController.updateQuantidade)
solicitacaoRoutes.put('/gl/:_id/:solicitado', SolicitacaoController.solicitado)
solicitacaoRoutes.put('/rt/:_id/:approved', SolicitacaoController.rtApproved)
solicitacaoRoutes.put('/mr/:_id/:entregue', SolicitacaoController.entregue)

solicitacaoRoutes.delete('/produto/solicitado/:_id', SolicitacaoController.destroy)

module.exports = solicitacaoRoutes