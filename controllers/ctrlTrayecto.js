const Trayecto = require('../models/trayecto');




createTrayecto = (req, res) => {
    const body = req.body
    console.log("entró en trayecto")
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Trayecto',
        })
    }

    const trayecto = new Trayecto(body)

    if (!trayecto) {
        return res.status(400).json({ success: false, error: err })
    }
    trayecto.titulo = trayecto.titulo.toUpperCase()
    trayecto
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: trayecto._id,
                message: 'Trayecto created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'trayecto not created!',
            })
        })
}

updateTrayecto = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Trayecto.findOne({ _id: req.params.id }, (err, trayecto) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'trayecto not found!',
            })
        }
        trayecto.solucion = body.solucion
        trayecto
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: trayecto._id,
                    message: 'trayecto updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'trayecto not updated!',
                })
            })
    })
}

deleteTrayecto = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Trayecto.findOne({ _id: req.params.id }, (err, trayecto) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'trayecto not found!',
            })
        }
        trayecto.activo = false
        trayecto
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: trayecto._id,
                    message: 'trayecto deleted!',
                })
            })
            .catch(error => {
              console.log("pinchoooooooo", error )
                return res.status(404).json({
                    error,
                    message: 'trayecto not updated!',
                })
            })
    })
}

getTrayectoById =  (req, res) => {
    // console.log(req.params.id)
     Trayecto.findOne({ _id: req.params.id }, (err, trayecto) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!trayecto) {
            return res
                .status(404)
                .json({ success: false, error: "trayecto not found" })
        }
        return res.status(200).json({ success: true, data: trayecto })
    })
}



getAllTrayectos = (req, res, next) => {
  
  const filtro = req.query

  //!tema y !autor
  let filtroFinal = {}

  //tema
  if (filtro.tema && filtro.tema != "TODOS") filtroFinal.tema = filtro.tema
  //autor
  if (filtro.user) filtroFinal.user = filtro.user
  //titulo
  if (filtro.titulo) filtroFinal.titulo =  { $regex: '.*' + filtro.titulo.toUpperCase() + '.*' }
  filtroFinal.activo = true;
  const limite = filtro.limite
  console.log("filtroFinal ",filtroFinal)
  Trayecto.find(filtroFinal, (err, trayectos)  => {
    if (err) {
        console.log("error ", err)
        return res.status(400).json({ success: false, error: err })
    }
    return res.status(200).json({ success: true, data: trayectos })
  }).sort({createdAt: -1}).limit(limite);

}








getLogin = async (req, res) => {
     res.render('login');
}

getRegister = async (req, res) => {
     res.render('register');
}

module.exports = {
    createTrayecto,
    updateTrayecto,
    deleteTrayecto,
    getAllTrayectos,
    getTrayectoById,
    getLogin,
    getRegister
}
