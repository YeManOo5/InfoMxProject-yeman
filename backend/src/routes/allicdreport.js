const express = require('express');
const router = express.Router();
const icd = require('../controllers/allicdreport');
const { authanticate } = require('../models/auth');

router.post('/api/v1/allicdreport', authanticate, icd.allicdreport);

module.exports = router;