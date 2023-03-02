const express = require('express');
const router = express.Router();
const core = require('../controllers/core');
const { authanticate } = require('../models/auth');

router.get('/api/v1/project',authanticate, core.project);
router.get('/api/v1/org',authanticate, core.org);
router.get('/api/v1/state',authanticate, core.state);
router.get('/api/v1/division',authanticate, core.division);
router.post('/api/v1/tspdiv',authanticate, core.getTspByDiv);
router.post('/api/v1/villagetsp',authanticate, core.getVillageByTsp);
router.post('/api/v1/clinictsp',authanticate, core.getClinicByTsp);
router.post('/api/v1/allorg',authanticate, core.getAllOrg);
router.get('/api/v1/getAllTownship',authanticate, core.getAllTownship);
router.get('/api/v1/getTownshipMDSR',authanticate, core.getTownshipMDSR);
router.get('/api/v1/tsp',authanticate, core.tsp);
router.get('/api/v1/clinic',authanticate, core.clinic);
router.get('/api/v1/indi',authanticate, core.indi)
router.get('/api/v1/service',authanticate, core.service)

module.exports = router;