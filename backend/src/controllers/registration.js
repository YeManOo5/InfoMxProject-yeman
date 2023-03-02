const Reg = require('../models/registration');
const fnErr = require('../controllers/fnErr');
const deletedata = require ('../models/deleteFunction');
const moment = require('moment');
const custErr = require('../controllers/custErr');


//....................//Insert Patient Registration//....................//
exports.insertReg = async(req, res, next) => {
    let imamsfpInsertedId = '';
    
    try{
        const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
        const {formData} = req.body;
        console.log("Reg req.body in regform ", formData)
        const imamsfpres = await Reg.insertRegform(req.body);
        console.log("Insert REG imamres => ", imamsfpres)
       
        return res.status(200).json({
            status: 201,
            message: 'success',
        });
    }catch(error){
        imamsfpInsertedId ? await deletedata.deleteData({table: 'TBL_REG', Id: imamsfpInsertedId}) : null;
       
        return next(error);
    }
   
};
exports.insertReg2 = fnErr(async(req, res, next) => {
    console.log('insert patient reg req body: ', req.body);
    const result = await Reg.insertReg(JSON.stringify(req.body) );
    console.log('Insert Reg Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})

//....................//Update Patient Registration//....................//
exports.updateReg = fnErr(async(req, res, next) => {
    let imamsfpUpdateId = '';
     
     try{
         const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
         const {formData} = req.body;
         console.log('update patient reg req body: ', req.body);
         const imamsfpres = await Reg.updateRegform(req.body);
         console.log("Update REG imamres => ", imamsfpres);
         return res.status(200).json({
             status: 201,
             message: 'success',
         });
     }catch(error){
         imamsfpUpdateId ? await deletedata.deleteData({table: 'TBL_REG', Id: imamsfpUpdateId}) : null;
         
         return next(error);
     }
 })
exports.updateReg2 = fnErr(async(req, res, next) => {
    console.log('update patient reg req body: ', req.body);
    const result = await Reg.updateReg(req.body);
    console.log('update Reg Result ====== ', result);
    return res.status(200).json({
        status: 201,
        message: 'success',
    });
})