const express = require('express');
const router = express.Router();
const service = require('../controllers/villagebyorgproj');
const { authanticate } = require('../models/auth');

router.post('/api/v1/getvillagebyorgproj',authanticate, service.getVillageByOrgProj);


module.exports = router;