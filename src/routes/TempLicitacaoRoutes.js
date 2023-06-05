const express = require('express')
const TempLicRoutes = express.Router()

const TempLicitacaoController = require('../controller/TempLicitacaoController')

TempLicRoutes.post('/licitacao', TempLicitacaoController.store)

module.exports = TempLicRoutes