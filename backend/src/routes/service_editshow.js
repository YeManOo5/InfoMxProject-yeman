const express = require('express');
const router = express.Router();
const edit = require('../controllers/service_editshow');
const { authanticate } = require('../models/auth');

router.post('/api/v1/serviceeditshow',authanticate, edit.ServiceEditShow);

module.exports = router;