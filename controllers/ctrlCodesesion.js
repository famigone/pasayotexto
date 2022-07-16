const Codesesion = require('../models/codesesion');

updateCodesesion = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Codesesion.findOne({ _id: req.params.id }, (err, codesesion) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Codesesion not found!',
            })
        }
        codesesion.codigo = body.codigo
        codesesion
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: experiencia._id,
                    message: 'codesesion updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'codesesion not updated!',
                })
            })
    })
}

getCodesesionByUser =  (req, res) => {
       //console.log("Llego esto: "+req.params.user + " - "+req.params.experienciaid)
       const filtro = req.query
       Codesesion.findOne(filtro,(err, codesesion) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!codesesion) {
            return res
                .status(404)
                .json({ success: false, error: "Codesesion not found" })
        }
        return res.status(200).json({ success: true, data: codesesion })
    })
}

createCodesesion = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Codesesion',
        })
    }

    const codesesion = new Codesesion(body)

    if (!codesesion) {
        return res.status(400).json({ success: false, error: err })
    }
    codesesion
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: codesesion._id,
                message: 'Codesesion created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'codesesion not created!',
            })
        })
}

module.exports = {
getCodesesionByUser,
createCodesesion,
updateCodesesion
}
