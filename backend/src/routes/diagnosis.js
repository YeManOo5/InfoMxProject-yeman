const express = require('express');
const router = express.Router();
const diagnosis = require('../controllers/diagnosis');
const { authanticate } = require('../models/auth');

router.post('/api/v1/getdiagnosis',authanticate, diagnosis.getDiagnosis);
router.post('/api/v1/getimci',authanticate, diagnosis.getDiagnosis);


module.exports = router;