const express = require('express');
const router = express.Router();
const ANC = require('../controllers/ancinfo');
const { authanticate } = require('../models/auth');

/* router.post('/api/v1/insertreg', authanticate, reg.insertReg);
router.put('/api/v1/updatereg', authanticate, reg.updateReg);
 */

router.post('/api/v1/insertANC',authanticate,  ANC.insertANC);
router.put('/api/v1/updateANC',authanticate,  ANC.updateANC);
router.put('/api/v1/deleteANC',authanticate,  ANC.deleteANC);

module.exports = router;