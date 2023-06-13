const Produto = require('../model/Produto')
const Secretaria = require('../model/Secretaria')
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
      produto: Yup.string().required(),
      secretaria: Yup.string().required()
    })

    const { nome, quantidadeProduto, unidadeMedida, merendeira, horario, produto, secretaria } = req.body
    
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error:'Falha na validação dos campos.'})
    }

    let produtoID  = 0 
    let secretariaID 
    let merendeiraSecretaria

    await Secretaria.find({
      _id:{'$eq': secretaria}
    }).then(r => secretariaID = r[0]._id)
    .catch(() => produtoID = false)

     if(!secretariaID){
      return res.status(400).json({error: 'Erro ao encontrar a secretaria.'})
    }
    
    await Produto.find(
      {
        nome: {'$eq': nome},
        quantidadeProduto: {'$gte': quantidadeProduto}, 
        _id: {'$eq': produto},
        secretaria: {'$eq': secretariaID}
      }
    ).then((r => produtoID = r[0]._id))
    .catch(() => produtoID = false)


    if(!produtoID){
      return res.status(400).json({error: 'Erro ao encontrar o produto.'})
    }

    await User.find({
      _id: {'$eq': merendeira},
      secretaria: {'$eq': secretariaID}
    }).then(r => merendeiraSecretaria = r[0]._id)
    .catch(() => merendeiraSecretaria = false)

    if(!merendeiraSecretaria){
      return res.status(400).json({error: 'Erro ao encontrar a merendeira.'})
    }

    try{
      await Solicitacao.create({
        nome,
        quantidadeProduto,
        unidadeMedida,
        horario,
        merendeira: merendeiraSecretaria, 
        produto: produtoID,
        secretaria: secretariaID
      }).then(r => res.status(200).json(r))
      .catch((e) => res.status(400).json({error: e}))  
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
    const { _id } = req.params

    await Solicitacao.find(
      {
        secretaria:{'$eq': _id}
      }
    ).populate('merendeira').populate('produto').populate('secretaria')
      .then(r => res.status(200).json(r))
        .catch(err => res.status(400).json({error: err}))
  }

  async rtFalse(req, res){

    const { _id } = req.params
    
    await Solicitacao.find(
    {
      rt: {'$eq':false},
      secretaria: {'$eq': _id}
    }).populate('merendeira')
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

  async updateQuantidade(req, res){
    const schema = Yup.object().shape({
      quantidadeProduto: Yup.number().required(),
      unidadeMedida: Yup.string().required()
    })
  
    const { quantidadeProduto } = req.body
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
    const { _id } = req.params

    await Solicitacao.find(
      {
        rt: {'$eq': true}, 
        solicitado:{'$eq':false},
        secretaria: {'$eq': _id}
      }
      ).populate('merendeira').populate('secretaria')
      .then(r =>  res.status(200).json(r))
        .catch(() => res.status(404).json({error: 'Não foi encontrada essa solicitação.'}))
  }

  async aprovados(req, res){
    const { _id } = req.params

    await Solicitacao.find(
      {merendeira:{'$eq':_id}, rt: {'$eq': true}, solicitado:{'$eq':true}}
      ).populate('merendeira').populate('secretaria')
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

  async destroy(req, res){
    await Solicitacao.deleteOne({'_id': req.params._id})
      .then(() => res.status(200).json({msg:'Deletado com sucesso.'}))
        .catch(() => res.status(400).json({error: 'Não foi encontrado o produto informado'}))
  }
}

module.exports = new SolicitacaoController()