const express = require('express');
const router = express.Router();
const serviceLab = require('../controllers/rhlabdatabyid');
const { authanticate } = require('../models/auth');

router.post('/api/v1/rhlabdatabyid',authanticate, serviceLab.rhlabdatabyid);

module.exports = router;