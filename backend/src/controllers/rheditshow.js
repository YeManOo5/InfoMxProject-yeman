const fnErr = require('./fnErr');
const editShowModal = require('../models/rheditshow');

//....................GET ALL edit show Data....................//
exports.RHEditShow = fnErr(async(req, res, next) => {
    console.log('fp req query: ', req.body);
    
        /* //getAllRHPatient
        const getAllRHPatient = await editShowModal.getAllRHPatient(req.body)
        if(!getAllRHPatient) {next(new custErr("No Data Fount.", 404))} */

        //getPatientForSearch
        const getPatientForSearch = await editShowModal.getPatientForSearch(req.body)
        if(!getPatientForSearch) {next(new custErr("No Data Fount.", 404))}

        //getPatientByID
        const getPatientByID = await editShowModal.getPatientByID(req.body)
        if(!getPatientByID) {next(new custErr("No Data Fount.", 404))}

    return res.status(200).json({
        status: 200,
        data: {getPatientForSearch , getPatientByID }
      });
})




