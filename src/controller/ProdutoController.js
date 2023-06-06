const Produto = require('../model/Produto')
const TempLict = require('../model/TempLicitacao')
const Yup = require('yup')

class ProdutoController{
  async store(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      quantidadeProduto: Yup.number().required(),
      unidadeMedida: Yup.string().required()
    })

    const { nome, quantidadeProduto, unidadeMedida } = req.body

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Algum campo está inválido.'})
    }

    const produtoExist = await Produto.find({nome: {'$eq': nome}})

    if(produtoExist != false){
      return res.status(400).json({error: 'Produto já existente na licitação.'})
    }
      const create = await Produto.create({
        nome,
        quantidadeProduto,
        unidadeMedida
      })

      return res.status(200).json(create)
    
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
    _id:{'$eq': _id}
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