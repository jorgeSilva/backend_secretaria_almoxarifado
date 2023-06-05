require('dotenv').config()
const jwt = require('jsonwebtoken')
const UserModel = require('../model/User')

const UserValidation = (req, res, next) =>{

  const authUser = req.headers['authorization']
  const token = authUser && authUser.split(' ')[1]

  if(token == null){
    return res.status(401).json({error: 'Acesso negado.'})
  }

  try{
    const secret = process.env.SECRET
    jwt.verify(token, secret)

    next()
  }catch(error){
    res.status(400).json({error: 'Tokén invalido.'})
  }
}

module.exports = UserValidation