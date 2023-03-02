const express = require('express');
const router = express.Router();
const edit = require('../controllers/editcfrmshow');
const { authanticate } = require('../models/auth');

router.post('/api/v1/editcfrmshow',authanticate, edit.editCFRMShow);
router.post('/api/v1/getcfrmpatient',authanticate, edit.getCFRMPatient);
router.post('/api/v1/getcfrm',authanticate, edit.getCFRM);
/* router.post('/api/v1/getpatientbyid', edit.editShow);
router.post('/api/v1/getpatientforsearch', edit.editShow);
router.post('/api/v1/getsearchpatient', edit.editShow);
 */
module.exports = router;
