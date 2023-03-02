const express = require('express');
const router = express.Router();
const lg = require('../controllers/login');
const { authanticate } = require('../models/auth');

router.get('/api/v1/login', authanticate, lg.login);

module.exports = router;