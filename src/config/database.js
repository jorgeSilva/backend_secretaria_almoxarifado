const mongoose = require('mongoose')
require('dotenv').config()

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@bdmerendaescolar.xrokiff.mongodb.net/bdalmoxarifado?retryWrites=true&w=majority`, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})

module.exports = mongoose