import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DateRangeIcon from '@mui/icons-material/DateRange';
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import CustomTextField from "../../components/controls/CustomTextFieldFilled";
import CustomUnicefTextField from '../../components/controls/CustomUnicefTextField'
import CustomSnackBar from "../../components/controls/CustomSnackBar";

import { insertReg, updateReg } from "../../modals/registration";
import { getVillageByOrg } from "../../modals/background";
import * as villageData from "../../modals/villagebyorgproj"
import { getPatientByID } from "../../modals/editShow";

import { Card } from "@mui/material";
import { Button, FormControl, InputLabel, MenuItem, Select, Snackbar, SnackbarContent, Typography } from "@material-ui/core";

import _ from 'lodash';
import Modals from "../../components/modal";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      flexGrow: 1
    }
  },
  "& .MuiFilledInput-root": {
    backgroundColor: "#fcf0f2"
  },
  fontSize: {
    "& span:last-child": {
      fontSize: 13
    }
  },
  cardStyle: {
    marginTop: theme.spacing(0.9),
    marginBottom: theme.spacing(1),
  },
  cardStyleTwo: {
    width: "100%",
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0.9),
    borderRadius: "3px"
  },
  selected: {
    backgroundColor: "#DED4DA !important",
    color: '#482642'
  }
}));

const radioTheme = createTheme({
  palette: {
    primary: {
      main: "#482642"
    },
    secondary: {
      main: "#ffff"
    }
  }
});

export default function RegisterForm(props) {

  const classes = useStyles();

  const history = useHistory();

  const [form, setForm] = useState({
    REGDATE: moment(new Date()).format("YYYY-MM-DD"),
    REGID: '',
    REGNAME: '',
    REGAGE: '',
    REGAGEUNIT: '365',
    REGSEX: '1',
    REGTYPE: '1',
    REGVILLAGE: '',
    REGPLACE: '1',
    REGMARITAL: '1',
    REGFATHER: '',
    REGMOTHER: '',
    REGETHNIC: '',
    REGREFFROM: '',
    REGREMARK: '',
    REGORG: sessionStorage.getItem('org'),
    REGEDU: '',
    REGJOB: sessionStorage.getItem('project'),
    REGSPOUSE: '',
    REGADDRESS: '',
    REGPH: '',
    REGUSRLOGIN: sessionStorage.getItem('userName'),
    REGINSERT: '',
    REGUPDATE: '',
    REGSTATUS: '',
    REGSYNC: '',
    REGETHNICO: '',
    REGMIGRANT: '999',
    REGIDP: '999',
    REGDSEE: '999',
    REGDHEAR: '999',
    REGDWALK: '999',
    REGDREMBR: '999',
    REGDWASH: '999',
    REGDCOMMU: '999',
    REGDISABILITY: '999'
  });

  const [gender, setGender] = useState("");
  const [unit, setUnit] = useState("");
  const [patientType, setPatientType] = useState("");
  const [registeredPlace, setRegisteredPlace] = useState("");
  const [marital, setMarital] = useState("")
  const [village, setVillage] = useState([])
  const [selectedVillage, setSelectedVillage] = useState("")

  ////Valuables for Validating All Input Data When Save Button is Clickd//////


  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [dateValid, setDateValid] = useState(false)
  const [codeValid, setCodeValid] = useState(false)
  const [nameValid, setNameValid] = useState(false)
  const [ageValid, setAgeValid] = useState(false)
  const [unitValid, setUnitValid] = useState(false)
  const [genderValid, setGenderValid] = useState(false)
  const [typeValid, setTypeValid] = useState(false)
  const [villageValid, setVillageValid] = useState(false)
  const [placeValid, setPlaceValid] = useState(false)
  const [snackText, setSnackText] = useState("")
  const [successSnack, setSuccessSnack] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)

  //for edit control
  const [editShow, setEditShow] = useState(false)

  //background data
  const [registeredPatient, setRegisteredPatient] = useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fn = async () => {

      const editSession = sessionStorage.getItem('editPatient')
      const editProps = props.editPage
      const village = await villageData.getVillageByOrgProj()

      if (village.data.data.getVillageByOrgProj.length) {
        setVillage(village.data.data.getVillageByOrgProj);
        setForm({ ...form, REGVILLAGE: village.data.data.getVillageByOrgProj[0].VILLAGE_CODE })
        console.log("Village Data ===> ", village.data.data.getVillageByOrgProj)
      }
      console.log("EditSession ===> ", editSession)
      console.log("EditProps ===> ", editProps)
      if (editSession === "true" || editProps === "true") {
        setLoading(true)
        const regPatient = await getPatientByID();
        if (regPatient) {
          setRegisteredPatient(...regPatient.data.data.getPatientByID)
          console.log("Patient before update data in reg Form (getPatientByID)", registeredPatient)

        }
        if (registeredPatient) {
          let id = await registeredPatient.REGID;
          /* let date = new Date(registeredPatient.REGDATE).toISOString()
          .slice(0, 10); */
          let date = await moment(registeredPatient.REGDATE).format("YYYY-MM-DD")
          let name = await registeredPatient.REGNAME;
          let age = await registeredPatient.REGAGE;
          let ageUnit = await (registeredPatient.REGAGEUNIT === 365) ? "365" :
            (registeredPatient.REGAGEUNIT === 30) ? "30" : "1";
          let gender = await (registeredPatient.REGSEX === 1) ? "1" : "2";
          let type = await (registeredPatient.REGTYPE === 1) ? "1" : "2";
          let village = await registeredPatient.REGVILLAGE;
          let place = await (registeredPatient.REGPLACE === 1) ? "1" :
            (registeredPatient.REGPLACE === 2) ? "2" : "3";
          let marital = await (registeredPatient.REGMARITAL === 1) ? "1" :
            (registeredPatient.REGMARITAL === 2) ? "2" :
              (registeredPatient.REGMARITAL === 3) ? "3" :
                (registeredPatient.REGMARITAL === 4) ? "4" :
                  (registeredPatient.REGMARITAL === 5) ? "5" : "6";
          let father = await registeredPatient.REGFATHER;
          let mother = await registeredPatient.REGMOTHER;
          let ethnic = await registeredPatient.REGETHNIC;
          let ethnico = await registeredPatient.REGETHNICO;
          let refer = await registeredPatient.REGREFFROM;
          let remark = await registeredPatient.REGREMARK;
          let org = await registeredPatient.REGORG;
          let edu = await registeredPatient.REGEDU;
          let job = await registeredPatient.REGJOB;
          let spouse = await registeredPatient.REGSPOUSE;
          let address = await registeredPatient.REGADDRESS;
          let ph = await registeredPatient.REGPH;
          let userLogin = await registeredPatient.REGUSRLOGIN;
          let insert = await  moment(registeredPatient.REGINSERT).format('YYYY-MM-DD hh:mm:ss');
          let update = await  moment(registeredPatient.REGUPDATE).format('YYYY-MM-DD hh:mm:ss');
          let status = await registeredPatient.REGSTATUS;
          let sync = await registeredPatient.REGSYNC;
          let migrant = await registeredPatient.REGMIGRANT === 1 ? '1' : registeredPatient.REGMIGRANT === 2 ? '2' : '999'
          let idp = await registeredPatient.REGIDP === 1 ? '1' : registeredPatient.REGIDP === 2 ? '2' : '999'
          let see = await registeredPatient.REGDSEE === 1 ? '1' :
            registeredPatient.REGDSEE === 2 ? '2' :
              registeredPatient.REGDSEE === 3 ? '3' :
                registeredPatient.REGDSEE === 4 ? '4' : '9'
          let hear = await registeredPatient.REGDHEAR === 1 ? '1' :
            registeredPatient.REGDHEAR === 2 ? '2' :
              registeredPatient.REGDHEAR === 3 ? '3' :
                registeredPatient.REGDHEAR === 4 ? '4' : '9'
          let walk = await registeredPatient.REGDWALK === 1 ? '1' :
            registeredPatient.REGDWALK === 2 ? '2' :
              registeredPatient.REGDWALK === 3 ? '3' :
                registeredPatient.REGDWALK === 4 ? '4' : '9'
          let rem = await registeredPatient.REGDREMBR === 1 ? '1' :
            registeredPatient.REGDREMBR === 2 ? '2' :
              registeredPatient.REGDREMBR === 3 ? '3' :
                registeredPatient.REGDREMBR === 4 ? '4' : '9'
          let wash = await registeredPatient.REGDWASH === 1 ? '1' :
            registeredPatient.REGDWASH === 2 ? '2' :
              registeredPatient.REGDWASH === 3 ? '3' :
                registeredPatient.REGDWASH === 4 ? '4' : '9'
          let com = await registeredPatient.REGDCOMMU === 1 ? '1' :
            registeredPatient.REGDCOMMU === 2 ? '2' :
              registeredPatient.REGDCOMMU === 3 ? '3' :
                registeredPatient.REGDCOMMU === 4 ? '4' : '9'
          let dis = await registeredPatient.REGDISABILITY === 1 ? '1' : registeredPatient.REGDISABILITY === 2 ? '2' : '999'
          //setSelectedVillage(registeredPatient.REGVILLAGE)

          setForm({
            ...form,
            REGDATE: date,
            REGID: id,
            REGNAME: name,
            REGAGE: age,
            REGAGEUNIT: ageUnit,
            REGSEX: gender,
            REGTYPE: type,
            REGVILLAGE: village,
            REGPLACE: place,
            REGMARITAL: marital,
            REGFATHER: father,
            REGMOTHER: mother,
            REGETHNIC: ethnic,
            REGETHNICO: ethnico,
            REGREFFROM: refer,
            REGADDRESS: address,
            REGREMARK: remark,
            REGORG: org,
            REGEDU: edu,
            REGJOB: job,
            REGSPOUSE: spouse,
            REGPH: ph,
            REGUSRLOGIN: userLogin,
            REGINSERT: insert,
            REGUPDATE: update,
            REGSTATUS: status,
            REGSYNC: sync,
            REGMIGRANT: migrant,
            REGIDP: idp,
            REGDSEE: see,
            REGDHEAR: hear,
            REGDWALK: walk,
            REGDREMBR: rem,
            REGDWASH: wash,
            REGDCOMMU: com,
            REGDISABILITY: dis
          })
          setEthnicGp(registeredPatient.REGETHNIC)
          setSeeDis(see)
          setHearDis(hear)
          setWalkDis(walk)
          setRemDis(rem)
          setWashDis(wash)
          setComDis(com)
        }

        setEditShow(true)
        await setLoading(false)
      }


    }
    fn();

    // console.log("EditPageShow ===> ", editShow)

  }, [editShow])

  function unitHandleChange(event) {
    if (event.target.value === form.REGAGEUNIT) {
      setForm({ ...form, REGAGEUNIT: "" })
    } else {
      setForm({ ...form, REGAGEUNIT: event.target.value })
    }
  }
  function genderHandleChange(event) {
    if (event.target.value === form.REGSEX) {
      setForm({ ...form, REGSEX: "" })
    } else {
      setForm({ ...form, REGSEX: event.target.value })
    }
  }

  function patientTypeHandleChange(event) {
    console.log(event.target.value)
    if (event.target.value === form.REGTYPE) {
      setForm({ ...form, REGTYPE: "" })
    } else {
      setForm({ ...form, REGTYPE: event.target.value })
    }
  }

  const registeredVillageHandleChange = (event) => {
    setForm({ ...form, REGVILLAGE: event.target.value })
    console.log("Selected Village => ", event.target.value)
  };

  function registeredPlaceHandleChange(event) {
    if (event.target.value === form.REGPLACE) {
      setForm({ ...form, REGPLACE: "" })
    } else {
      setForm({ ...form, REGPLACE: event.target.value })
    }
  }

  function maritalHandleChange(event) {
    if (event.target.value === form.REGMARITAL) {
      setForm({ ...form, REGMARITAL: "" })
    } else {
      setForm({ ...form, REGMARITAL: event.target.value })
    }
  }



  ///////////////////For all Shan Ips
  const [ethnicGp, setEthnicGp] = useState('999')
  const [seeDis, setSeeDis] = useState('1')
  const [hearDis, setHearDis] = useState('1')
  const [walkDis, setWalkDis] = useState('1')
  const [remDis, setRemDis] = useState('1')
  const [washDis, setWashDis] = useState('1')
  const [comDis, setComDis] = useState('1')

  const seeDisHandle = (event) => {
    setSeeDis(event.target.value);
    setForm({ ...form, REGDSEE: event.target.value })
  };
  const hearDisHandle = (event) => {
    setHearDis(event.target.value);
    setForm({ ...form, REGDHEAR: event.target.value })
  };
  const walkDisHandle = (event) => {
    setWalkDis(event.target.value);
    setForm({ ...form, REGDWALK: event.target.value })
  };
  const remDisHandle = (event) => {
    setRemDis(event.target.value);
    setForm({ ...form, REGDREMBR: event.target.value })
  };
  const washDisHandle = (event) => {
    setWashDis(event.target.value);
    setForm({ ...form, REGDWASH: event.target.value })
  };
  const comDisHandle = (event) => {
    setComDis(event.target.value);
    setForm({ ...form, REGDCOMMU: event.target.value })
  };
  const ethnicGpHandle = (event) => {
    setEthnicGp(event.target.value);
    setForm({ ...form, REGETHNIC: event.target.value })
  };
  function migrantHandleChange(event) {
    if (event.target.value === form.REGMIGRANT) {
      setForm({ ...form, REGMIGRANT: "" })
    } else {
      setForm({ ...form, REGMIGRANT: event.target.value })
    }
  }

  function IDPHandleChange(event) {
    if (event.target.value === form.REGIDP) {
      setForm({ ...form, REGIDP: "" })
    } else {
      setForm({ ...form, REGIDP: event.target.value })
    }
  }

  function disablilityHandleChange(event) {
    if (event.target.value === form.REGDISABILITY) {
      setForm({ ...form, REGDISABILITY: "" })
    } else {
      setForm({ ...form, REGDISABILITY: event.target.value })
    }
  }

  const clear = () => {
    setForm({
      REGDATE: registeredPatient ? moment(registeredPatient.REGDATE).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD"),
      REGID: '',
      REGNAME: '',
      REGAGE: '',
      REGAGEUNIT: '365',
      REGSEX: '1',
      REGTYPE: '1',
      REGVILLAGE: '',
      REGPLACE: '1',
      REGMARITAL: '1',
      REGFATHER: '',
      REGMOTHER: '',
      REGETHNIC: (sessionStorage.getItem('project') === 'P-008' &&
        (sessionStorage.getItem('org') === 'CPI-17' || sessionStorage.getItem('org') === 'CPI-18' ||
        sessionStorage.getItem('org') === 'CPI-19' || sessionStorage.getItem('org') === 'CPI-63' || sessionStorage.getItem('org') === 'CPI-86')) ? '999' : '',
      REGREFFROM: '',
      REGREMARK: '',
      REGORG: sessionStorage.getItem('org'),
      REGEDU: '',
      REGJOB: sessionStorage.getItem('project'),
      REGSPOUSE: '',
      REGADDRESS: '',
      REGPH: '',
      REGUSRLOGIN: sessionStorage.getItem('userName'),
      REGINSERT: '',
      REGUPDATE: '',
      REGSTATUS: '',
      REGSYNC: '',
      REGETHNICO: '',
      REGMIGRANT: '999',
      REGIDP: '999',
      REGDISABILITY: '999'
    })
    setEthnicGp('999')
    setSeeDis('1')
    setHearDis('1')
    setWalkDis('1')
    setRemDis('1')
    setWashDis('1')
    setComDis('1')
  }

  const cancle = () => {
    history.push('entryhomepage')
  }

  const save = async () => {
    let formData = await form

    let valid = await (!formData.REGDATE) ? "Please choose date!" :
      !((formData.REGID).length === 9 /* && formData.REGID[0] >= 'A' && formData.REGID[0] <= 'Z' && formData.REGID.substring(1) > 0 */) ? "Code need to have 9 characters!" :
        (!formData.REGNAME) ? "Please enter register name!" :
          (!formData.REGAGEUNIT) ? "Please choose age unit!" :
            (!formData.REGSEX) ? "Please choose gender!" :
              (!formData.REGTYPE) ? "Please choose type!" :
                (!formData.REGVILLAGE) ? "Please type register village!" :
                  (!(formData.REGAGE > 0 && formData.REGAGE <= 999)) ? "Age must be valid number!" :
                    (!formData.REGPLACE) ? "Please type register place!" : "valid";

    console.log("To String=>", ((formData.REGID).length === 9 && formData.REGID[0] >= 'A' && formData.REGID[0] <= 'Z' && formData.REGID.substring(1) > 0));
    console.log("Error Test Result =>", valid)
    ///Valid test
    if (valid != "valid") { setError(valid); setOpenSnack(true) }

    ///Update and Save Test
    else {
      ////for update
      if ((registeredPatient && sessionStorage.getItem('editPatient') === "true")) {

        console.log("Update Form Data ==> ", formData)
        formData.REGUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        formData.REGSTATUS = 2
        formData.REGETHNICO = formData.REGETHNIC !== 'Other' ? '' : formData.REGETHNICO
        const res = await updateReg(formData);

        if (res.status === 200) {
          setSuccess("Successfully updated a patient!")
          setSuccessSnack(true)
          history.push({
            pathname: "entryhomepage",
            openSnackbar: true
          });


        }


      }
      ////for Insert(Save)
      else {

        formData.REGORG = await sessionStorage.getItem('org');
        formData.REGINSERT = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        formData.REGUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        formData.REGSTATUS = 1
        formData.REGETHNICO = formData.REGETHNIC !== 'Other' ? '' : formData.REGETHNICO
        console.log("Form Data ==> ", formData)
        const res = await insertReg(formData);
        if (res.status === 200) {
          setSuccess("Successfully inserted a patient!")
          await setSuccessSnack(true);
          await clear();
        }
      }
    }


  }


  const setSnackBarOpen = () => {
    setOpenSnack(true)
  }

  const setSnackBarClose = () => {
    setOpenSnack(false)
  }

  const setSuccessSnackBarOpen = () => {
    setSuccessSnack(true)
  }

  const setSuccessSnackBarClose = () => {
    setSuccessSnack(false)
  }

  return (
    <div>
      <Modals open={loading} />

      {(!(registeredPatient && sessionStorage.getItem('editPatient') === "true")) ?
        <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '2%' }}>
          Patient Registeration Form</Typography> :

        <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '2%' }}>
          Registered Information</Typography>}
      <div style={{ margin: '1%' }}>
        <div>

          <Grid container spacing={2} style={{ marginBottom: '2%' }}>
            <Grid item xs={12} sm={6} md={4} >
              <CustomUnicefTextField
                id="filled-basic"
                type="date"
                style={{ width: '95%' }}
                label={<Grid row container><Typography color="#482642">Register Date </Typography>
                  <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                variantText="filled"
                InputLabelProps={{
                  style: { color: '#482642' },
                  shrink: true
                }}
                onChange={e => { setForm({ ...form, REGDATE: e.target.value }) }}
                value={form.REGDATE} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} >
              {(!(registeredPatient && sessionStorage.getItem('editPatient') === "true")) ?
                <CustomUnicefTextField
                  id="filled-basic"
                  style={{ width: '95%' }}
                  label={<Grid row container><Typography color="#482642">Register Code </Typography>
                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                  variantText="filled"
                  onChange={e => { setForm({ ...form, REGID: e.target.value }) }}
                  value={form.REGID}
                /> :
                <CustomUnicefTextField
                  id="filled-basic"
                  disabled
                  style={{ width: '95%' }}
                  label={<Grid row container><Typography color="#482642">Register Code </Typography>
                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                  variantText="filled"
                  value={((registeredPatient && sessionStorage.getItem('editPatient') === "true")) ? registeredPatient.REGID : form.REGID}
                />}
            </Grid>
            <Grid item xs={12} sm={6} md={4} >
              <CustomUnicefTextField
                id="filled-basic"
                style={{ width: '95%' }}
                label={<Grid row container><Typography color="#482642">Register Name </Typography>
                  <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                variantText="filled"
                onChange={e => { setForm({ ...form, REGNAME: e.target.value }) }}
                value={form.REGNAME}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginBottom: '2%' }}>
            <Grid item xs={12} sm={6} md={3} >
              <CustomUnicefTextField
                id="filled-basic"
                style={{ width: '95%' }}
                label={<Grid row container><Typography color="#482642">Age </Typography>
                  <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                variantText="filled"
                onChange={e => { setForm({ ...form, REGAGE: e.target.value }) }}
                value={form.REGAGE}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
              <ThemeProvider theme={radioTheme}>
                <Card
                  variant="outlined"
                  style={{
                    background: "#fcf0f2",
                    width: '100%'
                  }}
                  className={classes.cardStyle}>
                  {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Age Unit </Typography>
                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                  <RadioGroup
                    aria-label="ageunit"
                    name="ageunit1"
                    style={{
                      display: "flex",
                      width: "95%",
                      justifyContent: "space-around"
                    }}
                    onChange={e => { setForm({ ...form, REGAGEUNIT: e.target.value }) }}

                    value={form.REGAGEUNIT}
                    row={true}>
                    <FormControlLabel
                      value="365"
                      labelPlacement="left"
                      label="Year"
                      style={{ height: "30px" }}
                      className={classes.fontSize}
                      control={<Radio size="small" color="primary"
                        onClick={unitHandleChange} onKeyDown={e => e.key === 'Enter' && unitHandleChange(e)} />}
                    />
                    <FormControlLabel
                      value="30"
                      labelPlacement="left"
                      style={{ height: "30px" }}
                      className={classes.fontSize}
                      control={<Radio size="small" color="primary"
                        onClick={unitHandleChange} onKeyDown={e => e.key === 'Enter' && unitHandleChange(e)} />}
                      label="Month"
                    />
                    <FormControlLabel
                      value="1"
                      labelPlacement="left"
                      style={{ height: "30px" }}
                      className={classes.fontSize}
                      control={<Radio size="small" color="primary"
                        onClick={unitHandleChange} onKeyDown={e => e.key === 'Enter' && unitHandleChange(e)} />}
                      label="Day"
                    />
                  </RadioGroup>
                </Card>
              </ThemeProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
              <ThemeProvider theme={radioTheme}>
                <Card
                  variant="outlined"
                  style={{
                    background: "#fcf0f2",
                    width: '100%'
                  }}
                  className={classes.cardStyle}>
                  {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Gender </Typography>
                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}

                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    style={{
                      display: "flex",
                      width: "95%",
                      justifyContent: "space-around"
                    }}
                    onChange={e => { setForm({ ...form, REGSEX: e.target.value }) }}
                    value={form.REGSEX}
                    row={true}
                  >
                    <FormControlLabel
                      value="1"
                      labelPlacement="left"
                      label="Male"
                      style={{ height: "30px" }}
                      className={classes.fontSize}
                      control={<Radio size="small" color="primary"
                        onClick={genderHandleChange} onKeyDown={e => e.key === 'Enter' && genderHandleChange(e)} />}
                    />
                    <FormControlLabel
                      value="2"
                      labelPlacement="left"
                      style={{ height: "30px" }}
                      className={classes.fontSize}
                      control={<Radio size="small" color="primary"
                        onClick={genderHandleChange} onKeyDown={e => e.key === 'Enter' && genderHandleChange(e)} />}
                      label="Female"
                    />
                    {(sessionStorage.getItem('project') === 'P-008' &&
                      (sessionStorage.getItem('org') === 'CPI-17' || sessionStorage.getItem('org') === 'CPI-18' ||
                      sessionStorage.getItem('org') === 'CPI-19' || sessionStorage.getItem('org') === 'CPI-63' || sessionStorage.getItem('org') === 'CPI-86')) ?
                      <FormControlLabel
                        value="3"
                        labelPlacement="left"
                        style={{ height: "30px" }}
                        className={classes.fontSize}
                        control={<Radio size="small" color="primary"
                          onClick={genderHandleChange} onKeyDown={e => e.key === 'Enter' && genderHandleChange(e)} />}
                        label="Other"
                      /> : null}

                  </RadioGroup>
                </Card>
              </ThemeProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
              <ThemeProvider theme={radioTheme}>
                <Card
                  variant="outlined"
                  style={{
                    background: "#fcf0f2",
                    width: '100%'
                  }}
                  className={classes.cardStyle}>
                  {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Type </Typography>
                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                  <RadioGroup
                    aria-label="type"
                    name="type1"
                    style={{
                      display: "flex",
                      width: "95%",
                      justifyContent: "space-around"
                    }}
                    onChange={e => { setForm({ ...form, REGTYPE: e.target.value }) }}
                    value={form.REGTYPE}
                    row={true}
                  >
                    <FormControlLabel
                      value="1"
                      labelPlacement="left"
                      style={{ height: "30px" }}
                      className={classes.fontSize}
                      control={<Radio size="small" color="primary"
                        onClick={patientTypeHandleChange} onKeyDown={e => e.key === 'Enter' && patientTypeHandleChange(e)} />}
                      label="New"
                    />
                    <FormControlLabel
                      value="2"
                      labelPlacement="left"
                      style={{ height: "30px" }}
                      className={classes.fontSize}
                      control={<Radio size="small" color="primary"
                        onClick={patientTypeHandleChange} onKeyDown={e => e.key === 'Enter' && patientTypeHandleChange(e)} />}
                      label="Old"
                    />

                  </RadioGroup>
                </Card>
              </ThemeProvider>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginBottom: '2%' }}>
            <Grid item xs={12} sm={4} md={4} >
              <ThemeProvider theme={radioTheme}>
                <FormControl variant="filled" className={classes.formControl} style={{ width: '100%', marginTop: '8px', marginLeft: '10px' }}>
                  <InputLabel id="demo-simple-select-filled-label">{
                    <Grid row container><Typography color="#482642">Registered Village </Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>
                  }</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    style={{ width: '95%' }}
                    value={form.REGVILLAGE}
                    onChange={registeredVillageHandleChange}
                    InputLabelProps={{
                      style: { color: '#482642' },
                      shrink: true
                    }}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      style: {
                        maxHeight: 300,
                        maxWidth: 400,
                      },
                      getContentAnchorEl: null
                    }}>
                    {village.length &&
                      village.map((option) => (
                        <MenuItem value={option.VILLAGE_CODE} classes={{ selected: classes.selected }}>{option.VILLAGE_NAME + " " + " (" + option.CLN_NAME + "," + option.PROJECT_NAME + ")"}</MenuItem>

                      ))}

                  </Select>
                </FormControl>
              </ThemeProvider>
            </Grid>
            <Grid item xs={12} sm={4} md={5} >

              <ThemeProvider theme={radioTheme}>
                <Card
                  variant="outlined"
                  style={{
                    background: "#fcf0f2",
                    width: "100%",
                  }}
                  className={classes.cardStyle}
                >
                  {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Registered Place </Typography>
                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                  <RadioGroup
                    aria-label="registeredPlace"
                    name="registeredPlace1"
                    style={{
                      display: "flex",
                      width: "95%",
                      justifyContent: "space-around"
                    }}
                    onChange={e => { setForm({ ...form, REGPLACE: e.target.value }) }}
                    value={form.REGPLACE}
                    row={true}
                  >
                    <FormControlLabel
                      value="1"
                      labelPlacement="left"
                      label="Clinic"
                      style={{ height: "30px" }}
                      className={classes.fontSize}
                      control={<Radio size="small" color="primary"
                        onClick={registeredPlaceHandleChange} onKeyDown={e => e.key === 'Enter' && registeredPlaceHandleChange(e)} />}
                    />
                    <FormControlLabel
                      value="2"
                      labelPlacement="left"
                      style={{ height: "30px" }}
                      className={classes.fontSize}
                      control={<Radio size="small" color="primary"
                        onClick={registeredPlaceHandleChange} onKeyDown={e => e.key === 'Enter' && registeredPlaceHandleChange(e)} />}
                      label="Outreach"
                    />
                    <FormControlLabel
                      value="3"
                      labelPlacement="left"
                      style={{ height: "30px" }}
                      className={classes.fontSize}
                      control={<Radio size="small" color="primary"
                        onClick={registeredPlaceHandleChange} onKeyDown={e => e.key === 'Enter' && registeredPlaceHandleChange(e)} />}
                      label="Volenteer"
                    />
                  </RadioGroup>
                </Card>
              </ThemeProvider>

            </Grid>
            <Grid item xs={12} sm={4} md={3} >

              <ThemeProvider theme={radioTheme}>
                <Card
                  variant="outlined"
                  style={{
                    background: "#fcf0f2",
                    width: "100%",
                  }}
                  className={classes.cardStyle}
                >
                  <Typography
                    style={{ marginLeft: "13px", marginTop: "3px" }}
                    color="#482642"
                  >
                    Marital Status
                  </Typography>
                  <RadioGroup
                    aria-label="ageunit"
                    name="ageunit1"
                    style={{
                      display: "flex",
                      width: "95%",
                      justifyContent: "space-around"
                    }}
                    onChange={e => { setForm({ ...form, REGMARITAL: e.target.value }) }}
                    value={form.REGMARITAL}
                    row={true}
                  >
                    <FormControlLabel
                      value="1"
                      labelPlacement="left"
                      style={{ height: "30px" }}
                      className={classes.fontSize}
                      control={<Radio size="small" color="primary"
                        onClick={maritalHandleChange} onKeyDown={e => e.key === 'Enter' && maritalHandleChange(e)} />}
                      label="Single"
                    />
                    <FormControlLabel
                      value="2"
                      labelPlacement="left"
                      style={{ height: "30px" }}
                      className={classes.fontSize}
                      control={<Radio size="small" color="primary"
                        onClick={maritalHandleChange} onKeyDown={e => e.key === 'Enter' && maritalHandleChange(e)} />}
                      label="Married"
                    />
                    <FormControlLabel
                      value="6"
                      labelPlacement="left"
                      style={{ height: "30px" }}
                      className={classes.fontSize}
                      control={<Radio size="small" color="primary"
                        onClick={maritalHandleChange} onKeyDown={e => e.key === 'Enter' && maritalHandleChange(e)} />}
                      label="Other"
                    />
                  </RadioGroup>
                </Card>
              </ThemeProvider>

            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginBottom: '2%' }}>
            <Grid item xs={12} sm={4} md={4}>
              <CustomUnicefTextField
                id="filled-basic"
                label="Father Name"
                variantText="filled"
                style={{ width: '95%' }}
                onChange={e => { setForm({ ...form, REGFATHER: e.target.value }) }}
                value={form.REGFATHER}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <CustomUnicefTextField
                id="filled-basic"
                label="Mother Name"
                variantText="filled"
                style={{ width: '95%' }}
                onChange={e => { setForm({ ...form, REGMOTHER: e.target.value }) }}
                value={form.REGMOTHER}
              />
            </Grid>

            {(sessionStorage.getItem('project') === 'P-008' &&
              (sessionStorage.getItem('org') === 'CPI-17' || sessionStorage.getItem('org') === 'CPI-18' ||
              sessionStorage.getItem('org') === 'CPI-19' || sessionStorage.getItem('org') === 'CPI-63' || sessionStorage.getItem('org') === 'CPI-86')) ?
              <>
                <Grid item xs={12} sm={2} md={2}>
                  <FormControl variant="filled" className={classes.formControl} style={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Ethnic Group</Typography>
                    </Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      style={{ width: '100%' }}
                      value={ethnicGp}
                      onChange={ethnicGpHandle}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        style: {
                          maxHeight: 300,
                        },
                        getContentAnchorEl: null
                      }}>
                      <MenuItem value={'999'}>-</MenuItem>
                      <MenuItem value={'Shan'}>Shan</MenuItem>
                      <MenuItem value={'Bamar'}>Bamar</MenuItem>
                      <MenuItem value={'Pa-O'}>Pa-O</MenuItem>
                      <MenuItem value={'Wa'}>Wa</MenuItem>
                      <MenuItem value={'Chinese'}>Chinese</MenuItem>
                      <MenuItem value={'Other'}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {ethnicGp === 'Other' ? 
                <>
                <Grid item xs={12} sm={2} md={2}>
                  <CustomUnicefTextField
                    id="filled-basic"
                    disabled={ethnicGp !== 'Other'}
                    label="Other Ethnic Group"
                    variantText="filled"
                    style={{ width: '95%' }}
                    onChange={e => { setForm({ ...form, REGETHNICO: e.target.value }) }}
                    value={form.REGETHNICO}
                  />
                </Grid>
                </> : null}
                

              </> :
              <Grid item xs={12} sm={4} md={4}>
                <CustomUnicefTextField
                  id="filled-basic"
                  label="Ethnic Group"
                  variantText="filled"
                  style={{ width: '95%' }}
                  onChange={e => { setForm({ ...form, REGETHNIC: e.target.value }) }}
                  value={form.REGETHNIC}
                />
              </Grid>}
          </Grid>

          <Grid container spacing={2} style={{ marginBottom: '2%' }}>
            <Grid item xs={12} sm={4} md={4}>
              <CustomUnicefTextField
                id="filled-basic"
                label="Address"
                variantText="filled"
                style={{ width: '95%' }}
                onChange={e => { setForm({ ...form, REGADDRESS: e.target.value }) }}
                value={form.REGADDRESS}
              />
            </Grid>


            <Grid item xs={12} sm={4} md={4}>
              <CustomUnicefTextField
                id="filled-basic"
                label="Refer From"
                variantText="filled"
                style={{ width: '95%' }}
                onChange={e => { setForm({ ...form, REGREFFROM: e.target.value }) }}
                value={form.REGREFFROM}
              />
            </Grid>


            <Grid item xs={12} sm={4} md={4}>
              <CustomUnicefTextField
                id="filled-basic"
                label="Remark"
                variantText="filled"
                style={{ width: '95%' }}
                onChange={e => { setForm({ ...form, REGREMARK: e.target.value }) }}
                value={form.REGREMARK}
              />
            </Grid>
          </Grid>

          {(sessionStorage.getItem('project') === 'P-008' &&
            (sessionStorage.getItem('org') === 'CPI-17' || sessionStorage.getItem('org') === 'CPI-18' ||
            sessionStorage.getItem('org') === 'CPI-19' || sessionStorage.getItem('org') === 'CPI-63' || sessionStorage.getItem('org') === 'CPI-86')) ?
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={4} md={4} >
                <ThemeProvider theme={radioTheme}>
                  <Card
                    variant="outlined"
                    style={{
                      background: "#fcf0f2",
                      width: '95%',
                      marginLeft: '12px'
                    }}
                    className={classes.cardStyle}>
                    {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Migrant Worker</Typography>
                    </Grid>}

                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-around"
                      }}
                      onChange={e => { setForm({ ...form, REGMIGRANT: e.target.value }) }}
                      value={form.REGMIGRANT}
                      row={true}
                    >
                      <FormControlLabel
                        value="1"
                        labelPlacement="left"
                        label="Yes"
                        style={{ height: "30px" }}
                        className={classes.fontSize}
                        control={<Radio size="small" color="primary"
                          onClick={migrantHandleChange} onKeyDown={e => e.key === 'Enter' && migrantHandleChange(e)} />}
                      />
                      <FormControlLabel
                        value="2"
                        labelPlacement="left"
                        style={{ height: "30px" }}
                        className={classes.fontSize}
                        control={<Radio size="small" color="primary"
                          onClick={migrantHandleChange} onKeyDown={e => e.key === 'Enter' && migrantHandleChange(e)} />}
                        label="No"
                      />
                    </RadioGroup>
                  </Card>
                </ThemeProvider>
              </Grid>

              <Grid item xs={12} sm={4} md={4} >
                <ThemeProvider theme={radioTheme}>
                  <Card
                    variant="outlined"
                    style={{
                      background: "#fcf0f2",
                      width: '95%',
                      marginLeft: '12px'
                    }}
                    className={classes.cardStyle}>
                    {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Internally Displaced Person</Typography>
                    </Grid>}

                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-around"
                      }}
                      onChange={e => { setForm({ ...form, REGIDP: e.target.value }) }}
                      value={form.REGIDP}
                      row={true}
                    >
                      <FormControlLabel
                        value="1"
                        labelPlacement="left"
                        label="Yes"
                        style={{ height: "30px" }}
                        className={classes.fontSize}
                        control={<Radio size="small" color="primary"
                          onClick={IDPHandleChange} onKeyDown={e => e.key === 'Enter' && IDPHandleChange(e)} />}
                      />
                      <FormControlLabel
                        value="2"
                        labelPlacement="left"
                        style={{ height: "30px" }}
                        className={classes.fontSize}
                        control={<Radio size="small" color="primary"
                          onClick={IDPHandleChange} onKeyDown={e => e.key === 'Enter' && IDPHandleChange(e)} />}
                        label="No"
                      />
                    </RadioGroup>
                  </Card>
                </ThemeProvider>
              </Grid>
              {sessionStorage.getItem('org') === 'CPI-86' ?
                <Grid item xs={12} sm={4} md={4} >
                  <ThemeProvider theme={radioTheme}>
                    <Card
                      variant="outlined"
                      style={{
                        background: "#fcf0f2",
                        width: '95%',
                        marginLeft: '12px'
                      }}
                      className={classes.cardStyle}>
                      {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Disability</Typography>
                      </Grid>}

                      <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-around"
                        }}
                        onChange={e => { setForm({ ...form, REGDISABILITY: e.target.value }) }}
                        value={form.REGDISABILITY}
                        row={true}
                      >
                        <FormControlLabel
                          value="1"
                          labelPlacement="left"
                          label="Yes"
                          style={{ height: "30px" }}
                          className={classes.fontSize}
                          control={<Radio size="small" color="primary"
                            onClick={disablilityHandleChange} onKeyDown={e => e.key === 'Enter' && disablilityHandleChange(e)} />}
                        />
                        <FormControlLabel
                          value="2"
                          labelPlacement="left"
                          style={{ height: "30px" }}
                          className={classes.fontSize}
                          control={<Radio size="small" color="primary"
                            onClick={disablilityHandleChange} onKeyDown={e => e.key === 'Enter' && disablilityHandleChange(e)} />}
                          label="No"
                        />
                      </RadioGroup>
                    </Card>
                  </ThemeProvider>
                </Grid> : null}

            </Grid> : null}
          {(sessionStorage.getItem('project') === 'P-008' &&
            (sessionStorage.getItem('org') === 'CPI-17' || sessionStorage.getItem('org') === 'CPI-18' ||
            sessionStorage.getItem('org') === 'CPI-19' || sessionStorage.getItem('org') === 'CPI-63')) && (sessionStorage.getItem('org') !== 'CPI-86') ?
            <Grid row container spacing={2} alignItems="center" justifyContent="center">
              <Card
                variant="outlined"
                style={{
                  background: "#fcf0f2",
                  width: '98%',
                  marginTop: '2%',
                  padding: '1%'
                }}
              >
                {<Grid item alignItems="center" justifyContent="center" style={{ alignSelf: "center", fontWeight: 'lightBold', marginBottom: "1%", textAlign: 'center' }}><Typography color="#482642">Disability Category</Typography></Grid>}
                <Grid container row xs={12} sm={12} md={12} alignItems="center" justifyContent="center">
                  <Grid item xs={12} sm={2} md={2} >
                    <ThemeProvider theme={radioTheme}>
                      <FormControl variant="filled" className={classes.formControl} style={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Seeing</Typography>
                        </Grid>}</InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          style={{ width: '90%' }}
                          value={seeDis}
                          onChange={seeDisHandle}
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            style: {
                              maxHeight: 300,
                            },
                            getContentAnchorEl: null
                          }}>
                           <MenuItem value={'999'}>-</MenuItem>
 <MenuItem value={'1'}>No difficulty</MenuItem>
                          <MenuItem value={'2'}>Some difficulties</MenuItem>
                          <MenuItem value={'3'}>A lot of difficulties</MenuItem>
                          <MenuItem value={'4'}>Cannot do it at all</MenuItem>
                          <MenuItem value={'9'}>NA</MenuItem>
                        </Select>
                      </FormControl>
                    </ThemeProvider>
                  </Grid>
                  <Grid item xs={12} sm={2} md={2} >
                    <ThemeProvider theme={radioTheme}>
                      <FormControl variant="filled" className={classes.formControl} style={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Hearing</Typography>
                        </Grid>}</InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          style={{ width: '90%' }}
                          value={hearDis}
                          onChange={hearDisHandle}
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            style: {
                              maxHeight: 300,
                            },
                            getContentAnchorEl: null
                          }}>
                           <MenuItem value={'999'}>-</MenuItem>
 <MenuItem value={'1'}>No difficulty</MenuItem>
                          <MenuItem value={'2'}>Some difficulties</MenuItem>
                          <MenuItem value={'3'}>A lot of difficulties</MenuItem>
                          <MenuItem value={'4'}>Cannot do it at all</MenuItem>
                          <MenuItem value={'9'}>NA</MenuItem>
                        </Select>
                      </FormControl>
                    </ThemeProvider>
                  </Grid>
                  <Grid item xs={12} sm={2} md={2} >
                    <ThemeProvider theme={radioTheme}>
                      <FormControl variant="filled" className={classes.formControl} style={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Walking</Typography>
                        </Grid>}</InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          style={{ width: '90%' }}
                          value={walkDis}
                          onChange={walkDisHandle}
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            style: {
                              maxHeight: 300,
                            },
                            getContentAnchorEl: null
                          }}>
                           <MenuItem value={'999'}>-</MenuItem>
 <MenuItem value={'1'}>No difficulty</MenuItem>
                          <MenuItem value={'2'}>Some difficulties</MenuItem>
                          <MenuItem value={'3'}>A lot of difficulties</MenuItem>
                          <MenuItem value={'4'}>Cannot do it at all</MenuItem>
                          <MenuItem value={'9'}>NA</MenuItem>
                        </Select>
                      </FormControl>
                    </ThemeProvider>
                  </Grid>
                  <Grid item xs={12} sm={2} md={2} >
                    <ThemeProvider theme={radioTheme}>
                      <FormControl variant="filled" className={classes.formControl} style={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Remembering</Typography>
                        </Grid>}</InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          style={{ width: '90%' }}
                          value={remDis}
                          onChange={remDisHandle}
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            style: {
                              maxHeight: 300,
                            },
                            getContentAnchorEl: null
                          }}>
                           <MenuItem value={'999'}>-</MenuItem>
 <MenuItem value={'1'}>No difficulty</MenuItem>
                          <MenuItem value={'2'}>Some difficulties</MenuItem>
                          <MenuItem value={'3'}>A lot of difficulties</MenuItem>
                          <MenuItem value={'4'}>Cannot do it at all</MenuItem>
                          <MenuItem value={'9'}>NA</MenuItem>
                        </Select>
                      </FormControl>
                    </ThemeProvider>
                  </Grid>
                  <Grid item xs={12} sm={2} md={2}>
                    <ThemeProvider theme={radioTheme}>
                      <FormControl variant="filled" className={classes.formControl} style={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Washing</Typography>
                        </Grid>}</InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          style={{ width: '90%' }}
                          value={washDis}
                          onChange={washDisHandle}
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            style: {
                              maxHeight: 300,
                            },
                            getContentAnchorEl: null
                          }}>
                           <MenuItem value={'999'}>-</MenuItem>
 <MenuItem value={'1'}>No difficulty</MenuItem>
                          <MenuItem value={'2'}>Some difficulties</MenuItem>
                          <MenuItem value={'3'}>A lot of difficulties</MenuItem>
                          <MenuItem value={'4'}>Cannot do it at all</MenuItem>
                          <MenuItem value={'9'}>NA</MenuItem>
                        </Select>
                      </FormControl>
                    </ThemeProvider>
                  </Grid>
                  <Grid item xs={12} sm={2} md={2} >
                    <ThemeProvider theme={radioTheme}>
                      <FormControl variant="filled" className={classes.formControl} style={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Communicating</Typography>
                        </Grid>}</InputLabel>
                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          style={{ width: '90%' }}
                          value={comDis}
                          onChange={comDisHandle}
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            style: {
                              maxHeight: 300,
                            },
                            getContentAnchorEl: null
                          }}>
                           <MenuItem value={'999'}>-</MenuItem>
 <MenuItem value={'1'}>No difficulty</MenuItem>
                          <MenuItem value={'2'}>Some difficulties</MenuItem>
                          <MenuItem value={'3'}>A lot of difficulties</MenuItem>
                          <MenuItem value={'4'}>Cannot do it at all</MenuItem>
                          <MenuItem value={'9'}>NA</MenuItem>
                        </Select>
                      </FormControl>
                    </ThemeProvider>
                  </Grid>
                </Grid>

              </Card>
            </Grid> : null}
        </div>
        <Grid container alignItems="center" justifyContent="center" style={{ padding: '20px' }} row>
          <Grid item xs={'auto'} style={{ width: '18%' }}>
            <Button
              variant="contained"
              style={{ background: '#482642', color: '#fff', width: '90%' }}
              onClick={save}> {(!(registeredPatient && sessionStorage.getItem('editPatient') === "true")) ? "Save" : "Update"}</Button>
          </Grid>
          {(!(registeredPatient && sessionStorage.getItem('editPatient') === "true")) ?
            <Grid item xs={'auto'} style={{ width: '18%' }}>
              <Button
                variant="contained"
                style={{ background: '#482642', color: '#fff', width: '90%' }}
                onClick={clear}>Clear</Button>
            </Grid> :
            <></>}

          <Grid item xs={'auto'} style={{ width: '18%' }}>
            <Button
              variant="contained"
              style={{ background: '#482642', color: '#fff', width: '90%' }}
              onClick={cancle}>Cancel</Button>
          </Grid>


        </Grid>
      </div>




      {openSnack && <CustomSnackBar open={setSnackBarOpen} close={setSnackBarClose} alertMsg={error} type="warning" />}
      {successSnack && <CustomSnackBar open={setSuccessSnackBarOpen} close={setSuccessSnackBarClose} alertMsg={success} type="success" />}


    </div >


  );
}
