const express = require('express');
const router = express.Router();
const edit = require('../controllers/editmdsrshow');
const { authanticate } = require('../models/auth');

router.post('/api/v1/editmdsrshow',authanticate, edit.editMDSRShow);
router.post('/api/v1/getmdsrpatient',authanticate, edit.getMDSRPatient);
router.post('/api/v1/getmdsr',authanticate, edit.getMDSR);
/* router.post('/api/v1/getpatientbyid', edit.editShow);
router.post('/api/v1/getpatientforsearch', edit.editShow);
router.post('/api/v1/getsearchpatient', edit.editShow);
 */
module.exports = router;
