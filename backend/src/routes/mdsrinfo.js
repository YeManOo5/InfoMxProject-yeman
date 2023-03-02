const express = require('express');
const router = express.Router();
const MDSR = require('../controllers/mdsrinfo');
const { authanticate } = require('../models/auth');

router.post('/api/v1/insertMDSR',authanticate,  MDSR.insertMDSR);
router.put('/api/v1/updateMDSR',authanticate,  MDSR.updateMDSR);
router.put('/api/v1/deleteMDSR',authanticate,  MDSR.deleteMDSR);

module.exports = router;