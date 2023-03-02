const express = require('express');
const router = express.Router();
const del = require('../controllers/deleteservice');
const { authanticate } = require('../models/auth');

router.put('/api/v1/deleteservice',authanticate,  del.deleteService);


module.exports = router;