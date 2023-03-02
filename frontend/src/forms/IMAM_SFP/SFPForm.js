import { Button, Card, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Typography,FormLabel } from '@material-ui/core'
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


/////////////////////API////////////////////
import { insertIMAMSFP,updateIMAMSFP } from '../../modals/imamsfpinfo';
import { getUnicefClinic } from '../../modals/unicefClinic'
import * as serviceData from '../../modals/imamservicedatabyid'

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
    margin: theme.spacing(1),
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

export default function SFPEditForm() {

  let wfh = "WFH < -3 Z/ MUAC < 115 mm"

  const classes = useStyles();

  const history = useHistory();

  ///////Background Data///////////
  const [loading, setLoading] = useState(false);
  const [clinicData, setClinicData] = useState([]);
  const [clinicCode, setClinicCode] = useState('')
  const [divCode, setDivCode] = useState('')
  const [tspCode, setTspCode] = useState('')
  const [divName, setDivName] = useState('')
  const [tspName, setTspName] = useState('')

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
      ID:'',
IMAMSFPDONOR:'',
IMAMSFPORG:'',
IMAMSFPPROJECT:'',
IMAMSFPCLNID:'',
IMAMSFPDIVID:'',
IMAMSFPTSPID:'',
IMAMSFPREGID:'',
IMAMSFPREGNAME:'',
IMAMSFPREGADDRES:'',
IMAMSFPREGAGE:'',
IMAMSFPREGAGEUNIT:'',
IMAMSFPREGSEX:'',
IMAMSFPENTYDATE:'',
IMAMSFPENTYCAT:'',
IMAMSFPENTYWT:'',
IMAMSFPENTYHT:'',
IMAMSFPENTYWFHL:'',
IMAMSFPENTYMUAC:'',
IMAMSFPENTYSAM:'',
IMAMSFPEXTDATE:'',
IMAMSFPEXTWT:'',
IMAMSFPEXTHT:'',
IMAMSFPEXTWFHL:'',
IMAMSFPEXTMUAC:'',
IMAMSFPEXTODM:'',
IMAMSFPLWTDATE:'',
IMAMSFPLWTCAT:'',
IMAMSFPUSRLOGIN:'',
IMAMSFPINSERT:'',
IMAMSFPUPDATE:'',
IMAMSFPSTATUS:'',
IMAMSFPSYNC:'',
    }
  )

  ////////////Handle Change//////////////////////////
  function sexHandleChange(event) {
    if (event.target.value === formData.IMAMSFPREGSEX) {
        setFormData({ ...formData, IMAMSFPREGSEX: "" })
    } else {
        setFormData({ ...formData, IMAMSFPREGSEX: event.target.value })
    }
}

const clinicHandleChange = (event) => {
  setClinicCode(event.target.value)
  let cData = _.find(clinicData, ['CLN_ID', event.target.value]);
  formData.IMAMCLNID = event.target.value
  formData.IMAMTSPID = cData.TSP_ID
  setTspCode(cData.TSP_ID)
  setTspName(cData.TSP_NAME)
  formData.IMAMDIVID = cData.DIV_ID
  setDivCode(cData.DIV_ID)
  setDivName(cData.DIV_NAME)
  console.log("Selected Clinic => ", event.target.value)
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

  formData.IMAMSFPENTYSAM = formData.IMAMSFPENTYSAM< 115 ? 'SAM' : 'IMAM'

  console.log('formData ===>',formData)
}

const cancle = () => {
  history.push('entryhomepage')
  sessionStorage.setItem('homeSave', 'done')
}

  useEffect(async() => {

    setLoading(true)
    let clinic = await getUnicefClinic()
    if (clinic.data.data.getUnicefClinic.length) {
      console.log("Unicef Clinic Data ========> ", clinic)
      setClinicData(clinic.data.data.getUnicefClinic)
      setTspCode(clinic.data.data.getUnicefClinic[0].TSP_ID)
      setDivCode(clinic.data.data.getUnicefClinic[0].DIV_ID)
      setTspName(clinic.data.data.getUnicefClinic[0].TSP_NAME)
      setDivName(clinic.data.data.getUnicefClinic[0].DIV_NAME)
  
      setFormData({
        ...formData,
        IMAMPROVIDEDDATE: moment(new Date()).format("YYYY-MM-DD"),
        IMAMDONOR: sessionStorage.getItem('donor'),
        IMAMORG: sessionStorage.getItem('org'),
        IMAMPROJECT: sessionStorage.getItem('project'),
        IMAMCLNID: clinic.data.data.getUnicefClinic[0].CLN_ID,
        IMAMDIVID: clinic.data.data.getUnicefClinic[0].DIV_ID,
        IMAMTSPID: clinic.data.data.getUnicefClinic[0].TSP_ID,
        IMAMUSRLOGIN: sessionStorage.getItem('userName'),
        IMAMSTATUS: 1,
        IMAMSYNC: '0',
      })
    }
    setLoading(false)
  
  }, [])
  return (
    <div style={{ width: '100%', height: '100vh', background: '#fcf0f2' }}>
      <Modals open={loading} />
      {successSnack && <CustomizedSnackbars open={setSuccessSnackBarOpen} close={setSuccessSnackBarClose} alertMsg={success} type="success" />}
      {openSnack && <CustomizedSnackbars open={setSnackBarOpen} close={setSnackBarClose} alertMsg={error} type="warning" />}
      <Typography variant="h6" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
        Actue Malnutrition Register</Typography>
      <CustomUnicefTable />
      <Grid container style={{ marginTop: '20px' }} >

        <Grid row container style={{ alignContent: 'center', alignItems: 'center' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">တိုင်းဒေသကြီး/ပြည်နယ် </Typography>
              <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              disabled
              value={divName}
              style={{ width: '80%'}} />
          </Grid>
        </Grid>

        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">မြို့နယ် </Typography>
              <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              variantText="filled"
              disabled
              value={tspName}
              style={{ width: '80%' }} />
          </Grid>
        </Grid>


        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">ကျေးလက်ကျန်းမာရေးဌာနအမည် </Typography>
              <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              select
              value={clinicCode}
              onChange={clinicHandleChange}
              variantText="filled"
              style={{ width: '80%' }}
              InputLabelProps={{
                style: { color: '#482642' },
                shrink: true
              }}
              SelectProps={{
                native: true
              }}>
              {clinicData.length &&
                clinicData.map((option) => (
                  <option key={option.CLN_ID} value={option.CLN_ID}>
                    {option.CLN_NAME}
                  </option>
                ))}
            </CustomUnicefTextField>
          </Grid>
        </Grid>

      </Grid>

      
      <Grid container style={{ marginTop: '20px' }} >
        <Grid row container style={{ alignContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Grid row container style={{ marginLeft: '30%' }}>
              <Typography color="#482642">အာဟာရ မှတ်ပုံတင် အမှတ် </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomUnicefTextField
              type="text"
              variantText="filled"
              InputLabelProps={{
                style: { color: '#482642', textAlign: 'center' },
              }}
              style={{ width: '80%' }}
              onChange={e => {
                setFormData({ ...formData, IMAMSFPREGID: e.target.value })
              }}
              value={formData.IMAMSFPREGID} />
          </Grid>
        </Grid>
      </Grid>
      
      <Card
              variant="outlined"
              style={{
                background: "#ddd3d5",
                marginTop:'10px',
                marginLeft: '5%',
                width:'90%',
                justifyContent:'center',
              }}>
      <Grid container style={{ marginTop: '20px' }} >
        <Grid item spacing={2} xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <Typography align='center' variant="subtitle1" color="#482642" style={{ background: "#ddd3d5", fontWeight: 'bold' }} >လူနာ ရာဇ၀င်</Typography>
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
          <CustomUnicefTextField
            label='အမည်'
            type="text"
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '90%' }}
             onChange={e => {
               setFormData({ ...formData, IMAMSFPREGNAME: e.target.value })
             }}
            value={formData.IMAMSFPREGNAME} />
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
          <CustomUnicefTextField
            label='အသက်'
            type="number"
            inputProps={{ step: "1", min: 0, maxLength: 5 }}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '90%' }}
            onChange={e => {
            (e.target.value.length > 5) ? setFormData({ ...formData, IMAMSFPREGAGE: (e.target.value).slice(0, 5) })
            : setFormData({ ...formData, IMAMSFPREGAGE: e.target.value })
            }}
              value={formData.IMAMSFPREGAGE}
               />
        </Grid>

        <Grid item xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
          <ThemeProvider theme={radioTheme}>
            <Card
              variant="outlined"
              style={{
                background: "#fcf0f2",
                width: '90%',
                marginLeft:'17px',
                
              }}
              className={classes.cardStyle}>
              {<Grid row container style={{ justifyContent: 'center',marginTop:'4px' }}><Typography color="#482642">ကျား/မ</Typography>
              </Grid>}

              <RadioGroup
                aria-label="gender"
                name="gender1"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                }}
                 onChange={e => { setFormData({ ...formData, IMAMSFPREGSEX: e.target.value }) }}
                 value={formData.IMAMSFPREGSEX} 
                row={true}
              >
                <FormControlLabel
                  value="1"
                  labelPlacement="left"
                  label="ကျား"
                  style={{ height: "30px" }}
                  className={classes.fontSize}
                  control={<Radio size="small" color="primary"
                   onClick={sexHandleChange} onKeyDown={e => e.key === 'Enter' && sexHandleChange(e)}  />}
                />
                <FormControlLabel
                  value="0"
                  labelPlacement="left"
                  style={{ height: "30px" }}
                  className={classes.fontSize}
                  control={<Radio size="small" color="primary"
               onClick={sexHandleChange} onKeyDown={e => e.key === 'Enter' && sexHandleChange(e)}  />}
                  label="မ"
                />
              </RadioGroup>
            </Card>
          </ThemeProvider>
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center',color:'#fcf0f2' }}>
          <CustomUnicefTextField
            label='လိပ်စာ'
            type="text"
            variantText="filled"
            multiline
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '60%',marginBottom:'10px' }}
            onChange={e => {
              setFormData({ ...formData, IMAMSFPREGADDRES: e.target.value })
            }}
            value={formData.IMAMSFPREGADDRES} />
        </Grid>




      </Grid>
      </Card>

      <Card
              variant="outlined"
              style={{
                background: "#ddd3d5",
                marginTop:'10px',
                marginLeft: '5%',
                width:'90%',
                justifyContent:'center',
              }}>
      <Grid container style={{ marginTop: '20px',marginBottom:'20px' }} >
        <Grid item spacing={2} xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <Typography align='center' variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold' }}  >စာရင်းသွင်း ၀င်ခွင့်ပြုချိန် မှတ်တမ်း</Typography>
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px',alignSelf:'center' }}>
          <CustomUnicefTextField
              variantText="filled"
              type="date"
            label='နေ့စွဲ'
            InputLabelProps={{ shrink: true }} style={{width: '90%',backgroundColor: '#fcf0f2' }}
            onChange={e => {
              setFormData({ ...formData, IMAMSFPENTYDATE: e.target.value })
            }}
            value={formData.IMAMSFPENTYDATE} size="large" />
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%',backgroundColor: 'white' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{fontSize:'13px'}} >စာရင်းသွင်းလူနာအုပ်စု</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={formData.IMAMSFPENTYCAT                      }
                      onChange={e=>{setFormData({...formData,IMAMSFPENTYCAT:e.target.value})}}
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
                      <MenuItem classes={{ selected: classes.selected }} value={'1'}>လူနာသစ်များ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'2'}>အာဟာရ ချို့တဲ့မူ ပြန်ဖြစ်သောလူနာများ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'3'}>ပြန်လည် စာရင်းသွင်း၀င်ခွင့်ပြုသော လူနာများ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'4'}>အမျိုးအစားတူ ကုသမူ အစီအစဥ်မှ လွှဲပြောင်းလက်ခံ</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px',marginTop:'10px' }}>
             <CustomUnicefTextField
            label='အလေးချိန်(kg)'
            type="number"
            inputProps={{ step: "0.1", min: 0, maxLength: 6 }}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '90%' }}
            onChange={e => {
            (e.target.value.length > 6) ? setFormData({ ...formData, IMAMSFPENTYWT: (e.target.value).slice(0, 6) })
            : setFormData({ ...formData, IMAMSFPENTYWT: e.target.value })
            }}
              value={formData.IMAMSFPENTYWT}
               />
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <CustomUnicefTextField
            label='အရပ် (cm)'
            type="number"
            inputProps={{ step: "0.1", min: 0, maxLength: 6 }}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '90%' }}
            onChange={e => {
            (e.target.value.length > 6) ? setFormData({ ...formData,IMAMSFPENTYHT: (e.target.value).slice(0, 6) })
            : setFormData({ ...formData, IMAMSFPENTYHT: e.target.value })
            }}
              value={formData.IMAMSFPENTYHT}
               />
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <CustomUnicefTextField
            label='WFH/WFL(z-score)'
            type="number"
            inputProps={{ step: "1", min: 0, maxLength: 6 }}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '90%' }}
             onChange={e => {
               setFormData({ ...formData, IMAMSFPENTYWFHL: e.target.value })
             }}
            value={formData.IMAMSFPENTYWFHL} />
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <CustomUnicefTextField
            label='MUAC (mm)'
            type="number"
            inputProps={{ step: "0.1", min: 0 }}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            FormHelperTextProps={{
              style : { textAlign : 'center' }
              
            }}
            style={{ width: '90%' }}
            onChange={e => { setFormData({ ...formData,IMAMSFPENTYMUAC: e.target.value})
            }}
              value={formData.IMAMSFPENTYMUAC}
              helperText={(formData.IMAMSFPENTYMUAC < 115 && formData.IMAMSFPENTYMUAC > 0) ? 
                <Typography style={{color:"#d91d4c" , fontWeight:'bold'}} >SAM</Typography> : (formData.IMAMSFPENTYMUAC>= 115 && formData.IMAMSFPENTYMUAC> 0) ? <Typography style={{color:"#d91d4c" , fontWeight:'bold'}} >MAM</Typography> : ''}
               />
        </Grid>


        </Grid>
        </Card>


        <Card
              variant="outlined"
              style={{
                background: "#ddd3d5",
                marginTop:'10px',
                marginLeft: '5%',
                width:'90%',
                justifyContent:'center',
              }}>
      <Grid container style={{ marginTop: '20px',marginBottom:'20px' }} >
        <Grid item spacing={2} xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <Typography align='center' variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold' }}  >စာရင်းမှ နုတ်ပယ်ထွက်ခွင့်ပြုချိန် မှတ်တမ်း</Typography>
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px',alignSelf:'center' }}>
        <CustomUnicefTextField
              variantText="filled"
              type="date"
            label='နေ့စွဲ'
            InputLabelProps={{ shrink: true }} style={{width: '90%',backgroundColor: '#fcf0f2' }}
            onChange={e => {
              setFormData({ ...formData, IMAMSFPEXTDATE: e.target.value })
            }}
            value={formData.IMAMSFPEXTDATE} size="large" />
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <CustomUnicefTextField
            label='အလေးချိန်(kg)'
            type="number"
            inputProps={{ step: "0.1", min: 0, maxLength: 6 }}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '90%' }}
            onChange={e => {
            (e.target.value.length > 6) ? setFormData({ ...formData,IMAMSFPEXTWT: (e.target.value).slice(0, 6) })
            : setFormData({ ...formData,IMAMSFPEXTWT: e.target.value })
            }}
              value={formData.IMAMSFPEXTWT}
               />
        </Grid>
        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <CustomUnicefTextField
            label='အရပ် (cm)'
            type="number"
            inputProps={{ step: "0.1", min: 0, maxLength: 6 }}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '90%' }}
            onChange={e => {
            (e.target.value.length > 6) ? setFormData({ ...formData,IMAMSFPEXTHT: (e.target.value).slice(0, 6) })
            : setFormData({ ...formData,IMAMSFPEXTHT: e.target.value })
            }}
              value={formData.IMAMSFPEXTHT}
               />
        </Grid>
        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <CustomUnicefTextField
            label='WFH/WFL(z-score)'
            type="number"
            inputProps={{ step: "1", min: 0, maxLength: 6 }}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '90%' }}
             onChange={e => {
               setFormData({ ...formData,IMAMSFPEXTWFHL: e.target.value })
             }}
            value={formData.IMAMSFPEXTWFHL} />
        </Grid>
        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <CustomUnicefTextField
            label='MUAC (mm)'
            type="number"
            inputProps={{ step: "0.1", min: 0 }}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            FormHelperTextProps={{
              style : { textAlign : 'center' }
              
            }}
            style={{ width: '90%' }}
            onChange={e => { setFormData({ ...formData,IMAMSFPEXTMUAC: e.target.value})
            }}
              value={formData.IMAMSFPEXTMUAC}
              
               />
        </Grid>
        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <ThemeProvider theme={radioTheme}>
            <Card
              variant="outlined"
              style={{
                background: "#fcf0f2",
                width: '90%',
                marginLeft:'25px',
                
              }}
              className={classes.cardStyle}>
              {<Grid row container style={{ justifyContent: 'center',marginTop:'4px' }}><Typography color="#482642">ဖောရောင်ခြင်း</Typography>
              </Grid>}

              <RadioGroup
                aria-label="gender"
                name="gender1"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                }}
                onChange={e => { setFormData({ ...formData,IMAMSFPEXTODM: e.target.value }) }}
                value={formData.IMAMSFPEXTODM} 
                row={true}
              >
                <FormControlLabel
                  value="0"
                  labelPlacement="left"
                  label="၀"
                  style={{ height: "30px" }}
                  className={classes.fontSize}
                  control={<Radio size="small" color="primary"
                                                                        /* onClick={lactHandleChange} onKeyDown={e => e.key === 'Enter' && lactHandleChange(e)} */ />}
                />
                <FormControlLabel
                  value="1"
                  labelPlacement="left"
                  style={{ height: "30px" }}
                  className={classes.fontSize}
                  control={<Radio size="small" color="primary"
                                                                        /* onClick={lactHandleChange} onKeyDown={e => e.key === 'Enter' && lactHandleChange(e)} */ />}
                  label="၁"
                />

<FormControlLabel
                  value="2"
                  labelPlacement="left"
                  style={{ height: "30px" }}
                  className={classes.fontSize}
                  control={<Radio size="small" color="primary"
                                                                        /* onClick={lactHandleChange} onKeyDown={e => e.key === 'Enter' && lactHandleChange(e)} */ />}
                  label="၂"
                />

<FormControlLabel
                  value="3"
                  labelPlacement="left"
                  style={{ height: "30px" }}
                  className={classes.fontSize}
                  control={<Radio size="small" color="primary"
                                                                        /* onClick={lactHandleChange} onKeyDown={e => e.key === 'Enter' && lactHandleChange(e)} */ />}
                  label="၃"
                />
              </RadioGroup>
            </Card>
          </ThemeProvider>
          
          
        </Grid>

        </Grid>
        </Card>   

        <Card
              variant="outlined"
              style={{
                background: "#ddd3d5",
                marginTop:'10px',
                marginLeft: '5%',
                width:'90%',
                justifyContent:'center',
              }}>
      <Grid container style={{ marginTop: '10px',marginBottom:'15px' }} >
        <Grid item spacing={2} xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <Typography align='center' variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold' }}  >အနိမ့်ဆုံး ကိုယ်အလေးချိန်</Typography>
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px',alignSelf:'center' }}>
        <ThemeProvider theme={radioTheme}>
        <CustomUnicefTextField
              variantText="filled"
              type="date"
            label='နေ့စွဲ'
            InputLabelProps={{ shrink: true }} style={{width: '90%',backgroundColor: '#fcf0f2' }}
            onChange={e => {
              setFormData({ ...formData,IMAMOTPLWTDATE: e.target.value })
            }}
            value={formData.IMAMOTPLWTDATE} size="large" /> </ThemeProvider>
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center',marginTop:'11px' }}>
        <CustomUnicefTextField
            label='MUAC (mm)'
            type="number"
            inputProps={{ step: "0.1", min: 0 }}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            FormHelperTextProps={{
              style : { textAlign : 'center' }
              
            }}
            style={{ width: '98%' }}
            onChange={e => { setFormData({ ...formData,IMAMOTPENTYMUAC: e.target.value})
            }}
              value={formData.IMAMOTPENTYMUAC}
              
               />
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={6} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '15px', marginTop: '2px' }}>
        <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%',backgroundColor: 'white' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{fontSize:'13px'}} >နုတ်ပယ်ထွက်ခွင့် ပြုသော အကြောင်းအရာ</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={formData.IMAMOTPLWTCAT}
                      onChange={e=>{setFormData({...formData,IMAMOTPLWTCAT:e.target.value})}}
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
                      <MenuItem classes={{ selected: classes.selected }} value={'1'}>ကုသပျောက်ကင်းသူများ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'2'}>ပျောက်ကင်းအောင် မကုပဲ ပျက်ကွက်သူများ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'3'}>သေဆုံးသူများ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'4'}> နာလန်မထူ သူများ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'5'}>အခြား အစီအစဥ်သို့ လွှဲပြောင်း ပေးလိုက်သူများ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'6'}> လွှဲပြောင်းစေလွှတ်သော လူနာများ (အခြားအမျိုးအစားတူ ကုသမူ အစီအစဥ်သို့ လွှဲပြောင်း စေလွှတ်သော လူနာများ)</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>
        </Grid>
       
        
        </Grid>
        </Card>   

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