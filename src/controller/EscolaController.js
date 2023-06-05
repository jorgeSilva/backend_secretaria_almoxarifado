const Escola = require('../model/Escola')
const Yup = require('yup')

class EscolaController{
  async store(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      tipoEnsino: Yup.string().required(),
      nAlunos: Yup.number().required()
    })

    const { nome, tipoEnsino, nAlunos} = req.body

    if(!(await schema.isValid(req.body))){
      res.status(400).json({error: 'Algum campo não foi preenchido.'})
    }

    let escola = await Escola.findOne({nome})

    if(!escola){
      escola = await Escola.create({
        nome,
        tipoEnsino,
        nAlunos
      })
      return res.json(escola)

    }else{
      return res.json({error: 'Já foi cadastrada esta escola.'})
    }
  }

  async index(req, res){
    const { _id } = req.params
    const allCamp = await Escola.find({ _id: {'$eq': _id}})


    return res.status(200).json(allCamp)
  }
}

module.exports = new EscolaController()