const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/dashboardLink');
const { authanticate } = require('../models/auth');

router.post('/api/v1/getDashboardLink',authanticate, dashboard.getDashboardLink);

module.exports = router;
