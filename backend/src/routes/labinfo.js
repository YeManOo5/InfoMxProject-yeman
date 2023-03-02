const express = require('express');
const router = express.Router();
const Lab = require('../controllers/labinfo');
const { authanticate } = require('../models/auth');

router.post('/api/v1/insertLab',authanticate,  Lab.insertLab);
router.put('/api/v1/updateLab',authanticate,  Lab.updateLab);
router.put('/api/v1/deleteLab',authanticate,  Lab.deleteLab);

module.exports = router;