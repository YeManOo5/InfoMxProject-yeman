const express = require('express');
const router = express.Router();
const RH = require('../controllers/fpinfo');
const { authanticate } = require('../models/auth');

/* router.post('/api/v1/insertreg', authanticate, reg.insertReg);
router.put('/api/v1/updatereg', authanticate, reg.updateReg);
 */

router.post('/api/v1/insertFP',authanticate,  RH.insertFP);
router.put('/api/v1/updateFP',authanticate,  RH.updateFP);
router.put('/api/v1/deleteFP',authanticate,  RH.deleteFP);

module.exports = router;