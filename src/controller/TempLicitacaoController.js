const TempLicitacao = require('../model/TempLicitacao')
const Produto = require('../model/Produto')
let Yup = require('yup')
const Secretaria = require('../model/Secretaria')

class TempLicitacaoController{
  async store(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      quantidadeProduto: Yup.number().required(),
      unidadeMedida: Yup.string().required(),
      quantidadeProdutoENV: Yup.string().required(),
      secretaria: Yup.string().required()
    })

    const { nome, quantidadeProduto, unidadeMedida, quantidadeProdutoENV, secretaria } = req.body

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Algum campo está inválido.'})
    }

    const produtoExist = await Produto.find(
      {
        nome: {'$eq': nome}, 
        secretaria: {'$eq': secretaria}
      })

    if(produtoExist != false){
      return res.status(400).json({error: 'Produto já existente na licitação.'})
    }

    await Secretaria.find(
      {
        _id: {'$eq': secretaria}
      }
    ).then( r => 
      TempLicitacao.create({
        nome,
        quantidadeProduto,
        unidadeMedida,
        quantidadeProdutoENV,
        secretaria: r[0]._id
      }).then(r => res.status(200).json(r))
      .catch(e => res.status(400).json({error: 'Erro ao cadastrar os produtos'}))
    ).catch(() => res.status(400).json({error: 'ID secretaria não encontrado'}))
  }

  async index(req, res){
    await TempLicitacao.find()
      .then(r => res.status(200).json(r))
        .catch(() => res.status(400).json({error: 'Produtos não encontrados'}))
  }

  async getLicitacaoSecretaria(req, res){
    const { _id } = req.params

    await TempLicitacao.find({
      secretaria:{'$eq': _id}
    }).then(r => res.status(200).json(r))
        .catch(() => res.status(400).json({error: 'Não foi encontrado os produtos da licitação'}))
  }
}

module.exports = new TempLicitacaoController()