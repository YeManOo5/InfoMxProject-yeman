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
import {getProject,getAllOrg} from '../../modals/background';
import { insertCFRM } from '../../modals/cfrminfo';
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

export default function CFRMForm() {

  let wfh = "WFH < -3 Z/ MUAC < 115 mm"

  const classes = useStyles();

  const history = useHistory();

  ///////Background Data///////////
  const [loading, setLoading] = useState(false);
  const [villageData, setVillageData] = useState([]);
  const [villageCode, setVillageCode] = useState('')
  const [orgData,setOrgData] = useState([])
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
      CFRMFBPERSONOTHER: '999',
      CFRMFBDATE: '',
      CFRMFBSEX: '',
      CFRMFBAGE: '',
      CFRMFBAGEUNIT: '365',
      CFRMFBVILLAGE: '',
      CFRMFBTSP: '',
      CFRMFBDIV: '',
      CFRMFBSATIFY1: '',
      CFRMFBSATIFY2: '',
      CFRMFBSATIFY3: '999',
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
      CFRMFBINSERT: '',
      CFRMFBUPDATE: '',
      CFRMFBSTATUS: '',
      CFRMFBSYSNC: '',
      CFRMFBORG: '',
      CFRMFBCOMPLAINTPENDING:'',
    }
  )

  const PERSONCAT1 = [
    { value: '1', name: 'စေတနာ့ဝန်ထမ်း' },
    { value: '2', name: 'စီမံချက်ဝန်ထမ်း' },
    { value: '3', name: 'စီမံချက်ခေါင်းဆောင်' },
    { value: '4', name: 'ကျေးရွာလူကြီးများ' },
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


  /* စီမံကိန်း၏လုပ်ဆောင်ချက်များအပေါ် စိတ်ကျေနပ်မှု */

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

    let valid = !formData.CFRMREGCODE ? "အကြံပြုစာအမှတ်စဉ်ကို‌ရေးပေးပါ။" :
      formData.CFRMREGCODE.length !== 7 ? "အကြံပြုစာအမှတ်စဉ်သည်၇လုံးသာရှိရမည်" :
        !formData.CFRMFBDATE ? "ရက်စွဲကိုရွေးပေးပါ။" :
          !formData.CFRMFBPERSON ? "အကြံပြုစာပေးသူကိုရွေးပေးပါ။" :
            !formData.CFRMFBSEX ? "ကျား/မကိုရွေးပေးပါ။" :
              !formData.CFRMFBAGE ? "အသက်ကိုရေးပေးပါ။" :
                 !formData.CFRMFBVILLAGE ? "ကျေးရွာအမည်ကိုရွေးပေးပါ။" :
                 ! (formData.CFRMFBRESLDATE >= formData.CFRMFBOPENERDATE ) ? 'အကြံပြုစာလက်ခံရရှိသောရက်စွဲ သည် တုံပြန်ဖြေရှင်းရက်စွဲ ထက်ငယ်သင့်ပါသည်။':
                 !(formData.CFRMFBRESLDATE >= formData.CFRMFBACTDATE ) ? 'အကြံပြုတိုင်ကြားချက်ဖြေရှင်းရက်စွဲ သည် တုံပြန်ဖြေရှင်းရက်စွဲ ထက်ငယ်သင့်ပါသည်။' :
                 !(formData.CFRMFBACTDATE >= formData.CFRMFBOPENERDATE) ? 'အကြံပြုစာလက်ခံရရှိသောရက်စွဲ သည် အကြံပြုတိုင်ကြားချက်ဖြေရှင်းရက်စွဲ ထက်ငယ်သင့်ပါသည်။'

                : 'valid';

    if (valid === 'valid') {

      formData.CFRMFBUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
      formData.CFRMFBINSERT = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
      
      const rhres = await insertCFRM({ formData });
      if (rhres?.status === 200) {
        //console.log("Save MDSR success!")
        setSuccess("Successfully registered!")
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
/*  */

  useEffect(async () => {

    setLoading(true)
    let village = await getVillageByOrgProj()
    
    if(sessionStorage.getItem('org')==='CPI-99' )
    {
      let  org = await getAllOrg() 
      if(org.data.data)
      {
        setOrgData(org.data.data)
        formData.CFRMFBORG = sessionStorage.getItem('org')
      }
    }
    else{
      formData.CFRMFBORG =sessionStorage.getItem('org')
    }

    if (village.data.data.getVillageByOrgProj.length) {
      console.log("Unicef village Data ========> ", village)
     
      setVillageData(village.data.data.getVillageByOrgProj)
      setTspCode(village.data.data.getVillageByOrgProj[0].TSP_CODE)
      setDivCode(village.data.data.getVillageByOrgProj[0].DIV_ID)
      setTspName(village.data.data.getVillageByOrgProj[0].TSP_NAME)
      setDivName(village.data.data.getVillageByOrgProj[0].DIV_NAME)
      setOpenerProj(sessionStorage.getItem('projName'))
      //setOpenerTspCode(village.data.data.getVillageByOrgProj[0].TSP_CODE)
      //setOpenerTspName(village.data.data.getVillageByOrgProj[0].TSP_NAME)

      setFormData({
        ...formData,
        CFRMFBVILLAGE: village.data.data.getVillageByOrgProj[0].VILLAGE_CODE,
        CFRMFBDIV: village.data.data.getVillageByOrgProj[0].DIV_ID,
        CFRMFBTSP: village.data.data.getVillageByOrgProj[0].TSP_CODE,
        CFRMFBUSRLOGIN: sessionStorage.getItem('userName'),
        CFRMFBPROJECT:sessionStorage.getItem('project'),
        CFRMFBSTATUS: 1,
        CFRMFBSYSNC: '0',
      })
    }
    setLoading(false)

  }, [])

  return (
    <div style={{ width: '100%', height: '100vh', background: '#fcf0f2' }}>
      <Modals open={loading} />
      {successSnack && <CustomizedSnackbars open={setSuccessSnackBarOpen} close={setSuccessSnackBarClose} alertMsg={success} type="success" />}
      {openSnack && <CustomizedSnackbars open={setSnackBarOpen} close={setSnackBarClose} alertMsg={error} type="warning" />}
      <Typography variant="h6" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }} >
        အကြံပြုပေးစာ</Typography>

      <Grid container >
        <Grid item xs={12} sm={12} md={12} >
          <Typography variant="subtitle1" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold' }} display="inline"   >
          စီမံချက်၀န်ဆောင်မှုရယူသူများအတွက်</Typography> </Grid >

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
              label={<Grid row container><Typography color="#482642">အကြံပြုစာအမှတ်စဉ်</Typography>
                <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
              type="text"
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
              label={<Grid row container><Typography color="#482642">ရက်စွဲ</Typography>
                <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
              InputLabelProps={{ shrink: true }} style={{ width: '90%', backgroundColor: '#fcf0f2' }}
              onChange={e => {
                setFormData({ ...formData, CFRMFBDATE: e.target.value })
              }}
              value={formData.CFRMFBDATE} size="large" />

          </Grid>

          <Grid item xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center',marginTop: '3px' }}>
            <ThemeProvider theme={radioTheme}>
              <Card
                variant="outlined"
                style={{
                  background: "#fcf0f2",
                  width: '90%',
                  marginLeft: '20px',

                }}
                className={classes.cardStyle}>
                {<Grid row container style={{ justifyContent: 'center', width: '100%' }}><Typography color="#482642" style={{ marginTop: '3px' }}>လိင်</Typography>
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
                    label="ကျား"
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
                    label="မ"
                  />
                  <FormControlLabel
                    value="999"
                    labelPlacement="left"
                    style={{ height: "30px" }}
                    className={classes.fontSize}
                    control={<Radio size="small" color="primary"
                      onClick={sexHandleChange} onKeyDown={e => e.key === 'Enter' && sexHandleChange(e)} />}
                    label="အခြား"
                  />
                </RadioGroup>
              </Card>
            </ThemeProvider>
          </Grid>
          
          <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px',marginTop: '5px' }}>
            <CustomUnicefTextField
              label={<Grid row container><Typography color="#482642">အသက်</Typography>
              <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
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
              label={<Grid row container><Typography color="#482642">ကျေးရွာအမည်</Typography>
              <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
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
              label='ပြည်နယ်/တိုင်းအမည်'
              variantText="filled"
              disabled
              value={divName}
              style={{ width: '90%', color: '#d91d4c' }} />
          </Grid>

          <Grid item xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <CustomUnicefTextField
              label='မြို့နယ်/ခရိုင်အမည်  '
              variantText="filled"
              disabled
              value={tspName}
              style={{ width: '90%', color: '#d91d4c' }} />

          </Grid>

          {sessionStorage.getItem('org') === 'CPI-99' && <Grid item xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <CustomUnicefTextField
              label='အဖွဲ့အစည်းအမည်'
              select
              value={formData.CFRMFBORG}
              onChange={e => { setFormData({ ...formData,CFRMFBORG: e.target.value }) }}
              variantText="filled"
              style={{ width: '85%' }}
              InputLabelProps={{
                style: { color: '#482642' },
                shrink: true
              }}
              SelectProps={{
                native: true
              }}>
              {orgData.length &&
               orgData.map((option) => (
                  <option key={option.ORG_ID} value={option.ORG_ID}>
                    {option.ORG_SHORTNAME}
                  </option>
                ))}
            </CustomUnicefTextField>

          </Grid>}
          


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
            <Typography align='center' variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold', color: "#d91d4c" }} >စီမံချက်၏လုပ်ဆောင်ချက်များအပေါ် စိတ်ကျေနပ်မှု</Typography></Grid>

          <Grid item xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }} >
            <Grid container direction="column"
              justifyContent="center"
              alignItems="center" style={{ marginTop: '20px', marginBottom: '20px' }} >
              <Grid item xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                <Typography variant="subtitle1" style={{ color: '#53344d', fontWeight: 'bold' }}   >
                  (၁) စီမံချက်၀န်ဆောင်မှုအပေါ် စိတ်ကျေနပ်မှု</Typography>
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
                  (၂) စီမံချက်ဝန်ထမ်းများဆက်ဆံရေးအပေါ် စိတ်ကျေနပ်မှု</Typography>
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
                  (၃) ကျေးရွာအပေါ် စီမံချက်၏ အကျိုးသက်ရောက်မှု</Typography>
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
            <Typography align='center' variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold', color: "#d91d4c" }} >မသန်စွမ်းမှုအခြေအနေ</Typography></Grid>
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
                {<Grid row container style={{ justifyContent: 'center', marginTop: '15px', alignSelf: 'center', }}><Typography color="#482642" style={{ fontSize: '14px', fontWeight: 'bold' }}>(၁)ပါ၀ါမျက်မှန်တပ်ထားလျှင်တောင် အမြင်အာရုံအခက်အခဲရှိပါသလား။</Typography>
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
                    label="ရှိပါသည်"
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
                    label="မရှိပါ"
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
                {<Grid row container style={{ justifyContent: 'center', marginTop: '3px', alignSelf: 'center' }}><Typography color="#482642" style={{ fontSize: '14px', fontWeight: 'bold' }}>(၂)နားကြားကိရိယာတပ်ထားလျှင်တောင် အကြားအာရုံအခက်အခဲရှိပါသလား။</Typography>
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
                    label="ရှိပါသည်"
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
                    label="မရှိပါ"
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
                {<Grid row container style={{ justifyContent: 'center', marginTop: '3px', alignSelf: 'center' }}><Typography color="#482642" style={{ fontSize: '14px', fontWeight: 'bold' }}>(၃)လမ်းလျှောက် သို့ လှေကားအတက်အဆင်းပြုလုပ်ရာတွင် အခက်အခဲရှိပါသလား။</Typography>
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
                    label="ရှိပါသည်"
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
                    label="မရှိပါ"
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
                {<Grid row container style={{ justifyContent: 'center', marginTop: '3px', alignSelf: 'center' }}><Typography color="#482642" style={{ fontSize: '14px', fontWeight: 'bold' }}>(၄)မိခင်ဘာသာစကားသုံး၍ အများနှင့်ဆက်သွယ်ရာတွင်အခက်အခဲရှိပါသလား။ </Typography>
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
                    label="ရှိပါသည်"
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
                    label="မရှိပါ"
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
                {<Grid row container style={{ justifyContent: 'center', marginTop: '3px', alignSelf: 'center' }}><Typography color="#482642" style={{ fontSize: '14px', fontWeight: 'bold' }}>(၅)မှတ်ညဏ် သို့ အာရုံစူးစိုက်ခြင်းပြုလုပ်ရာတွင် အခက်အခဲရှိပါသလား။</Typography>
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
                    label="ရှိပါသည်"
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
                    label="မရှိပါ"
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
                {<Grid row container style={{ justifyContent: 'center', marginTop: '3px', alignSelf: 'center' }}><Typography color="#482642" style={{ fontSize: '14px', fontWeight: 'bold' }}>(၆)မျက်နှာသစ်ခြင်း၊အဝတ်လဲခြင်းကဲ့သို့သော တကိုယ်ရည်စောင့်ရှောက်မှုပြုလုပ်ရာတွင်အခက်အခဲရှိပါသလား။ </Typography>
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
                    label="ရှိပါသည်"
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
                    label="မရှိပါ"
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
            <Typography align='center' variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold', color: "#d91d4c" }}  >အကြံပြုချက်အား အသေးစိတ်ဖော်ပြရန်</Typography>
          </Grid>

          <Grid container style={{ marginBottom: '10px' }} >

          <Grid item  xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px', marginTop:'4px' }}>
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

          <Grid item  xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <ThemeProvider theme={radioTheme}>
              <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%', backgroundColor: 'white' }}>
                <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >အကြံပြုစာပေးသူ</Typography>
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
                  <MenuItem classes={{ selected: classes.selected }} value={'1'}>ကိုယ်တိုင်</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'2'}>မိသားစု၀င်/ဆွေမျိုး </MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'3'}>ရပ်ရွာ</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'4'}>အခြား</MenuItem>
                </Select>
              </FormControl>
            </ThemeProvider>
          </Grid>

          {formData.CFRMFBPERSON === '4' && <>
            <Grid item xs={12} sm={12} md={4}>
              <CustomUnicefTextField
                id="filled-basic"
                label="အခြားအကြံပြုစာပေးသူ"
                variantText="filled"
                style={{ marginTop: '2px', marginBottom: '10px', width: '90%' }}
                onChange={e => { setFormData({ ...formData, CFRMFBPERSONOTHER: e.target.value }) }}
                value={formData.CFRMFBPERSONOTHER}
              />
            </Grid></>}


</Grid>
          

          
<Grid container style={{  marginBottom: '10px' }} >

<Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', alignSelf: 'center', height: '80px' }}>
            <ThemeProvider theme={radioTheme}>
              <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%', backgroundColor: 'white' }}>
                <InputLabel id="demo-simple-select-filled-label"> {<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }}>သင့်အား မည်သူမှတဆင့် အကြောင်းပြန်စေလိုသည်ကို ရွေးပေးရန်</Typography>
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
                <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >သင့်အား အကြောင်းပြန်စေလိုသည့် နည်းလမ်းများကို ရွေးပေးရန်</Typography>
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
                  <MenuItem classes={{ selected: classes.selected }} value={'1'}>စီမံချက်ဝန်ထမ်းများမှ တဆင့်</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'2'}>ကျေးရွာလူထု အစည်းအဝေးပြုလုပ်၍</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'3'}>တယ်လီဖုန်းမှ တဆင့်</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'4'}>အခြားနည်းလမ်း</MenuItem>
                </Select>
              </FormControl>
            </ThemeProvider>
          </Grid>
          {formData.CFRMFBPERSONCAT2 === '4' && <>
            <Grid item xs={12} sm={4} md={4}>
              <CustomUnicefTextField
                multiline
                id="filled-basic"
                label="အခြားနည်းလမ်း"
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
              <Typography align='center' variant="subtitle1" style={{ background: '#ddd3d5', fontWeight: 'bold', padding: '5px', color: "#d91d4c" }} >***အကြံပြုတိုင်ကြားသူများ၏ သတင်းအချက်အလက် များကို မည်သည့်အခါမှ ထုတ်ဖော်ပြောကြားသွားမည် မဟုတ်ပါ။***</Typography>
            </Card>
          </Grid>

          <Grid item spacing={2} xs={12} sm={12} md={2}>
            <Typography variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold' }} >ဆန္ဒရှိပါက ဖော်ပြရန်</Typography>
          </Grid>
          <Grid container style={{ marginTop: '10px', marginBottom: '15px' }} >
            <Grid item spacing={2} xs={12} sm={12} md={6} style={{ alignContent: 'center', alignItems: 'center' }}>
              <CustomUnicefTextField
                label='အမည်'
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
                label='ဆက်သွယ်ရမည့်ဖုန်းနံပါတ်'
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
            <Typography align='center' variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold', color: "#d91d4c" }}  >စာအိတ်ဖွင့်သူ တာဝန်ခံသူ/ သတ်မှတ်ထားသော တာဝန်ရှိစီမံချက်ဝန်ထမ်းမှ ဖြည့်သွင်းရန်</Typography>
          </Grid>

          <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <CustomUnicefTextField
              label='အမည်'
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
              label='ရာထူး'
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
              label='မြို့နယ်/ခရိုင်'
              variantText="filled"
              disabled
              value={tspName}
              style={{ width: '90%', color: '#d91d4c' }} />

          </Grid>

          <Grid item xs={12} sm={12} md={1} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
          <CustomUnicefTextField
              label='စီမံချက်အမည်'
              variantText="filled"
              disabled
              value={openerProj}
              style={{ width: '90%', color: '#d91d4c' }} />

          </Grid>

          <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px', alignSelf: 'center' }}>
            <CustomUnicefTextField
              variantText="filled"
              type="date"
              label='အကြံပြုစာလက်ခံရရှိသောရက်စွဲ'
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
                label='အကြံပြုတိုင်ကြားချက်ဖြေရှင်းရက်စွဲ'
                InputLabelProps={{ shrink: true }} style={{ width: '90%', backgroundColor: '#fcf0f2' }}
                onChange={e => {
                  setFormData({ ...formData, CFRMFBACTDATE: e.target.value })
                }}
                value={formData.CFRMFBACTDATE} size="large" />
            </Grid>

            <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <ThemeProvider theme={radioTheme}>
              <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%', backgroundColor: 'white' }}>
                <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >အကြံပြုတိုင်ကြားချက်၏လက်ရှိအခြေနေ</Typography>
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
                  <MenuItem classes={{ selected: classes.selected }} value={'1'}>မလုပ်ဆောင်ရသေးပါ</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'2'}>လုပ်ဆောင်နေဆဲ</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'3'}>လုပ်ဆောင်ပြီးခဲ့သည်</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'4'}>အခြား</MenuItem>
                </Select>
              </FormControl>
            </ThemeProvider>
          </Grid>
          {formData.CFRMFBCOMPLAINT === '2' ? <>
            <Grid item xs={12} sm={4} md={3}>
              <CustomUnicefTextField
                multiline
                id="filled-basic"
                label="လုပ်ဆောင်နေဆဲအချက်"
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
                label="အခြား"
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
                label='တုံပြန်ဖြေရှင်းရက်စွဲ'
                InputLabelProps={{ shrink: true }} style={{ width: '90%', backgroundColor: '#fcf0f2' }}
                onChange={e => {
                  setFormData({ ...formData, CFRMFBRESLDATE: e.target.value })
                }}
                value={formData.CFRMFBRESLDATE} size="large" />
            </Grid>

            <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <ThemeProvider theme={radioTheme}>
              <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%', backgroundColor: 'white' }}>
                <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >အကြံပြုချက် သို့မဟုတ် တိုင်ကြားချက်ပုံစံ</Typography>
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
                  <MenuItem classes={{ selected: classes.selected }} value={'1'}>အကြံပြုချက် (Feedback)</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'2'}>တိုင်ကြားချက် (Complaint)</MenuItem>
                </Select>
              </FormControl>
            </ThemeProvider>
          </Grid>

 <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <ThemeProvider theme={radioTheme}>
              <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%', backgroundColor: 'white' }}>
                <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >အကြံပြုတိုင်ကြားချက် အမျိုးအစား</Typography>
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
                  <MenuItem classes={{ selected: classes.selected }} value={'1'}>(၁) သတင်းအချက်အလက်များနှင့် အကြံပြုချက်များ တောင်းခံခြင်း</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'2'}>(၂) သာမညတိုင်ကြားချက်</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'3'}>(၃) အဓိကတိုင်ကြားချက်</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'4'}> (၄) ထိရှလွယ်သောတိုင်ကြားချက်</MenuItem>
                </Select>
              </FormControl>
            </ThemeProvider>
          </Grid>

          <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <ThemeProvider theme={radioTheme}>
              <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '93%', backgroundColor: 'white' }}>
                <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >အကြံပြုတိုင်ကြားချက် အမျိုးအစား</Typography>
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
                  <MenuItem classes={{ selected: classes.selected }} value={'1'}>Positive (အကောင်းမြင်အကြံပြုချက်)</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'2'}>Negative (အဆိုးမြင်အကြံပြုတိုင်ကြားချက်)</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'3'}>Suggestion (အကြံဉာဏ်ပေးခြင်း)</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'4'}>Other (အခြား)</MenuItem>
                </Select>
              </FormControl>
            </ThemeProvider>
          </Grid>

          {formData.CFRMFBTYPE3 === '4' ? <>
            <Grid item xs={12} sm={4} md={3}>
              <CustomUnicefTextField
                multiline
                id="filled-basic"
                label="အခြား"
                variantText="filled"
                style={{ marginTop: '5px', marginBottom: '10px', width: '93%' }}
                onChange={e => { setFormData({ ...formData, CFRMFBTYPE3OTHER: e.target.value }) }}
                value={formData.CFRMFBTYPE3OTHER}
              />
            </Grid></> : null}

            <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
          <ThemeProvider theme={radioTheme}>
          <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%', backgroundColor: 'white' }}>
                <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >တုံ့ပြန်ဖြေရှင်းချက်ပေးလိုက်သောသူများ</Typography>
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
                  <MenuItem classes={{ selected: classes.selected }} value={'1'}>စေတနာ့ဝန်ထမ်း</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'2'}>စီမံချက်ဝန်ထမ်း</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'3'}>စီမံချက်ခေါင်းဆောင်</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'4'}>ကျေးရွာလူကြီးများ</MenuItem>

                </Select>
                </FormControl>
            </ThemeProvider>
            </Grid>

            <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            <ThemeProvider theme={radioTheme}>
              <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%', backgroundColor: 'white' }}>
                <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{ fontSize: '13px' }} >တုံ့ပြန်ဖြေရှင်းချက်ပေးသောနည်းလမ်းများ</Typography>
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
                  <MenuItem classes={{ selected: classes.selected }} value={'1'}>စီမံချက်၀န်ထမ်းများမှတဆင့်</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'2'}>ကျေးရွာလူထု အစည်းအဝေးပြုလုပ်၍</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'3'}>တယ်လီဖုန်းမှ တဆင့်</MenuItem>
                  <MenuItem classes={{ selected: classes.selected }} value={'4'}>အခြားနည်းလမ်း</MenuItem>

                </Select>
              </FormControl>
            </ThemeProvider>
          </Grid>

          {formData.CFRMFBRESPMETH === '4' ? <>
            <Grid item xs={12} sm={4} md={3}>
              <CustomUnicefTextField
                multiline
                id="filled-basic"
                label="အခြား"
                variantText="filled"
                style={{ marginTop: '5px', marginBottom: '10px', width: '90%' }}
                onChange={e => { setFormData({ ...formData, CFRMFBRESPMETHO: e.target.value }) }}
                value={formData.CFRMFBRESPMETHO}
              />
            </Grid></> : null}
        

            <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px',marginTop: '4px' }}>
              <CustomUnicefTextField
                multiline
                label='တုံ့ပြန်ဖြေရှင်းပေးလိုက်သောဆောင်ရွက်ပုံအသေးစိတ်'
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

            <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '30px',marginTop: '4px' }}>
            <CustomUnicefTextField
              label='မှတ်တမ်းတင်/ထိန်းသိမ်းသူများ'
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
            onClick={save} >Save</Button>
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