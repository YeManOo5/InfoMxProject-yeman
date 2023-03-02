const express = require('express');
const router = express.Router();
const DELI = require('../controllers/deliinfo');
const { authanticate } = require('../models/auth');

/* router.post('/api/v1/insertreg', authanticate, reg.insertReg);
router.put('/api/v1/updatereg', authanticate, reg.updateReg);
 */

router.post('/api/v1/insertDELI',authanticate,  DELI.insertDELI);
router.put('/api/v1/updateDELI',authanticate,  DELI.updateDELI);
router.put('/api/v1/deleteDELI',authanticate,  DELI.deleteDELI);

module.exports = router;