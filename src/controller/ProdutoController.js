const Produto = require('../model/Produto')
const Secretaria = require('../model/Secretaria')
const TempLicitacao = require('../model/TempLicitacao')
const TempLict = require('../model/TempLicitacao')
const Yup = require('yup')

class ProdutoController{
  async store(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      quantidadeProduto: Yup.number().required(),
      unidadeMedida: Yup.string().required(),
      tempLicitacao: Yup.string().required(),
      secretaria: Yup.string().required()
    })

    const { nome, quantidadeProduto, unidadeMedida, tempLicitacao, secretaria} = req.body

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Algum campo está inválido.'})
    }

    let licitadoID
    let secretariaID
    let secretariaQTDP

    const produtoExist =  await Produto.find(
      {
        nome: {'$eq': nome}, 
        secretaria: {'$eq': secretaria}
      }
    )
      
    await Secretaria.find(
      {
        _id: {'$eq': secretaria}
      }
    ).then( r => secretariaID = r[0]._id)
      .catch(() => secretariaID = false)

    if(!secretariaID){
      return res.status(400).json({error: 'ID secretaria não encontrada.'})
    }

    await TempLicitacao.find({
      _id: {'$eq': tempLicitacao},
      nome: {'$eq': nome},
      secretaria: {'$eq': secretaria}
    }).then(r => licitadoID = r[0]._id)
    .catch(() => licitadoID = false)
    
    if(!licitadoID){
      return res.status(400).json({error: 'Produto não encontrado na licitação.'})
    }

    await TempLicitacao.find({
      quantidadeProduto: {'$gt': quantidadeProduto}
    }).then(r => secretariaQTDP = r[0].quantidadeProduto)
        .catch(() => secretariaQTDP = false)

    if(!secretariaQTDP){
      return res.status(400).json({error: 'Quantidade de pedidos maior que a quantidade existente na Licitação.'})
    }

    try{
        await Produto.create({
          nome,
          quantidadeProduto,
          unidadeMedida,
          tempLicitacao: licitadoID,
          secretaria: secretariaID
        }).then(r => res.status(200).json(r))
            .catch(e => res.status(400).json({ 
              error: 'Erro ao cadastrar os produtos'
            }))
      
      
    }catch(e){
      res.status(400).json(e)
    }

  }

  async update(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      quantidadeProduto: Yup.number().required(),
      unidadeMedida: Yup.string().required()
    })

    const { nome, quantidadeProduto, unidadeMedida } = req.body
    const { _id } = req.params

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Algum campo está inválido.'})
    }

    await Produto.findByIdAndUpdate(
      {'_id':_id}, req.body, {new: true}
    ).then(response => res.status(200).json(response)).catch(() => res.status(400).json({error: 'ID não correspondido.'}))
  } 

  async updateQuantiaProduto(req, res){
    const schema = Yup.object().shape({
      quantidadeProduto: Yup.number().required()
    })

    const {quantidadeProduto} = req.body
    const {_id} = req.params

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Algum campo está inválido.'})
    }

    await Produto.findByIdAndUpdate(
      {'_id':_id}, req.body, {new: true}
    ).then(response => res.status(200).json(response))
      .catch(() => res.status(400).json({error: 'ID não correspondido.'}))

  }

  async getProdutos(req, res){
    const allProdutos =  await Produto.find()

    return res.status(200).json(allProdutos)
  }

  async index(req, res){
    const {_id} = req.params

    await Produto.find({
      secretaria:{'$eq': _id}
    }).then(r => res.status(200).json(r))
        .catch(e => res.status(400).json({error: 'ID não correspondido.'}))
  }

  async destroy(req, res){
    await Produto.deleteOne({'_id': req.params._id})
      .then(() => res.status(200).json({msg:'Deletado com sucesso.'}))
        .catch(() => res.status(400).json({error: 'Não foi encontrado o produto informado'}))
  }
}

module.exports = new ProdutoController()