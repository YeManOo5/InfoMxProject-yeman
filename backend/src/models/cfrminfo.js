//Module
const oracledb = require('oracledb');
const moment = require('moment');
//Models
const { db } = require('./database');
const merr = require('../controllers/merr');

//Loaddash
const _ = require('lodash');
const { NUMBER } = require('oracledb');

//....................//Insert CFRM information//....................//
exports.insertCFRM = merr(async (data) => {
    let val = [];
    let idata = [];
    let qData = [];
    Object.keys(data).forEach((o) => {
      if(data[o]){
        val.push(o);
        if(!isNaN(data[o])){
            idata.push(data[o])
        } 
        else if(moment(data[o], moment.ISO_8601, true).isValid()) {
            idata.push(`TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`);
        }
        else {
          idata.push(`'${data[o]}'`)
        }
      }
  
    });
    console.log('Val ===', val);
    console.log('Idata ===',val +'=' + idata);
    console.log('Q Data =====', qData);
    const connection = await oracledb.getConnection(db);
    const sql = await `INSERT INTO TBL_CFRM (${val.join(', ')}) VALUES (${idata.join(', ')})`;
    console.log("SQL from insertCFRM=>", sql)
    const result = await connection.execute(sql, [], { autoCommit: true });
    await connection.close();
    return result;
  })

  //....................//Update CFRM information//....................//
exports.updateCFRM = merr(async (data) => {

  let val = [];
  let idata = [];
  let qData = [];
  let wData = [];
  Object.keys(data).forEach((o) => {
    if (data[o]) {
      
      if (!isNaN(data[o])) {
        
        if (o === 'ID' || o === 'CFRMFBORG') {
          wData.push(o + '=' + data[o])
        }
        else { qData.push(o + '=' + data[o]) }

      } 
      else if(moment(data[o], moment.ISO_8601, true).isValid())
      {
        qData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`)
      }
      else {
        
        if (o === 'ID' || o === 'CFRMFBORG') { wData.push(o + '=' + `'${data[o]}'`) }
        else { qData.push(o + '=' + `'${data[o]}'`) }

      }

    }

  });
  console.log('Val ===', val);
  console.log('Idata ===', idata);
  console.log('Q Data =====', qData);
  console.log('W Data =====', wData);
  const connection = await oracledb.getConnection(db);
  const sql = await `UPDATE TBL_CFRM SET ${qData.join(', ')} WHERE ${wData.join(' and ')}`
  console.log("SQL from CFRMUpdate=>", sql)
  const result = await connection.execute(sql, [], { autoCommit: true });
  await connection.close();
  return result;
});

//....................//Delete CFRM information//....................//
const date = require('date-and-time')
exports.deleteCFRM = merr(async (a) => {
  console.log("a from models CFRM => ", a)
  const pdate = new Date()
  const pTime = date.format(pdate, 'YYYY/MM/DD HH:mm:ss');
  console.log('CFRM Date ============> ', pdate)
  const connection = await oracledb.getConnection(db);
  const sql = await `UPDATE TBL_CFRM SET CFRMFBSTATUS=3, 
  CFRMFBUPDATE=TO_DATE('${pTime}','YYYY-MM-DD HH24:MI:SS') WHERE ID=${a.ID}`;

  console.log("CFRM DELETE QUERY => ", sql)
  const result = await connection.execute(sql, {}, { autoCommit: true });
  console.log('UPDATE Delete status model result: ', result);
  await connection.close();
  return result;
});