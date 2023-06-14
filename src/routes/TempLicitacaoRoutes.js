const express = require('express')
const TempLicRoutes = express.Router()

const TempLicitacaoController = require('../controller/TempLicitacaoController')

TempLicRoutes.post('/licitacao', TempLicitacaoController.store)

TempLicRoutes.put('/licitacao/produto/:_id', TempLicitacaoController.updateLicitado)

TempLicRoutes.get('/licitacao/produtos', TempLicitacaoController.index)
TempLicRoutes.get('/licitacao/produtos/:_id', TempLicitacaoController.getLicitacaoSecretaria)

module.exports = TempLicRoutes