const fnErr = require('./fnErr');
const editShowModal = require('../models/editcfrmshow');

//....................GET ALL editCFRMShow Data....................//
exports.editCFRMShow = fnErr(async(req, res, next) => {
    console.log('editCFRMShow req query: ', req.body);
    
        //getAllImamPatitent
        const editCFRMShow = await editShowModal.editCFRMShow(req.body)
        if(!editCFRMShow) {next(new custErr("No Data Fount.", 404))} 

    return res.status(200).json({
        status: 200,
        data: {editCFRMShow}
      });
})

//....................GET ALL editCFRMShow Data....................//
exports.getCFRMPatient = fnErr(async(req, res, next) => {
    console.log('getCFRMPatient req query: ', req.body);
    
        //getCFRMPatient
        const getCFRMPatient = await editShowModal.getCFRMPatient(req.body)
        if(!getCFRMPatient) {next(new custErr("No Data Fount.", 404))} 

    return res.status(200).json({
        status: 200,
        data: {getCFRMPatient}
      });
})

//....................GET CFRM Data....................//
exports.getCFRM = fnErr(async(req, res, next) => {
    console.log('getCFRM req query: ', req.body);
    
        //getCFRM
        const getCFRM = await editShowModal.getCFRM(req.body)
        if(!getCFRM) {next(new custErr("No Data Fount.", 404))} 

    return res.status(200).json({
        status: 200,
        data: {getCFRM}
      });
})