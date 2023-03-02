const express = require('express');
const router = express.Router();
const IMAM = require('../controllers/imaminfo');
const { authanticate } = require('../models/auth');

/* router.post('/api/v1/insertreg', authanticate, reg.insertReg);
router.put('/api/v1/updatereg', authanticate, reg.updateReg);
 */

router.post('/api/v1/insertIMAM',authanticate,  IMAM.insertIMAM);
router.put('/api/v1/updateIMAM',authanticate,  IMAM.updateIMAM);
router.put('/api/v1/deleteIMAM',authanticate,  IMAM.deleteIMAM);

module.exports = router;