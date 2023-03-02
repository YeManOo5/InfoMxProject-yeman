const express = require('express');
const router = express.Router();
const gm = require('../controllers/gmreport');
const { authanticate } = require('../models/auth');

router.post('/api/v1/gmreport',authanticate, gm.gmReport);

module.exports = router;