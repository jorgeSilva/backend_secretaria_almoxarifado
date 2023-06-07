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

    let secretariaExist
    
    await Secretaria.find(
      {
        _id: {'$eq': secretaria}
      }
    ).then(r => secretariaExist = r._id)
      .catch(e => res.status(400).json({error: 'Secretaria não encontrada'}))

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
        secretaria: secretariaExist
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
}

module.exports = new EscolaController()