const yup = require('yup')
const Secretaria = require('../model/Secretaria')

class SecretariaController{
  async store(req, res){
    const schema = yup.object().shape({
      estado: yup.string().required(),
      municipio: yup.string().required()
    })

    const { estado, municipio } = req.body

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Algum campo está inválido.'})
    }
    
    const create = await Secretaria.create({
      estado,
      municipio
    })

    return res.status(200).json(create)
  }

  async index(req, res){
    await Secretaria.find()
      .then(r => res.status(200).json(r))
        .catch(e => res.status(400).json(e))
  }
}

module.exports = new SecretariaController()