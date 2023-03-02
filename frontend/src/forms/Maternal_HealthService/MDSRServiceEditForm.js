import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import queryString from 'query-string';
import _ from 'lodash';
import moment from "moment";

////////////////////Controls/////////////////
import CustomUnicefTextField from '../../components/controls/CustomUnicefTextField';
import { Button, Card, Checkbox, FormGroup, FormLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import CustomizedSnackbars from '../../components/controls/CustomSnackBar';


///////////////API///////////////////
import { getDivision, getTspByDiv, getVillageByTsp, getClinicByTsp, getTownshipMDSR } from '../../modals/background';
import { updateMDSR } from '../../modals/mdsrinfo';
import * as edit from '../../modals/editmdsrshow'
import * as clinicDt from '../../modals/clinicbyorgproj'
import * as villageDt from '../../modals/villagebyorgproj'

import Modals from "../../components/modal";
import { divIcon } from 'leaflet';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '98%',
    margin: 'auto',
    marginBottom: '10px',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
    color: '#482642',
    background: '#DED4DA',
  },
  title: {
    fontWeight: 'bold'
  },
  subtitle: {
    fontWeight: 'bold',
    marginLeft: '5%'
  },
  detail: {
    fontSize: theme.typography.pxToRem(15),
    color: '#482642',
    background: '#FCF0F2',
  },
  secondFormControl: {
    margin: theme.spacing(1),
    width: '40%',
  },
  selected: {
    backgroundColor: "#DED4DA !important",
    color: '#482642'
  },
  formControl: {
    width: '100%'
  },

}));

const radioTheme = createTheme({
  palette: {
    primary: {
      main: "#482642"
    },
    secondary: {
      main: "#482642"
    }
  }
});

export default function MDSRServiceEditForm() {

  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [mommy, setMommy] = useState(
    {
      MDNO: '',
      MDRY: '',
      MDRQ: '',
      MDRM: '',
      MDPJID: '',
      MDORGID: '',
      MDST: '',
      MDTSP: '',
      MDVIL: '',
      MDNCL: '',
      MDDML: '',
      MDDH: '',
      MDDMIN: '',
      MDTR: '',
      MDNAME: '',
      MDETH: '',
      MDAGE: '',
      MDAGEU: '',
      MDDP: '',
      MDANW: '',
      MDANM: '',
      MDPNH: '',
      MDPND: '',
      MDG: '',
      MDP: '',
      MDA: '',
      MDANVT: '',
      MDVT: '',
      MDANPV: '',
      MDANPP: '',
      MDRISK1: '',
      MDDPV: '',
      MDDPP: '',
      MDPNPV: '',
      MDPNPP: '',
      MDRD: '',
      MDRID: '',
      MDDL: '',
      MDDT: '',
      MDDD: '',
      MDDCL: '',
      MDDTP: '',
      MDDTY: '',
      MDDAT: '',
      MDDAD: '',
      MDDEX: '',
      MDDLY1: '',
      MDDLY2: '',
      MDDLY3: '',
      MDLL: '',
      MDSOL: '',
      MDID: '',
      MDIRD: '',
      MDRN: '',
      MDRP: '',
      MDRO: '',
      MDRST: '',
      MDRTP: '',
      MDRCL: '',
      MDRVL: '',
      MDRMK: '',
      MDTRO: '',
      MDANPVO: '',
      MDANPPO: '',
      MDANPV2: '',
      MDANPV2O: '',
      MDANPP2: '',
      MDANPP2O: '',
      MDANPV3: '',
      MDANPV3O: '',
      MDANPP3: '',
      MDANPP3O: '',
      MDANPV4: '',
      MDANPV4O: '',
      MDANPP4: '',
      MDANPP4O: '',
      MDANPV5: '',
      MDANPV5O: '',
      MDANPP5: '',
      MDANPP5O: '',
      MDRISKO: '',
      MDDPVO: '',
      MDDPPO: '',
      MDPNPVO: '',
      MDRDO: '',
      MDRIDO: '',
      MD1DLY1: '',
      MD1DLY2: '',
      MD1DLY3: '',
      MD2DLY1: '',
      MD2DLY2: '',
      MD2DLY3: '',
      MD3DLY1: '',
      MD3DLY2: '',
      MD3DLY3: '',
      MDPNPPO: '',
      MDRISK2: '',
      MDRISK3: '',
      MDRISK4: '',
      MDRISK5: '',
      MDRISK6: '',
      MDRISK7: '',
      MDRISK8: '',
      MDRISK9: '',
      MDRISK10: '',
      MDSTATUS: '',
      MDSYNC: '',
      MDINSERT: '',
      MDUPDATE: '',
    }
  )

  const [projectList, setProjectList] = useState([])
  const [divisionList, setDivisionList] = useState([])
  const [deathPlaceTsp, setDeathPlaceTsp] = useState([])
  const [orgList, setOrgList] = useState([])

  useEffect(async () => {
    if (sessionStorage.getItem('editMDSR') === 'true') {
      setLoading(true)
      setProjectList([{ PROJECT_ID: "P-001", PROJECT_NAME: "SDC" }]);
      setProject('P-001')
      setDivisionReasonSelect("DIV-04")
      setDivisionSelect("DIV-04")
      const death = await getTownshipMDSR();
      const cln = await getClinicByTsp();
      const vil = await villageDt.getVillageByOrgProj()
      if (death?.status === 200 && cln?.status === 200 && vil?.status === 200) {

        /* await setDivisionList(division.data.data) */
        await setDivisionList([{ DIV_ID: "DIV-04", DIV_NAME: "Karen" }])
        await setOrgList([{ ORG_ID: 'CPI-05', ORG_SHORTNAME: 'BMA' },
        { ORG_ID: 'CPI-06', ORG_SHORTNAME: 'BPHWT' },
        { ORG_ID: 'CPI-07', ORG_SHORTNAME: 'KDHW' }])
        await setTownshipList(death.data.data)
        await setTownshipReasonList(death.data.data)
        await setClinicList(cln.data.data)
        await setClinicReasonList(cln.data.data)
        await setVillageList(vil.data.data.getVillageByOrgProj)
        await setVillageReasonList(vil.data.data.getVillageByOrgProj)

        await setDeathPlaceTsp(death.data.data)

        const mdsrData = await edit.getMDSR()
        if (mdsrData?.status === 200) {

          let mData = mdsrData.data.data.getMDSR
          mommy.MDNO = mData[0].MDNO
          mommy.MDRY = mData[0].MDRY
          setYear(mData[0].MDRY)
          mommy.MDRQ = mData[0].MDRQ
          mommy.MDRM = mData[0].MDRM
          setMonthSelect(mData[0].MDRM)

          mommy.MDPJID = 'P-001'
          mommy.MDORGID = mData[0].MDORGID
          mommy.MDST = mData[0].MDST
          mommy.MDTSP = mData[0].MDTSP
          mommy.MDVIL = mData[0].MDVIL
          mommy.MDNCL = mData[0].MDNCL

          //setProject(mData[0].MDPJID)
          setTspSelect(mData[0].MDTSP)
          setVillageSelect(mData[0].MDVIL)
          setClinicSelect(mData[0].MDNCL)
          setClinicReasonSelect(mData[0].MDRCL)
          //setDivisionSelect(mData[0].MDST)

          /* let ab = { divID: mData[0].MDST }
          const tspRes = await getTspByDiv(ab);
          if (tspRes?.status === 200) {
            await setTownshipList(tspRes.data.data);
            let tData = _.find(tspRes.data.data, ['TSP_ID', mData[0].MDTSP]);
            console.log("TData from useEffect => ", tData.TSP_NAME)
            setTspSelect(tData.TSP_ID)
          } */

          /* let a = { tspID: mData[0].MDTSP }
          if (a === 'OTH-TSP-001') {
            const villageRes = await getVillageByTsp(a);
            if (villageRes?.status === 200) {
              await setVillageList(villageRes.data.data);
              let vData = _.find(villageRes.data.data, ['VILLAGE_CODE', mData[0].MDVIL]);
              setVillageSelect(vData.VILLAGE_CODE)
            }
          }
          else {
            setOtherVillageSelect(mData[0].MDVIL)
          } */

          /* let ac = { project: mData[0].MDPJID }
          const clinicRes = await getClinicByTsp(ac)
          if (clinicRes?.status === 200) {
            await setClinicList(clinicRes.data.data);
            await setClinicReasonList(clinicRes.data.data)
            let cData = _.find(clinicRes.data.data, ['CLN_ID', mData[0].MDNCL]);
            let cData2 = _.find(clinicRes.data.data, ['CLN_ID', mData[0].MDRCL]);
            setClinicSelect(cData.CLN_ID)
            setClinicReasonSelect(cData2.CLN_ID)
          }*/
          //setClinicSelect(mData[0].MDNCL)
          //setClinicReasonSelect(mData[0].MDNCL)

          mommy.MDDML = mData[0].MDDML
          mommy.MDDH = mData[0].MDDH
          mommy.MDDMIN = mData[0].MDDMIN
          mommy.MDTR = mData[0].MDTR
          mommy.MDTRO = mData[0].MDTRO
          setWay((mData[0].MDTR).toString())

          mommy.MDNAME = mData[0].MDNAME
          mommy.MDETH = mData[0].MDETH
          mommy.MDAGE = mData[0].MDAGE
          mommy.MDAGEU = mData[0].MDAGEU
          mommy.MDDP = mData[0].MDDP
          setDRadio((mData[0].MDDP).toString())
          mommy.MDANW = mData[0].MDANW
          mommy.MDANM = mData[0].MDANM
          mommy.MDPNH = mData[0].MDPNH
          mommy.MDPND = mData[0].MDPND
          mommy.MDG = mData[0].MDG
          mommy.MDP = mData[0].MDP
          mommy.MDA = mData[0].MDA
          mommy.MDANVT = mData[0].MDANVT

          mommy.MDVT = mData[0].MDVT
          setAncVisit((mData[0].MDVT) + '')

          mommy.MDANPV = mData[0].MDANPV
          setAncVisit1(mData[0].MDANPV ? (mData[0].MDANPV).toString() : '')
          mommy.MDANPP = mData[0].MDANPP
          setAncVisit11(mData[0].MDANPP ? (mData[0].MDANPP).toString() : '')
          mommy.MDANPVO = mData[0].MDANPVO
          mommy.MDANPPO = mData[0].MDANPPO

          mommy.MDANPV2 = mData[0].MDANPV2
          setAncVisit2(mData[0].MDANPV2 ? (mData[0].MDANPV2).toString() : '')
          mommy.MDANPV2O = mData[0].MDANPV2O
          mommy.MDANPP2 = mData[0].MDANPP2
          setAncVisit21(mData[0].MDANPP2 ? (mData[0].MDANPP2).toString() : '')
          mommy.MDANPP2O = mData[0].MDANPP2O

          mommy.MDANPV3 = mData[0].MDANPV3
          setAncVisit3(mData[0].MDANPV3 ? (mData[0].MDANPV3).toString() : '')
          mommy.MDANPV3O = mData[0].MDANPV3O
          mommy.MDANPP3 = mData[0].MDANPP3
          setAncVisit31(mData[0].MDANPP3 ? (mData[0].MDANPP3).toString() : '')
          mommy.MDANPP3O = mData[0].MDANPP3O

          mommy.MDANPV4 = mData[0].MDANPV4
          setAncVisit4(mData[0].MDANPV4 ? (mData[0].MDANPV4).toString() : '')
          mommy.MDANPV4O = mData[0].MDANPV4O
          mommy.MDANPP4 = mData[0].MDANPP4
          setAncVisit41(mData[0].MDANPP4 ? (mData[0].MDANPP4).toString() : '')
          mommy.MDANPP4O = mData[0].MDANPP4O

          mommy.MDANPV5 = mData[0].MDANPV5
          setAncVisit5(mData[0].MDANPV5 ? (mData[0].MDANPV5).toString() : '')
          mommy.MDANPV5O = mData[0].MDANPV5O
          mommy.MDANPP5 = mData[0].MDANPP5
          setAncVisit51(mData[0].MDANPP5 ? (mData[0].MDANPP5).toString() : '')
          mommy.MDANPP5O = mData[0].MDANPP5O

          let rArr = []
          let r1 = mData[0].MDRISK1 === 1 ? rArr.push('one') : null
          let r2 = mData[0].MDRISK2 === 1 ? rArr.push('two') : null
          let r3 = mData[0].MDRISK3 === 1 ? rArr.push('three') : null
          let r4 = mData[0].MDRISK4 === 1 ? rArr.push('four') : null
          let r5 = mData[0].MDRISK5 === 1 ? rArr.push('five') : null
          let r6 = mData[0].MDRISK6 === 1 ? rArr.push('six') : null
          let r7 = mData[0].MDRISK7 === 1 ? rArr.push('seven') : null
          let r8 = mData[0].MDRISK8 === 1 ? rArr.push('eight') : null
          let r9 = mData[0].MDRISK9 === 1 ? rArr.push('nine') : null
          let r10 = mData[0].MDRISK10 === 1 ? rArr.push('ten') : null
          let riskother = mData[0].MDRISKO ? rArr.push('11') : null
          setSymp(rArr)
          mommy.MDRISK1 = mData[0].MDRISK1
          mommy.MDRISK2 = mData[0].MDRISK2
          mommy.MDRISK3 = mData[0].MDRISK3
          mommy.MDRISK4 = mData[0].MDRISK4
          mommy.MDRISK5 = mData[0].MDRISK5
          mommy.MDRISK6 = mData[0].MDRISK6
          mommy.MDRISK7 = mData[0].MDRISK7
          mommy.MDRISK8 = mData[0].MDRISK8
          mommy.MDRISK9 = mData[0].MDRISK9
          mommy.MDRISK10 = mData[0].MDRISK10
          mommy.MDRISKO = mData[0].MDRISKO

          mommy.MDDPV = mData[0].MDDPV
          setDPosition((mData[0].MDDPV).toString())
          mommy.MDDPP = mData[0].MDDPP
          setDPlace((mData[0].MDDPP).toString())
          mommy.MDDPVO = mData[0].MDDPVO
          mommy.MDDPPO = mData[0].MDDPPO

          mommy.MDPNPV = mData[0].MDPNPV
          mommy.MDPNPVO = mData[0].MDPNPVO
          setAPosition((mData[0].MDPNPV).toString())
          mommy.MDPNPP = mData[0].MDPNPP
          mommy.MDPNPPO = mData[0].MDPNPPO
          setAPlace((mData[0].MDPNPP).toString())

          mommy.MDRD = mData[0].MDRD
          setDeathReason1((mData[0].MDRD).split(','))
          mommy.MDRDO = mData[0].MDRDO

          mommy.MDRID = mData[0].MDRID
          setDeathReason2((mData[0].MDRID).split(','))
          mommy.MDRIDO = mData[0].MDRIDO

          mommy.MDDL = mData[0].MDDL
          setDPlaceRadio((mData[0].MDDL).toString())

          mommy.MDDT = moment(moment(mData[0].MDDT).format("YYYY-MM-DD HH:MM:SS")).format("HH:MM")
          mommy.MDDD = moment(mData[0].MDDD).format("YYYY-MM-DD")
          mommy.MDDCL = mData[0].MDDCL
          mommy.MDDEX = mData[0].MDDEX
          mommy.MDDTP = mData[0].MDDTP
          mommy.MDDTY = mData[0].MDDTY === 1 ? '1' : mData[0].MDDTY === 2 ? '2' : mData[0].MDDTY
          if (mData[0].MDDAT) {
            mommy.MDDAT = moment(moment(mData[0].MDDAT).format("YYYY-MM-DD HH:MM:SS")).format("HH:MM")
          }
          if (mData[0].MDDAD) {
            mommy.MDDAD = moment(mData[0].MDDAD).format("YYYY-MM-DD")
          }

          mommy.MDDLY1 = (mData[0].MDDLY1).toString()
          mommy.MDDLY2 = (mData[0].MDDLY2).toString()
          mommy.MDDLY3 = (mData[0].MDDLY3).toString()

          setSlowReason({
            first: mData[0].MDDLY1 === '1' ? true : false,
            second: mData[0].MDDLY2 === '1' ? true : false,
            third: mData[0].MDDLY3 === '1' ? true : false,
          });

          mommy.MD1DLY1 = mData[0].MD1DLY1
          mommy.MD1DLY2 = mData[0].MD1DLY2
          mommy.MD1DLY3 = mData[0].MD1DLY3
          mommy.MD2DLY1 = mData[0].MD2DLY1
          mommy.MD2DLY2 = mData[0].MD2DLY2
          mommy.MD2DLY3 = mData[0].MD2DLY3
          mommy.MD3DLY1 = mData[0].MD3DLY1
          mommy.MD3DLY2 = mData[0].MD3DLY2
          mommy.MD3DLY3 = mData[0].MD3DLY3

          mommy.MDLL = mData[0].MDLL
          mommy.MDSOL = mData[0].MDSOL
          mommy.MDID = moment(mData[0].MDID).format("YYYY-MM-DD")
          mommy.MDIRD = moment(mData[0].MDIRD).format("YYYY-MM-DD")
          mommy.MDRN = mData[0].MDRN
          mommy.MDRP = mData[0].MDRP
          mommy.MDRO = mData[0].MDRO
          setOrgSelect(mData[0].MDRO)
          mommy.MDRST = mData[0].MDRST
          //setDivisionReasonSelect(mData[0].MDRST)
          setTspReasonSelect(mData[0].MDRTP)
          setVillageReasonSelect(mData[0].MDRVL)
          /* let abc = { divID: mData[0].MDRST }
          const tspRess = await getTspByDiv(abc);
          if (tspRess?.status === 200) {
            await setTownshipReasonList(tspRess.data.data);
            let tData2 = _.find(tspRess.data.data, ['TSP_ID', mData[0].MDRTP]);
            console.log("TData2 from useEffect => ", tData2.TSP_NAME)
            setTspReasonSelect(tData2.TSP_ID)
          } */
          mommy.MDRTP = mData[0].MDRTP
          mommy.MDRVL = mData[0].MDRVL
          /* let abcd = { tspID: mData[0].MDRTP }
          const villageRess = await getVillageByTsp(abcd);
          if (villageRess?.status === 200) {
            await setVillageReasonList(villageRess.data.data);
            let vvData = _.find(villageRess.data.data, ['VILLAGE_CODE', mData[0].MDRVL]);
            setVillageReasonSelect(vvData.VILLAGE_CODE)
          } */
          mommy.MDRMK = mData[0].MDRMK

          console.log("MDSR Data =>", mdsrData.data.data.getMDSR)
          //console.log("MDSR time format => ", moment(moment(mData[0].MDDAT).format("YYYY-MM-DD HH:MM:SS")).format("HH:MM"))

        }
      }
      setLoading(false)
    }

  }, [])

  //Report Information
  const [year, setYear] = useState('')
  const yearHandle = (event) => {
    setYear(event.target.value);
  };

  const [monthSelect, setMonthSelect] = useState('')
  const month = [
    'January(Q1)',
    'February(Q1)',
    'March(Q1)',
    'April(Q2)',
    'May(Q2)',
    'June(Q2)',
    'July(Q3)',
    'August(Q3)',
    'September(Q3)',
    'October(Q4)',
    'November(Q4)',
    'December(Q4)'
  ]
  const monthHandle = (event) => {
    setMonthSelect(event.target.value);
  };

  const [project, setProject] = useState('P-001')
  /*  const projectHandle = async (event) => {
     setProject(event.target.value)
     let a = { project: event.target.value }
     const clinicRes = await getClinicByTsp(a)
     if (clinicRes?.status === 200) {
       await setClinicList(clinicRes.data.data);
       await setClinicReasonList(clinicRes.data.data)
       console.log("Clinic List =>", clinicRes.data.data)
       console.log("Project Select => ", event.target.value)
     }
   } */


  //အကြောင်းအရာ အကျဉ်းချုပ် (သေဆုံးသူ၏ နေရာလိပ်စာ)
  const [clinicList, setClinicList] = useState([])
  const [clinicSelect, setClinicSelect] = useState('')
  const [villageList, setVillageList] = useState([])
  const [villageSelect, setVillageSelect] = useState('')
  const [otherVillageSelect, setOtherVillageSelect] = useState('')
  const [divisionSelect, setDivisionSelect] = useState('')
  const [townshipList, setTownshipList] = useState([])
  const [tspSelect, setTspSelect] = useState('')

  const divisionHandle = async (event) => {
    setDivisionSelect(event.target.value);
    /* let a = { divID: event.target.value }
    const tspRes = await getTspByDiv(a);
    if (tspRes?.status === 200) {
      await setTownshipList(tspRes.data.data);
      console.log("Township List =>", tspRes.data.data)
      console.log("Division Select => ", event.target.value)
    } */
  };

  const tspHandle = async (event) => {
    setTspSelect(event.target.value)
    /* let a = { tspID: event.target.value }
    if (a !== 'OTH-TSP-001') {
      setOtherVillageSelect('')
      const villageRes = await getVillageByTsp(a);
      if (villageRes?.status === 200) {
        await setVillageList(villageRes.data.data);
        console.log("Village List =>", villageRes.data.data)
        console.log("Township Select => ", event.target.value)
      }
    } */
  }

  const villageHandle = async (event) => {
    setVillageSelect(event.target.value)
  }

  const clinicHandle = async (event) => {
    setClinicSelect(event.target.value)
  }

  const [way, setWay] = useState('')
  const wayHandle = (event) => {
    setWay(event.target.value);
  };

  // သေဆုံးခြင်းဆိုင်ရာ အချက်အလက်များ
  const [dRadio, setDRadio] = useState('');
  function dRadioHandle(event) {
    if (event.target.value === dRadio) {
      setDRadio("")
    } else {
      setDRadio(event.target.value)
    }
  }

  //ကိုယ်ဝန်ဆောင်စဉ်ကာလတွင်း အချက်အလက်များ
  const anc = [
    { value: '1', name: 'Visit 1' },
    { value: '2', name: 'Visit 2' },
    { value: '3', name: 'Visit 3' },
    { value: '4', name: 'Visit 4' },
    { value: '5', name: 'Visit 5' },
    { value: '99', name: "No ANC visit (or) Don't know" },
  ]
  const [ancVisit, setAncVisit] = useState('')
  const ancVisitHandle = (event) => {
    setAncVisit(event.target.value);
  };

  const [ancVisit1, setAncVisit1] = useState('')
  const ancVisit1Handle = (event) => {
    setAncVisit1(event.target.value);
  };
  const [ancVisit11, setAncVisit11] = useState('')
  const ancVisit11Handle = (event) => {
    setAncVisit11(event.target.value);
  };

  const [ancVisit2, setAncVisit2] = useState('')
  const ancVisit2Handle = (event) => {
    setAncVisit2(event.target.value);
  };
  const [ancVisit21, setAncVisit21] = useState('')
  const ancVisit21Handle = (event) => {
    setAncVisit21(event.target.value);
  };

  const [ancVisit3, setAncVisit3] = useState('')
  const ancVisit3Handle = (event) => {
    setAncVisit3(event.target.value);
  };
  const [ancVisit31, setAncVisit31] = useState('')
  const ancVisit31Handle = (event) => {
    setAncVisit31(event.target.value);
  };

  const [ancVisit4, setAncVisit4] = useState('')
  const ancVisit4Handle = (event) => {
    setAncVisit4(event.target.value);
  };
  const [ancVisit41, setAncVisit41] = useState('')
  const ancVisit41Handle = (event) => {
    setAncVisit41(event.target.value);
  };

  const [ancVisit5, setAncVisit5] = useState('')
  const ancVisit5Handle = (event) => {
    setAncVisit5(event.target.value);
  };
  const [ancVisit51, setAncVisit51] = useState('')
  const ancVisit51Handle = (event) => {
    setAncVisit51(event.target.value);
  };

  //ကိုယ်ဝန်ဆောင်စဉ်ကာလအတွင်း တွေ့ရှိခဲ့သော ဖြစ်နိုင်ချေ အန္တရာယ်လက္ခဏာများ
  const [symp, setSymp] = useState([])
  const symptom = [
    { value: 'one', name: 'သွေးအားနည်းခြင်း' },
    { value: 'two', name: 'ပြင်းထန်ငှက်ဖျားရောဂါ' },
    { value: 'three', name: '4 ကြိမ်နှင့်အထက် ကိုယ်ဝန်ဆောင်ဖူးခြင်း' },
    { value: 'four', name: 'ကိုယ်ဝန်ဆောင်စဉ် သွေးဆင်းခြင်း' },
    { value: 'five', name: 'သွေးတိုးခြင်း' },
    { value: 'six', name: 'ယခင်ကိုယ်ဝန်အား ခွဲမွေးဖူးခြင်း' },
    { value: 'seven', name: 'HIV/AIDS' },
    { value: 'eight', name: 'ဆီးချိုရောဂါ' },
    { value: 'nine', name: 'အမြွှာကိုယ်ဝန်' },
    { value: 'ten', name: 'မည်သည့်လက္ခဏာမှ မတွေ့ရပါ' },
    { value: '11', name: 'အခြား' },
  ]
  const sympHandle = (event) => {
    setSymp(event.target.value);
  };

  //မွေးဖွားနေစဉ်ကာလ အချက်အလက်များ
  const [dPosition, setDPosition] = useState('')
  const dPositionHandle = (event) => {
    setDPosition(event.target.value)
  }
  const duringPosition = [
    { value: '1', name: 'MCHW' },
    { value: '2', name: 'EmOC' },
    { value: '3', name: 'Medic' },
    { value: '4', name: 'CHW' },
    { value: '5', name: 'TTBA' },
    { value: '6', name: 'ဆရာဝန်' },
    { value: '7', name: 'သူနာပြု/ သားဖွားဆရာမ' },
    { value: '8', name: 'အရံသားဖွားဆရာမ' },
    { value: '9', name: 'အခြား' },
    { value: '10', name: 'မသိ/ မမှတ်မိပါ' },
  ]

  const [dPlace, setDPlace] = useState('')
  const dPlaceHandle = (event) => {
    setDPlace(event.target.value)
  }

  const duringPlace = [
    { value: '1', name: 'အိမ်' },
    { value: '2', name: 'တိုင်းရင်းသားကျန်းမာရေးအဖွဲ့အစည်းဆေးခန်း' },
    { value: '3', name: 'ကျေးလက်ကျန်းမာရေးဌာန' },
    { value: '4', name: 'ပုဂ္ဂလိကဆေးခန်း' },
    { value: '5', name: 'တိုက်နယ်ဆေးရုံ' },
    { value: '6', name: 'မြို့နယ်ဆေးရုံ' },
    { value: '7', name: 'တိုင်းရင်းသားကျန်းမာရေးအဖွဲ့အစည်းများဆေးရုံ' },
    { value: '8', name: 'ပုဂ္ဂလိကဆေးရုံ' },
    { value: '9', name: 'အခြား' },
    { value: '10', name: 'မသိ/ မမှတ်မိပါ' },
  ]

  //မီးဖွားပြီးနောက်ကာလ အချက်အလက်များ
  const [aPosition, setAPosition] = useState('')
  const aPositionHandle = (event) => {
    setAPosition(event.target.value)
  }
  const afterPosition = [
    { value: '1', name: 'MCHW' },
    { value: '2', name: 'EmOC' },
    { value: '3', name: 'Medic' },
    { value: '4', name: 'CHW' },
    { value: '5', name: 'TTBA' },
    { value: '6', name: 'ဆရာဝန်' },
    { value: '7', name: 'သူနာပြု/ သားဖွားဆရာမ' },
    { value: '8', name: 'အရံသားဖွားဆရာမ' },
    { value: '9', name: 'အခြား' },
    { value: '10', name: 'မသိ/ မမှတ်မိပါ' },
  ]

  const [aPlace, setAPlace] = useState('')
  const aPlaceHandle = (event) => {
    setAPlace(event.target.value)
  }

  const afterPlace = [
    { value: '1', name: 'အိမ်' },
    { value: '2', name: 'တိုင်းရင်းသားကျန်းမာရေးအဖွဲ့အစည်းဆေးခန်း' },
    { value: '3', name: 'ကျေးလက်ကျန်းမာရေးဌာန' },
    { value: '4', name: 'ပုဂ္ဂလိကဆေးခန်း' },
    { value: '5', name: 'တိုက်နယ်ဆေးရုံ' },
    { value: '6', name: 'မြို့နယ်ဆေးရုံ' },
    { value: '7', name: 'တိုင်းရင်းသားကျန်းမာရေးအဖွဲ့အစည်းများဆေးရုံ' },
    { value: '8', name: 'ပုဂ္ဂလိကဆေးရုံ' },
    { value: '9', name: 'အခြား' },
    { value: '10', name: 'မသိ/ မမှတ်မိပါ' },
  ]

  //သေဆုံးရသည့် အကြောင်းအရင်း
  const [deathReason1, setDeathReason1] = useState([])
  const deathReason1Handle = (event) => {
    setDeathReason1(event.target.value)
  }
  const reason1 = [
    { value: '1', name: 'Obstetric hemorrhage' },
    { value: '2', name: 'Maternal sepsis' },
    { value: '3', name: 'Pregnancy with abortive outcome' },
    { value: '4', name: 'Unanticipated complications of management' },
    { value: '5', name: 'Hypertensive disorder' },
    { value: '6', name: 'Other obstetric complication' },
  ]

  const [deathReason2, setDeathReason2] = useState([])
  const deathReason2Handle = (event) => {
    setDeathReason2(event.target.value)
  }
  const reason2 = [
    { value: '1', name: 'Pre-existing medical disease' },
    { value: '2', name: 'Disease of the respiratory system' },
    { value: '3', name: 'Disease of the circulatory system' },
    { value: '4', name: 'Malignancies' },
    { value: '5', name: 'Disease of the digestive system Infections' },
    { value: '6', name: 'Disease of the blood' },
    { value: '7', name: 'Other' },
  ]

  // သေဆုံးသော နေရာ
  const [dPlaceRadio, setDPlaceRadio] = useState('');
  function dPlaceRadioHandle(event) {
    if (event.target.value === dPlaceRadio) {
      setDPlaceRadio("")
    } else {
      setDPlaceRadio(event.target.value)
    }
  }

  const [dPublicRadio, setDPublicRadio] = useState('1');
  function dPublicRadioHandle(event) {
    if (event.target.value === dPublicRadio) {
      setDPublicRadio("")
    } else {
      setDPublicRadio(event.target.value)
    }
  }

  //တွေ့ရှိရသော နှောင့်နှေးခြင်းအကြောင်းအရာများ
  const [slowReason, setSlowReason] = useState({
    first: false,
    second: false,
    third: false,
  });
  const slowReasonHandle = (event) => {
    setSlowReason({ ...slowReason, [event.target.name]: event.target.checked });
  };
  const { first, second, third } = slowReason;

  const [firstReason, setFirstReason] = useState('')
  const [secondReason, setSecondReason] = useState('')
  const [thirdReason, setThirdReason] = useState('')

  const [orgSelect, setOrgSelect] = useState('')
  const orgSelectHandle = (event) => {
    setOrgSelect(event.target.value)
  }

  const [clinicReasonList, setClinicReasonList] = useState([])
  const [clinicReasonSelect, setClinicReasonSelect] = useState('')
  const [villageReasonList, setVillageReasonList] = useState([])
  const [villageReasonSelect, setVillageReasonSelect] = useState('')
  const [divisionReasonSelect, setDivisionReasonSelect] = useState('')
  const [townshipReasonList, setTownshipReasonList] = useState([])
  const [tspReasonSelect, setTspReasonSelect] = useState('')

  const divisionReasonHandle = async (event) => {
    setDivisionReasonSelect(event.target.value);
    let a = { divID: event.target.value }
    const tspRes = await getTspByDiv(a);
    if (tspRes?.status === 200) {
      await setTownshipReasonList(tspRes.data.data);
      console.log("Township List =>", tspRes.data.data)
      console.log("Division Select => ", event.target.value)
    }
  };

  const tspReasonHandle = async (event) => {
    setTspReasonSelect(event.target.value)
    /* let a = { tspID: event.target.value }
    const villageRes = await getVillageByTsp(a);

    if (villageRes?.status === 200) {
      await setVillageReasonList(villageRes.data.data);
      console.log("Village List =>", villageRes.data.data)
      console.log("Township Select => ", event.target.value)
    } */
  }

  const villageReasonHandle = async (event) => {
    setVillageReasonSelect(event.target.value)
  }

  const clinicReasonHandle = async (event) => {
    setClinicReasonSelect(event.target.value)
  }

  /////////////////Error Check//////////////////////
  const [openSnack, setOpenSnack] = useState(false)
  const [successSnack, setSuccessSnack] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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

  const clear = () => {
    setMommy(
      {
        MDRY: '',
        MDRQ: '',
        MDRM: '',
        MDPJID: '',
        MDORGID: '',
        MDST: '',
        MDTSP: '',
        MDVIL: '',
        MDNCL: '',
        MDDML: '',
        MDDH: '',
        MDDMIN: '',
        MDTR: '',
        MDNAME: '',
        MDETH: '',
        MDAGE: '',
        MDAGEU: '',
        MDDP: '',
        MDANW: '',
        MDANM: '',
        MDPNH: '',
        MDPND: '',
        MDG: '',
        MDP: '',
        MDA: '',
        MDANVT: '',
        MDVT: '',
        MDANPV: '',
        MDANPP: '',
        MDRISK1: '',
        MDDPV: '',
        MDDPP: '',
        MDPNPV: '',
        MDPNPP: '',
        MDRD: '',
        MDRID: '',
        MDDL: '',
        MDDT: '',
        MDDD: '',
        MDDCL: '',
        MDDTP: '',
        MDDTY: '',
        MDDAT: '',
        MDDAD: '',
        MDDEX: '',
        MDDLY1: '',
        MDDLY2: '',
        MDDLY3: '',
        MDLL: '',
        MDSOL: '',
        MDID: '',
        MDIRD: '',
        MDRN: '',
        MDRP: '',
        MDRO: '',
        MDRST: '',
        MDRTP: '',
        MDRCL: '',
        MDRVL: '',
        MDRMK: '',
        MDTRO: '',
        MDANPVO: '',
        MDANPPO: '',
        MDANPV2: '',
        MDANPV2O: '',
        MDANPP2: '',
        MDANPP2O: '',
        MDANPV3: '',
        MDANPV3O: '',
        MDANPP3: '',
        MDANPP3O: '',
        MDANPV4: '',
        MDANPV4O: '',
        MDANPP4: '',
        MDANPP4O: '',
        MDANPV5: '',
        MDANPV5O: '',
        MDANPP5: '',
        MDANPP5O: '',
        MDRISKO: '',
        MDDPVO: '',
        MDDPPO: '',
        MDPNPVO: '',
        MDRDO: '',
        MDRIDO: '',
        MD1DLY1: '',
        MD1DLY2: '',
        MD1DLY3: '',
        MD2DLY1: '',
        MD2DLY2: '',
        MD2DLY3: '',
        MD3DLY1: '',
        MD3DLY2: '',
        MD3DLY3: '',
        MDPNPPO: '',
        MDRISK2: '',
        MDRISK3: '',
        MDRISK4: '',
        MDRISK5: '',
        MDRISK6: '',
        MDRISK7: '',
        MDRISK8: '',
        MDRISK9: '',
        MDRISK10: '',
      }
    )
    setYear('')
    setMonthSelect('')
    setClinicSelect('')
    setVillageSelect('')
    setTspSelect('')
    setWay('')
    setDRadio('')
    setAncVisit([])
    setAncVisit1('')
    setAncVisit11('')
    setAncVisit2('')
    setAncVisit21('')
    setAncVisit3('')
    setAncVisit31('')
    setAncVisit4('')
    setAncVisit41('')
    setAncVisit5('')
    setAncVisit51('')
    setSymp([])
    setDPosition('')
    setDPlace('')
    setAPosition('')
    setAPlace('')
    setDeathReason1([])
    setDeathReason2([])
    setDPlaceRadio('')
    setSlowReason({
      first: false,
      second: false,
      third: false,
    });
    setOrgSelect('')
    setClinicReasonSelect('')
    setVillageReasonSelect('')
    setTspReasonSelect('')
    setError('')
    setSuccess('')
  }

  const submit = async () => {

    let valid = !year ? 'အချက်(၁) မှ Reported for Year ကိုရွေးချယ်ပေးပါ' :
      !monthSelect ? 'အချက်(၁) မှ Reported Month(Quarter) ကိုရွေးချယ်ပေးပါ' :
        !project ? 'အချက်(၁) မှ Project ကိုရွေးချယ်ပေးပါ' :
          !divisionSelect ? 'အချက်(၂) မှ ပြည်နယ်/တိုင်းဒေသကြီး ကိုရွေးချယ်ပေးပါ' :
            !tspSelect ? 'အချက်(၂) မှ မြို့နယ် ကိုရွေးချယ်ပေးပါ' :
              !(villageSelect || otherVillageSelect) ? 'အချက်(၂) မှ ကျေးရွာ ကိုရွေးချယ်ပေးပါ' :
                !clinicSelect ? 'အချက်(၂) မှ အနီးဆုံးဆေးခန်းအမည် ကိုရွေးချယ်ပေးပါ' :
                  !mommy.MDDML ? 'အချက်(၂) မှ အိမ်နှင့်ဆေးခန်း အကွာအဝေး(မိုင်) ကိုရိုက်ထည့်ပေးပါ။' :
                    !mommy.MDDH ? 'အချက်(၂) မှ အိမ်နှင့်ဆေးခန်း အကွာအဝေး(နာရီ) ကိုရိုက်ထည့်ပေးပါ။' :
                      !mommy.MDDMIN ? 'အချက်(၂) မှ အိမ်နှင့်ဆေးခန်း အကွာအဝေး(မိနစ်) ကိုရိုက်ထည့်ပေးပါ။' :
                        !way ? 'အချက်(၂) မှ လူနာကိုသယ်ယူပို့ဆောင်သောနည်းလမ်း ကိုရွေးချယ်ပေးပါ။' :
                          !mommy.MDNAME ? 'အချက်(၂) မှ သေဆုံးသူအမည် ကိုရိုက်ထည့်ပေးပါ။' :
                            !mommy.MDETH ? 'အချက်(၂) မှ လူမျိုး ကိုရိုက်ထည့်ပေးပါ။' :
                              !mommy.MDAGE ? 'အချက်(၂) မှ အသက် ကိုရိုက်ထည့်ပေးပါ။' :
                                !dRadio ? 'အချက်(၃) မှ သေဆုံးခြင်းဆိုင်ရာအချက်အလက်များ ကိုရွေးချယ်ပေးပါ။' :
                                  (dRadio === '1' && !(mommy.MDANW || mommy.MDANM)) ? 'အချက်(၃) မှ ကလေးမမွေးခင်မိခင်သေဆုံးခြင်း (ပတ်) သို့ (လ) ကိုရိုက်ထည့်ပေးပါ။' :
                                    (dRadio === '3' && !(mommy.MDPNH || mommy.MDPND)) ? 'အချက်(၃) မှ မွေးဖွားပြီး/ကိုယ်ဝန်ပျက်ကျပြီး သေဆုံးခြင်း (ပတ်) သို့ (လ) ကိုရိုက်ထည့်ပေးပါ။' :
                                      !mommy.MDG ? 'အချက်(၄) မှ ကိုယ်ဝန်ဆောင်ကြိမ် ကိုရိုက်ထည့်ပေးပါ။' :
                                        !mommy.MDP ? 'အချက်(၄) မှ မွေးဖွားကြိမ် ကိုရိုက်ထည့်ပေးပါ။' :
                                          !mommy.MDA ? 'အချက်(၄) မှ ကိုယ်ဝန်ပျက်ကြိမ် ကိုရိုက်ထည့်ပေးပါ။' :
                                            !mommy.MDANVT ? 'အချက်(၄) မှ ကိုယ်ဝန်ဆောင်စောင့်ရှောက်မှုခံယူသောအကြိမ်ရေ ကိုရိုက်ထည့်ပေးပါ။' :
                                              ancVisit === '' ? 'အချက်(၄) မှ ANC Visits ကိုရွေးချယ်ပေးပါ' :
                                                ((ancVisit === '1') && (!ancVisit1)) ? 'ANC Visit - 1 မှ ဝန်ဆောင်မှုပေးခဲ့သူ၏ရာထူး ကိုရွေးချယ်ပေးပါ။' :
                                                  ((ancVisit === '1') && (!ancVisit11)) ? 'ANC Visit - 1 မှ ဝန်ဆောင်မှုရယူခဲ့သောနေရာ ကိုရွေးချယ်ပေးပါ။' :
                                                    ((ancVisit === '2') && (!ancVisit2)) ? 'ANC Visit - 2 မှ ဝန်ဆောင်မှုပေးခဲ့သူ၏ရာထူး ကိုရွေးချယ်ပေးပါ။' :
                                                      ((ancVisit === '2') && (!ancVisit21)) ? 'ANC Visit - 2 မှ ဝန်ဆောင်မှုရယူခဲ့သောနေရာ ကိုရွေးချယ်ပေးပါ။' :
                                                        ((ancVisit === '3') && (!ancVisit3)) ? 'ANC Visit - 3 မှ ဝန်ဆောင်မှုပေးခဲ့သူ၏ရာထူး ကိုရွေးချယ်ပေးပါ။' :
                                                          ((ancVisit === '3') && (!ancVisit31)) ? 'ANC Visit - 3 မှ ဝန်ဆောင်မှုရယူခဲ့သောနေရာ ကိုရွေးချယ်ပေးပါ။' :
                                                            ((ancVisit === '4') && (!ancVisit4)) ? 'ANC Visit - 4 မှ ဝန်ဆောင်မှုပေးခဲ့သူ၏ရာထူး ကိုရွေးချယ်ပေးပါ။' :
                                                              ((ancVisit === '4') && (!ancVisit41)) ? 'ANC Visit - 4 မှ ဝန်ဆောင်မှုရယူခဲ့သောနေရာ ကိုရွေးချယ်ပေးပါ။' :
                                                                ((ancVisit === '5') && (!ancVisit5)) ? 'ANC Visit - 5 မှ ဝန်ဆောင်မှုပေးခဲ့သူ၏ရာထူး ကိုရွေးချယ်ပေးပါ။' :
                                                                  ((ancVisit === '5') && (!ancVisit51)) ? 'ANC Visit - 5 မှ ဝန်ဆောင်မှုရယူခဲ့သောနေရာ ကိုရွေးချယ်ပေးပါ။' :
                                                                    (dRadio === '2' || dRadio === '3') && !dPosition ? 'အမှတ်(၆) မှ ဝန်ဆောင်မှုပေးခဲ့သူ၏ရာထူး ကိုရွေးချယ်ပေးပါ။' :
                                                                      (dRadio === '2' || dRadio === '3') && !dPlace ? 'အမှတ်(၆) မှ ဝန်ဆောင်မှုရယူခဲ့သောနေရာ ကိုရွေးချယ်ပေးပါ။' :
                                                                        (dRadio === '3') && !aPosition ? 'အမှတ်(၇) မှ ဝန်ဆောင်မှုပေးခဲ့သူ၏ရာထူး ကိုရွေးချယ်ပေးပါ။' :
                                                                          (dRadio === '3') && !aPlace ? 'အမှတ်(၇) မှ ဝန်ဆောင်မှုရယူခဲ့သောနေရာ ကိုရွေးချယ်ပေးပါ။' :
                                                                            !dPlaceRadio ? 'အမှတ်(၉) မှ သေဆုံးသောနေရာ ကိုရွေးချယ်ပေးပါ။' :
                                                                              !mommy.MDDT ? 'အမှတ်(၉) မှ သေဆုံးသည့်အချိန် ကိုရိုက်ထည့်ပေးပါ။' :
                                                                                !mommy.MDDD ? 'အမှတ်(၉) မှ သေဆုံးသည့်နေ့စွဲ ကိုရိုက်ထည့်ပေးပါ။' :
                                                                                  (dPlaceRadio === '3' || dPlaceRadio === '4') && !mommy.MDDCL ? 'အမှတ်(၉) မှ ကျန်းမာရေးဌာနအမည် ကိုရိုက်ထည့်ပေးပါ။' :
                                                                                    (dPlaceRadio === '3' || dPlaceRadio === '4') && !mommy.MDDTP ? 'အမှတ်(၉) မှ မြို့နယ် ကိုရွေးချယ်ပေးပါ။' :
                                                                                      (dPlaceRadio === '3' || dPlaceRadio === '4') && !dPublicRadio ? 'အမှတ်(၉) မှ Public or Private ကိုရွေးချယ်ပေးပါ။' :
                                                                                        (dPlaceRadio === '3' || dPlaceRadio === '4') && !mommy.MDDAT ? 'အမှတ်(၉) မှ ဆေးရုံ၊ဆေးခန်းတင်သည့်အချိန် ကိုရွေးချယ်ပေးပါ။' :
                                                                                          (dPlaceRadio === '3' || dPlaceRadio === '4') && !mommy.MDDAD ? 'အမှတ်(၉) မှ ဆေးရုံ၊ဆေးခန်းတင်သည့်‌နေ့စွဲ ကိုရွေးချယ်ပေးပါ။' :
                                                                                            !mommy.MDID ? 'အမှတ်(၁၀) မှ စစ်ဆေးသည့်နေ့စွဲ ကိုရိုက်ထည့်ပေးပါ။' :
                                                                                              !mommy.MDIRD ? 'အမှတ်(၁၀) မှ အစီရင်ခံစာတင်သည့်နေ့စွဲ ကိုရိုက်ထည့်ပေးပါ။' :
                                                                                                !mommy.MDRN ? 'အမှတ်(၁၀) မှ အစီရင်ခံစာတင်သူ၏အမည် ကိုရိုက်ထည့်ပေးပါ။' :
                                                                                                  !mommy.MDRP ? 'အမှတ်(၁၀) မှ အစီရင်ခံစာတင်သူ၏ရာထူး ကိုရိုက်ထည့်ပေးပါ။' :
                                                                                                    !orgSelect ? 'အမှတ်(၁၀) မှ အဖွဲ့အစည်း ကိုရွေးချယ်ပေးပါ။' :
                                                                                                      !divisionReasonSelect ? 'အမှတ်(၁၀) မှ ပြည်နယ်/တိုင်းဒေသကြီး ကိုရွေးချယ်ပေးပါ။' :
                                                                                                        !tspReasonSelect ? 'အမှတ်(၁၀) မှ မြို့နယ် ကိုရွေးချယ်ပေးပါ။' :
                                                                                                          !villageReasonSelect ? 'အမှတ်(၁၀) မှ ကျေးရွာ ကိုရွေးချယ်ပေးပါ။' :
                                                                                                            !clinicReasonSelect ? 'အမှတ်(၁၀) မှ အနီးဆုံးဆေးခန်းအမည် ကိုရွေးချယ်ပေးပါ။' :
                                                                                                              !(mommy.MDID >= mommy.MDDD) ? "အမှတ်(၉) မှ သေဆုံးသည့်နေ့စွဲ သည် အမှတ်(၁၀) မှ စစ်ဆေးသည့်နေ့စွဲ ထက်ငယ်သင့်ပါသည်။" :
                                                                                                                !(mommy.MDIRD >= mommy.MDID) ? "အမှတ်(၁၀) မှ စစ်ဆေးသည့်နေ့စွဲ သည် အမှတ်(၁၀) မှ အစီရင်ခံစာတင်သည့်နေ့စွဲ ထက်ငယ်သင့်ပါသည်။" : 'valid'

    if (valid === 'valid') {
      mommy.MDRY = year
      mommy.MDRQ = monthSelect <= 3 ? 1 : monthSelect <= 6 && monthSelect > 3 ? 2 : monthSelect <= 9 && monthSelect > 6 ? 3 : 4
      mommy.MDRM = monthSelect
      mommy.MDPJID = 'P-001'
      mommy.MDORGID = orgSelect
      mommy.MDST = divisionSelect
      mommy.MDTSP = tspSelect
      mommy.MDVIL = tspSelect === 'OTH-TSP-001' ? otherVillageSelect : villageSelect
      mommy.MDNCL = clinicSelect
      mommy.MDTR = way
      mommy.MDAGEU = '365'
      mommy.MDDP = dRadio
      mommy.MDG = mommy.MDG === '' ? 99 : mommy.MDG
      mommy.MDVT = ancVisit === '99' ? 99 : ancVisit

      if (ancVisit === '99') {
        mommy.MDANPV = 99
        mommy.MDANPP = 99

        mommy.MDANPV2 = 99
        mommy.MDANPP2 = 99

        mommy.MDANPV3 = 99
        mommy.MDANPP3 = 99

        mommy.MDANPV4 = 99
        mommy.MDANPP4 = 99

        mommy.MDANPV5 = 99
        mommy.MDANPP5 = 99
      }
      else {
        mommy.MDANPV = ancVisit1
        mommy.MDANPP = ancVisit11

        mommy.MDANPV2 = ancVisit2
        mommy.MDANPP2 = ancVisit21

        mommy.MDANPV3 = ancVisit3
        mommy.MDANPP3 = ancVisit31

        mommy.MDANPV4 = ancVisit4
        mommy.MDANPP4 = ancVisit41

        mommy.MDANPV5 = ancVisit5
        mommy.MDANPP5 = ancVisit51
      }


      mommy.MDRISK1 = symp.includes('one') ? 1 : 2
      mommy.MDRISK2 = symp.includes('two') ? 1 : 2
      mommy.MDRISK3 = symp.includes('three') ? 1 : 2
      mommy.MDRISK4 = symp.includes('four') ? 1 : 2
      mommy.MDRISK5 = symp.includes('five') ? 1 : 2
      mommy.MDRISK6 = symp.includes('six') ? 1 : 2
      mommy.MDRISK7 = symp.includes('seven') ? 1 : 2
      mommy.MDRISK8 = symp.includes('eight') ? 1 : 2
      mommy.MDRISK9 = symp.includes('nine') ? 1 : 2
      mommy.MDRISK10 = symp.includes('ten') ? 1 : 2

      mommy.MDDPV = dPosition
      mommy.MDDPP = dPlace
      mommy.MDPNPV = aPosition
      mommy.MDPNPP = aPlace
      mommy.MDRD = deathReason1
      mommy.MDRID = deathReason2
      mommy.MDDL = dPlaceRadio
      mommy.MDDAT = mommy.MDDAT ? mommy.MDDAT : null;
      mommy.MDDAD = mommy.MDDAD ? mommy.MDDAD : null;
      mommy.MDDTY = dPublicRadio
      mommy.MDDLY1 = first ? '1' : '2'
      mommy.MDDLY2 = second ? '1' : '2'
      mommy.MDDLY3 = third ? '1' : '2'
      mommy.MDRO = orgSelect
      mommy.MDRST = divisionReasonSelect
      mommy.MDRTP = tspReasonSelect
      mommy.MDRCL = clinicReasonSelect
      mommy.MDRVL = villageReasonSelect

      mommy.MDUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
      mommy.MDSTATUS = '2'
      mommy.MDSYNC = '0'

      const rhres = await updateMDSR({ mommy });
      if (rhres?.status === 200) {
        console.log("Save MDSR success!")
        sessionStorage.setItem('homeSave', 'done')
        setSuccess("Successfully updated a MDSR Service")
        setSuccessSnack(true)
        history.push({
          pathname: "entryhomepage",
          openMDSRUpdateSnackbar: true
        });
      }
    }
    else {
      setSnackBarOpen()
      setError(valid)
    }
    console.log("Mommy Data => ", mommy)
  }

  return (
    <div className={classes.root}>
      <Modals open={loading} />
      <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
        Maternal Death Surveillance and Response (MDSR) Report Information</Typography>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={classes.heading}>
          <Typography className={classes.title}>၁။ Report Informations</Typography>
        </AccordionSummary>
        <ThemeProvider theme={radioTheme}>
          <AccordionDetails className={classes.detail}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Reported for(Year)</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={year}
                      onChange={yearHandle}
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
                      <MenuItem classes={{ selected: classes.selected }} value={new Date().getFullYear() - 2}>{new Date().getFullYear() - 2}</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={new Date().getFullYear()}>{new Date().getFullYear()}</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={new Date().getFullYear() + 2}>{new Date().getFullYear() + 2}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </ThemeProvider>
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Reported for(Month,Quarter)</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={monthSelect}
                      onChange={monthHandle}
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
                      {month.map((m, index) => (
                        <MenuItem classes={{ selected: classes.selected }} value={index + 1}>{m}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
              </ThemeProvider>
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label="Project"
                    variantText="filled"
                    disabled
                    value='SDC'
                    style={{ width: '90%', marginTop: '3px' }} />
                </Grid>
              </ThemeProvider>

            </Grid>
          </AccordionDetails>
        </ThemeProvider>

      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          className={classes.heading}>
          <Typography className={classes.title}>၂။ အကြောင်းအရာ အကျဉ်းချုပ် (သေဆုံးသူ၏ နေရာလိပ်စာ)</Typography>
        </AccordionSummary>
        <ThemeProvider theme={radioTheme}>
          <AccordionDetails className={classes.detail}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={2} md={2} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label="ပြည်နယ်/တိုင်းဒေသကြီး"
                    variantText="filled"
                    disabled
                    value='Karen'
                    style={{ width: '90%', marginTop: '3px' }} />
                </Grid>
              </ThemeProvider>
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={2} md={2} justify="center">
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">မြို့နယ်</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={tspSelect}
                      onChange={tspHandle}
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
                      {townshipList.length && townshipList.map((m) => (
                        <MenuItem classes={{ selected: classes.selected }} value={m.TSP_ID}>{m.TSP_NAME}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
              </ThemeProvider>
              {tspSelect === 'OTH-TSP-001' ?
                <ThemeProvider theme={radioTheme}>
                  <Grid item xs={12} sm={2} md={2} justify="center">
                    <CustomUnicefTextField
                      id="filled-basic"
                      label="အခြားကျေးရွာ"
                      variantText="filled"
                      value={otherVillageSelect}
                      style={{ width: '90%', marginTop: '5px' }}
                      onChange={e => { setOtherVillageSelect(e.target.value); setVillageSelect('') }} />
                  </Grid>
                </ThemeProvider>
                :
                <ThemeProvider theme={radioTheme}>
                  <Grid item xs={12} sm={2} md={2} justify="center">
                    <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%' }}>
                      <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">ကျေးရွာ</Typography>
                        <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={villageSelect}
                        onChange={villageHandle}
                        disabled={!villageList.length}
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
                        {villageList.length && villageList.map((m) => (
                          <MenuItem classes={{ selected: classes.selected }} value={m.VILLAGE_CODE}>{m.VILLAGE_NAME}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </ThemeProvider>}
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={2} md={2} justify="center">
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">အနီးဆုံးဆေးခန်းအမည်</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={clinicSelect}
                      onChange={clinicHandle}
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
                      {clinicList.length && clinicList.map((m) => (
                        <MenuItem classes={{ selected: classes.selected }} value={m.CLN_ID}>{m.CLN_NAME}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
              </ThemeProvider>
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={2} md={2} justify="center">
                  <CustomUnicefTextField
                    type="number"
                    variantText="filled"
                    inputProps={{ step: "1", min: 0 }}
                    InputLabelProps={{
                      style: { color: '#482642', textAlign: 'center' },
                      shrink: true
                    }}
                    label={<Grid row container><Typography color="#482642">အိမ်နှင့်ဆေးခန်း အကွာအဝေး(မိုင်)</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDDML: e.target.value }) }}
                    value={mommy.MDDML} />
                </Grid>
              </ThemeProvider>
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={2} md={2} justify="center">
                  <CustomUnicefTextField
                    type="number"
                    variantText="filled"
                    inputProps={{ step: "1", min: 0, max: 72 }}
                    InputLabelProps={{
                      style: { color: '#482642', textAlign: 'center' },
                      shrink: true
                    }}
                    label={<Grid row container><Typography color="#482642">အိမ်နှင့်ဆေးခန်း အကွာအဝေး(နာရီ)</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                    style={{ width: '90%' }}
                    onChange={e => { (e.target.value.length > 2) ? setMommy({ ...mommy, MDDH: (e.target.value).slice(0, 2) }) : setMommy({ ...mommy, MDDH: e.target.value }) }}
                    value={mommy.MDDH} />
                </Grid>
              </ThemeProvider>
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={2} md={2} justify="center">
                  <CustomUnicefTextField
                    type="number"
                    variantText="filled"
                    inputProps={{ step: "1", min: 0, max: 59 }}
                    InputLabelProps={{
                      style: { color: '#482642', textAlign: 'center' },
                      shrink: true
                    }}
                    label={<Grid row container><Typography color="#482642">အိမ်နှင့်ဆေးခန်း အကွာအဝေး(မိနစ်)</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                    style={{ width: '95%' }}
                    onChange={e => { (e.target.value.length > 2) ? setMommy({ ...mommy, MDDMIN: (e.target.value).slice(0, 2) }) : setMommy({ ...mommy, MDDMIN: e.target.value }) }}
                    value={mommy.MDDMIN} />
                </Grid>
              </ThemeProvider>
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">လူနာကိုသယ်ယူပို့ဆောင်သောနည်းလမ်း</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={way}
                      onChange={wayHandle}
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
                      <MenuItem classes={{ selected: classes.selected }} value={'1'}>လမ်းလျှောက်</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'2'}>ဆိုင်ကယ်</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'3'}>ထော်လာဂျီ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'4'}>ကားဖြင့်</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'5'}>အခြား</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </ThemeProvider>
              {way === '5' ?
                <ThemeProvider theme={radioTheme}>
                  <Grid item xs={12} sm={2} md={2} justify="center">
                    <CustomUnicefTextField
                      id="filled-basic"
                      label="အခြားနည်းလမ်း"
                      variantText="filled"
                      style={{ width: '90%' }}
                      onChange={e => { setMommy({ ...mommy, MDTRO: e.target.value }) }}
                      value={mommy.MDTRO} />
                  </Grid>
                </ThemeProvider> : null}
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={2} md={2} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label={<Grid row container><Typography color="#482642">သေဆုံးသူအမည်</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                    variantText="filled"
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDNAME: e.target.value }) }}
                    value={mommy.MDNAME} />
                </Grid>
              </ThemeProvider>
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={2} md={2} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label={<Grid row container><Typography color="#482642">လူမျိုး</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                    variantText="filled"
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDETH: e.target.value }) }}
                    value={mommy.MDETH} />
                </Grid>
              </ThemeProvider>
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={2} md={2} justify="center">
                  <CustomUnicefTextField
                    type="number"
                    variantText="filled"
                    inputProps={{ step: "1", min: 0, max: 99 }}
                    InputLabelProps={{
                      style: { color: '#482642', textAlign: 'center' },
                      shrink: true
                    }}
                    label={<Grid row container><Typography color="#482642">အသက်</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                    style={{ width: '90%' }}
                    onChange={e => { (e.target.value.length > 2) ? setMommy({ ...mommy, MDAGE: (e.target.value).slice(0, 2) }) : setMommy({ ...mommy, MDAGE: e.target.value }) }}
                    value={mommy.MDAGE} />
                </Grid>
              </ThemeProvider>
            </Grid>
          </AccordionDetails>
        </ThemeProvider>

      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          className={classes.heading}>
          <Grid row container>
            <Typography className={classes.title}>၃။ သေဆုံးခြင်းဆိုင်ရာ အချက်အလက်များ</Typography>
            <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography>
          </Grid>
        </AccordionSummary>
        <ThemeProvider theme={radioTheme}>
          <AccordionDetails className={classes.detail} style={{ display: 'flex', flexDirection: 'column' }}>
            <FormControl component="fieldset" style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}>
              <RadioGroup
                aria-label="gender"
                name="gender1"

                onChange={e => { setDRadio(e.target.value) }}
                value={dRadio}
                row={true}>
                <FormControlLabel
                  value="1"
                  labelPlacement="left"
                  label="၁။ ကလေး မမွေးခင် မိခင်သေဆုံးခြင်း"
                  control={<Radio size="small" color="primary"
                    onClick={dRadioHandle} onKeyDown={e => e.key === 'Enter' && dRadioHandle(e)} />} />
                <FormControlLabel
                  value="2"
                  labelPlacement="left"
                  control={<Radio size="small" color="primary"
                    onClick={dRadioHandle} onKeyDown={e => e.key === 'Enter' && dRadioHandle(e)} />}
                  label="၂။ မွေးဖွားနေစဉ်ကာလအတွင်း သေဆုံးခြင်း" />
                <FormControlLabel
                  value="3"
                  labelPlacement="left"
                  label="၃။ မွေးဖွားပြီး/ ကိုယ်ဝန်ပျက်ကျပြီး သေဆုံးခြင်း"
                  control={<Radio size="small" color="primary"
                    onClick={dRadioHandle} onKeyDown={e => e.key === 'Enter' && dRadioHandle(e)} />} />
              </RadioGroup>
            </FormControl>
            {dRadio === '1' ?
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={4} md={4} justify="center">
                  <CustomUnicefTextField
                    type="number"
                    variantText="filled"
                    inputProps={{ step: "1", min: 0, max: 40 }}
                    disabled={mommy.MDANM !== ''}
                    InputLabelProps={{
                      style: { color: '#482642', textAlign: 'center' },
                      shrink: true
                    }}
                    label={<Grid row container><Typography color="#482642">ကလေး မမွေးခင် မိခင်သေဆုံးခြင်း (ပတ်) </Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                    style={{ marginTop: '10px', width: '100%' }}
                    onChange={e => { (e.target.value.length > 2) ? setMommy({ ...mommy, MDANW: (e.target.value).slice(0, 2) }) : setMommy({ ...mommy, MDANW: e.target.value }) }}
                    value={mommy.MDANW} />
                </Grid>
                <Grid item xs={12} sm={4} md={4} justify="center">
                  <CustomUnicefTextField
                    type="number"
                    variantText="filled"
                    disabled={mommy.MDANW !== ''}
                    inputProps={{ step: "1", min: 0, max: 10 }}
                    InputLabelProps={{
                      style: { color: '#482642', textAlign: 'center' },
                      shrink: true
                    }}
                    label={<Grid row container><Typography color="#482642">ကလေး မမွေးခင် မိခင်သေဆုံးခြင်း (လ)</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                    style={{ marginTop: '10px', width: '100%' }}
                    onChange={e => { (e.target.value.length > 2) ? setMommy({ ...mommy, MDANM: (e.target.value).slice(0, 2) }) : setMommy({ ...mommy, MDANM: e.target.value }) }}
                    value={mommy.MDANM}
                  />
                </Grid>
              </Grid> : null}
            {dRadio === '3' ?
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={4} md={4} justify="center">
                  <CustomUnicefTextField
                    type="number"
                    variantText="filled"
                    disabled={mommy.MDPND !== ''}
                    inputProps={{ step: "1", min: 0, max: 24 }}
                    InputLabelProps={{
                      style: { color: '#482642', textAlign: 'center' },
                      shrink: true
                    }}
                    label={<Grid row container><Typography color="#482642">မွေးဖွားပြီး/ ကိုယ်ဝန်ပျက်ကျပြီး သေဆုံးခြင်း (နာရီ) </Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                    style={{ marginTop: '10px', width: '100%' }}
                    onChange={e => { (e.target.value.length > 2) ? setMommy({ ...mommy, MDPNH: (e.target.value).slice(0, 2) }) : setMommy({ ...mommy, MDPNH: e.target.value }) }}
                    value={mommy.MDPNH}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} justify="center">
                  <CustomUnicefTextField
                    type="number"
                    variantText="filled"
                    disabled={mommy.MDPNH !== ''}
                    inputProps={{ step: "1", min: 0, max: 30 }}
                    InputLabelProps={{
                      style: { color: '#482642', textAlign: 'center' },
                      shrink: true
                    }}
                    label={<Grid row container><Typography color="#482642">မွေးဖွားပြီး/ ကိုယ်ဝန်ပျက်ကျပြီး သေဆုံးခြင်း (ရက်) </Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                    style={{ marginTop: '10px', width: '100%' }}
                    onChange={e => { (e.target.value.length > 2) ? setMommy({ ...mommy, MDPND: (e.target.value).slice(0, 2) }) : setMommy({ ...mommy, MDPND: e.target.value }) }}
                    value={mommy.MDPND}
                  />
                </Grid>
              </Grid> : null}
          </AccordionDetails>
        </ThemeProvider>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
          className={classes.heading}>
          <Typography className={classes.title}>၄။ ကိုယ်ဝန်ဆောင်စဉ်ကာလတွင်း အချက်အလက်များ</Typography>
        </AccordionSummary>
        <ThemeProvider theme={radioTheme}>
          <AccordionDetails className={classes.detail}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={2} md={2} justify="center">
                <CustomUnicefTextField
                  type="number"
                  variantText="filled"
                  inputProps={{ step: "1", min: 0, max: 10 }}
                  InputLabelProps={{
                    style: { color: '#482642', textAlign: 'center' },
                    shrink: true
                  }}
                  label={<Grid row container><Typography color="#482642" variant='body2'>ကိုယ်ဝန်ဆောင်ကြိမ်</Typography>
                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography>
                  </Grid>}
                  style={{ marginTop: '10px', width: '100%' }}
                  onChange={e => { (e.target.value.length > 2) ? setMommy({ ...mommy, MDG: (e.target.value).slice(0, 2) }) : setMommy({ ...mommy, MDG: e.target.value }) }}
                  value={mommy.MDG} />
              </Grid>

              <Grid item xs={12} sm={2} md={2} justify="center">
                <CustomUnicefTextField
                  type="number"
                  variantText="filled"
                  inputProps={{ step: "1", min: 0, max: 10 }}
                  InputLabelProps={{
                    style: { color: '#482642', textAlign: 'center' },
                    shrink: true
                  }}
                  label={<Grid row container><Typography color="#482642" variant='body2'>မွေးဖွားကြိမ်</Typography>
                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography>
                  </Grid>}
                  style={{ marginTop: '10px', width: '100%' }}
                  onChange={e => { (e.target.value.length > 2) ? setMommy({ ...mommy, MDP: (e.target.value).slice(0, 2) }) : setMommy({ ...mommy, MDP: e.target.value }) }}
                  value={mommy.MDP} />
              </Grid>
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={2} md={2} justify="center">
                  <CustomUnicefTextField
                    type="number"
                    variantText="filled"
                    inputProps={{ step: "1", min: 0, max: 10 }}
                    InputLabelProps={{
                      style: { color: '#482642', textAlign: 'center' },
                      shrink: true
                    }}
                    label={<Grid row container><Typography color="#482642" variant='body2'>ကိုယ်ဝန်ပျက်ကြိမ်</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography>
                    </Grid>}
                    style={{ marginTop: '10px', width: '100%' }}
                    onChange={e => { (e.target.value.length > 2) ? setMommy({ ...mommy, MDA: (e.target.value).slice(0, 2) }) : setMommy({ ...mommy, MDA: e.target.value }) }}
                    value={mommy.MDA} />
                </Grid>
              </ThemeProvider>

              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <CustomUnicefTextField
                    type="number"
                    variantText="filled"
                    inputProps={{ step: "1", min: 0, max: 10 }}
                    InputLabelProps={{
                      style: { color: '#482642', textAlign: 'center' },
                      shrink: true
                    }}
                    label={<Grid row container><Typography color="#482642" variant='body2'>ကိုယ်ဝန်ဆောင်စောင့်ရှောက်မှုခံယူသောအကြိမ်ရေ</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography>
                    </Grid>}
                    style={{ marginTop: '10px', width: '97%' }}
                    onChange={e => { (e.target.value.length > 2) ? setMommy({ ...mommy, MDANVT: (e.target.value).slice(0, 2) }) : setMommy({ ...mommy, MDANVT: e.target.value }) }}
                    value={mommy.MDANVT} />
                </Grid>
              </ThemeProvider>

              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={3} md={3} justify="center" style={{ marginTop: '9px' }}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642" variant='body2'>ANC Visits</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography>
                    </Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={ancVisit}
                      onChange={ancVisitHandle}
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
                      {anc.map((m) => (
                        <MenuItem classes={{ selected: classes.selected }} value={m.value}>{m.name}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
              </ThemeProvider>

            </Grid>

          </AccordionDetails>
        </ThemeProvider>

      </Accordion>

      {(ancVisit === '1' || ancVisit === '2' || ancVisit === '3' || ancVisit === '4' || ancVisit === '5') ?
        <Accordion expanded={expanded === '1'} onChange={handleChange('1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="visit1bh-content"
            id="visit1bh-header"
            className={classes.heading}>
            <Typography className={classes.subtitle}>ANC Visit - 1</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.detail}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={3} md={3} justify="center">
                <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">ဝန်ဆောင်မှုပေးခဲ့သူ၏ ရာထူး</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={ancVisit1}
                      onChange={ancVisit1Handle}
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
                      <MenuItem classes={{ selected: classes.selected }} value={'1'}>MCHW</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'2'}>EmOC</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'3'}>Medic</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'4'}>CHW</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'5'}>TTBA</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'6'}>ဆရာဝန်</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'7'}>သူနာပြု/ သားဖွားဆရာမ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'8'}>အရံသားဖွားဆရာမ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'9'}>အခြား</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'10'}>မသိ/ မမှတ်မိပါ</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>

              </Grid>
              {(ancVisit1 === '9' && !ancVisit === '99') ?
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label="အခြား"
                    variantText="filled"
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDANPVO: e.target.value }) }}
                    value={mommy.MDANPVO} />
                </Grid> : null}
              <Grid item xs={12} sm={3} md={3} justify="center">
                <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">ဝန်ဆောင်မှုရယူခဲ့သော နေရာ</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={ancVisit11}
                      onChange={ancVisit11Handle}
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
                      <MenuItem classes={{ selected: classes.selected }} value={'1'}>အိမ်</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'2'}>တိုင်းရင်းသားကျန်းမာရေးအဖွဲ့အစည်းဆေးခန်း</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'3'}>ကျေးလက်ကျန်းမာရေးဌာန</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'4'}>ပုဂ္ဂလိကဆေးခန်း</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'5'}>တိုက်နယ်ဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'6'}>မြို့နယ်ဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'7'}>တိုင်းရင်းသားကျန်းမာရေးအဖွဲ့အစည်းများဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'8'}>ပုဂ္ဂလိကဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'9'}>အခြား</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'10'}>မသိ/ မမှတ်မိပါ</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>

              </Grid>
              {(ancVisit11 === '9' && !ancVisit === '99') ?
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label="အခြား"
                    variantText="filled"
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDANPPO: e.target.value }) }}
                    value={mommy.MDANPPO} />
                </Grid> : null}

            </Grid>
          </AccordionDetails>
        </Accordion> : null}

      {(ancVisit === '2' || ancVisit === '3' || ancVisit === '4' || ancVisit === '5') ?
        <Accordion expanded={expanded === '2'} onChange={handleChange('2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="visit2bh-content"
            id="visit2bh-header"
            className={classes.heading}>
            <Typography className={classes.subtitle}>ANC Visit - 2</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.detail}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={3} md={3} justify="center">
                <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      {<Grid row container><Typography color="#482642">ဝန်ဆောင်မှုပေးခဲ့သူ၏ ရာထူး</Typography>
                        <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={ancVisit2}
                      onChange={ancVisit2Handle}
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
                      <MenuItem classes={{ selected: classes.selected }} value={'1'}>MCHW</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'2'}>EmOC</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'3'}>Medic</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'4'}>CHW</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'5'}>TTBA</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'6'}>ဆရာဝန်</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'7'}>သူနာပြု/ သားဖွားဆရာမ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'8'}>အရံသားဖွားဆရာမ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'9'}>အခြား</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'10'}>မသိ/ မမှတ်မိပါ</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>

              </Grid>
              {(ancVisit2 === '9' && !ancVisit === '99') ?
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label="အခြား"
                    variantText="filled"
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDANPV2O: e.target.value }) }}
                    value={mommy.MDANPV2O} />
                </Grid> : null}
              <Grid item xs={12} sm={3} md={3} justify="center">
                <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-filled-label"> {<Grid row container><Typography color="#482642">ဝန်ဆောင်မှုရယူခဲ့သော နေရာ</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={ancVisit21}
                      onChange={ancVisit21Handle}
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
                      <MenuItem classes={{ selected: classes.selected }} value={'1'}>အိမ်</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'2'}>တိုင်းရင်းသားကျန်းမာရေးအဖွဲ့အစည်းဆေးခန်း</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'3'}>ကျေးလက်ကျန်းမာရေးဌာန</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'4'}>ပုဂ္ဂလိကဆေးခန်း</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'5'}>တိုက်နယ်ဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'6'}>မြို့နယ်ဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'7'}>တိုင်းရင်းသားကျန်းမာရေးအဖွဲ့အစည်းများဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'8'}>ပုဂ္ဂလိကဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'9'}>အခြား</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'10'}>မသိ/ မမှတ်မိပါ</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>

              </Grid>
              {(ancVisit21 === '9' && !ancVisit === '99') ?
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label="အခြား"
                    variantText="filled"
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDANPP2O: e.target.value }) }}
                    value={mommy.MDANPP2O} />
                </Grid> : null}

            </Grid>
          </AccordionDetails>
        </Accordion> : null}

      {(ancVisit === '3' || ancVisit === '4' || ancVisit === '5') ?
        <Accordion expanded={expanded === '3'} onChange={handleChange('3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="visit3bh-content"
            id="visit3bh-header"
            className={classes.heading}>
            <Typography className={classes.subtitle}>ANC Visit - 3</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.detail}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={3} md={3} justify="center">
                <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">ဝန်ဆောင်မှုပေးခဲ့သူ၏ ရာထူး</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={ancVisit3}
                      onChange={ancVisit3Handle}
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
                      <MenuItem classes={{ selected: classes.selected }} value={'1'}>MCHW</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'2'}>EmOC</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'3'}>Medic</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'4'}>CHW</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'5'}>TTBA</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'6'}>ဆရာဝန်</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'7'}>သူနာပြု/ သားဖွားဆရာမ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'8'}>အရံသားဖွားဆရာမ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'9'}>အခြား</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'10'}>မသိ/ မမှတ်မိပါ</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>

              </Grid>
              {(ancVisit3 === '9' && !ancVisit === '99') ?
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label="အခြား"
                    variantText="filled"
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDANPV3O: e.target.value }) }}
                    value={mommy.MDANPV3O} />
                </Grid> : null}
              <Grid item xs={12} sm={3} md={3} justify="center">
                <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-filled-label"> {<Grid row container><Typography color="#482642">ဝန်ဆောင်မှုရယူခဲ့သော နေရာ</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={ancVisit31}
                      onChange={ancVisit31Handle}
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
                      <MenuItem classes={{ selected: classes.selected }} value={'1'}>အိမ်</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'2'}>တိုင်းရင်းသားကျန်းမာရေးအဖွဲ့အစည်းဆေးခန်း</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'3'}>ကျေးလက်ကျန်းမာရေးဌာန</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'4'}>ပုဂ္ဂလိကဆေးခန်း</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'5'}>တိုက်နယ်ဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'6'}>မြို့နယ်ဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'7'}>တိုင်းရင်းသားကျန်းမာရေးအဖွဲ့အစည်းများဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'8'}>ပုဂ္ဂလိကဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'9'}>အခြား</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'10'}>မသိ/ မမှတ်မိပါ</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>

              </Grid>
              {(ancVisit31 === '9' && !ancVisit === '99') ?
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label="အခြား"
                    variantText="filled"
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDANPP3O: e.target.value }) }}
                    value={mommy.MDANPP3O} />
                </Grid> : null}

            </Grid>
          </AccordionDetails>
        </Accordion> : null}

      {(ancVisit === '4' || ancVisit === '5') ?
        <Accordion expanded={expanded === '4'} onChange={handleChange('4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="visit4bh-content"
            id="visit4bh-header"
            className={classes.heading}>
            <Typography className={classes.subtitle}>ANC Visit - 4</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.detail}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={3} md={3} justify="center">
                <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">ဝန်ဆောင်မှုပေးခဲ့သူ၏ ရာထူး</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={ancVisit4}
                      onChange={ancVisit4Handle}
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
                      <MenuItem classes={{ selected: classes.selected }} value={'1'}>MCHW</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'2'}>EmOC</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'3'}>Medic</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'4'}>CHW</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'5'}>TTBA</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'6'}>ဆရာဝန်</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'7'}>သူနာပြု/ သားဖွားဆရာမ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'8'}>အရံသားဖွားဆရာမ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'9'}>အခြား</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'10'}>မသိ/ မမှတ်မိပါ</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>

              </Grid>
              {(ancVisit4 === '9' && !ancVisit === '99') ?
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label="အခြား"
                    variantText="filled"
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDANPV4O: e.target.value }) }}
                    value={mommy.MDANPV4O} />
                </Grid> : null}
              <Grid item xs={12} sm={3} md={3} justify="center">
                <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-filled-label"> {<Grid row container><Typography color="#482642">ဝန်ဆောင်မှုရယူခဲ့သော နေရာ</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={ancVisit41}
                      onChange={ancVisit41Handle}
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
                      <MenuItem classes={{ selected: classes.selected }} value={'1'}>အိမ်</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'2'}>တိုင်းရင်းသားကျန်းမာရေးအဖွဲ့အစည်းဆေးခန်း</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'3'}>ကျေးလက်ကျန်းမာရေးဌာန</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'4'}>ပုဂ္ဂလိကဆေးခန်း</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'5'}>တိုက်နယ်ဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'6'}>မြို့နယ်ဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'7'}>တိုင်းရင်းသားကျန်းမာရေးအဖွဲ့အစည်းများဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'8'}>ပုဂ္ဂလိကဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'9'}>အခြား</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'10'}>မသိ/ မမှတ်မိပါ</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>

              </Grid>
              {(ancVisit41 === '9' && !ancVisit === '99') ?
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label="အခြား"
                    variantText="filled"
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDANPP4O: e.target.value }) }}
                    value={mommy.MDANPP4O} />
                </Grid> : null}

            </Grid>
          </AccordionDetails>
        </Accordion> : null}

      {(ancVisit === '5') ?
        <Accordion expanded={expanded === '5'} onChange={handleChange('5')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="visit5bh-content"
            id="visit5bh-header"
            className={classes.heading}>
            <Typography className={classes.subtitle}>ANC Visit - 5</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.detail}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={3} md={3} justify="center">
                <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">ဝန်ဆောင်မှုပေးခဲ့သူ၏ ရာထူး</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={ancVisit5}
                      onChange={ancVisit5Handle}
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
                      <MenuItem classes={{ selected: classes.selected }} value={'1'}>MCHW</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'2'}>EmOC</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'3'}>Medic</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'4'}>CHW</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'5'}>TTBA</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'6'}>ဆရာဝန်</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'7'}>သူနာပြု/ သားဖွားဆရာမ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'8'}>အရံသားဖွားဆရာမ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'9'}>အခြား</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'10'}>မသိ/ မမှတ်မိပါ</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>

              </Grid>
              {(ancVisit5 === '9' && !ancVisit === '99') ?
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label="အခြား"
                    variantText="filled"
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDANPV5O: e.target.value }) }}
                    value={mommy.MDANPV5O} />
                </Grid> : null}
              <Grid item xs={12} sm={3} md={3} justify="center">
                <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                    <InputLabel id="demo-simple-select-filled-label"> {<Grid row container><Typography color="#482642">ဝန်ဆောင်မှုရယူခဲ့သော နေရာ</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={ancVisit51}
                      onChange={ancVisit51Handle}
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
                      <MenuItem classes={{ selected: classes.selected }} value={'1'}>အိမ်</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'2'}>တိုင်းရင်းသားကျန်းမာရေးအဖွဲ့အစည်းဆေးခန်း</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'3'}>ကျေးလက်ကျန်းမာရေးဌာန</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'4'}>ပုဂ္ဂလိကဆေးခန်း</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'5'}>တိုက်နယ်ဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'6'}>မြို့နယ်ဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'7'}>တိုင်းရင်းသားကျန်းမာရေးအဖွဲ့အစည်းများဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'8'}>ပုဂ္ဂလိကဆေးရုံ</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'9'}>အခြား</MenuItem>
                      <MenuItem classes={{ selected: classes.selected }} value={'10'}>မသိ/ မမှတ်မိပါ</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>

              </Grid>
              {(ancVisit51 === '9' && !ancVisit === '99') ?
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label="အခြား"
                    variantText="filled"
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDANPP5O: e.target.value }) }}
                    value={mommy.MDANPP5O} />
                </Grid> : null}

            </Grid>
          </AccordionDetails>
        </Accordion> : null}


      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
          className={classes.heading}>
          <Typography className={classes.title}>၅။ ကိုယ်ဝန်ဆောင်စဉ်ကာလအတွင်း တွေ့ရှိခဲ့သော ဖြစ်နိုင်ချေ အန္တရာယ်လက္ခဏာများ</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.detail}>
          <Grid container spacing={1} alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={9} md={9} justify="center">
              <ThemeProvider theme={radioTheme}>
                <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                  <InputLabel id="demo-simple-select-filled-label">ကိုယ်ဝန်ဆောင်စဉ်ကာလအတွင်းတွေ့ရှိခဲ့သောဖြစ်နိုင်ချေအန္တရာယ်လက္ခဏာများ</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    multiple
                    value={symp}
                    onChange={sympHandle}
                    renderValue={
                      (symp) =>
                        symptom.filter(symptom => symp.includes(symptom.value)).map(record => record.name).join(", ")}
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
                    {symptom.map((m) => (
                      <MenuItem classes={{ selected: classes.selected }} value={m.value}>{m.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </ThemeProvider>

            </Grid>
            {symp.includes('11') ?
              <Grid item xs={12} sm={3} md={3} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  label="အခြား"
                  variantText="filled"
                  style={{ width: '90%' }}
                  onChange={e => { setMommy({ ...mommy, MDRISKO: e.target.value }) }}
                  value={mommy.MDRISKO} />
              </Grid> : null}
          </Grid>

        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
          className={classes.heading}>
          <Typography className={classes.title}>၆။ မွေးဖွားနေစဉ်ကာလ အချက်အလက်များ</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.detail}>
          <Grid container spacing={1} alignItems="center" justifyContent="center">
            {(dRadio === '2' || dRadio === '3') ?
              <Grid item xs={12} sm={4} md={4} justify="center">
                <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">ဝန်ဆောင်မှုပေးခဲ့သူ၏ ရာထူး</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={dPosition}
                      onChange={dPositionHandle}
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
                      {duringPosition.map((m) => (
                        <MenuItem classes={{ selected: classes.selected }} value={m.value}>{m.name}</MenuItem>))}
                    </Select>
                  </FormControl>
                </ThemeProvider>

              </Grid> : null}

            {(dPosition.includes('9')) ?
              <Grid item xs={12} sm={2} md={2} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  label="အခြား"
                  variantText="filled"
                  style={{ width: '90%' }}
                  onChange={e => { setMommy({ ...mommy, MDDPVO: e.target.value }) }}
                  value={mommy.MDDPVO} />
              </Grid> : null}
            {(dRadio === '2' || dRadio === '3') ?
              <Grid item xs={12} sm={4} md={4} justify="center">
                <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%' }}>
                    <InputLabel id="demo-simple-select-filled-label"> {<Grid row container><Typography color="#482642">ဝန်ဆောင်မှုရယူခဲ့သော နေရာ</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={dPlace}
                      onChange={dPlaceHandle}
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
                      {duringPlace.map((m) => (
                        <MenuItem classes={{ selected: classes.selected }} value={m.value}>{m.name}</MenuItem>))}
                    </Select>
                  </FormControl>
                </ThemeProvider>

              </Grid> : null}

            {(dPlace.includes('9')) ?
              <Grid item xs={12} sm={2} md={2} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  label="အခြား"
                  variantText="filled"
                  style={{ width: '90%' }}
                  onChange={e => { setMommy({ ...mommy, MDDPPO: e.target.value }) }}
                  value={mommy.MDDPPO} />
              </Grid> : null}
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
          className={classes.heading}>
          <Typography className={classes.title}>၇။ မီးဖွားပြီးနောက်ကာလ အချက်အလက်များ</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.detail}>
          <Grid container spacing={1} alignItems="center" justifyContent="center">
            {(dRadio === '3') ?
              <Grid item xs={12} sm={4} md={4} justify="center">
                <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">ဝန်ဆောင်မှုပေးခဲ့သူ၏ ရာထူး</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={aPosition}
                      onChange={aPositionHandle}
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
                      {afterPosition.map((m) => (
                        <MenuItem classes={{ selected: classes.selected }} value={m.value}>{m.name}</MenuItem>))}
                    </Select>
                  </FormControl>
                </ThemeProvider>

              </Grid> : null}

            {(aPosition.includes('9')) ?
              <Grid item xs={12} sm={2} md={2} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  label="အခြား"
                  variantText="filled"
                  style={{ width: '90%' }}
                  onChange={e => { setMommy({ ...mommy, MDPNPVO: e.target.value }) }}
                  value={mommy.MDPNPVO} />
              </Grid> : null}
            {(dRadio === '3') ?
              <Grid item xs={12} sm={4} md={4} justify="center">
                <ThemeProvider theme={radioTheme}>
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">ဝန်ဆောင်မှုရယူခဲ့သော နေရာ</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={aPlace}
                      onChange={aPlaceHandle}
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
                      {afterPlace.map((m) => (
                        <MenuItem classes={{ selected: classes.selected }} value={m.value}>{m.name}</MenuItem>))}
                    </Select>
                  </FormControl>
                </ThemeProvider>

              </Grid> : null}

            {(aPlace.includes('9')) ?
              <Grid item xs={12} sm={2} md={2} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  label="အခြား"
                  variantText="filled"
                  style={{ width: '90%' }}
                  onChange={e => { setMommy({ ...mommy, MDPNPPO: e.target.value }) }}
                  value={mommy.MDPNPPO} />
              </Grid> : null}
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8bh-content"
          id="panel8bh-header"
          className={classes.heading}>
          <Typography className={classes.title}>၈။ သေဆုံးရသည့် အကြောင်းအရင်း</Typography>
        </AccordionSummary>

        <AccordionDetails className={classes.detail}>
          <Grid container spacing={1} alignItems="center" justifyContent="center">

            <Grid item xs={12} sm={4} md={4} justify="center">
              <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-filled-label">ကိုယ်ဝန်နှင့်တိုက်ရိုက်သက်ဆိုင်သောအကြောင်းအရင်း</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  multiple
                  value={deathReason1}
                  onChange={deathReason1Handle}
                  renderValue={
                    (deathReason1) =>
                      reason1.filter(reason1 => deathReason1.includes(reason1.value)).map(record => record.name).join(", ")}
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
                  {reason1.map((m) => (
                    <MenuItem classes={{ selected: classes.selected }} value={m.value}>{m.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>

            {deathReason1.includes('6') ?
              <Grid item xs={12} sm={2} md={2} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  label="အခြား"
                  variantText="filled"
                  style={{ width: '90%' }}
                  onChange={e => { setMommy({ ...mommy, MDRDO: e.target.value }) }}
                  value={mommy.MDRDO} />
              </Grid> : null}

            <Grid item xs={12} sm={4} md={4} justify="center">
              <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-filled-label">ကိုယ်ဝန်နှင့်သွယ်ဝိုက်သက်ဆိုင်သောအကြောင်းအရင်း</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  multiple
                  value={deathReason2}
                  onChange={deathReason2Handle}
                  renderValue={
                    (deathReason2) =>
                      reason2.filter(reason2 => deathReason2.includes(reason2.value)).map(record => record.name).join(", ")}
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
                  {reason2.map((m) => (
                    <MenuItem classes={{ selected: classes.selected }} value={m.value}>{m.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>

            {deathReason2.includes('7') ?
              <Grid item xs={12} sm={2} md={2} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  label="အခြား"
                  variantText="filled"
                  style={{ width: '90%' }}
                  onChange={e => { setMommy({ ...mommy, MDRIDO: e.target.value }) }}
                  value={mommy.MDRIDO} />
              </Grid> : null}
          </Grid>

        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel9bh-content"
          id="panel9bh-header"
          className={classes.heading}>
          <Typography className={classes.title}>၉။ သေဆုံးသော နေရာ</Typography>
        </AccordionSummary>
        <ThemeProvider theme={radioTheme}>
          <AccordionDetails className={classes.detail} style={{ display: 'flex', flexDirection: 'column' }}>
            <FormControl component="fieldset" style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                onChange={e => { setDPlaceRadio(e.target.value) }}
                value={dPlaceRadio}
                row={true}>
                <FormControlLabel
                  value="1"
                  labelPlacement="left"
                  label="၁။ နေအိမ်တွင်သေဆုံးခြင်း"
                  control={<Radio size="small" color="primary"
                    onClick={dPlaceRadioHandle} onKeyDown={e => e.key === 'Enter' && dPlaceRadioHandle(e)} />} />
                <FormControlLabel
                  value="2"
                  labelPlacement="left"
                  control={<Radio size="small" color="primary"
                    onClick={dPlaceRadioHandle} onKeyDown={e => e.key === 'Enter' && dPlaceRadioHandle(e)} />}
                  label="၂။ လမ်းပေါ်တွင်သေဆုံးခြင်း" />
                <FormControlLabel
                  value="3"
                  labelPlacement="left"
                  label="၃။ ကျန်းမာရေးဌာနတွင်သေဆုံးခြင်း"
                  control={<Radio size="small" color="primary"
                    onClick={dPlaceRadioHandle} onKeyDown={e => e.key === 'Enter' && dPlaceRadioHandle(e)} />} />
                <FormControlLabel
                  value="4"
                  labelPlacement="left"
                  label="၄။ ထပ်မံလွှဲပြောင်းသော ကျန်းမာရေးဌာနတွင်သေဆုံးခြင်း"
                  control={<Radio size="small" color="primary"
                    onClick={dPlaceRadioHandle} onKeyDown={e => e.key === 'Enter' && dPlaceRadioHandle(e)} />} />
              </RadioGroup>
            </FormControl>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={3} md={3} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  type='time'
                  label={<Grid row container><Typography color="#482642">သေဆုံးသည့်အချိန်</Typography>
                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                  variantText="filled"
                  InputLabelProps={{
                    style: { color: '#482642' },
                    shrink: true
                  }}
                  style={{ width: '90%' }}
                  onChange={e => { setMommy({ ...mommy, MDDT: (e.target.value) }) }}
                  value={mommy.MDDT} />
              </Grid>
              <Grid item xs={12} sm={3} md={3} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  type='date'
                  label={<Grid row container><Typography color="#482642">သေဆုံးသည့်နေ့စွဲ</Typography>
                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                  variantText="filled"
                  InputLabelProps={{
                    style: { color: '#482642' },
                    shrink: true
                  }}
                  style={{ width: '90%' }}
                  onChange={e => { setMommy({ ...mommy, MDDD: (e.target.value) }) }}
                  value={mommy.MDDD} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  label="သေဆုံးမှု ဖြစ်စဉ် အကျဉ်းချုပ်"
                  variantText="filled"
                  style={{ width: '90%' }}
                  onChange={e => { setMommy({ ...mommy, MDDEX: (e.target.value) }) }}
                  value={mommy.MDDEX} />
              </Grid>
            </Grid>
            {(dPlaceRadio === '3' || dPlaceRadio === '4') ?
              <Grid container spacing={1} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label={<Grid row container><Typography color="#482642">ကျန်းမာရေးဌာနအမည်</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                    variantText="filled"
                    InputLabelProps={{
                      style: { color: '#482642' },
                      shrink: true
                    }}
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDDCL: (e.target.value) }) }}
                    value={mommy.MDDCL} />
                </Grid>

                <Grid item xs={12} sm={3} md={3} justify="center">
                  <ThemeProvider theme={radioTheme}>
                    <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%' }}>
                      <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">မြို့နယ်</Typography>
                        <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={mommy.MDDTP}
                        onChange={e => { setMommy({ ...mommy, MDDTP: (e.target.value) }) }}
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
                        {deathPlaceTsp.length && deathPlaceTsp.map((m) => (
                          <MenuItem classes={{ selected: classes.selected }} value={m.TSP_ID}>{m.TSP_NAME}</MenuItem>))}

                      </Select>
                    </FormControl>
                  </ThemeProvider>
                </Grid>

                <Grid item xs={12} sm={2} md={2} justify="center">
                  <FormControl component="fieldset"
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      marginTop: '20px'
                    }}>
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      onChange={e => { setDPublicRadio(e.target.value) }}
                      value={dPublicRadio}
                      row>
                      <FormControlLabel
                        value="1"
                        labelPlacement="left"
                        label="Public"
                        control={<Radio size="small" color="primary"
                          onClick={dPublicRadioHandle} onKeyDown={e => e.key === 'Enter' && dPublicRadioHandle(e)} />} />
                      <FormControlLabel
                        value="2"
                        labelPlacement="left"
                        control={<Radio size="small" color="primary"
                          onClick={dPublicRadioHandle} onKeyDown={e => e.key === 'Enter' && dPublicRadioHandle(e)} />}
                        label="Private" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={2} md={2} justify="center" >
                  <CustomUnicefTextField
                    id="filled-basic"
                    type='time'
                    label={<Grid row container><Typography color="#482642">ဆေးရုံ၊ဆေးခန်းတင်သည့်အချိန်</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                    variantText="filled"
                    InputLabelProps={{
                      style: { color: '#482642', fontSize: '12px' },
                      shrink: true,
                    }}
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDDAT: (e.target.value) }) }}
                    value={mommy.MDDAT} />
                </Grid>
                <Grid item xs={12} sm={2} md={2} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    type='date'
                    label={<Grid row container><Typography color="#482642">ဆေးရုံ၊ဆေးခန်းတင်သည့်နေ့စွဲ</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                    variantText="filled"
                    InputLabelProps={{
                      style: { color: '#482642', fontSize: '12px' },
                      shrink: true
                    }}
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDDAD: (e.target.value) }) }}
                    value={mommy.MDDAD} />
                </Grid>
              </Grid> : null}
          </AccordionDetails>
        </ThemeProvider>
      </Accordion>


      <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel10bh-content"
          id="panel10bh-header"
          className={classes.heading}>
          <Typography className={classes.title}>၁၀။ တွေ့ရှိရသော နှောင့်နှေးခြင်းအကြောင်းအရာများ</Typography>
        </AccordionSummary>
        <ThemeProvider theme={radioTheme}>
          <AccordionDetails className={classes.detail}>
            <Grid container spacing={1} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={12} md={12} justify="center">
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={first} onChange={slowReasonHandle} name="first" />}
                      label="ပထမအဆင့် - ကျန်းမာရေးစောင့်ရှောက်မှုခံယူရန် ဆုံးဖြတ်ချက်ချမှု နှောင့်နှေးခြင်း။"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={second} onChange={slowReasonHandle} name="second" />}
                      label="ဒုတိယအဆင့် - ကျန်းမာရေးဌာနသို့ ရောက်ရှိရန် နှောင့်နှေးခြင်း။"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={third} onChange={slowReasonHandle} name="third" />}
                      label="တတိယအဆင့် - ကျန်းမာရေးဌာနတွင် သင့်လျော်သော ကျန်းမာရေးစောင့်ရှောက်မှုရရှိရန် နှောင့်နှေးခြင်း။"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              {first ?
                <>
                  <Grid item xs={12} sm={12} md={12} justify="center">
                    <CustomUnicefTextField
                      id="filled-basic"
                      label="ပထမအဆင့် - ကျန်းမာရေးစောင့်ရှောက်မှုခံယူရန် ဆုံးဖြတ်ချက်ချမှု နှောင့်နှေးခြင်း အကြောင်းအရာ (၁)"
                      variantText="filled"
                      multiline
                      InputLabelProps={{
                        style: { color: '#482642' },
                        shrink: true
                      }}
                      style={{ width: '100%', marginTop: '10px' }}
                      onChange={e => { setMommy({ ...mommy, MD1DLY1: (e.target.value) }) }}
                      value={mommy.MD1DLY1} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} justify="center">
                    <CustomUnicefTextField
                      id="filled-basic"
                      label="ပထမအဆင့် - ကျန်းမာရေးစောင့်ရှောက်မှုခံယူရန် ဆုံးဖြတ်ချက်ချမှု နှောင့်နှေးခြင်း အကြောင်းအရာ (၂)"
                      variantText="filled"
                      multiline
                      InputLabelProps={{
                        style: { color: '#482642' },
                        shrink: true
                      }}
                      style={{ width: '100%', marginTop: '10px' }}
                      onChange={e => { setMommy({ ...mommy, MD1DLY2: (e.target.value) }) }}
                      value={mommy.MD1DLY2} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} justify="center">
                    <CustomUnicefTextField
                      id="filled-basic"
                      label="ပထမအဆင့် - ကျန်းမာရေးစောင့်ရှောက်မှုခံယူရန် ဆုံးဖြတ်ချက်ချမှု နှောင့်နှေးခြင်း အကြောင်းအရာ (၃)"
                      variantText="filled"
                      multiline
                      InputLabelProps={{
                        style: { color: '#482642' },
                        shrink: true
                      }}
                      style={{ width: '100%', marginTop: '10px' }}
                      onChange={e => { setMommy({ ...mommy, MD1DLY3: (e.target.value) }) }}
                      value={mommy.MD1DLY3} />
                  </Grid>
                </>
                : null}
              {second ?
                <>
                  <Grid item xs={12} sm={12} md={12} justify="center">
                    <CustomUnicefTextField
                      id="filled-basic"
                      label="ဒုတိယအဆင့် - ကျန်းမာရေးဌာနသို့ ရောက်ရှိရန် နှောင့်နှေးခြင်းအကြောင်းအရာ (၁)"
                      variantText="filled"
                      multiline
                      InputLabelProps={{
                        style: { color: '#482642' },
                        shrink: true
                      }}
                      style={{ width: '100%', marginTop: '10px' }}
                      onChange={e => { setMommy({ ...mommy, MD2DLY1: (e.target.value) }) }}
                      value={mommy.MD2DLY1} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} justify="center">
                    <CustomUnicefTextField
                      id="filled-basic"
                      label="ဒုတိယအဆင့် - ကျန်းမာရေးဌာနသို့ ရောက်ရှိရန် နှောင့်နှေးခြင်းအကြောင်းအရာ (၂)"
                      variantText="filled"
                      multiline
                      InputLabelProps={{
                        style: { color: '#482642' },
                        shrink: true
                      }}
                      style={{ width: '100%', marginTop: '10px' }}
                      onChange={e => { setMommy({ ...mommy, MD2DLY2: (e.target.value) }) }}
                      value={mommy.MD2DLY2} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} justify="center">
                    <CustomUnicefTextField
                      id="filled-basic"
                      label="ဒုတိယအဆင့် - ကျန်းမာရေးဌာနသို့ ရောက်ရှိရန် နှောင့်နှေးခြင်းအကြောင်းအရာ (၃)"
                      variantText="filled"
                      multiline
                      InputLabelProps={{
                        style: { color: '#482642' },
                        shrink: true
                      }}
                      style={{ width: '100%', marginTop: '10px' }}
                      onChange={e => { setMommy({ ...mommy, MD2DLY3: (e.target.value) }) }}
                      value={mommy.MD2DLY3} />
                  </Grid>
                </>
                : null}
              {third ?
                <>
                  <Grid item xs={12} sm={12} md={12} justify="center">
                    <CustomUnicefTextField
                      id="filled-basic"
                      label="တတိယအဆင့် - ကျန်းမာရေးဌာနတွင် သင့်လျော်သော ကျန်းမာရေးစောင့်ရှောက်မှုရရှိရန် နှောင့်နှေးခြင်းအကြောင်းအရာ (၁)"
                      variantText="filled"
                      multiline
                      InputLabelProps={{
                        style: { color: '#482642' },
                        shrink: true
                      }}
                      style={{ width: '100%', marginTop: '10px' }}
                      onChange={e => { setMommy({ ...mommy, MD3DLY1: (e.target.value) }) }}
                      value={mommy.MD3DLY1} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} justify="center">
                    <CustomUnicefTextField
                      id="filled-basic"
                      label="တတိယအဆင့် - ကျန်းမာရေးဌာနတွင် သင့်လျော်သော ကျန်းမာရေးစောင့်ရှောက်မှုရရှိရန် နှောင့်နှေးခြင်းအကြောင်းအရာ (၂)"
                      variantText="filled"
                      multiline
                      InputLabelProps={{
                        style: { color: '#482642' },
                        shrink: true
                      }}
                      style={{ width: '100%', marginTop: '10px' }}
                      onChange={e => { setMommy({ ...mommy, MD3DLY2: (e.target.value) }) }}
                      value={mommy.MD3DLY2} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} justify="center">
                    <CustomUnicefTextField
                      id="filled-basic"
                      label="တတိယအဆင့် - ကျန်းမာရေးဌာနတွင် သင့်လျော်သော ကျန်းမာရေးစောင့်ရှောက်မှုရရှိရန် နှောင့်နှေးခြင်းအကြောင်းအရာ (၃)"
                      variantText="filled"
                      multiline
                      InputLabelProps={{
                        style: { color: '#482642' },
                        shrink: true
                      }}
                      style={{ width: '100%', marginTop: '10px' }}
                      onChange={e => { setMommy({ ...mommy, MD3DLY3: (e.target.value) }) }}
                      value={mommy.MD3DLY3} />
                  </Grid>
                </>
                : null}
              <Grid item xs={12} sm={5} md={5} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  label="ရရှိသော သင်ခန်းစာများ"
                  variantText="filled"
                  multiline
                  InputLabelProps={{
                    style: { color: '#482642' },
                    shrink: true
                  }}
                  style={{ width: '100%', marginTop: '10px' }}
                  onChange={e => { setMommy({ ...mommy, MDLL: e.target.value }) }}
                  value={mommy.MDLL} />
              </Grid>
              <Grid item xs={12} sm={7} md={7} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  label="ယခုကဲ့သို့ သေဆုံးမှု ထပ်မဖြစ်စေရန် လုပ်ဆောင်ရမည့် နည်းလမ်းများ၊ အကြံပြုချက်များ၊ ဖြေရှင်းနည်းများ"
                  variantText="filled"
                  multiline
                  InputLabelProps={{
                    style: { color: '#482642' },
                    shrink: true
                  }}
                  style={{ width: '100%', marginTop: '10px' }}
                  onChange={e => { setMommy({ ...mommy, MDSOL: e.target.value }) }}
                  value={mommy.MDSOL} />
              </Grid>
              <Grid item xs={12} sm={3} md={3} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  type='date'
                  label={<Grid row container><Typography color="#482642">စစ်ဆေးသည့် နေ့စွဲ</Typography>
                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                  variantText="filled"
                  InputLabelProps={{
                    style: { color: '#482642' },
                    shrink: true
                  }}
                  style={{ width: '100%', marginTop: '10px' }}
                  onChange={e => { setMommy({ ...mommy, MDID: e.target.value }) }}
                  value={mommy.MDID} />
              </Grid>
              <Grid item xs={12} sm={3} md={3} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  type='date'
                  label={<Grid row container><Typography color="#482642">အစီရင်ခံစာတင်သည့်နေ့စွဲ</Typography>
                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                  variantText="filled"
                  InputLabelProps={{
                    style: { color: '#482642' },
                    shrink: true
                  }}
                  style={{ width: '100%', marginTop: '10px' }}
                  onChange={e => { setMommy({ ...mommy, MDIRD: e.target.value }) }}
                  value={mommy.MDIRD} />
              </Grid>
              <Grid item xs={12} sm={3} md={3} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  label={<Grid row container><Typography color="#482642">အစီရင်ခံစာတင်သူ၏အမည်</Typography>
                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                  variantText="filled"
                  InputLabelProps={{
                    style: { color: '#482642' },
                    shrink: true
                  }}
                  style={{ width: '100%', marginTop: '10px' }}
                  onChange={e => { setMommy({ ...mommy, MDRN: e.target.value }) }}
                  value={mommy.MDRN} />
              </Grid>
              <Grid item xs={12} sm={3} md={3} justify="center">
                <CustomUnicefTextField
                  id="filled-basic"
                  label={<Grid row container><Typography color="#482642">အစီရင်ခံစာတင်သူ၏ရာထူး</Typography>
                    <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                  variantText="filled"
                  InputLabelProps={{
                    style: { color: '#482642' },
                    shrink: true
                  }}
                  style={{ width: '100%', marginTop: '10px' }}
                  onChange={e => { setMommy({ ...mommy, MDRP: e.target.value }) }}
                  value={mommy.MDRP} />
              </Grid>
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">အဖွဲ့အစည်း</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={orgSelect}
                      onChange={orgSelectHandle}
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
                      {orgList.length && orgList.map((d) => (
                        <MenuItem classes={{ selected: classes.selected }} value={d.ORG_ID}>{d.ORG_SHORTNAME}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </ThemeProvider>
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    label="ပြည်နယ်/တိုင်းဒေသကြီး"
                    variantText="filled"
                    disabled
                    value='Karen'
                    style={{ width: '90%', marginTop: '3px' }} />
                </Grid>
              </ThemeProvider>
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">မြို့နယ်</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={tspReasonSelect}
                      onChange={tspReasonHandle}
                      disabled={!townshipReasonList.length}
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
                      {townshipReasonList.length && townshipReasonList.map((m) => (
                        <MenuItem classes={{ selected: classes.selected }} value={m.TSP_ID}>{m.TSP_NAME}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
              </ThemeProvider>


              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">ကျေးရွာ</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={villageReasonSelect}
                      onChange={villageReasonHandle}
                      disabled={!villageReasonList.length || tspReasonSelect === 'OTH-TSP-001'}
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
                      {villageReasonList.length && villageReasonList.map((m) => (
                        <MenuItem classes={{ selected: classes.selected }} value={m.VILLAGE_CODE}>{m.VILLAGE_NAME}</MenuItem>
                      ))}
                      <MenuItem classes={{ selected: classes.selected }} value={'999'}>Other Village</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </ThemeProvider>
              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <FormControl variant="filled" className={classes.secondFormControl} style={{ width: '90%' }}>
                    <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">အနီးဆုံးဆေးခန်းအမည်</Typography>
                      <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={clinicReasonSelect}
                      onChange={clinicReasonHandle}
                      disabled={!clinicReasonList.length}
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
                      {clinicReasonList.length && clinicReasonList.map((m) => (
                        <MenuItem classes={{ selected: classes.selected }} value={m.CLN_ID}>{m.CLN_NAME}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
              </ThemeProvider>

              <ThemeProvider theme={radioTheme}>
                <Grid item xs={12} sm={3} md={3} justify="center">
                  <CustomUnicefTextField
                    id="filled-basic"
                    multiline
                    label="Remark"
                    variantText="filled"
                    style={{ width: '90%' }}
                    onChange={e => { setMommy({ ...mommy, MDRMK: e.target.value }) }}
                    value={mommy.MDRMK} />
                </Grid>
              </ThemeProvider>
            </Grid>
          </AccordionDetails>
        </ThemeProvider>
      </Accordion>

      <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ marginTop: '20px' }} >
        <Grid item xs={3} sm={1} md={1} justify="center">
          <Button
            variant="contained"
            style={{ background: '#DED4DA', color: '#482642', width: '90%' }}
            onClick={clear} >Clear</Button>
        </Grid>
        <Grid item xs={3} sm={1} md={1} justify="center">
          <Button
            variant="contained"
            style={{ background: '#482642', color: '#fff', width: '90%' }}
            onClick={submit} >Update</Button>
        </Grid>
      </Grid>

      {openSnack && <CustomizedSnackbars open={setSnackBarOpen} close={setSnackBarClose} alertMsg={error} type="warning" />}
      {successSnack && <CustomizedSnackbars open={setSuccessSnackBarOpen} close={setSuccessSnackBarClose} alertMsg={success} type="success" />}
    </div>
  )
}
