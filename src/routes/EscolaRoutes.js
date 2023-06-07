const express = require('express')
const schoolRoutes = express.Router()

const EscolaController = require('../controller/EscolaController')

schoolRoutes.post('/escola', EscolaController.store)

schoolRoutes.get('/escolas/:_id', EscolaController.index)
schoolRoutes.get('/escolas', EscolaController.show)

schoolRoutes.put('/escola/:_id', EscolaController.update)

module.exports = schoolRoutes