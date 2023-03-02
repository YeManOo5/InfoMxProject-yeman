//Module
const oracledb = require('oracledb');

//Models
const { db } = require('./database');
const merr = require('../controllers/merr');

//Loaddash
const _ = require('lodash');
const { NUMBER } = require('oracledb');

const moment = require('moment');

//....................//Insert Patient Registration//....................//
exports.insertRegform = merr(async (data) => {
  let val = [];
  let idata = [];
  let qData = [];
  console.log("Data from model ", data)
  Object.keys(data).forEach((o) => {
    if (data[o]) {
      val.push(o);
      if (!isNaN(data[o])) {
        idata.push(data[o])
        qData.push(o + '=' + data[o])
      } else if (moment(data[o], moment.ISO_8601, true).isValid()) {
        idata.push(`TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`);
      } else {
        idata.push(`'${data[o]}'`)
        qData.push(o + '=' + `'${data[o]}'`)
      }

    }

  });
  console.log('Val ===', val);
  console.log('Idata ===', idata);
  console.log('Q Data =====', qData);
  const connection = await oracledb.getConnection(db);
  const sql = await `INSERT INTO TBL_REG (${val.join(', ')}) VALUES (${idata.join(', ')})`;
  console.log("SQL from INSERT REG =>", sql)
  const result = await connection.execute(sql, [], { autoCommit: true });
  await connection.close();
  return result;
})

exports.insertReg2 = merr(async (b) => {

  let a = await JSON.parse(b)
  console.log("a from models ", a)
  const connection = await oracledb.getConnection(db);
  const sql = `INSERT INTO TBL_REG VALUES (:REGID,:REGNAME,:REGDATE,:REGORG,:REGPLACE,:REGVILLAGE,:REGAGE,:REGAGEUNIT,:REGSEX,:REGTYPE,:REGEDU,:REGJOB,:REGMARITAL,:REGSPOUSE,
    :REGMOTHER,:REGFATHER,:REGADDRESS,:REGPH,:REGETHNIC, :REGREFFROM,:REGREMARK,:REGUSRLOGIN,:REGINSERT,:REGUPDATE,:REGSTATUS,:REGSYNC ,
    :REGETHNICO
    ,:REGMIGRANT
    ,:REGIDP
    ,:REGDSEE
    ,:REGDHEAR
    ,:REGDWALK
    ,:REGDREMBR
    ,:REGDWASH
    ,:REGDCOMMU
    ,:REGDISABILITY)`;

  const data = [{
    regId: a.REGID, regName: a.REGNAME, regDate: new Date(a.REGDATE), regOrg: a.REGORG, regPlace: Number(a.REGPLACE),
    regVillage: a.REGVILLAGE, regAge: Number(a.REGAGE), regAgeUnit: Number(a.REGAGEUNIT), regSex: Number(a.REGSEX),
    regType: Number(a.REGTYPE), regEdu: Number(a.REGEDU), regJob: a.REGJOB || null, regMarital: Number(a.REGMARITAL),
    regSpouse: a.REGSPOUSE || null, regMother: a.REGMOTHER, regFather: a.REGFATHER, regAddress: a.REGADDRESS,
    regPh: a.REGPH || null, regEthnic: a.REGETHNIC, regReffrom: a.REGREFFROM,
    regRemark: a.REGREMARK, regUsrLogin: a.REGUSRLOGIN, regInsert: new Date(), regUpdate: new Date(),
    regStatus: 1, regSync: 0, regEthnico: a.REGETHNICO,
    regMigrant: Number(a.REGMIGRANT),
    regIdp: Number(a.REGIDP),
    regDsee: Number(a.REGDSEE),
    regDhear: Number(a.REGDHEAR),
    regDwalk: Number(a.REGDWALK),
    regDrem: Number(a.REGDREMBR),
    regDwash: Number(a.REGDWASH),
    regDcom: Number(a.REGDCOMMU),
    regDis: Number(a.REGDISABILITY)
  }];
  console.log("bind data ===== ", data);

  const options = {
    autoCommit: true,
    bindDefs: {
      "regId": { type: oracledb.STRING, maxSize: 20 },
      "regName": { type: oracledb.STRING, maxSize: 20 },
      "regDate": { type: oracledb.DATE },
      "regOrg": { type: oracledb.STRING, maxSize: 10 },
      "regPlace": { type: oracledb.NUMBER },
      "regVillage": { type: oracledb.STRING, maxSize: 20 },
      "regAge": { type: oracledb.NUMBER },
      "regAgeUnit": { type: oracledb.NUMBER },
      "regSex": { type: oracledb.NUMBER },
      "regType": { type: oracledb.NUMBER },
      "regEdu": { type: oracledb.NUMBER },
      "regJob": { type: oracledb.STRING, maxSize: 30 },
      "regMarital": { type: oracledb.NUMBER },
      "regSpouse": { type: oracledb.STRING, maxSize: 30 },
      "regMother": { type: oracledb.STRING, maxSize: 30 },
      "regFather": { type: oracledb.STRING, maxSize: 30 },
      "regAddress": { type: oracledb.STRING, maxSize: 100 },
      "regPh": { type: oracledb.STRING, maxSize: 30 },
      "regEthnic": { type: oracledb.STRING, maxSize: 100 },
      "regReffrom": { type: oracledb.STRING, maxSize: 1000 },
      "regRemark": { type: oracledb.STRING, maxSize: 255 },
      "regUsrLogin": { type: oracledb.STRING, maxSize: 100 },
      "regInsert": { type: oracledb.DATE },
      "regUpdate": { type: oracledb.DATE },
      "regStatus": { type: oracledb.NUMBER },
      "regSync": { type: oracledb.NUMBER },
      "regEthnico": { type: oracledb.STRING, maxSize: 100 },
      "regMigrant": { type: oracledb.NUMBER },
      "regIdp": { type: oracledb.NUMBER },
      "regDsee": { type: oracledb.NUMBER },
      "regDhear": { type: oracledb.NUMBER },
      "regDwalk": { type: oracledb.NUMBER },
      "regDrem": { type: oracledb.NUMBER },
      "regDwash": { type: oracledb.NUMBER },
      "regDcom": { type: oracledb.NUMBER },
      "regDis": { type: oracledb.NUMBER },
    }
  };
  console.log("Reg Sql ==>", sql)
  const result = await connection.executeMany(sql, data, options);
  console.log('insert reg model result: ', result);
  await connection.close();
  return result;
});


//....................//Update Patient Registration//....................//

exports.updateRegform = merr(async (data) => {
  let val = [];
  let idata = [];
  let qData = [];
  let wData = [];
  Object.keys(data).forEach((o) => {
    if (data[o]) {
      
      if (!isNaN(data[o])) {
        
        if (o === 'REGID' || o === 'REGORG') {
          wData.push(o + '=' + data[o])
        }
        else { qData.push(o + '=' + data[o]) }

      } else if (moment(data[o], moment.ISO_8601, true).isValid() && o!='REGDATE') {
        
        if (o === 'REGID' || o === 'REGORG') {
          wData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`)
        }
        else { qData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD HH24:MI:SS')`) }

      }
      else if(moment(data[o], moment.ISO_8601, true).isValid() && o==='REGDATE')
      {
        qData.push(o + '=' + `TO_DATE('${data[o]}', 'YYYY-MM-DD')`)
      }
      else {
        
        if (o === 'REGID' || o === 'REGORG') { wData.push(o + '=' + `'${data[o]}'`) }
        else { qData.push(o + '=' + `'${data[o]}'`) }

      }

    }

  });
  console.log('Val ===', val);
  console.log('Idata ===', idata);
  console.log('Q Data =====', qData);
  console.log('W Data =====', wData);
  const connection = await oracledb.getConnection(db);
  const sql = await `UPDATE TBL_REG SET ${qData.join(', ')} WHERE ${wData.join(' and ')}`
  console.log("SQL from REG update=>", sql)
  const result = await connection.execute(sql, [], { autoCommit: true });
  await connection.close();
  return result;
});

exports.updateReg2 = merr(async (a) => {
  console.log("a from models reg => ", a)
  const connection = await oracledb.getConnection(db);
  const sql = "UPDATE TBL_REG SET REGNAME=:regName, REGDATE=:regDate, REGORG=:regOrg, REGPLACE=:regPlace, REGVILLAGE=:regVillage, REGAGE=:regAge, REGAGEUNIT=:regAgeUnit, REGSEX=:regSex, REGTYPE=:regType, REGEDU=:regEdu, REGJOB=:regJob, REGMARITAL=:regMarital, REGSPOUSE=:regSpouse, REGMOTHER=:regMother, REGFATHER=:regFather, REGADDRESS=:regAddress, REGPH=:regPh, REGETHNIC=:regEthnic, REGREFFROM=:regReffrom, REGREMARK=:regRemark, REGUSRLOGIN=:regUsrLogin, REGUPDATE=:regUpdate, REGSTATUS=:regStatus, REGETHNICO=:regEthnico  WHERE REGID=:regid ";
  const binds = {
    regName: a.REGNAME, regDate: new Date(a.REGDATE), regOrg: a.REGORG, regPlace: a.REGPLACE, regVillage: a.REGVILLAGE,
    regAge: a.REGAGE, regAgeUnit: a.REGAGEUNIT, regSex: a.REGSEX, regType: a.REGTYPE, regEdu: a.REGEDU,
    regJob: a.REGJOB || null, regMarital: a.REGMARITAL, regSpouse: a.REGSPOUSE || null, regMother: a.REGMOTHER,
    regFather: a.REGFATHER, regAddress: a.REGADDRESS, regPh: a.REGPH || null, regEthnic: a.REGETHNIC, regEthnico: a.REGETHNICO, regReffrom: a.REGREFFROM,
    regRemark: a.REGREMARK, regUsrLogin: a.REGUSRLOGIN, regUpdate: new Date(), regStatus: 2, regid: a.REGID
  };

  const result = await connection.execute(sql, binds, { autoCommit: true });
  console.log('update reg model result: ', result);
  await connection.close();
  return result;
});