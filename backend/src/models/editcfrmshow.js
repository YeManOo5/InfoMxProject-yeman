//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.editCFRMShow = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("editCFRMShow parameter in database ===> " + a.orgID)

       //local 
         sql = await ` select ID,CFRMREGCODE from tbl_CFRM where CFRMFBSTATUS < 3`

        console.log('editCFRMShow in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('editCFRMShow result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.getCFRM = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("getCFRM parameter in database ===> " + a.orgID)

       //local 
         sql = await ` select * from tbl_cfrm where ID='${a.ID}'`

        console.log('getCFRM in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getCFRM result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

exports.getCFRMPatient = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("getCFRMPatient parameter in database ===> " + a.orgID)

       //local 
         sql = await `select ID,CFRMREGCODE,CFRMFBPERSON,FBDATE,SEX,AGE, VILNAME,TSPNAME,DIVNAME,PROJNAME,ORGNAME,ENTRYUSER,CFRMFBSTATUS STATUS from view_cfrmdisplay where ID='${a.ID}'`

        console.log('getCFRMPatient in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getCFRMPatient result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}