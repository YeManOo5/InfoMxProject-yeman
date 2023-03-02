const express = require('express');
const router = express.Router();
const delSer = require('../controllers/deleteserviceshow');
const { authanticate } = require('../models/auth');

router.post('/api/v1/deleteserviceshow',authanticate, delSer.deleteServiceShow);

module.exports = router;