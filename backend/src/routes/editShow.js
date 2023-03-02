const express = require('express');
const router = express.Router();
const edit = require('../controllers/editShow');
const { authanticate } = require('../models/auth');

router.post('/api/v1/editshow',authanticate, edit.editShow);
router.post('/api/v1/getpatientbyid',authanticate, edit.editShow);
router.post('/api/v1/getpatientforsearch',authanticate, edit.editShow);
router.post('/api/v1/getsearchpatient',authanticate, edit.editShow);

module.exports = router;
