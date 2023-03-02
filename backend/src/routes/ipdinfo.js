const express = require('express');
const router = express.Router();
const IPD = require('../controllers/ipdinfo');
const { authanticate } = require('../models/auth');

/* router.post('/api/v1/insertreg', authanticate, reg.insertReg);
router.put('/api/v1/updatereg', authanticate, reg.updateReg);
 */

router.post('/api/v1/insertIPD',authanticate,  IPD.insertIPD);
router.put('/api/v1/updateIPD',authanticate, IPD.updateIPD);
router.put('/api/v1/deleteIPD',authanticate,  IPD.deleteIPD);

module.exports = router;