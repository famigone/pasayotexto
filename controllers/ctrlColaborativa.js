const Colaborativa = require('../models/colaborativa');




createColaborativa = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Colaborativa',
        })
    }

    const colaborativa = new Colaborativa(body)

    if (!colaborativa) {
        return res.status(400).json({ success: false, error: err })
    }

    colaborativa
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: colaborativa._id,
                message: 'Colaborativa created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'colaborativa not created!',
            })
        })
}



deleteColaborativa = async (req, res) => {
    await Colaborativa.findOneAndDelete({ _id: req.params.id }, (err, colaborativa) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!colaborativa) {
            return res
                .status(404)
                .json({ success: false, error: "colaborativa not found" })
        }

        return res.status(200).json({ success: true, data: colaborativa })
    })
}

getColaborativaById = async (req, res) => {
    await Colaborativa.findOne({ _id: req.params.id }, (err, colaborativa) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!colaborativa) {
            return res
                .status(404)
                .json({ success: false, error: "colaborativa not found" })
        }
        return res.status(200).json({ success: true, data: colaborativa })
    })
}



getAllColaborativas = (req, res) => {

  const filtro = req.query
  let filtroFinal = {}
  if (filtro.tema !=="TODOS") filtroFinal = filtro;

  const limite = filtro.limite
  console.log(filtro.limite)
  Colaborativa.find(filtroFinal, (err, colaborativas)  => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }
    return res.status(200).json({ success: true, data: colaborativas })
  }).sort({createdAt: -1}).limit(limite);

}








getLogin = async (req, res) => {
     res.render('login');
}

getRegister = async (req, res) => {
     res.render('register');
}

module.exports = {
    createColaborativa,
    updateColaborativa,
    deleteColaborativa,
    getAllColaborativas,
    getColaborativaById,
    getLogin,
    getRegister
}
