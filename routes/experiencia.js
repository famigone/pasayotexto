const express = require('express'); //import express

// 1.
const router  = express.Router(); 
// 2.
const ExpCtrl = require('../controllers/experiencia'); 
// 3.
router.post('/experiencia', ExpCtrl.createExperiencia)
router.put('/experiencia/:id', ExpCtrl.updateExperiencia)
router.delete('/experiencia/:id', ExpCtrl.deleteExperiencia)
router.get('/experiencia/:id', ExpCtrl.getExperienciaById)
router.get('/experiencia', ExpCtrl.getExperiencias)
// 4. 
module.exports = router; // export to use in server.js

    