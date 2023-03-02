const express = require('express');
const router = express.Router();
const RH = require('../controllers/rhinfo');
const { authanticate } = require('../models/auth');

/* router.post('/api/v1/insertreg', authanticate, reg.insertReg);
router.put('/api/v1/updatereg', authanticate, reg.updateReg);
 */

router.post('/api/v1/insertRH',authanticate,  RH.insertRH);
router.put('/api/v1/updateRH', authanticate, RH.updateRH);
router.put('/api/v1/deleteRH',authanticate,  RH.deleteRH);

module.exports = router;