const express = require('express');
const router = express.Router();
const delSer = require('../controllers/deleteregshow');
const { authanticate } = require('../models/auth');

router.post('/api/v1/deleteregshow',authanticate, delSer.deleteRegShow);

module.exports = router;