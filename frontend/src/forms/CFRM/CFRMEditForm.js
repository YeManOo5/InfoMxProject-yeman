import { Button, Card, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Typography, FormLabel } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from '@material-ui/core/FormControl';
import CustomUnicefTable from '../../components/controls/CustomUnicefTable'
import CustomUnicefTextField from '../../components/controls/CustomUnicefTextField'
import CustomizedSnackbars from '../../components/controls/CustomSnackBar';
import Modals from "../../components/modal";
import _ from 'lodash';
import moment from "moment";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import { pink } from '@mui/material/colors';

import SentimentSatisfiedTwoToneIcon from '@mui/icons-material/SentimentSatisfiedTwoTone';
import SentimentNeutralTwoToneIcon from '@mui/icons-material/SentimentNeutralTwoTone';
import SentimentDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentDissatisfiedTwoTone';

import Stack from '@mui/material/Stack';
/////////////////////API////////////////////
import { getVillageByOrgProj } from '../../modals/villagebyorgproj'
import { getProject } from '../../modals/background';
import * as edit from '../../modals/editcfrmshow'
import { insertCFRM, updateCFRM } from '../../modals/cfrminfo';
import { color } from '@mui/system';

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
    marginBottom: theme.spacing(1),
  },
  cardStyleTwo: {
    width: "100%",
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0.9),
    borderRadius: "3px"
  },
  formControl: {
    margin: theme.spacing(1),
  },

  table: {
    width: '100%',
    background: '#fcf0f2',
    height: '10px',


  },
  cellOne: {
    borderBottom: 'none',
    color: '#808080',
    fontSize: '9pt',

  },
  cellTwo: {
    borderBottom: 'none',
    color: '#53344d',
    fontSize: '12pt',
    fontWeight: 'bold',


  },
  secondFormControl: {
    margin: theme.spacing(0.5),
    width: '40%',
  },
  selected: {
    backgroundColor: "#DED4DA !important",
    color: '#482642'
  },
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

export default function CFRMEditForm() {

  let wfh = "WFH < -3 Z/ MUAC < 115 mm"

  const classes = useStyles();

  const history = useHistory();

  ///////Background Data///////////
  const [loading, setLoading] = useState(false);
  const [villageData, setVillageData] = useState([]);
  const [villageCode, setVillageCode] = useState('')
  const [divCode, setDivCode] = useState('')
  const [tspCode, setTspCode] = useState('')
  const [divName, setDivName] = useState('')
  const [tspName, setTspName] = useState('')

  const [openerTspCode, setOpenerTspCode] = useState('')
  const [openerTspName, setOpenerTspName] = useState('')
  const [openerProj, setOpenerProj] = useState('')

  const [newCase, setNewCase] = useState('')
  const [imamGVal, setImamGVal] = useState('')
  const [imamHVal, setImamHVal] = useState('')
  const [imamJVal, setImamJVal] = useState('')
  const [imamKVal, setImamKVal] = useState('')

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [successSnack, setSuccessSnack] = useState(false)
  const [openSnack, setOpenSnack] = useState(false)

  const [formData, setFormData] = useState(
    {
      CFRMREGCODE: '',
      CFRMFBPERSON: '',
      CFRMFBPERSONOTHER: '',
      CFRMFBDATE: '',
      CFRMFBSEX: '',
      CFRMFBAGE: '',
      CFRMFBAGEUNIT: '365',
      CFRMFBVILLAGE: '',
      CFRMFBTSP: '',
      CFRMFBDIV: '',
      CFRMFBSATIFY1: '',
      CFRMFBSATIFY2: '',
      CFRMFBSATIFY3: '',
      CFRMFBSATIFYDETAIL: '',
      CFRMFBDSEE: '',
      CFRMFBDHEAR: '',
      CFRMFBDWALK: '',
      CFRMFBDCOMMU: '',
      CFRMFBDREMBR: '',
      CFRMFBDWASH: '',
      CFRMFBPERSONCAT1: '',
      CFRMFBPERSONCAT2: '',
      CFRMFBPERSONCAT2OTHER: '',
      CFRMFBPERSONCAT2NAME: '',
      CFRMFBPERSONCAT2CONTACT: '',
      CFRMFBOPENERNAME: '',
      CFRMFBOPENERPOSITION: '',
      CFRMFBOPENERTSP: '',
      CFRMFBOPENERDIV: '',
      CFRMFBPROJECT: '',
      CFRMFBOPENERDATE: '',
      CFRMFBTYPE1: '',
      CFRMFBTYPE2: '',
      CFRMFBTYPE3: '',
      CFRMFBTYPE3OTHER: '',
      CFRMFBACTDATE: '',
      CFRMFBRESLDATE: '',
      CFRMFBRESLACT: '',
      CFRMFBRESLPERSON: '',
      CFRMFBRESPMETH: '',
      CFRMFBRESPMETHO: '',
      CFRMFBCOMPLAINT: '',
      CFRMFBCOMPLAINOTHER: '',
      CFRMFBRECPERSON: '',
      CFRMFBUSRLOGIN: '',
      CFRMFBUPDATE: '',
      CFRMFBSTATUS: '',
      CFRMFBSYSNC: '',
      CFRMFBORG: '',
      CFRMFBCOMPLAINTPENDING: '',
    }
  )

  const PERSONCAT1 = [
    { value: '1', name: '???????????????????????????????????????' },
    { value: '2', name: '????????????????????????????????????????????????' },
    { value: '3', name: '????????????????????????????????????????????????????????????' },
    { value: '4', name: '???????????????????????????????????????????????????' },
  ]

  const [deathReason1, setDeathReason1] = useState([])
  const deathReason1Handle = (event) => {
    setDeathReason1(event.target.value)
  }
  ////////////Handle Change//////////////////////////
  function sexHandleChange(event) {
    if (event.target.value === formData.CFRMFBSEX) {
      setFormData({ ...formData, CFRMFBSEX: "" })
    } else {
      setFormData({ ...formData, CFRMFBSEX: event.target.value })
    }
  }
  /* unnomal */
  function unHandleChange1(event) {

    if (event.target.value === formData.CFRMFBDSEE) {
      setFormData({ ...formData, CFRMFBDSEE: "" })
    } else {

      setFormData({ ...formData, CFRMFBDSEE: event.currentTarget.value })
    }
  }
  function unHandleChange2(event) {

    if (event.target.value === formData.CFRMFBDHEAR) {
      setFormData({ ...formData, CFRMFBDHEAR: "" })
    } else {

      setFormData({ ...formData, CFRMFBDHEAR: event.currentTarget.value })
    }
  }
  function unHandleChange3(event) {

    if (event.target.value === formData.CFRMFBDWALK) {
      setFormData({ ...formData, CFRMFBDWALK: "" })
    } else {

      setFormData({ ...formData, CFRMFBDWALK: event.currentTarget.value })
    }
  }
  function unHandleChange4(event) {

    if (event.target.value === formData.CFRMFBDCOMMU) {
      setFormData({ ...formData, CFRMFBDCOMMU: "" })
    } else {

      setFormData({ ...formData, CFRMFBDCOMMU: event.currentTarget.value })
    }
  }
  function unHandleChange5(event) {

    if (event.target.value === formData.CFRMFBDREMBR) {
      setFormData({ ...formData, CFRMFBDREMBR: "" })
    } else {

      setFormData({ ...formData, CFRMFBDREMBR: event.currentTarget.value })
    }
  }
  function unHandleChange6(event) {

    if (event.target.value === formData.CFRMFBDWASH) {
      setFormData({ ...formData, CFRMFBDWASH: "" })
    } else {

      setFormData({ ...formData, CFRMFBDWASH: event.currentTarget.value })
    }
  }


  /* ???????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????? */

  function aHandleChange(event) {
    console.log("Color =>", event.currentTarget.style.backgroundColor)
    if (event.currentTarget.value === formData.CFRMFBSATIFY1) {
      event.currentTarget.style.backgroundColor = '#e0e0e0'
      setFormData({ ...formData, CFRMFBSATIFY1: "" })
    }
    else {
      event.currentTarget.style.backgroundColor = '#ea565f'
      setFormData({ ...formData, CFRMFBSATIFY1: event.currentTarget.value })
      if (event.currentTarget.id === 'a') {
        document.getElementById("b").style.backgroundColor = '#e0e0e0';
        document.getElementById("c").style.backgroundColor = '#e0e0e0';
      }
      else if (event.currentTarget.id === 'b') {
        document.getElementById("a").style.backgroundColor = '#e0e0e0';
        document.getElementById("c").style.backgroundColor = '#e0e0e0';
      }
      else {
        document.getElementById("a").style.backgroundColor = '#e0e0e0';
        document.getElementById("b").style.backgroundColor = '#e0e0e0';
      }
    }
  }
  function bHandleChange(event) {
    event.currentTarget.style.backgroundColor = '#e0e0e0'
    if (event.currentTarget.value === formData.CFRMFBSATIFY2) {
      setFormData({ ...formData, CFRMFBSATIFY2: "" })
    } else {
      event.currentTarget.style.backgroundColor = '#ea565f'
      setFormData({ ...formData, CFRMFBSATIFY2: event.currentTarget.value })
      if (event.currentTarget.id === 'aa') {
        document.getElementById("bb").style.backgroundColor = '#e0e0e0';
        document.getElementById("cc").style.backgroundColor = '#e0e0e0';
      }
      else if (event.currentTarget.id === 'bb') {
        document.getElementById("aa").style.backgroundColor = '#e0e0e0';
        document.getElementById("cc").style.backgroundColor = '#e0e0e0';
      }
      else {
        document.getElementById("aa").style.backgroundColor = '#e0e0e0';
        document.getElementById("bb").style.backgroundColor = '#e0e0e0';
      }
    }
  }
  function cHandleChange(event) {
    event.currentTarget.style.backgroundColor = '#e0e0e0'
    if (event.currentTarget.value === formData.CFRMFBSATIFY3) {
      setFormData({ ...formData, CFRMFBSATIFY3: "" })
    } else {
      event.currentTarget.style.backgroundColor = '#ea565f'
      setFormData({ ...formData, CFRMFBSATIFY3: event.currentTarget.value })
      if (event.currentTarget.id === 'aaa') {
        document.getElementById("bbb").style.backgroundColor = '#e0e0e0';
        document.getElementById("ccc").style.backgroundColor = '#e0e0e0';
      }
      else if (event.currentTarget.id === 'bbb') {
        document.getElementById("aaa").style.backgroundColor = '#e0e0e0';
        document.getElementById("ccc").style.backgroundColor = '#e0e0e0';
      }
      else {
        document.getElementById("aaa").style.backgroundColor = '#e0e0e0';
        document.getElementById("bbb").style.backgroundColor = '#e0e0e0';
      }
    }
  }

  const villageHandleChange = (event) => {
    setVillageCode(event.target.value)
    let cData = _.find(villageData, ['VILLAGE_CODE', event.target.value]);
    formData.CFRMFBVILLAGE = event.target.value
    formData.CFRMFBTSP = cData.TSP_CODE
    setTspCode(cData.TSP_CODE)
    setTspName(cData.TSP_NAME)
    formData.CFRMFBDIV = cData.DIV_ID
    setDivCode(cData.DIV_ID)
    setDivName(cData.DIV_NAME)

    console.log("Selected village => ", event.target.value)
  };

  const setSuccessSnackBarOpen = () => {
    setSuccessSnack(true)
  }

  const setSuccessSnackBarClose = () => {
    setSuccessSnack(false)
  }

  const setSnackBarOpen = () => {
    setOpenSnack(true)
  }

  const setSnackBarClose = () => {
    setOpenSnack(false)
  }

  const save = async () => {

    let valid = !formData.CFRMREGCODE ? "??????????????????????????????????????????????????????????????????????????????????????????" :
      formData.CFRMREGCODE.length !== 7 ? "??????????????????????????????????????????????????????????????????????????????????????????????????????" :
        !formData.CFRMFBDATE ? "?????????????????????????????????????????????????????????" :
          !formData.CFRMFBPERSON ? "?????????????????????????????????????????????????????????????????????????????????" :
            !formData.CFRMFBSEX ? "????????????/??????????????????????????????????????????" :
              !formData.CFRMFBAGE ? "????????????????????????????????????????????????" :
                !formData.CFRMFBVILLAGE ? "????????????????????????????????????????????????????????????????????????" 
                : 'valid';

    if (valid === 'valid') {

      formData.CFRMFBUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
      formData.CFRMFBSTATUS = '2'

      const rhres = await updateCFRM({ formData });
      if (rhres?.status === 200) {
        //console.log("Save MDSR success!")
        setSuccess("Successfully updated!")
        setSuccessSnack(true)
      }
    }
    else {
      setError(valid)
      setOpenSnack(true)
      console.log('Valid - ', valid)
    }

  }

  const cancle = () => {
    history.push('entryhomepage')
    sessionStorage.setItem('homeSave', 'done')
  }

  useEffect(async () => {

    setLoading(true)
    if (sessionStorage.getItem('editCFRM') === 'true') {
      let village = await getVillageByOrgProj()

      if (village.data.data.getVillageByOrgProj.length) {
        console.log("Unicef village Data ========> ", village)

        setVillageData(village.data.data.getVillageByOrgProj)

        setOpenerProj(sessionStorage.getItem('projName'))
        //setOpenerTspCode(village.data.data.getVillageByOrgProj[0].TSP_CODE)
        //setOpenerTspName(village.data.data.getVillageByOrgProj[0].TSP_NAME)

        const cfrmData = await edit.getCFRM()
        if (cfrmData?.status === 200) {
          console.log("cfrmData ", cfrmData.data.data.getCFRM)
          let mData = cfrmData.data.data.getCFRM

          formData.CFRMREGCODE = mData[0].CFRMREGCODE
          formData.CFRMFBPERSON = mData[0].CFRMFBPERSON + ''
          formData.CFRMFBPERSONOTHER = mData[0].CFRMFBPERSONOTHER
          formData.CFRMFBDATE = moment(mData[0].CFRMFBDATE).format("YYYY-MM-DD")
          formData.CFRMFBSEX = mData[0].CFRMFBSEX + ''
          formData.CFRMFBAGE = mData[0].CFRMFBAGE
          formData.CFRMFBAGEUNIT = mData[0].CFRMFBAGEUNIT
          formData.CFRMFBVILLAGE = mData[0].CFRMFBVILLAGE
          setVillageCode(mData[0].CFRMFBVILLAGE)
          let cData = _.find(village.data.data.getVillageByOrgProj, ['VILLAGE_CODE', mData[0].CFRMFBVILLAGE])
          setTspCode(cData.TSP_CODE)
          setTspName(cData.TSP_NAME)
          setDivCode(cData.DIV_ID)
          setDivName(cData.DIV_NAME)

          formData.CFRMFBTSP = mData[0].CFRMFBTSP
          formData.CFRMFBDIV = mData[0].CFRMFBDIV
          formData.CFRMFBSATIFY1 = mData[0].CFRMFBSATIFY1 + ''
          if (mData[0].CFRMFBSATIFY1 === 1) { document.getElementById("a").style.backgroundColor = '#ea565f' }
          else if (mData[0].CFRMFBSATIFY1 === 2) { document.getElementById("b").style.backgroundColor = '#ea565f' }
          else if (mData[0].CFRMFBSATIFY1 === 3) { document.getElementById("c").style.backgroundColor = '#ea565f' }
          else { document.getElementById("a").style.backgroundColor = '#e0e0e0'}
          formData.CFRMFBSATIFY2 = mData[0].CFRMFBSATIFY2 + ''
          if (mData[0].CFRMFBSATIFY2 === 1) { document.getElementById("aa").style.backgroundColor = '#ea565f' }
          else if (mData[0].CFRMFBSATIFY2 === 2) { document.getElementById("bb").style.backgroundColor = '#ea565f' }
          else if (mData[0].CFRMFBSATIFY2 === 3) { document.getElementById("cc").style.backgroundColor = '#ea565f' }
          else { document.getElementById("aa").style.backgroundColor = '#e0e0e0' }
          formData.CFRMFBSATIFY3 = mData[0].CFRMFBSATIFY3 + ''
          if (mData[0].CFRMFBSATIFY3 === 1) { document.getElementById("aaa").style.backgroundColor = '#ea565f' }
          else if (mData[0].CFRMFBSATIFY3 === 2) { document.getElementById("bbb").style.backgroundColor = '#ea565f' }
          else if (mData[0].CFRMFBSATIFY3 === 3) { document.getElementById("ccc").style.backgroundColor = '#ea565f' }
          else { document.getElementById("aaa").style.backgroundColor = '#e0e0e0'}
          formData.CFRMFBSATIFYDETAIL = mData[0].CFRMFBSATIFYDETAIL
          formData.CFRMFBDSEE = mData[0].CFRMFBDSEE + ''
          formData.CFRMFBDHEAR = mData[0].CFRMFBDHEAR + ''
          formData.CFRMFBDWALK = mData[0].CFRMFBDWALK + ''
          formData.CFRMFBDCOMMU = mData[0].CFRMFBDCOMMU + ''
          formData.CFRMFBDREMBR = mData[0].CFRMFBDREMBR + ''
          formData.CFRMFBDWASH = mData[0].CFRMFBDWASH + ''
          formData.CFRMFBPERSONCAT1 = mData[0].CFRMFBPERSONCAT1
          formData.CFRMFBPERSONCAT2 = mData[0].CFRMFBPERSONCAT2 + ''
          formData.CFRMFBPERSONCAT2OTHER = mData[0].CFRMFBPERSONCAT2OTHER
          formData.CFRMFBPERSONCAT2NAME = mData[0].CFRMFBPERSONCAT2NAME
          formData.CFRMFBPERSONCAT2CONTACT = mData[0].CFRMFBPERSONCAT2CONTACT
          formData.CFRMFBOPENERNAME = mData[0].CFRMFBOPENERNAME
          formData.CFRMFBOPENERPOSITION = mData[0].CFRMFBOPENERPOSITION
          formData.CFRMFBOPENERTSP = mData[0].CFRMFBOPENERTSP
          formData.CFRMFBOPENERDIV = mData[0].CFRMFBOPENERDIV
          formData.CFRMFBPROJECT = mData[0].CFRMFBPROJECT
          setOpenerProj(mData[0].CFRMFBPROJECT)
          formData.CFRMFBOPENERDATE = moment(mData[0].CFRMFBOPENERDATE).format("YYYY-MM-DD")
          formData.CFRMFBRESLACT = mData[0].CFRMFBRESLACT
          formData.CFRMFBRESLPERSON = mData[0].CFRMFBRESLPERSON
          formData.CFRMFBRESPMETH = mData[0].CFRMFBRESPMETH + ''
          formData.CFRMFBRESPMETHO = mData[0].CFRMFBRESPMETHO
          formData.CFRMFBCOMPLAINT = mData[0].CFRMFBCOMPLAINT + ''
          formData.CFRMFBCOMPLAINOTHER = mData[0].CFRMFBCOMPLAINOTHER
          formData.CFRMFBRECPERSON = mData[0].CFRMFBRECPERSON
          formData.CFRMFBUSRLOGIN = mData[0].CFRMFBUSRLOGIN
          formData.CFRMFBUPDATE = mData[0].CFRMFBUPDATE
          formData.CFRMFBSTATUS = mData[0].CFRMFBSTATUS
          formData.CFRMFBSYSNC = mData[0].CFRMFBSYSNC
          formData.CFRMFBTYPE1 = mData[0].CFRMFBTYPE1
          formData.CFRMFBTYPE2 = mData[0].CFRMFBTYPE2
          formData.CFRMFBTYPE3 = mData[0].CFRMFBTYPE3 +''
          formData.CFRMFBTYPE3OTHER = mData[0].CFRMFBTYPE3OTHER
          formData.CFRMFBACTDATE = moment(mData[0].CFRMFBACTDATE).format("YYYY-MM-DD")
          formData.CFRMFBRESLDATE = moment(mData[0].CFRMFBRESLDATE).format("YYYY-MM-DD")
          formData.CFRMFBORG = mData[0].CFRMFBORG
          formData.ID = mData[0].ID
          formData.CFRMFBCOMPLAINTPENDING = mData[0].CFRMFBCOMPLAINTPENDING
        }
      }
    }

    setLoading(false)

  }, [])

  return (
    <div style={{ width: '100%', height: '240vh', background: '#fcf0f2' }}>
      <Modals open={loading} />
      {successSnack && <CustomizedSnackbars open={setSuccessSnackBarOpen} close={setSuccessSnackBarClose} alertMsg={success} type="success" />}
      {openSnack && <CustomizedSnackbars open={setSnackBarOpen} close={setSnackBarClose} alertMsg={error} type="warning" />}
      <Typography variant="h6" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }} >
        ????????????????????????????????????</Typography>

      <Grid container >
        <Grid item xs={12} sm={12} md={12} >
          <Typography variant="subtitle1" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold' }} display="inline"   >
            ??????????????????????????????????????????????????????????????????????????????????????????????????????</Typography> </Grid >

      </Grid>

      <Card
        variant="outlined"
        style={{
          background: "#ddd3d5",
          marginTop: '10px',
          marginLeft: '5%',
          width: '90%',
          justifyContent: 'center',
        }}>
        <Grid container style={{ marginTop: '20px', }} >

          <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginTop: '3px' }}>
            <CustomUnicefTextField
              label={<Grid row container><Typography color="#482642">???????????????????????????????????????????????????</Typography>
                <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
              type="text"
              disabled
              variantText="filled"
              inputProps={{ maxLength: 7 }}
              InputLabelProps={{
                style: { color: '#482642', textAlign: 'center' },
              }}
              style={{ width: '90%' }}
              onChange={e => {
                setFormData({ ...formData, CFRMREGCODE: e.target.value })
              }}
              value={formData.CFRMREGCODE} />
          </Grid>

          <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px', alignSelf: 'center', marginTop: '3px' }}>
            <CustomUnicefTextField
              variantText="filled"
              type="date"
              label={<Grid row container><Typography color="#482642">??????????????????</Typography>
                <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
              InputLabelProps={{ shrink: true }} style={{ width: '90%', backgroundColor: '#fcf0f2' }}
              onChange={e => {
                setFormData({ ...formData, CFRMFBDATE: e.target.value })
              }}
              value={formData.CFRMFBDATE} size="large" />

          </Grid>

          <Grid item xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginTop: '3px' }}>
            <ThemeProvider theme={radioTheme}>
              <Card
                variant="outlined"
                style={{
                  background: "#fcf0f2",
                  width: '90%',
                  marginLeft: '20px',

                }}
                className={classes.cardStyle}>
                {<Grid row container style={{ justifyContent: 'center', width: '100%' }}><Typography color="#482642" style={{ marginTop: '3px' }}>????????????</Typography>
                  <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography>
                </Grid>}

                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                  onChange={e => { setFormData({ ...formData, CFRMFBSEX: e.target.value }) }}
                  value={formData.CFRMFBSEX}
                  row={true}
                >
                  <FormControlLabel
                    value="1"
                    labelPlacement="left"
                    label="????????????"
                    style={{ height: "30px" }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={sexHandleChange} onKeyDown={e => e.key === 'Enter' && sexHandleChange(e)} />}
                  />
                  <FormControlLabel
                    value="2"
                    labelPlacement="left"
                    style={{ height: "30px" }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={sexHandleChange} onKeyDown={e => e.key === 'Enter' && sexHandleChange(e)} />}
                    label="???"
                  />
                  <FormControlLabel
                    value="999"
                    labelPlacement="left"
                    style={{ height: "30px" }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={sexHandleChange} onKeyDown={e => e.key === 'Enter' && sexHandleChange(e)} />}
                    label="???????????????"
                  />
                </RadioGroup>
              </Card>
            </ThemeProvider>
          </Grid>

          <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px', marginTop: '5px' }}>
            <CustomUnicefTextField
              label='????????????'
              type="number"
              inputProps={{ step: "1", min: 0, maxLength: 5 }}
              variantText="filled"
              InputLabelProps={{
                style: { color: '#482642', textAlign: 'center' },
              }}
              style={{ width: '85%' }}
              onChange={e => {
                (e.target.value.length > 5) ? setFormData({ ...formData, CFRMFBAGE: (e.target.value).slice(0, 5) })
                  : setFormData({ ...formData, CFRMFBAGE: e.target.value })
              }}
              value={formData.CFRMFBAGE}
            />
          </Grid>

        </Grid>


        <Grid container style={{ marginTop: '20px', }} >
          <Grid item xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <CustomUnicefTextField
              label='?????????????????????????????????'
              select
              value={villageCode}
              onChange={villageHandleChange}
              variantText="filled"
              style={{ width: '90%' }}
              InputLabelProps={{
                style: { color: '#482642' },
                shrink: true
              }}
              SelectProps={{
                native: true
              }}>
              {villageData.length &&
                villageData.map((option) => (
                  <option key={option.VILLAGE_CODE} value={option.VILLAGE_CODE}>
                    {option.VILLAGE_NAME}
                  </option>
                ))}
            </CustomUnicefTextField>

          </Grid>

          <Grid item xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <CustomUnicefTextField
              label='?????????????????????/??????????????????????????????'
              variantText="filled"
              disabled
              value={divName}
              style={{ width: '90%', color: '#d91d4c' }} />
          </Grid>

          <Grid item xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <CustomUnicefTextField
              label='????????????????????????/??????????????????????????????  '
              variantText="filled"
              disabled
              value={tspName}
              style={{ width: '90%', color: '#d91d4c' }} />

          </Grid>

        </Grid>

        {/* ///// */}

      </Card>

      <Card
        variant="outlined"
        style={{
          background: "#ddd3d5",
          marginTop: '10px',
          marginLeft: '5%',
          width: '90%',
          justifyContent: 'center',
        }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          style={{ marginRight: '2%' }}>

          <Grid item spacing={2} xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px', marginTop: '15px' }}>
            <Typography align='center' variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold', color: "#d91d4c" }} >???????????????????????????????????????????????????????????????????????????????????????????????? ???????????????????????????????????????</Typography></Grid>

          <Grid item xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }} >
            <Grid container direction="column"
              justifyContent="center"
              alignItems="center" style={{ marginTop: '20px', marginBottom: '20px' }} >
              <Grid item xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="subtitle1" style={{ color: '#53344d', fontWeight: 'bold' }}   >
                  (???) ???????????????????????????????????????????????????????????????????????? ???????????????????????????????????????</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center', marginLeft: '2%' }}>
                <Stack spacing={2} direction="row">
                  <Button variant="contained" value={'1'} id={'a'} onClick={aHandleChange} > <SentimentSatisfiedRoundedIcon value={'1'} id={'a'} /></Button>
                  <Button variant="contained" value={'2'} id={'b'} onClick={aHandleChange}> <SentimentNeutralIcon value={'2'} id={'b'} /></Button>
                  <Button variant="contained" value={'3'} id={'c'} onClick={aHandleChange} > <SentimentVeryDissatisfiedIcon value={'3'} id={'c'} /></Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }} >
            <Grid container direction="column"
              justifyContent="center"
              alignItems="center" style={{ marginTop: '20px', marginBottom: '20px' }} >
              <Grid item xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="subtitle1" style={{ color: '#53344d', fontWeight: 'bold' }}   >
                  (???) ???????????????????????????????????????????????????????????????????????????????????????????????? ???????????????????????????????????????</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center', marginLeft: '2%' }}>
                <Stack spacing={2} direction="row">
                  <Button variant="contained" value={'1'} id={'aa'} onClick={bHandleChange} > <SentimentSatisfiedRoundedIcon value={'1'} id={'aa'} /></Button>
                  <Button variant="contained" value={'2'} id={'bb'} onClick={bHandleChange}> <SentimentNeutralIcon value={'2'} id={'bb'} /></Button>
                  <Button variant="contained" value={'3'} id={'cc'} onClick={bHandleChange} > <SentimentVeryDissatisfiedIcon value={'3'} id={'cc'} /></Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }} >
            <Grid container direction="column"
              justifyContent="center"
              alignItems="center" style={{ marginTop: '20px', marginBottom: '20px' }} >
              <Grid item xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="subtitle1" style={{ color: '#53344d', fontWeight: 'bold' }}   >
                  (???) ???????????????????????????????????? ??????????????????????????? ???????????????????????????????????????????????????</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center', marginLeft: '2%' }}>
                <Stack spacing={2} direction="row">
                  <Button variant="contained" value={'1'} id={'aaa'} onClick={cHandleChange} > <SentimentSatisfiedRoundedIcon value={'1'} id={'aaa'} /></Button>
                  <Button variant="contained" value={'2'} id={'bbb'} onClick={cHandleChange}> <SentimentNeutralIcon value={'2'} id={'bbb'} /></Button>
                  <Button variant="contained" value={'3'} id={'ccc'} onClick={cHandleChange} > <SentimentVeryDissatisfiedIcon value={'3'} id={'ccc'} /></Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      {/* /////choice //// */}


      <Card
        variant="outlined"
        style={{
          background: "#ddd3d5",
          marginTop: '10px',
          marginLeft: '5%',
          width: '90%',
          justifyContent: 'center',
        }}>
        <Grid container style={{ marginTop: '10px', marginBottom: '10px' }} spacing={2} >
          <Grid item spacing={2} xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center' }}>
            <Typography align='center' variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold', color: "#d91d4c" }} >?????????????????????????????????????????????????????????</Typography></Grid>
          <Grid item xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <ThemeProvider theme={radioTheme}>
              <Card
                variant="outlined"
                style={{
                  background: "#ddd3d5",
                  width: '95%',
                  marginLeft: '10px',
                  height: '80px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  textAlign: 'center'
                }}
                className={classes.cardStyle}>
                {<Grid row container style={{ justifyContent: 'center', marginTop: '15px', alignSelf: 'center', }}><Typography color="#482642" style={{ fontSize: '14px', fontWeight: 'bold' }}>(???)???????????????????????????????????????????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????????????????</Typography>
                </Grid>}

                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                  onChange={e => { setFormData({ ...formData, CFRMFBDSEE: e.target.value }) }}
                  value={formData.CFRMFBDSEE}
                  row={true}
                >
                  <FormControlLabel
                    value="1"
                    labelPlacement="left"
                    label="????????????????????????"
                    style={{ height: "30px" }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={unHandleChange1} onKeyDown={e => e.key === 'Enter' && unHandleChange1(e)} />}
                  />
                  <FormControlLabel
                    value="2"
                    labelPlacement="left"
                    style={{ height: "30px" }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={unHandleChange1} onKeyDown={e => e.key === 'Enter' && unHandleChange1(e)} />}
                    label="??????????????????"
                  />
                </RadioGroup>
              </Card>
            </ThemeProvider>
          </Grid>

          <Grid item xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <ThemeProvider theme={radioTheme}>
              <Card
                variant="outlined"
                style={{
                  background: "#ddd3d5",
                  width: '95%',
                  marginLeft: '10px',
                  height: '80px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  textAlign: 'center'
                }}
                className={classes.cardStyle}>
                {<Grid row container style={{ justifyContent: 'center', marginTop: '3px', alignSelf: 'center' }}><Typography color="#482642" style={{ fontSize: '14px', fontWeight: 'bold' }}>(???)??????????????????????????????????????????????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????????????????</Typography>
                </Grid>}

                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                  onChange={e => { setFormData({ ...formData, CFRMFBDHEAR: e.target.value }) }}
                  value={formData.CFRMFBDHEAR}
                  row={true}
                >
                  <FormControlLabel
                    value="1"
                    labelPlacement="left"
                    label="????????????????????????"
                    style={{ height: "30px", fontWeight: 'bold' }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={unHandleChange2} onKeyDown={e => e.key === 'Enter' && unHandleChange2(e)}

                    />}
                  />
                  <FormControlLabel
                    value="2"
                    labelPlacement="left"
                    style={{ height: "30px" }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={unHandleChange2} onKeyDown={e => e.key === 'Enter' && unHandleChange2(e)} />}
                    label="??????????????????"
                  />
                </RadioGroup>
              </Card>
            </ThemeProvider>
          </Grid>

          <Grid item xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <ThemeProvider theme={radioTheme}>
              <Card
                variant="outlined"
                style={{
                  background: "#ddd3d5",
                  width: '95%',
                  marginLeft: '10px',
                  height: '80px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  textAlign: 'center'
                }}
                className={classes.cardStyle}>
                {<Grid row container style={{ justifyContent: 'center', marginTop: '3px', alignSelf: 'center' }}><Typography color="#482642" style={{ fontSize: '14px', fontWeight: 'bold' }}>(???)????????????????????????????????? ???????????? ???????????????????????????????????????????????????????????????????????????????????? ???????????????????????????????????????????????????</Typography>
                </Grid>}

                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                  onChange={e => { setFormData({ ...formData, CFRMFBDWALK: e.target.value }) }}
                  value={formData.CFRMFBDWALK}
                  row={true}
                >
                  <FormControlLabel
                    value="1"
                    labelPlacement="left"
                    label="????????????????????????"
                    style={{ height: "30px" }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={unHandleChange3} onKeyDown={e => e.key === 'Enter' && unHandleChange3(e)} />}
                  />
                  <FormControlLabel
                    value="2"
                    labelPlacement="left"
                    style={{ height: "30px" }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={unHandleChange3} onKeyDown={e => e.key === 'Enter' && unHandleChange3(e)} />}
                    label="??????????????????"
                  />
                </RadioGroup>
              </Card>
            </ThemeProvider>
          </Grid>

          <Grid item xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <ThemeProvider theme={radioTheme}>
              <Card
                variant="outlined"
                style={{
                  background: "#ddd3d5",
                  width: '95%',
                  marginLeft: '10px',
                  height: '80px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  textAlign: 'center'
                }}
                className={classes.cardStyle}>
                {<Grid row container style={{ justifyContent: 'center', marginTop: '3px', alignSelf: 'center' }}><Typography color="#482642" style={{ fontSize: '14px', fontWeight: 'bold' }}>(???)?????????????????????????????????????????????????????? ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? </Typography>
                </Grid>}

                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                  onChange={e => { setFormData({ ...formData, CFRMFBDCOMMU: e.target.value }) }}
                  value={formData.CFRMFBDCOMMU}
                  row={true}
                >
                  <FormControlLabel
                    value="1"
                    labelPlacement="left"
                    label="????????????????????????"
                    style={{ height: "30px" }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={unHandleChange4} onKeyDown={e => e.key === 'Enter' && unHandleChange4(e)} />}
                  />
                  <FormControlLabel
                    value="2"
                    labelPlacement="left"
                    style={{ height: "30px" }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={unHandleChange4} onKeyDown={e => e.key === 'Enter' && unHandleChange4(e)} />}
                    label="??????????????????"
                  />
                </RadioGroup>
              </Card>
            </ThemeProvider>
          </Grid>

          <Grid item xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <ThemeProvider theme={radioTheme}>
              <Card
                variant="outlined"
                style={{
                  background: "#ddd3d5",
                  width: '95%',
                  marginLeft: '10px',
                  height: '80px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  textAlign: 'center'
                }}
                className={classes.cardStyle}>
                {<Grid row container style={{ justifyContent: 'center', marginTop: '3px', alignSelf: 'center' }}><Typography color="#482642" style={{ fontSize: '14px', fontWeight: 'bold' }}>(???)????????????????????? ???????????? ????????????????????????????????????????????????????????????????????????????????????????????? ???????????????????????????????????????????????????</Typography>
                </Grid>}

                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                  onChange={e => { setFormData({ ...formData, CFRMFBDREMBR: e.target.value }) }}
                  value={formData.CFRMFBDREMBR}
                  row={true}
                >
                  <FormControlLabel
                    value="1"
                    labelPlacement="left"
                    label="????????????????????????"
                    style={{ height: "30px" }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={unHandleChange5} onKeyDown={e => e.key === 'Enter' && unHandleChange5(e)} />}
                  />
                  <FormControlLabel
                    value="2"
                    labelPlacement="left"
                    style={{ height: "30px" }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={unHandleChange5} onKeyDown={e => e.key === 'Enter' && unHandleChange5(e)} />}
                    label="??????????????????"
                  />
                </RadioGroup>
              </Card>
            </ThemeProvider>
          </Grid>

          <Grid item xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <ThemeProvider theme={radioTheme}>
              <Card
                variant="outlined"
                style={{
                  background: "#ddd3d5",
                  width: '95%',
                  marginLeft: '10px',
                  height: '80px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  textAlign: 'center'
                }}
                className={classes.cardStyle}>
                {<Grid row container style={{ justifyContent: 'center', marginTop: '3px', alignSelf: 'center' }}><Typography color="#482642" style={{ fontSize: '14px', fontWeight: 'bold' }}>(???)??????????????????????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? </Typography>
                </Grid>}

                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                  onChange={e => { setFormData({ ...formData, CFRMFBDWASH: e.target.value }) }}
                  value={formData.CFRMFBDWASH}
                  row={true}
                >
                  <FormControlLabel
                    value="1"
                    labelPlacement="left"
                    label="????????????????????????"
                    style={{ height: "30px" }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={unHandleChange6} onKeyDown={e => e.key === 'Enter' && unHandleChange6(e)} />}
                  />
                  <FormControlLabel
                    value="2"
                    labelPlacement="left"
                    style={{ height: "30px" }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={unHandleChange6} onKeyDown={e => e.key === 'Enter' && unHandleChange6(e)} />}
                    label="??????????????????"
                  />
                </RadioGroup>
              </Card>
            </ThemeProvider>
          </Grid>



        </Grid>
      </Card>
      {/* unnomal */}

      <Card
        variant="outlined"
        style={{
          background: "#ddd3d5",
          marginTop: '10px',
          marginLeft: '5%',
          width: '90%',
          justifyContent: 'center',
        }}>
        <Grid container style={{ marginTop: '20px', marginBottom: '10px' }} >
          <Grid item spacing={2} xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <Typography align='center' variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold', color: "#d91d4c" }}  >?????????????????????????????????????????? ???????????????????????????????????????????????????</Typography>
          </Grid>

          <Grid container style={{ marginBottom: '10px' }} >

            <Grid item xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px', marginTop: '4px' }}>
              <CustomUnicefTextField
                label='- - - - - - - - -'
                type="text"
                variantText="filled"
                InputLabelProps={{
                  style: { color: '#482642', textAlign: 'center' },
                }}
                style={{ width: '90%' }}
                multiline
                onChange={e => {
                  setFormData({ ...formData, CFRMFBSATIFYDETAIL: e.target.value })
                }}
                value={formData.CFRMFBSATIFYDETAIL} />
            </Grid>

            <Grid item xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
              <ThemeProvider theme={radioTheme}>
                <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%', backgroundColor: 'white' }}>
                  <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >??????????????????????????????????????????</Typography>
                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={formData.CFRMFBPERSON}
                    onChange={e => { setFormData({ ...formData, CFRMFBPERSON: e.target.value }) }}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      style: {
                        maxHeight: 300,
                      },
                      getContentAnchorEl: null,
                    }}>
                    <MenuItem classes={{ selected: classes.selected }} value={'1'}>??????????????????????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'2'}>??????????????????????????????/???????????????????????? </MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'3'}>??????????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'4'}>???????????????</MenuItem>
                  </Select>
                </FormControl>
              </ThemeProvider>
            </Grid>

            {formData.CFRMFBPERSON === '4' && <>
              <Grid item xs={12} sm={12} md={4}>
                <CustomUnicefTextField
                  id="filled-basic"
                  label="?????????????????????????????????????????????????????????"
                  variantText="filled"
                  style={{ marginTop: '2px', marginBottom: '10px', width: '90%' }}
                  onChange={e => { setFormData({ ...formData, CFRMFBPERSONOTHER: e.target.value }) }}
                  value={formData.CFRMFBPERSONOTHER}
                />
              </Grid></>}


          </Grid>



          <Grid container style={{ marginBottom: '10px' }} >

            <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', height: '80px' }}>
              <ThemeProvider theme={radioTheme}>
                <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%', backgroundColor: 'white' }}>
                  <InputLabel id="demo-simple-select-filled-label"> {<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }}>????????????????????? ???????????????????????????????????? ????????????????????????????????????????????????????????????????????? ??????????????????????????????</Typography>
                  </Grid>}</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={formData.CFRMFBPERSONCAT1}
                    onChange={e => { setFormData({ ...formData, CFRMFBPERSONCAT1: e.target.value }) }}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      style: {
                        maxHeight: 300,
                      },
                      getContentAnchorEl: null,
                    }}>
                    {PERSONCAT1.map((m) => (
                      <MenuItem classes={{ selected: classes.selected }} value={m.value}>{m.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </ThemeProvider>
            </Grid>

            <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', }}>
              <ThemeProvider theme={radioTheme}>
                <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%', backgroundColor: 'white' }}>
                  <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >????????????????????? ??????????????????????????????????????????????????????????????? ????????????????????????????????????????????? ??????????????????????????????</Typography>
                  </Grid>}</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={formData.CFRMFBPERSONCAT2}
                    onChange={e => { setFormData({ ...formData, CFRMFBPERSONCAT2: e.target.value }) }}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      style: {
                        maxHeight: 300,
                      },
                      getContentAnchorEl: null,
                    }}>
                    <MenuItem classes={{ selected: classes.selected }} value={'1'}>?????????????????????????????????????????????????????????????????? ???????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'2'}>????????????????????????????????? ???????????????????????????????????????????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'3'}>???????????????????????????????????? ???????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'4'}>???????????????????????????????????????</MenuItem>
                  </Select>
                </FormControl>
              </ThemeProvider>
            </Grid>
            {formData.CFRMFBPERSONCAT2 === '4' && <>
              <Grid item xs={12} sm={4} md={4}>
                <CustomUnicefTextField
                  multiline
                  id="filled-basic"
                  label="???????????????????????????????????????"
                  variantText="filled"
                  style={{ marginTop: '2px', width: '90%' }}
                  onChange={e => { setFormData({ ...formData, CFRMFBPERSONCAT2OTHER: e.target.value }) }}
                  value={formData.CFRMFBPERSONCAT2OTHER}
                />
              </Grid></>}

          </Grid>







          <Grid item spacing={2} xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px', alignSelf: 'center', justifyContent: 'center', }} justifyContent='center'>
            <Card style={{
              background: "#ddd3d5",
              marginTop: '10px',
              width: '99%',
              justifyContent: 'center',
              alignSelf: 'center',
              marginLeft: '10px'
            }}>
              <Typography align='center' variant="subtitle1" style={{ background: '#ddd3d5', fontWeight: 'bold', padding: '5px', color: "#d91d4c" }} >***????????????????????????????????????????????????????????????????????? ?????????????????????????????????????????? ????????????????????? ???????????????????????????????????? ????????????????????????????????????????????????????????????????????? ????????????????????????***</Typography>
            </Card>
          </Grid>

          <Grid item spacing={2} xs={12} sm={12} md={2}>
            <Typography variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold' }} >?????????????????????????????? ???????????????????????????</Typography>
          </Grid>
          <Grid container style={{ marginTop: '10px', marginBottom: '15px' }} >
            <Grid item spacing={2} xs={12} sm={12} md={6} style={{ alignContent: 'center', alignItems: 'center' }}>
              <CustomUnicefTextField
                label='????????????'
                type="text"
                variantText="filled"
                InputLabelProps={{
                  style: { color: '#482642', textAlign: 'center' },
                }}
                style={{ width: '95%' }}
                onChange={e => {
                  setFormData({ ...formData, CFRMFBPERSONCAT2NAME: e.target.value })
                }}
                value={formData.CFRMFBPERSONCAT2NAME} />
            </Grid>
            <Grid item spacing={2} xs={12} sm={12} md={6} style={{ alignContent: 'center', alignItems: 'center' }}>
              <CustomUnicefTextField
                label='?????????????????????????????????????????????????????????????????????'
                type="number"
                variantText="filled"
                InputLabelProps={{
                  style: { color: '#482642', textAlign: 'center' },
                }}
                style={{ width: '95%' }}
                onChange={e => {
                  setFormData({ ...formData, CFRMFBPERSONCAT2CONTACT: e.target.value })
                }}
                value={formData.CFRMFBPERSONCAT2CONTACT} />
            </Grid>

          </Grid>

        </Grid>
      </Card>


      <Card
        variant="outlined"
        style={{
          background: "#ddd3d5",
          marginTop: '10px',
          marginLeft: '5%',
          width: '90%',
          justifyContent: 'center',
        }}>
        <Grid container style={{ marginTop: '20px', marginBottom: '12px' }} >
          <Grid item spacing={2} xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '15px' }}>
            <Typography align='center' variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold', color: "#d91d4c" }}  >??????????????????????????????????????? ???????????????????????????/ ??????????????????????????????????????? ?????????????????????????????????????????????????????????????????????????????? ???????????????????????????????????????</Typography>
          </Grid>

          <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <CustomUnicefTextField
              label='????????????'
              type="text"
              variantText="filled"
              InputLabelProps={{
                style: { color: '#482642', textAlign: 'center' },
              }}
              style={{ width: '90%' }}
              onChange={e => {
                setFormData({ ...formData, CFRMFBOPENERNAME: e.target.value })
              }}
              value={formData.CFRMFBOPENERNAME} />
          </Grid>

          <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <CustomUnicefTextField
              label='???????????????'
              type="text"
              variantText="filled"
              InputLabelProps={{
                style: { color: '#482642', textAlign: 'center' },
              }}
              style={{ width: '90%' }}
              onChange={e => {
                setFormData({ ...formData, CFRMFBOPENERPOSITION: e.target.value })
              }}
              value={formData.CFRMFBOPENERPOSITION} />

          </Grid>

          <Grid item xs={12} sm={12} md={2} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <CustomUnicefTextField
              label='????????????????????????/??????????????????'
              variantText="filled"
              disabled
              value={tspName}
              style={{ width: '90%', color: '#d91d4c' }} />

          </Grid>

          <Grid item xs={12} sm={12} md={2} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <CustomUnicefTextField
              label='???????????????????????????????????????'
              variantText="filled"
              disabled
              value={openerProj}
              style={{ width: '90%', color: '#d91d4c' }} />

          </Grid>

          <Grid item spacing={2} xs={12} sm={12} md={2} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px', alignSelf: 'center' }}>
            <CustomUnicefTextField
              variantText="filled"
              type="date"
              label='??????????????????'
              InputLabelProps={{ shrink: true }} style={{ width: '90%', backgroundColor: '#fcf0f2' }}
              onChange={e => {
                setFormData({ ...formData, CFRMFBOPENERDATE: e.target.value })
              }}
              value={formData.CFRMFBOPENERDATE} size="large" />
          </Grid>

          <Grid container >

            <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px', alignSelf: 'center' }}>
              <CustomUnicefTextField
                variantText="filled"
                type="date"
                label='Date of action'
                InputLabelProps={{ shrink: true }} style={{ width: '90%', backgroundColor: '#fcf0f2' }}
                onChange={e => {
                  setFormData({ ...formData, CFRMFBACTDATE: e.target.value })
                }}
                value={formData.CFRMFBACTDATE} size="large" />
            </Grid>

            <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
              <ThemeProvider theme={radioTheme}>
                <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%', backgroundColor: 'white' }}>
                  <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >???????????????????????????????????????????????????????????????????????????????????????????????????</Typography>
                  </Grid>}</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={formData.CFRMFBCOMPLAINT}
                    onChange={e => { setFormData({ ...formData, CFRMFBCOMPLAINT: e.target.value }) }}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      style: {
                        maxHeight: 300,
                      },
                      getContentAnchorEl: null,
                    }}>
                    <MenuItem classes={{ selected: classes.selected }} value={'1'}>????????????????????????????????????????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'2'}>???????????????????????????????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'3'}>?????????????????????????????????????????????????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'4'}>???????????????</MenuItem>
                  </Select>
                </FormControl>
              </ThemeProvider>
            </Grid>
            {formData.CFRMFBCOMPLAINT === '2' ? <>
              <Grid item xs={12} sm={4} md={3}>
                <CustomUnicefTextField
                  multiline
                  id="filled-basic"
                  label="??????????????????????????????????????????????????????"
                  variantText="filled"
                  style={{ marginTop: '5px', marginBottom: '10px', width: '95%' }}
                  onChange={e => { setFormData({ ...formData, CFRMFBCOMPLAINTPENDING: e.target.value }) }}
                  value={formData.CFRMFBCOMPLAINTPENDING}
                />
              </Grid></> : null}
            {formData.CFRMFBCOMPLAINT === '4' ? <>
              <Grid item xs={12} sm={4} md={3}>
                <CustomUnicefTextField
                  multiline
                  id="filled-basic"
                  label="???????????????"
                  variantText="filled"
                  style={{ marginTop: '5px', marginBottom: '10px', width: '95%' }}
                  onChange={e => { setFormData({ ...formData, CFRMFBCOMPLAINOTHER: e.target.value }) }}
                  value={formData.CFRMFBCOMPLAINOTHER}
                />
              </Grid></> : null}
            <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px', alignSelf: 'center' }}>
              <CustomUnicefTextField
                variantText="filled"
                type="date"
                label='Resolved date'
                InputLabelProps={{ shrink: true }} style={{ width: '90%', backgroundColor: '#fcf0f2' }}
                onChange={e => {
                  setFormData({ ...formData, CFRMFBRESLDATE: e.target.value })
                }}
                value={formData.CFRMFBRESLDATE} size="large" />
            </Grid>

            <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
              <ThemeProvider theme={radioTheme}>
                <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%', backgroundColor: 'white' }}>
                  <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >????????????????????????????????? ??????????????????????????? ??????????????????????????????????????????????????????</Typography>
                  </Grid>}</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={formData.CFRMFBTYPE1}
                    onChange={e => { setFormData({ ...formData, CFRMFBTYPE1: e.target.value }) }}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      style: {
                        maxHeight: 300,
                      },
                      getContentAnchorEl: null,
                    }}>
                    <MenuItem classes={{ selected: classes.selected }} value={'1'}>????????????????????????????????? (Feedback)</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'2'}>??????????????????????????????????????? (Complaint)</MenuItem>
                  </Select>
                </FormControl>
              </ThemeProvider>
            </Grid>

            <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
              <ThemeProvider theme={radioTheme}>
                <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%', backgroundColor: 'white' }}>
                  <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >???????????????????????????????????????????????????????????? ??????????????????????????????</Typography>
                  </Grid>}</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={formData.CFRMFBTYPE2}
                    onChange={e => { setFormData({ ...formData, CFRMFBTYPE2: e.target.value }) }}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      style: {
                        maxHeight: 300,
                      },
                      getContentAnchorEl: null,
                    }}>
                    <MenuItem classes={{ selected: classes.selected }} value={'1'}>(???) ????????????????????????????????????????????????????????????????????? ????????????????????????????????????????????? ???????????????????????????????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'2'}>(???) ???????????????????????????????????????????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'3'}>(???) ???????????????????????????????????????????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'4'}> (???) ????????????????????????????????????????????????????????????????????????</MenuItem>
                  </Select>
                </FormControl>
              </ThemeProvider>
            </Grid>

            <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
              <ThemeProvider theme={radioTheme}>
                <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '93%', backgroundColor: 'white' }}>
                  <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >???????????????????????????????????????????????????????????? ??????????????????????????????</Typography>
                  </Grid>}</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={formData.CFRMFBTYPE3}
                    onChange={e => { setFormData({ ...formData, CFRMFBTYPE3: e.target.value }) }}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      style: {
                        maxHeight: 300,
                      },
                      getContentAnchorEl: null,
                    }}>
                    <MenuItem classes={{ selected: classes.selected }} value={'1'}>Positive (??????????????????????????????????????????????????????????????????)</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'2'}>Negative (???????????????????????????????????????????????????????????????????????????????????????)</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'3'}>Suggestion (????????????????????????????????????????????????)</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'4'}>Other (???????????????)</MenuItem>
                  </Select>
                </FormControl>
              </ThemeProvider>
            </Grid>

            {formData.CFRMFBTYPE3 === '4' ? <>
              <Grid item xs={12} sm={4} md={3}>
                <CustomUnicefTextField
                  multiline
                  id="filled-basic"
                  label="???????????????"
                  variantText="filled"
                  style={{ marginTop: '5px', marginBottom: '10px', width: '93%' }}
                  onChange={e => { setFormData({ ...formData, CFRMFBTYPE3OTHER: e.target.value }) }}
                  value={formData.CFRMFBTYPE3OTHER}
                />
              </Grid></> : null}

            <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
              <ThemeProvider theme={radioTheme}>
                <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%', backgroundColor: 'white' }}>
                  <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >???????????????????????????????????????????????????????????????????????????????????????????????????????????????</Typography>
                  </Grid>}</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    onChange={e => {
                      setFormData({ ...formData, CFRMFBRESLPERSON: e.target.value })
                    }}
                    value={formData.CFRMFBRESLPERSON}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      style: {
                        maxHeight: 300,
                      },
                      getContentAnchorEl: null,
                    }}>
                    <MenuItem classes={{ selected: classes.selected }} value={'1'}>???????????????????????????????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'2'}>????????????????????????????????????????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'3'}>????????????????????????????????????????????????????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'4'}>???????????????????????????????????????????????????</MenuItem>

                  </Select>
                </FormControl>
              </ThemeProvider>
            </Grid>

            <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
              <ThemeProvider theme={radioTheme}>
                <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%', backgroundColor: 'white' }}>
                  <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >??????????????????????????????????????????????????????????????????????????????????????????????????????????????????</Typography>
                  </Grid>}</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={formData.CFRMFBRESPMETH}
                    onChange={e => { setFormData({ ...formData, CFRMFBRESPMETH: e.target.value }) }}
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      style: {
                        maxHeight: 300,
                      },
                      getContentAnchorEl: null,
                    }}>
                    <MenuItem classes={{ selected: classes.selected }} value={'1'}>??????????????????????????????????????????????????????????????????????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'2'}>????????????????????????????????? ???????????????????????????????????????????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'3'}>???????????????????????????????????? ???????????????</MenuItem>
                    <MenuItem classes={{ selected: classes.selected }} value={'4'}>???????????????????????????????????????</MenuItem>

                  </Select>
                </FormControl>
              </ThemeProvider>
            </Grid>

            {formData.CFRMFBRESPMETH === '4' ? <>
              <Grid item xs={12} sm={4} md={3}>
                <CustomUnicefTextField
                  multiline
                  id="filled-basic"
                  label="???????????????"
                  variantText="filled"
                  style={{ marginTop: '5px', marginBottom: '10px', width: '90%' }}
                  onChange={e => { setFormData({ ...formData, CFRMFBRESPMETHO: e.target.value }) }}
                  value={formData.CFRMFBRESPMETHO}
                />
              </Grid></> : null}


            <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px', marginTop: '4px' }}>
              <CustomUnicefTextField
                multiline
                label='?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
                fontSize='2px'
                type="text"
                variantText="filled"
                InputLabelProps={{
                  style: { color: '#482642', textAlign: 'center' },
                }}
                style={{ width: '93%' }}
                onChange={e => {
                  setFormData({ ...formData, CFRMFBRESLACT: e.target.value })
                }}
                value={formData.CFRMFBRESLACT} />
            </Grid>

            <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '30px', marginTop: '4px' }}>
              <CustomUnicefTextField
                label='?????????????????????????????????/????????????????????????????????????????????????'
                type="text"
                variantText="filled"
                InputLabelProps={{
                  style: { color: '#482642', textAlign: 'center' },
                }}
                style={{ width: '92%' }}
                onChange={e => {
                  setFormData({ ...formData, CFRMFBRECPERSON: e.target.value })
                }}
                value={formData.CFRMFBRECPERSON} />
            </Grid>

          </Grid>

        </Grid>
      </Card>

      {/* save button */}
      <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ paddingTop: '25px', background: '#fcf0f2' }} row>
        <Grid item xs={'auto'} style={{ width: '15%' }}>
          <Button
            variant="contained"
            style={{ background: '#482642', color: '#fff', width: '100%' }}
            onClick={save} >Update</Button>
        </Grid>
        <Grid item xs={'auto'} style={{ width: '15%' }}>
          <Button
            variant="contained"
            style={{ background: '#482642', color: '#fff', width: '100%' }}
            onClick={cancle} >Cancel</Button>
        </Grid>
      </Grid>

    </div>
  )
}