const express = require('express')
const cors = require('cors')
const server = express()
require('dotenv').config()

server.use(cors())
server.use(express.json())

const TempLicRoutes = require('./routes/TempLicitacaoRoutes')
const schoolRoutes = require('./routes/EscolaRoutes')
const produtolRoutes = require('./routes/ProdutoRoutes')
const userRoutes = require('./routes/UserRoutes')
const solicitacaoRoutes = require('./routes/SolicitacaoRoute')
const secretariaRoutes = require('./routes/SecretariaRoutes')

server.use(TempLicRoutes)
server.use(schoolRoutes)
server.use(produtolRoutes)
server.use(userRoutes)
server.use(solicitacaoRoutes)
server.use(secretariaRoutes)

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log('Funcionando');
})