const express = require('express');
const router = express.Router();
const editAge = require('../controllers/editageshow');
const { authanticate } = require('../models/auth');

router.post('/api/v1/editageshow',authanticate, editAge.editAgeShow);

module.exports = router;