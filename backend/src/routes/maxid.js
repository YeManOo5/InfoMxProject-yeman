const express = require('express');
const router = express.Router();
const max = require('../controllers/maxid');
const { authanticate } = require('../models/auth');

router.post('/api/v1/getmaxid',authanticate,  max.maxid);

module.exports = router;