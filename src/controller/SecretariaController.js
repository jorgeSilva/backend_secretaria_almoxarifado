const yup = require('yup')
const Secretaria = require('../model/Secretaria')
const Escola = require('../model/Escola')

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

  async show(req, res){
    await Secretaria.find()
      .then(r => res.status(200).json(r))
        .catch(e => res.status(400).json(e))
  }

  async showEscolaMunicipio(req, res){
    const { _id } = req.params

    const _idSecretaria = await Escola.find(
      {
        secretaria: {'$eq': _id}
      }
    ).populate('secretaria')

    if(_idSecretaria){
      return res.status(200).json(_idSecretaria)
    }else{
      return res.status(400).json({error: 'Não foi encontrada a secretaria desejada'})
    }
  }
}

module.exports = new SecretariaController()