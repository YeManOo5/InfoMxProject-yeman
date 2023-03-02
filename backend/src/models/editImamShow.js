//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.editImamShow = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(db);
        console.log('db connected: ', connection);
        console.log("editImamShow parameter in database ===> " + a.orgID)

       //local 
        /*  sql = await `select tbl_${a.sn}.Id,tbl_${a.sn}.${a.sn}providedDate ProvidedDate,apiuser.tbl_project.project_name, apiuser.tbl_division.div_Name,
        apiuser.tbl_township.tsp_Name TspName,apiuser.tbl_clinic.cln_Name ClnName,apiuser.tbl_org.org_ShortName OrgName,tbl_${a.sn}.${a.sn}Org Org
        from tbl_${a.sn},apiuser.tbl_clinic, apiuser.tbl_township, apiuser.tbl_division, apiuser.tbl_org, apiuser.tbl_project
        where tbl_${a.sn}.${a.sn}clnid=apiuser.tbl_clinic.cln_id and tbl_${a.sn}.${a.sn}tspid=apiuser.tbl_township.tsp_id
        and tbl_${a.sn}.${a.sn}divid= apiuser.tbl_division.div_id and tbl_${a.sn}.${a.sn}org= apiuser.tbl_org.org_id
        and tbl_${a.sn}.${a.sn}project=apiuser.tbl_project.project_id
        and tbl_${a.sn}.${a.sn}Org='${a.orgID}' and tbl_${a.sn}.${a.sn}Status<3`     */
        sql = await `select tbl_${a.sn}.Id,tbl_${a.sn}.${a.sn}providedDate ProvidedDate,apiuser.tbl_project.project_name, apiuser.tbl_division.div_Name,
        apiuser.tbl_township.tsp_Name TspName,apiuser.tbl_clinic.cln_Name ClnName,apiuser.tbl_org.org_ShortName OrgName,tbl_${a.sn}.${a.sn}Org Org
        from tbl_${a.sn},apiuser.tbl_clinic, apiuser.tbl_township, apiuser.tbl_division, apiuser.tbl_org, apiuser.tbl_project
        where tbl_${a.sn}.${a.sn}clnid=apiuser.tbl_clinic.cln_id and tbl_${a.sn}.${a.sn}tspid=apiuser.tbl_township.tsp_id
        and tbl_${a.sn}.${a.sn}divid= apiuser.tbl_division.div_id and tbl_${a.sn}.${a.sn}org= apiuser.tbl_org.org_id
        and tbl_${a.sn}.${a.sn}project=apiuser.tbl_project.project_id
        and tbl_${a.sn}.${a.sn}Status<3`     
        /*      //server
         sql = await `select tbl_${a.sn}.Id,tbl_${a.sn}.${a.sn}providedDate ProvidedDate,apiuser.tbl_project.project_name, apiuser.tbl_division.div_Name,
         apiuser.tbl_township.tsp_Name TspName,apiuser.tbl_clinic.cln_Name ClnName,apiuser.tbl_org.org_ShortName OrgName,tbl_${a.sn}.${a.sn}Org Org
         from tbl_${a.sn},apiuser.tbl_clinic, apiuser.tbl_township, apiuser.tbl_division, apiuser.tbl_org, apiuser.tbl_project
         where tbl_${a.sn}.${a.sn}clnid=apiuser.tbl_clinic.cln_id and tbl_${a.sn}.${a.sn}tspid=apiuser.tbl_township.tsp_id
         and tbl_${a.sn}.${a.sn}divid= apiuser.tbl_division.div_id and tbl_${a.sn}.${a.sn}org= apiuser.tbl_org.org_id
         and tbl_${a.sn}.${a.sn}project=apiuser.tbl_project.project_id
         and tbl_${a.sn}.${a.sn}Org='${a.orgID}' and tbl_${a.sn}.${a.sn}Status<3`  
    */

        console.log('editImamShow in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('editImamShow result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}