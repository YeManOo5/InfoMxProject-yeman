const express = require('express');
const router = express.Router();
const serviceLab = require('../controllers/rhservicedatabyid');
const { authanticate } = require('../models/auth');

router.post('/api/v1/rhservicedatabyid',authanticate, serviceLab.rhservicedatabyid);

module.exports = router;