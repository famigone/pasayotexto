const express = require('express'); //import express
const passport = require('../passport');
const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
// 1.
const router  = express.Router();
// 2.
const ExpCtrl = require('../controllers/ctrlExperiencia');
const UserCtrl = require('../controllers/ctrlUser');
const CodeCtrl = require('../controllers/ctrlCodesesion');
const TrayectoCtrl = require('../controllers/ctrlTrayecto');
///////////////////////////////////////////////////////////////////////////
//TRAYECTOS
router.post('/trayecto', TrayectoCtrl.createTrayecto)
router.get('/trayectos',  TrayectoCtrl.getAllTrayectos)
router.put('/trayecto/:id', TrayectoCtrl.updateTrayecto)
router.delete('/trayecto/:id', TrayectoCtrl.deleteTrayecto)
router.get('/trayecto/:id', TrayectoCtrl.getTrayectoById)
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//EXPERIENCIAS

router.post('/experiencia', ExpCtrl.createExperiencia)
router.get('/experiencia/trayecto/:id', ExpCtrl.getExperienciaTrayectoById)
router.get('/experiencias',  ExpCtrl.getAllExperiencias)
router.put('/experiencia/:id', ExpCtrl.updateExperiencia)
router.delete('/experiencia/:id', ExpCtrl.deleteExperiencia)
router.get('/experiencia/:id', ExpCtrl.getExperienciaById)


///////////////////////////////////////////////////////////////////////////
//CODESESION
//router.post('/codesesion', ExpCtrl.createCodesesion)
//router.put('/codesesion/:id', ExpCtrl.updateCodesesion)
//router.get('/codesesion/:id', ExpCtrl.getCodesesionById)
router.get('/codesesion', CodeCtrl.getCodesesionByUser)
router.post('/codesesion', CodeCtrl.createCodesesion)
router.get('/codesesion/getone', CodeCtrl.getCodeSesion)
router.put('/codesesion/:id', CodeCtrl.updateCodesesion)
router.put('/codesesion/update/observacion/', CodeCtrl.updateCodesesionObservacion)
router.get('/allcodesesion/', CodeCtrl.getAllCodesesion)
///////////////////////////////////////////////////////////////////////////
//user

router.get('/user/session', UserCtrl.getHome)
router.get('/user/users', UserCtrl.getAllUser)
router.post('/user/logout', UserCtrl.postLogout)
router.post('/user/register', UserCtrl.postRegister)
router.post(
    '/user/login',
  //  passport.authenticate('local', { failureRedirect: '/login' }),
    UserCtrl.getLogin
)
///////////////////////////////////////////////////////////////////////////
// 4.
module.exports = router; // export to use in server.js
