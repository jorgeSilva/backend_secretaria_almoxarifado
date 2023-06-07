const Escola = require('../model/Escola')
const Yup = require('yup')
const Secretaria = require('../model/Secretaria')

class EscolaController{
  async store(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      tipoEnsino: Yup.string().required(),
      nAlunos: Yup.number().required(),
      secretaria: Yup.string().required()
    })

    const { nome, tipoEnsino, nAlunos, secretaria} = req.body

    if(!(await schema.isValid(req.body))){
      res.status(400).json({error: 'Algum campo não foi preenchido.'})
    }

    let secretariaExist = await Secretaria.find(
      {
        _id: {'$eq': secretaria}
      }
    )

    let escola = await Escola.find(
      {
        nome:{'$eq': nome}
      }
    )

    if(escola == false){
      await Escola.create({
        nome,
        tipoEnsino,
        nAlunos,
        secretaria: secretariaExist[0]._id
      }).then(r => res.status(200).json(r))
          .catch(e => res.status(400).json(e))
    }else{
      return res.json({error: 'Já foi cadastrada esta escola.'})
    }
  }

  async index(req, res){
    const { _id } = req.params
    const allCamp = await Escola.find({ _id: {'$eq': _id}})


    return res.status(200).json(allCamp)
  }

  async show(req, res){
    await Escola.find().populate('secretaria')
      .then(r => res.status(200).json(r))
        .catch(e => res.status(400).json(e))
  }

  async update(req, res){
    const schema = Yup.object().shape({
      secretaria: Yup.string().required()
    })

    const { _id } = req.params
    const { secretaria } = req.body


    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Algum campo está inválido.'})
    }

    await Escola.findByIdAndUpdate(
      {
        '_id':_id
      },
      req.body,
      {
        new: true
      }
    ).then(r => res.status(200).json(r))
      .catch(() => res.status(400).json({error: 'ID não correspondido.'}))
  }
}

module.exports = new EscolaController()