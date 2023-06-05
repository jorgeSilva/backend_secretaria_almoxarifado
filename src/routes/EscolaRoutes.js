const express = require('express')
const schoolRoutes = express.Router()

const EscolaController = require('../controller/EscolaController')

schoolRoutes.post('/escola', EscolaController.store)
schoolRoutes.get('/escolas/:_id', EscolaController.index)

module.exports = schoolRoutes