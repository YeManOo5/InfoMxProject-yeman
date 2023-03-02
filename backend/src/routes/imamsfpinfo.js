const express = require('express');
const router = express.Router();
const IMAMSFP = require('../controllers/imamsfpinfo');
const { authanticate } = require('../models/auth');

/* router.post('/api/v1/insertreg', authanticate, reg.insertReg);
router.put('/api/v1/updatereg', authanticate, reg.updateReg);
 */

router.post('/api/v1/insertIMAMSFP',authanticate,  IMAMSFP.insertIMAMSFP);
router.put('/api/v1/updateIMAMSFP',authanticate,  IMAMSFP.updateIMAMSFP);
router.put('/api/v1/deleteIMAMSFP',authanticate,  IMAMSFP.deleteIMAMSFP);

module.exports = router;