//Module
const oracledb = require('oracledb');

//Models
const { apidb, db } = require('./database');

//Helper
const ck = require('../helper/checkTbl');

//Loaddash
const _ = require('lodash')

exports.getVillageByOrgProj = async (a) => {
    try {
        let sql = await '';
        const connection = await oracledb.getConnection(apidb);
        console.log('db connected: ', connection);
        console.log("getVillageByOrgProj parameter in database ===> " + a.orgID, a.projID)
        if ((a.orgID === 'CPI-05' || a.orgID === 'CPI-06' || a.orgID === 'CPI-07') && a.projID === 'P-001') {
            sql = `select tbl_village_org_proj.village_code,tbl_village.village_name,tbl_clinic.cln_name,tbl_village_org_proj.proj_code ,
            tbl_village_org_proj.org_code,tbl_village_org_proj.cln_code,tbl_village_org_proj.tsp_code,tbl_project.project_name
            from  tbl_village_org_proj
            left join tbl_village on tbl_village_org_proj.village_code=tbl_village.village_code
            left join tbl_clinic on  tbl_village_org_proj.cln_code=tbl_clinic.cln_id
            left join tbl_project  on tbl_village_org_proj.proj_code = tbl_project.project_ID
            where tbl_village_org_proj.vop_infomx=1 and tbl_village_org_proj.vop_status=1     
           and tbl_village_org_proj.proj_code in ('${a.projID}')
   order by tbl_village.village_name asc`
        }
        else if ((a.orgID === 'CPI-16' || a.orgID === 'CPI-05' || a.orgID === 'CPI-99') && a.projID === 'P-990') {
            sql = `select tbl_village_org_proj.village_code,tbl_village.village_name,tbl_clinic.cln_name,tbl_village_org_proj.proj_code ,
           tbl_village_org_proj.org_code,tbl_village_org_proj.cln_code,tbl_village_org_proj.tsp_code,tbl_project.project_name,TBL_division.div_name,TBL_division.div_id,tbl_township.tsp_name
           from  tbl_village_org_proj,tbl_village,tbl_clinic,tbl_project,tbl_township,TBL_division
           where tbl_village_org_proj.village_code=tbl_village.village_code
           and tbl_village_org_proj.cln_code=tbl_clinic.cln_id
           and tbl_village_org_proj.vop_infomx=1 and tbl_village_org_proj.vop_status=1
           and tbl_village_org_proj.proj_code = tbl_project.project_ID
       and tbl_village_org_proj.tsp_code = tbl_township.tsp_id
           and tbl_township.div_id = tbl_division.div_id      
   order by tbl_village.village_name asc`
        } 
        else if ((a.orgID === 'CPI-05' || a.orgID === 'CPI-16') && (a.projID != 'P-001' || a.projID != 'P-008')) {
            sql = `select tbl_village_org_proj.village_code,tbl_village.village_name,tbl_clinic.cln_name,tbl_village_org_proj.proj_code ,
           tbl_village_org_proj.org_code,tbl_village_org_proj.cln_code,tbl_village_org_proj.tsp_code,tbl_project.project_name,TBL_division.div_name,TBL_division.div_id,tbl_township.tsp_name
           from  tbl_village_org_proj,tbl_village,tbl_clinic,tbl_project,tbl_township,TBL_division
           where tbl_village_org_proj.village_code=tbl_village.village_code
           and tbl_village_org_proj.cln_code=tbl_clinic.cln_id
	and tbl_village_org_proj.vop_status=1    
    and tbl_village_org_proj.proj_code = tbl_project.project_ID     
       and tbl_village_org_proj.tsp_code = tbl_township.tsp_id
           and tbl_township.div_id = tbl_division.div_id      
   order by tbl_village.village_name asc`
        } else if (a.orgID === 'CPI-05' && a.projID === 'P-008') {
            sql = `select tbl_village_org_proj.village_code,tbl_village.village_name,tbl_clinic.cln_name,tbl_village_org_proj.proj_code ,
            tbl_village_org_proj.org_code,tbl_village_org_proj.cln_code,tbl_village_org_proj.tsp_code,tbl_project.project_name
            from  tbl_village_org_proj
            left join tbl_village on tbl_village_org_proj.village_code=tbl_village.village_code
            left join tbl_clinic on  tbl_village_org_proj.cln_code=tbl_clinic.cln_id
            left join tbl_project  on tbl_village_org_proj.proj_code = tbl_project.project_ID
            where tbl_village_org_proj.vop_infomx=1 and tbl_village_org_proj.vop_status=1       
           and tbl_village_org_proj.proj_code in ('${a.projID}')  
   order by tbl_village.village_name asc`
        } 
        else if (a.orgID === 'CPI-20' && a.projID === 'P-008') {
            sql = `select tbl_village_org_proj.village_code,tbl_village.village_name,tbl_clinic.cln_name,tbl_village_org_proj.proj_code ,
            tbl_village_org_proj.org_code,tbl_village_org_proj.cln_code,tbl_village_org_proj.tsp_code,tbl_project.project_name
            from  tbl_village_org_proj
            left join tbl_village on tbl_village_org_proj.village_code=tbl_village.village_code
            left join tbl_clinic on  tbl_village_org_proj.cln_code=tbl_clinic.cln_id
            left join tbl_project  on tbl_village_org_proj.proj_code = tbl_project.project_ID
            where tbl_village_org_proj.vop_infomx=1 and tbl_village_org_proj.vop_status=1       
	and tbl_village_org_proj.org_code in ('${a.orgID}')
           and tbl_village_org_proj.proj_code in ('${a.projID}')
   order by tbl_village.village_name asc`
        }
        else if ((a.orgID === 'CPI-20' || a.orgID === 'CPI-13') && a.projID === 'P-027') {
            sql = `select tbl_village_org_proj.village_code,tbl_village.village_name,tbl_clinic.cln_name,tbl_village_org_proj.proj_code ,
            tbl_village_org_proj.org_code,tbl_village_org_proj.cln_code,tbl_village_org_proj.tsp_code,tbl_project.project_name
            from  tbl_village_org_proj
            left join tbl_village on tbl_village_org_proj.village_code=tbl_village.village_code
            left join tbl_clinic on  tbl_village_org_proj.cln_code=tbl_clinic.cln_id
            left join tbl_project  on tbl_village_org_proj.proj_code = tbl_project.project_ID
            where tbl_village_org_proj.vop_infomx=1 and tbl_village_org_proj.vop_status=1    
	and tbl_village_org_proj.org_code in ('${a.orgID}')
           and tbl_village_org_proj.proj_code in ('${a.projID}')
   order by tbl_village.village_name asc`
        } 
        else if (a.orgID === 'CPI-01' || a.orgID === 'CPI-08' || a.orgID === 'CPI-11' || a.orgID === 'CPI-14' || a.orgID === 'CPI-15' || a.orgID === 'CPI-19' || a.orgID === 'CPI-17') {
            sql = `select tbl_village_org_proj.village_code,tbl_village.village_name,tbl_clinic.cln_name,tbl_village_org_proj.proj_code ,
            tbl_village_org_proj.org_code,tbl_village_org_proj.cln_code,tbl_village_org_proj.tsp_code,tbl_project.project_name
            from  tbl_village_org_proj
            left join tbl_village on tbl_village_org_proj.village_code=tbl_village.village_code
            left join tbl_clinic on  tbl_village_org_proj.cln_code=tbl_clinic.cln_id
            left join tbl_project  on tbl_village_org_proj.proj_code = tbl_project.project_ID
            where tbl_village_org_proj.vop_infomx=1 and tbl_village_org_proj.vop_status=1 
	and tbl_village_org_proj.org_code in ('${a.orgID}')
           and tbl_village_org_proj.proj_code in ('${a.projID}')
   order by tbl_village.village_name asc`
        } else if (a.orgID === 'CPI-18' || a.orgID==='CPI-63' || a.orgID==='CPI-86') {
            sql = `select tbl_village_org_proj.village_code,tbl_village.village_name,tbl_clinic.cln_name,tbl_village_org_proj.proj_code ,
            tbl_village_org_proj.org_code,tbl_village_org_proj.cln_code,tbl_village_org_proj.tsp_code,tbl_project.project_name
            from  tbl_village_org_proj
            left join tbl_village on tbl_village_org_proj.village_code=tbl_village.village_code
            left join tbl_clinic on  tbl_village_org_proj.cln_code=tbl_clinic.cln_id
            left join tbl_project  on tbl_village_org_proj.proj_code = tbl_project.project_ID
            where tbl_village_org_proj.vop_infomx=1 and tbl_village_org_proj.vop_status=1    
	and tbl_village_org_proj.org_code in ('${a.orgID}')
           
   order by tbl_village.village_name asc`
        } else {
            sql = `select tbl_village_org_proj.village_code,tbl_village.village_name,tbl_clinic.cln_name,tbl_village_org_proj.proj_code ,
           tbl_village_org_proj.org_code,tbl_village_org_proj.cln_code,tbl_village_org_proj.tsp_code,tbl_project.project_name,TBL_division.div_name,TBL_division.div_id,tbl_township.tsp_name
           from  tbl_village_org_proj,tbl_village,tbl_clinic,tbl_project,tbl_township,TBL_division
           where tbl_village_org_proj.village_code=tbl_village.village_code
           and tbl_village_org_proj.cln_code=tbl_clinic.cln_id
           and tbl_village_org_proj.vop_infomx=1 and tbl_village_org_proj.vop_status=1
           and tbl_village_org_proj.proj_code = tbl_project.project_ID         
       and tbl_village_org_proj.tsp_code = tbl_township.tsp_id
           and tbl_township.div_id = tbl_division.div_id        
   order by tbl_village.village_name asc`
        }
        console.log('getVillageByOrgProj in sql =====> ' + sql)
        const result = await connection.execute(sql, [], {
            outFormat: oracledb.OBJECT
        });
        console.log('getVillageByOrgProj result: ', result.rows);
        await connection.close();
        return result.rows;
    } catch (error) {
        throw (error);
    }
}