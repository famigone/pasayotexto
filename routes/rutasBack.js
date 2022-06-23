const express = require('express'); //import express
const passport = require('../passport');
// 1.
const router  = express.Router();
// 2.
const ExpCtrl = require('../controllers/ctrlExperiencia');
const UserCtrl = require('../controllers/ctrlUser');
///////////////////////////////////////////////////////////////////////////
//EXPERIENCIAS
router.post('/experiencia', ExpCtrl.createExperiencia)
router.get('/experiencias', ExpCtrl.getAllExperiencias)
router.put('/experiencia/:id', ExpCtrl.updateExperiencia)
router.delete('/experiencia/:id', ExpCtrl.deleteExperiencia)
router.get('/experiencia/:id', ExpCtrl.getExperienciaById)

///////////////////////////////////////////////////////////////////////////
//user
router.get('/user/session', UserCtrl.getHome)
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
