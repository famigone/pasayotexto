const Experiencia = require('../models/experiencia');




createExperiencia = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Experiencia',
        })
    }

    const experiencia = new Experiencia(body)

    if (!experiencia) {
        return res.status(400).json({ success: false, error: err })
    }

    experiencia
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: experiencia._id,
                message: 'Experiencia created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'experiencia not created!',
            })
        })
}

updateExperiencia = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Experiencia.findOne({ _id: req.params.id }, (err, experiencia) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'experiencia not found!',
            })
        }
        experiencia.xml = body.xml
        experiencia.narrativa = body.narrativa
        experiencia.categoria = body.categoria
        experiencia.objetivo = body.objetivo
        experiencia
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: experiencia._id,
                    message: 'experiencia updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'experiencia not updated!',
                })
            })
    })
}

deleteExperiencia = async (req, res) => {
    await Experiencia.findOneAndDelete({ _id: req.params.id }, (err, experiencia) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!experiencia) {
            return res
                .status(404)
                .json({ success: false, error: "experiencia not found" })
        }

        return res.status(200).json({ success: true, data: experiencia })
    }).catch(err => console.log(err))
}

getExperienciaById = async (req, res) => {
    await Experiencia.findOne({ _id: req.params.id }, (err, experiencia) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!experiencia) {
            return res
                .status(404)
                .json({ success: false, error: "experiencia not found" })
        }
        return res.status(200).json({ success: true, data: experiencia })
    }).catch(err => console.log(err))
}

getAllExperiencias = async (req, res) => {
    await Experiencia.find({}, (err, experiencias) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!experiencias.length) {
            return res
                .status(404)
                .json({ success: false, error: "Experiencia not found" })
        }
        return res.status(200).json({ success: true, data: experiencias })
    }).catch(err => console.log(err))
}



getLogin = async (req, res) => {
     res.render('login');
}

getRegister = async (req, res) => {
     res.render('register');
}

module.exports = {
    createExperiencia,
    updateExperiencia,
    deleteExperiencia,
    getAllExperiencias,
    getExperienciaById,
    getLogin,
    getRegister
}
