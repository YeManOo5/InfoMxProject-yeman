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
import { getUnicefClinic } from '../../modals/unicefClinic'
import { insertIMAM } from '../../modals/imaminfo';

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

export default function OTPForm() {

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
      ID:'',
IMAMOTPORG:'',
IMAMOTPORG:'',
IMAMOTPPROJECT:'',
IMAMOTPCLNID:'',
IMAMOTPDIVID:'',
IMAMOTPTSPID:'',
IMAMOTPREGID:'',
IMAMOTPREGNAME:'',
IMAMOTPREGADDRES:'',
IMAMOTPREGAGE:'',
IMAMOTPREGAGEUNIT:'30',
IMAMOTPREGSEX:'',
IMAMOTPENTYDATE:'',
IMAMOTPENTYCAT:'',
IMAMOTPENTYWT:'',
IMAMOTPENTYHT:'',
IMAMOTPENTYWFHL:'',
IMAMOTPENTYMUAC:'',
IMAMOTPENTYSAM:'',
IMAMOTPEXTDATE:'',
IMAMOTPEXTWT:'',
IMAMOTPEXTHT:'',
IMAMOTPEXTWFHL:'',
IMAMOTPEXTMUAC:'',
IMAMOTPEXTODM:'',
IMAMOTPLWTDATE:'',
IMAMOTPLWTCAT:'',
IMAMOTPUSRLOGIN:'',
IMAMOTPINSERT:'',
IMAMOTPUPDATE:'',
IMAMOTPSTATUS:'',
IMAMOTPSYNC:'',
    }
  )

  ////////////Handle Change//////////////////////////
  function sexHandleChange(event) {
    if (event.target.value === formData.IMAMOTPREGSEX) {
        setFormData({ ...formData, IMAMOTPREGSEX: "" })
    } else {
        setFormData({ ...formData, IMAMOTPREGSEX: event.target.value })
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
formData.IMAMOTPENTYSAM = formData.IMAMOTPENTYMUAC < 115 ? 'SAM' : 'IMAM'

    console.log('formData ===>',formData)
  }

  const cancle = () => {
    history.push('entryhomepage')
    sessionStorage.setItem('homeSave', 'done')
  }

  useEffect(async () => {

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
              <Typography color="#482642">???????????????????????????????????????/????????????????????? </Typography>
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
              <Typography color="#482642">???????????????????????? </Typography>
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
              <Typography color="#482642">???????????????????????????????????????????????????????????????????????? </Typography>
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
              <Typography color="#482642">??????????????? ?????????????????????????????? ??????????????? </Typography>
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
                setFormData({ ...formData, IMAMOTPREGID: e.target.value })
              }}
              value={formData.IMAMOTPREGID} />
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
          <Typography align='center' variant="subtitle1" color="#482642" style={{ background: "#ddd3d5", fontWeight: 'bold' }} >???????????? ??????????????????</Typography>
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
          <CustomUnicefTextField
            label='????????????'
            type="text"
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '90%' }}
             onChange={e => {
               setFormData({ ...formData, IMAMOTPREGNAME: e.target.value })
             }}
            value={formData.IMAMOTPREGNAME} />
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
          <CustomUnicefTextField
            label='????????????'
            type="number"
            inputProps={{ step: "1", min: 0, maxLength: 5 }}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '90%' }}
            onChange={e => {
            (e.target.value.length > 5) ? setFormData({ ...formData, IMAMOTPREGAGE: (e.target.value).slice(0, 5) })
            : setFormData({ ...formData, IMAMOTPREGAGE: e.target.value })
            }}
              value={formData.IMAMOTPREGAGE}
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
              {<Grid row container style={{ justifyContent: 'center',marginTop:'4px' }}><Typography color="#482642">????????????/???</Typography>
              </Grid>}

              <RadioGroup
                aria-label="gender"
                name="gender1"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                }}
                 onChange={e => { setFormData({ ...formData, IMAMOTPREGSEX: e.target.value }) }}
                 value={formData.IMAMOTPREGSEX} 
                row={true}
              >
                <FormControlLabel
                  value="1"
                  labelPlacement="left"
                  label="????????????"
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
                  label="???"
                />
              </RadioGroup>
            </Card>
          </ThemeProvider>
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={12} style={{ alignContent: 'center', alignItems: 'center',color:'#fcf0f2' }}>
          <CustomUnicefTextField
            label='??????????????????'
            type="text"
            variantText="filled"
            multiline
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '60%',marginBottom:'10px' }}
            onChange={e => {
              setFormData({ ...formData, IMAMOTPREGADDRES: e.target.value })
            }}
            value={formData.IMAMOTPREGADDRES} />
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
          <Typography align='center' variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold' }}  >????????????????????????????????? ???????????????????????????????????????????????? ????????????????????????</Typography>
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px',alignSelf:'center' }}>
          <CustomUnicefTextField
              variantText="filled"
              type="date"
            label='??????????????????'
            InputLabelProps={{ shrink: true }} style={{width: '90%',backgroundColor: '#fcf0f2' }}
            onChange={e => {
              setFormData({ ...formData, IMAMOTPENTYDATE: e.target.value })
            }}
            value={formData.IMAMOTPENTYDATE} size="large" />
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%',backgroundColor: 'white' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{fontSize:'13px'}} >???????????????????????????????????????????????????????????????</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={formData.IMAMOTPENTYCAT}
                      onChange={e=>{setFormData({...formData,IMAMOTPENTYCAT:e.target.value})}}
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
                      <MenuItem classes={{ selected: classes.selected }} value={'1'}>?????????????????????????????????</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'2'}>??????????????? ?????????????????????????????? ?????????????????????????????????????????????????????????</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'3'}>????????????????????? ??????????????????????????????????????????????????????????????????????????? ????????????????????????</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'4'}>???????????????????????????????????? ??????????????? ??????????????????????????? ????????????????????????????????????????????????</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px',marginTop:'10px' }}>
             <CustomUnicefTextField
            label='???????????????????????????(kg)'
            type="number"
            inputProps={{ step: "0.1", min: 0, maxLength: 6 }}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '90%' }}
            onChange={e => {
            (e.target.value.length > 6) ? setFormData({ ...formData, IMAMOTPENTYWT: (e.target.value).slice(0, 6) })
            : setFormData({ ...formData, IMAMOTPENTYWT: e.target.value })
            }}
              value={formData.IMAMOTPENTYWT}
               />
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <CustomUnicefTextField
            label='???????????? (cm)'
            type="number"
            inputProps={{ step: "0.1", min: 0, maxLength: 6 }}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '90%' }}
            onChange={e => {
            (e.target.value.length > 6) ? setFormData({ ...formData,IMAMOTPENTYHT: (e.target.value).slice(0, 6) })
            : setFormData({ ...formData, IMAMOTPENTYHT: e.target.value })
            }}
              value={formData.IMAMOTPENTYHT}
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
               setFormData({ ...formData, IMAMOTPENTYWFHL: e.target.value })
             }}
            value={formData.IMAMOTPENTYWFHL} />
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
            onChange={e => { setFormData({ ...formData,IMAMOTPENTYMUAC: e.target.value})
            }}
              value={formData.IMAMOTPENTYMUAC}
              helperText={(formData.IMAMOTPENTYMUAC < 115 && formData.IMAMOTPENTYMUAC > 0) ? 
                <Typography style={{color:"#d91d4c" , fontWeight:'bold'}}  >SAM</Typography> : (formData.IMAMOTPENTYMUAC >= 115 && formData.IMAMOTPENTYMUAC > 0) ? <Typography style={{color:"#d91d4c" , fontWeight:'bold'}} >MAM</Typography> : ''}
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
          <Typography align='center' variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold' }}  >???????????????????????? ???????????????????????????????????????????????????????????????????????? ????????????????????????</Typography>
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px',alignSelf:'center' }}>
        <CustomUnicefTextField
              variantText="filled"
              type="date"
            label='??????????????????'
            InputLabelProps={{ shrink: true }} style={{width: '90%',backgroundColor: '#fcf0f2' }}
            onChange={e => {
              setFormData({ ...formData, IMAMOTPEXTDATE: e.target.value })
            }}
            value={formData.IMAMOTPEXTDATE} size="large" />
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <CustomUnicefTextField
            label='???????????????????????????(kg)'
            type="number"
            inputProps={{ step: "0.1", min: 0, maxLength: 6 }}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '90%' }}
            onChange={e => {
            (e.target.value.length > 6) ? setFormData({ ...formData, IMAMOTPEXTWT: (e.target.value).slice(0, 6) })
            : setFormData({ ...formData, IMAMOTPEXTWT: e.target.value })
            }}
              value={formData.IMAMOTPEXTWT}
               />
        </Grid>
        <Grid item spacing={2} xs={12} sm={12} md={4} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <CustomUnicefTextField
            label='???????????? (cm)'
            type="number"
            inputProps={{ step: "0.1", min: 0, maxLength: 6 }}
            variantText="filled"
            InputLabelProps={{
              style: { color: '#482642', textAlign: 'center' },
            }}
            style={{ width: '90%' }}
            onChange={e => {
            (e.target.value.length > 6) ? setFormData({ ...formData,IMAMOTPEXTHT: (e.target.value).slice(0, 6) })
            : setFormData({ ...formData, IMAMOTPEXTHT: e.target.value })
            }}
              value={formData.IMAMOTPEXTHT}
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
               setFormData({ ...formData, IMAMOTPEXTWFHL: e.target.value })
             }}
            value={formData.IMAMOTPEXTWFHL} />
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
            onChange={e => { setFormData({ ...formData,IMAMOTPEXTMUAC: e.target.value})
            }}
              value={formData.IMAMOTPEXTMUAC}
             
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
              {<Grid row container style={{ justifyContent: 'center',marginTop:'4px' }}><Typography color="#482642">???????????????????????????????????????</Typography>
              </Grid>}

              <RadioGroup
                aria-label="gender"
                name="gender1"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                }}
                onChange={e => { setFormData({ ...formData,IMAMOTPEXTODM: e.target.value }) }}
                value={formData.IMAMOTPEXTODM} 
                row={true}
              >
                <FormControlLabel
                  value="0"
                  labelPlacement="left"
                  label="???"
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
                  label="???"
                />

<FormControlLabel
                  value="2"
                  labelPlacement="left"
                  style={{ height: "30px" }}
                  className={classes.fontSize}
                  control={<Radio size="small" color="primary"
                                                                        /* onClick={lactHandleChange} onKeyDown={e => e.key === 'Enter' && lactHandleChange(e)} */ />}
                  label="???"
                />

<FormControlLabel
                  value="3"
                  labelPlacement="left"
                  style={{ height: "30px" }}
                  className={classes.fontSize}
                  control={<Radio size="small" color="primary"
                                                                        /* onClick={lactHandleChange} onKeyDown={e => e.key === 'Enter' && lactHandleChange(e)} */ />}
                  label="???"
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
          <Typography align='center' variant="subtitle1" color="#482642" style={{ background: '#ddd3d5', fontWeight: 'bold' }}  >?????????????????????????????? ??????????????????????????????????????????</Typography>
        </Grid>

        <Grid item spacing={2} xs={12} sm={12} md={3} style={{ alignContent: 'center', alignItems: 'center', marginBottom: '10px',alignSelf:'center' }}>
        <ThemeProvider theme={radioTheme}>
        <CustomUnicefTextField
              variantText="filled"
              type="date"
            label='??????????????????'
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
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" style={{fontSize:'13px'}} >???????????????????????????????????????????????? ?????????????????? ?????????????????????????????????</Typography>
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
                      <MenuItem classes={{ selected: classes.selected }} value={'1'}>?????????????????????????????????????????????????????????</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'2'}>????????????????????????????????????????????? ??????????????? ??????????????????????????????????????????</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'3'}>????????????????????????????????????</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'4'}> ???????????????????????? ??????????????????</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'5'}>??????????????? ????????????????????????????????? ????????????????????????????????? ??????????????????????????????????????????</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'6'}> ??????????????????????????????????????????????????????????????? ???????????????????????? (??????????????????????????????????????????????????? ??????????????? ????????????????????????????????? ????????????????????????????????? ?????????????????????????????? ????????????????????????)</MenuItem>
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