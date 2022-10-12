const Experiencia = require('../models/experiencia');
const Trayecto = require('../models/trayecto');



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
    experiencia.titulo = experiencia.titulo.toUpperCase()
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
        experiencia.solucion = body.solucion
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
        experiencia.activo = false
        experiencia
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: experiencia._id,
                    message: 'experiencia deleted!',
                })
            })
            .catch(error => {
              console.log("pinchoooooooo", error )
                return res.status(404).json({
                    error,
                    message: 'experiencia not updated!',
                })
            })
    })
}

getExperienciaById_deprecated =  (req, res) => {
    // console.log(req.params.id)
     Experiencia.findOne({ _id: req.params.id }, (err, experiencia) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!experiencia) {
            return res
                .status(404)
                .json({ success: false, error: "experiencia not found" })
        }
        return res.status(200).json({ success: true, data: experiencia })
    })
}

getExperienciaById = async (req, res, next) => {
    
    const exp = await Experiencia.findById(req.params.id).populate('trayecto');
    if (exp.trayecto) console.log("puto trayecto "+exp)
    if (!exp) {
        return next(new AppError('No tour found with that id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            exp
        }
    });
}

getAllExperiencias = (req, res, next) => {
  
  const filtro = req.query

  //!tema y !autor
  let filtroFinal = {}
  //trayecto
  if (filtro.trayectoid) filtroFinal.trayectoid =  filtro.trayectoid 
  //tema
  if (filtro.tema && filtro.tema != "TODOS") filtroFinal.tema = filtro.tema
  //autor
  if (filtro.user) filtroFinal.user = filtro.user
  //titulo
  if (filtro.titulo) filtroFinal.titulo =  { $regex: '.*' + filtro.titulo.toUpperCase() + '.*' }
  filtroFinal.activo = true;
  const limite = filtro.limite
  console.log("filtroFinal ",filtroFinal)
  Experiencia.find(filtroFinal, (err, experiencias)  => {
    if (err) {
        console.log("error ", err)
        return res.status(400).json({ success: false, error: err })
    }
    return res.status(200).json({ success: true, data: experiencias })
  }).sort({createdAt: -1}).limit(limite);

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
