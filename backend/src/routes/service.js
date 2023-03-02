const express = require('express');
const router = express.Router();
const service = require('../controllers/service');
const { authanticate } = require('../models/auth');

router.post('/api/v1/getpatient',authanticate, service.getPatient);
router.post('/api/v1/getpatienttype',authanticate, service.getPatient);


module.exports = router;
