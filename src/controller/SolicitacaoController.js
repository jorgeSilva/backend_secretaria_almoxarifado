const Produto = require('../model/Produto')
const Solicitacao = require('../model/Solicitado')
const User =  require('../model/User')
const Yup = require('yup')

class SolicitacaoController{
  async store(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      quantidadeProduto: Yup.number().required(),
      unidadeMedida: Yup.string().required(),
      merendeira: Yup.string().required(),
      horario: Yup.string().required(),
      produto: Yup.string().required()
    })

    const { nome, quantidadeProduto, unidadeMedida, merendeira, horario, produto } = req.body
    
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error:'Falha na validação dos campos.'})
    }

    let produtoID = 0

    await Produto.find(
      {
        nome: {'$eq': nome},
        quantidadeProduto: {'$gte': quantidadeProduto}, 
        _id: {'$eq': produto}
      }
    ).then((r => produtoID = r[0]._id))
    .catch((e) => produtoID = 0)

    try{
      await Solicitacao.create({
        nome,
        quantidadeProduto,
        unidadeMedida,
        horario,
        merendeira, 
        produto: produtoID
      }).then(r => res.status(200).json(r))
      .catch(() => res.status(400).json({msgError: 'Produto não existente no almoxarifado ou quantia solicitada maior que a quantidade de produto no almoxarifado'}))  
    }catch(e){
      res.status(400).json(e)
    }    
  }

  async show(req, res){
    const { _id } = req.params

    await Solicitacao.find({ merendeira: {'$eq': _id}}).populate('merendeira').populate('produto').then(r => res.status(200).json(r))
        .catch(err => res.status(400).json({error: err}))
  }

  async index(req, res){
    await Solicitacao.find().populate('merendeira').populate('produto')
      .then(r => res.status(200).json(r))
        .catch(err => res.status(400).json({error: err}))
  }

   async rtFalse(req, res){
    await Solicitacao.find({rt: {'$eq':false}}).populate('merendeira')
      .then(r => res.status(200).json(r))
        .catch(err => res.status(400).json({error: err}))
  }
  
  async rtApproved(req, res){
    await Solicitacao.findOneAndUpdate(
      {
        '_id': req.params._id
      },
      {
        'rt': req.params.approved
      },
      {
        new: true
      }
    ).populate('merendeira')
      .then(r => res.status(200).json(r))
        .catch(err => res.status(400).json({error: err}))
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

    await Solicitacao.findByIdAndUpdate(
      {'_id':_id}, req.body, {new: true}
    ).then(response => res.status(200).json(response)).catch(() => res.status(400).json({error: 'ID não correspondido.'}))
  }

  async solicitado(req, res){
    await Solicitacao.findByIdAndUpdate(
      {
        '_id': req.params._id
      },
      {
        'solicitado': req.params.solicitado
      },
      {
        new:true
      }
    ).then(r => res.status(200).json(r))
        .catch(error => res.status(400).json(error))
  }

  async aindaNaoAprovado(req, res){
    await Solicitacao.find(
      {rt: {'$eq': true}, solicitado:{'$eq':false}}
      ).populate('merendeira')
      .then(r =>  res.status(200).json(r))
        .catch(() => res.status(404).json({error: 'Não foi encontrada essa solicitação.'}))
  }

  async aprovados(req, res){
    const { _id } = req.params

    await Solicitacao.find(
      {merendeira:{'$eq':_id}, rt: {'$eq': true}, solicitado:{'$eq':true}}
      ).populate('merendeira')
      .then(r =>  res.status(200).json(r))
        .catch(() => res.status(404).json({error: 'Não foi encontrada essa solicitação.'}))
  }

  async entregue(req, res){
    await Solicitacao.findOneAndUpdate(
      {
        '_id': req.params._id
      },
      {
        'entregue': req.params.entregue
      },
      {
        new: true
      }
    ).then(r => res.status(200).json(r))
      .catch(err => res.status(400).json({error: err}))
  }

 /*  async delete(req, res){
    await Solicitacao.find().populate('merendeira')
      .then(r => res.status(200).json(r))
        .catch(err => res.status(400).json({error: err}))
  } */
}

module.exports = new SolicitacaoController()