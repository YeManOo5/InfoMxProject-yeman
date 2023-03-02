const express = require('express');
const router = express.Router();
const fprh = require('../controllers/fprhreport');
const { authanticate } = require('../models/auth');

router.post('/api/v1/fprhreport',authanticate, fprh.fprhReport);

module.exports = router;