const express = require('express');
const router = express.Router();
const fp = require('../controllers/fpreport');
const { authanticate } = require('../models/auth');

router.post('/api/v1/fpreport',authanticate, fp.fpReport);

module.exports = router;