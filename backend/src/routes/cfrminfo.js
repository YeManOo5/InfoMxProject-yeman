const express = require('express');
const router = express.Router();
const CFRM = require('../controllers/cfrminfo');
const { authanticate } = require('../models/auth');

router.post('/api/v1/insertCFRM',authanticate,  CFRM.insertCFRM);
router.put('/api/v1/updateCFRM',authanticate,  CFRM.updateCFRM);
router.put('/api/v1/deleteCFRM',authanticate,  CFRM.deleteCFRM); 

module.exports = router;