const express = require('express');
const router = express.Router();
const dash = require('../controllers/dashboard');
const { authanticate } = require('../models/auth');

router.get('/api/v1/indi/FP',authanticate, dash.fp);
router.get('/api/v1/indi/HC',authanticate, dash.hc);
router.get('/api/v1/indi/GM',authanticate, dash.gm);
router.get('/api/v1/indi/PNC',authanticate, dash.pnc);
router.get('/api/v1/indi/DELI',authanticate, dash.deli);
router.get('/api/v1/indi/CHILD',authanticate, dash.child);
router.get('/api/v1/indi/FPRH',authanticate, dash.fprh);
router.get('/api/v1/indi/ANC',authanticate, dash.anc);
router.get('/api/v1/indi/RH',authanticate, dash.rh);


module.exports = router;