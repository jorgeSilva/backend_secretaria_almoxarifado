const TempLicitacao = require('../model/TempLicitacao')
const Produto = require('../model/Produto')
let Yup = require('yup')

class TempLicitacaoController{
  async store(req, res){
    const tempLicitacao = await 
      TempLicitacao.create(req.body.create)

    return res.json(tempLicitacao)
  }
}

module.exports = new TempLicitacaoController()