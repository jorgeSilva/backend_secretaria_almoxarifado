const express = require('express')
const secretariaRoutes = express.Router()

const SecretariaController = require('../controller/SecretariaController')

secretariaRoutes.post('/secretaria', SecretariaController.store)

secretariaRoutes.get('/secretaria', SecretariaController.show)
secretariaRoutes.get('/secretaria/:_id', SecretariaController.showEscolaMunicipio)

module.exports = secretariaRoutes