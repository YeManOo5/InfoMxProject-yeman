const CFRM = require('../models/cfrminfo');

const deletedata = require ('../models/deleteFunction');
const fnErr = require('../controllers/fnErr');
const moment = require('moment');
const custErr = require('../controllers/custErr');

//....................//Insert CFRM//....................//
exports.insertCFRM = async(req, res, next) => {
    let CFRMInsertedId = '';
    
    try{
        const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const {formData} = req.body;
       
        const CFRMres = await CFRM.insertCFRM(formData);
        console.log("CFRM CFRMres => ", CFRMres)
       
        return res.status(200).json({
            status: 201,
            message: 'success',
        });
    }catch(error){
        CFRMInsertedId ? await deletedata.deleteData({table: 'TBL_CFRM', Id: CFRMInsertedId}) : null;
       
        return next(error);
    }
   
};

//....................//update CFRM//....................//
exports.updateCFRM = async(req, res, next) => {
    let CFRMInsertedId = '';
    
    try{
        const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const {formData} = req.body;
       
        const CFRMres = await CFRM.updateCFRM(formData);
        console.log("CFRM CFRMres => ", CFRMres)
       
        return res.status(200).json({
            status: 201,
            message: 'success',
        });
    }catch(error){
        CFRMInsertedId ? await deletedata.deleteData({table: 'TBL_CFRM', Id: CFRMInsertedId}) : null;
       
        return next(error);
    }
   
};

 //....................//DELETE CFRM//....................//
exports.deleteCFRM = fnErr(async(req, res, next) => {
    console.log('delete CFRM reg req body: ', req.body);
    const result = await CFRM.deleteCFRM(req.body);
    console.log('delete CFRM Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})