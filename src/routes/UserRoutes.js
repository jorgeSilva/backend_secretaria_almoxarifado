const express = require('express')
const userRoutes = express.Router()

const UserController = require('../controller/UserController')
// const UserValidation = require('../middleware/UserMiddleware')

userRoutes.get('/usuario/:_id',  UserController.show)
userRoutes.get('/usuarios', UserController.index)

userRoutes.post('/usuario', UserController.store)
userRoutes.post('/usuario/login', UserController.login)

module.exports = userRoutes