import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Card } from "@mui/material";
import { Button, OutlinedInput, Snackbar, SnackbarContent, Switch, TextField, Typography } from "@material-ui/core";

import CustomTextField from "../../components/controls/CustomTextFieldFilled";
import CustomUnicefTextField from '../../components/controls/CustomUnicefTextField'
import CustomSnackBar from "../../components/controls/CustomSnackBar";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import noPatientLogo from '../../images/noPatient.png'

import _ from 'lodash';

//////////////API/////////////////
import { insertRH } from "../../modals/rhinfo";
import { insertLab } from "../../modals/labinfo";
import { getMaxID } from "../../modals/maxid";

import CustomRHTable from '../../components/controls/CustomRHTable';
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

export default function RHServiceForm(props) {

    const classes = useStyles();

    const history = useHistory();

    ///////Background Data///////////
    const [loading, setLoading] = useState(false);
    const [patientData, setPatientData] = useState([])
    const [serviceTypeData, setServiceTypeData] = useState('')
    const [clinicData, setClinicData] = useState([])
    const [chosenVillageData, setChosenVillageData] = useState([])

    const [RHForm, setRHForm] = useState({
        RHREGID: '',
        RHPROVIDEDDATE: '',
        RHTYPE: '',
        RHDONOR: '',
        RHORG: '',
        RHPROJECT: '',
        RHTSP: '',
        RHPLACE: '',
        RHVILLAGE: '',
        RHPROVIDERNAME: '',
        RHPROVIDERPOSITION: '',
        RHWT: '',
        RHHT: '',
        RHBP: '',
        RHPR: '',
        RHRR: '',
        RHTEMP: '',
        RHPREG: '2',
        RHLAB: '',
        RHPAC: '999',
        RHGVB: '',
        RHDXOTHER: '',
        RHPROCEDURE: '',
        RHTX: '',
        RHOUTCOME: '999',
        RHDEATHREASON: '',
        RHREFTO: '999',
        RHREFTOOTHER: '',
        RHINSERT: '',
        RHP: '',
        RHA: '',
        RHHE: '2',
        RHAGE: '',
        RHAGEUNIT: '',
        RHTEMPUNIT: '',
        RHCLNID: '',
        RHREFREASON: '',
        RHUSRLOGIN: '',
        RHUPDATE: '',
        RHSTATUS: '',
        RHSYNC: '',
        ID: '',
        RHREMARK: '',
        RHCHEIFCOMPLAIN: '',
        RHMIGRANT: '999',
        RHIDP: '999',
        RHDSEE: '999',
        RHDHEAR: '999',
        RHDWALK: '999',
        RHDREMBR: '999',
        RHDWASH: '999',
        RHDCOMMU: '999',
        RHLACMOTHER: '999',
        RHDISABILITY: '999',
        RHVIAR: '999'
    });

    const [RHLabForm, setRHLabForm] = useState({
        LABREGID: '',
        LABPROVIDEDDATE: '',
        LABPLACE: '',
        LABVILLAGE: '',
        LABRDT: '999',
        LABMICROSCOPIC: '999',
        LABHB: '',
        LABBG: '999',
        LABRH: '999',
        LABUCG: '999',
        LABUSUGAR: '999',
        LABUPROTEIN: '999',
        LABGONO: '999',
        LABTRICHO: '999',
        LABCANDIDA: '999',
        LABRPR: '999',
        LABTPHA: '999',
        LABVDRL: '999',
        LABHIV: '999',
        LABHBV: '999',
        LABHCV: '999',
        LABSSOURCE: '',
        LABOTHER: '',
        LABRBS: '',
        LABORG: '',
        LABINSERT: '',
        LABUPDATE: '',
        LABSTATUS: '',
        LABSYNC: '',
        ID: '',
        LABTEST: '',
    });

    //////Snack Bar Handle////////////

    ///////////Radio Handle/////////////
    function RHPregHandleChange(event) {
        if (event.target.value === RHForm.RHPREG) {
            setRHForm({ ...RHForm, RHPREG: "" })
        } else {
            setRHForm({ ...RHForm, RHPREG: event.target.value })
        }
    }

    function RHTempUnitHandleChange(event) {
        if (event.target.value === RHForm.RHTEMPUNIT) {
            setRHForm({ ...RHForm, RHTEMPUNIT: "" })
        } else {
            setRHForm({ ...RHForm, RHTEMPUNIT: event.target.value })
        }
    }

    function RHVIARHandleChange(event) {

        setRHForm({ ...RHForm, RHVIAR: event.target.value })

    }

    function RHHEHandleChange(event) {
        if (event.target.value === RHForm.RHHE) {
            setRHForm({ ...RHForm, RHHE: "" })
        } else {
            setRHForm({ ...RHForm, RHHE: event.target.value })
        }
    }



    ///////LabTest///////////
    const [labTest, setLabTest] = useState(false)
    const labTestHandle = (event) => {
        setLabTest(event.target.checked);
        setRHForm({ ...RHForm, RHLAB: event.target.checked === true ? 1 : 0 })
        setRHLabForm({ ...RHLabForm, LABTEST: event.target.checked === true ? 1 : 0 })
    };

    ///////Investigation///////////
    const [RDT, setRDT] = useState('999');
    const RDTHandle = (event) => {
        setRDT(event.target.value);
        setRHLabForm({ ...RHLabForm, LABRDT: event.target.value })
    };
    const [microscopic, setMicroscopic] = useState('999');
    const microscopicHandle = (event) => {
        setMicroscopic(event.target.value);
        setRHLabForm({ ...RHLabForm, LABMICROSCOPIC: event.target.value })
    };
    const [blood, setBlood] = useState('999')
    const bloodHandle = (event) => {
        setBlood(event.target.value);
        setRHLabForm({ ...RHLabForm, LABBG: event.target.value })
    };
    const [RH, setRH] = useState('999')
    const RHHandle = (event) => {
        setRH(event.target.value);
        setRHLabForm({ ...RHLabForm, LABRH: event.target.value })
    };
    const [urineProtein, setUrineProtein] = useState('999');
    const urintProteinHandle = (event) => {
        setUrineProtein(event.target.value);
        setRHLabForm({ ...RHLabForm, LABUPROTEIN: event.target.value })
    };
    const [UCG, setUCG] = useState('999')
    const UCGHandle = (event) => {
        setUCG(event.target.value);
        setRHLabForm({ ...RHLabForm, LABUCG: event.target.value })
    };

    const [urine, setUrine] = useState('999')
    const urineHandle = (event) => {
        setUrine(event.target.value);
        setRHLabForm({ ...RHLabForm, LABUSUGAR: event.target.value })
    };

    const [gonorrhoea, setGonorrhoea] = useState('999')
    const gonorrhoeaHandle = (event) => {
        setGonorrhoea(event.target.value);
        setRHLabForm({ ...RHLabForm, LABGONO: event.target.value })
    };
    const [trichomonus, setTrichomonus] = useState('999')
    const trichomonusHandle = (event) => {
        setTrichomonus(event.target.value);
        setRHLabForm({ ...RHLabForm, LABTRICHO: event.target.value })
    };
    const [candida, setCandida] = useState('999')
    const candidaHandle = (event) => {
        setCandida(event.target.value);
        setRHLabForm({ ...RHLabForm, LABCANDIDA: event.target.value })
    };
    const [RPR, setRPR] = useState('999')
    const RPRHandle = (event) => {
        setRPR(event.target.value);
        setRHLabForm({ ...RHLabForm, LABRPR: event.target.value })
    };
    const [TPHA, setTPHA] = useState('999')
    const TPHAHandle = (event) => {
        setTPHA(event.target.value);
        setRHLabForm({ ...RHLabForm, LABTPHA: event.target.value })
    };
    const [VDRL, setVDRL] = useState('999')
    const VDRLHandle = (event) => {
        setVDRL(event.target.value);
        setRHLabForm({ ...RHLabForm, LABVDRL: event.target.value })
    };
    const [HIV, setHIV] = useState('999')
    const HIVHandle = (event) => {
        setHIV(event.target.value);
        setRHLabForm({ ...RHLabForm, LABHIV: event.target.value })
    };
    const [HBV, setHBV] = useState('999')
    const HBVHandle = (event) => {
        setHBV(event.target.value);
        setRHLabForm({ ...RHLabForm, LABHBV: event.target.value })
    };
    const [HepC, setHepC] = useState('999')
    const HepCHandle = (event) => {
        setHepC(event.target.value);
        setRHLabForm({ ...RHLabForm, LABHCV: event.target.value })
    };
    const [PAC, setPAC] = useState('999')
    const PACHandle = (event) => {
        setPAC(event.target.value);
        setRHForm({ ...RHForm, RHPAC: event.target.value })
    };

    /////Patient Outcome//////////
    const [proPosition, setProPosition] = useState('')
    const proPositionHandle = (event) => {
        setProPosition(event.target.value);
        setRHForm({ ...RHForm, RHPROVIDERPOSITION: event.target.value })
    };
    const [proPlace, setProPlace] = useState('')
    const proPlaceHandle = (event) => {
        setProPlace(event.target.value);
        setRHForm({ ...RHForm, RHPLACE: event.target.value })
        setRHLabForm({ ...RHLabForm, LABPLACE: event.target.value })
    };
    const [patientOutcome, setPatientOutcome] = useState('999')
    const patientOutcomeHandle = (event) => {
        setPatientOutcome(event.target.value);
        setRHForm({ ...RHForm, RHOUTCOME: event.target.value })
    };
    const [referPlace, setReferPlace] = useState('999')
    const referPlaceHandle = (event) => {
        setReferPlace(event.target.value);
        setRHForm({ ...RHForm, RHREFTO: event.target.value })
    };

    /////////////////////For Shan IPs Only//////////////////

    const [seeDis, setSeeDis] = useState('1')
    const [hearDis, setHearDis] = useState('1')
    const [walkDis, setWalkDis] = useState('1')
    const [remDis, setRemDis] = useState('1')
    const [washDis, setWashDis] = useState('1')
    const [comDis, setComDis] = useState('1')
    const seeDisHandle = (event) => {
        setSeeDis(event.target.value);
        setRHForm({ ...RHForm, RHDSEE: event.target.value })
    };
    const hearDisHandle = (event) => {
        setHearDis(event.target.value);
        setRHForm({ ...RHForm, RHDHEAR: event.target.value })
    };
    const walkDisHandle = (event) => {
        setWalkDis(event.target.value);
        setRHForm({ ...RHForm, RHDWALK: event.target.value })
    };
    const remDisHandle = (event) => {
        setRemDis(event.target.value);
        setRHForm({ ...RHForm, RHDREMBR: event.target.value })
    };
    const washDisHandle = (event) => {
        setWashDis(event.target.value);
        setRHForm({ ...RHForm, RHDWASH: event.target.value })
    };
    const comDisHandle = (event) => {
        setComDis(event.target.value);
        setRHForm({ ...RHForm, RHDCOMMU: event.target.value })
    };

    function migrantHandleChange(event) {
        if (event.target.value === RHForm.RHMIGRANT) {
            setRHForm({ ...RHForm, RHMIGRANT: "" })
        } else {
            setRHForm({ ...RHForm, RHMIGRANT: event.target.value })
        }
    }

    function IDPHandleChange(event) {
        if (event.target.value === RHForm.RHIDP) {
            setRHForm({ ...RHForm, RHIDP: "" })
        } else {
            setRHForm({ ...RHForm, RHIDP: event.target.value })
        }
    }

    function disablilityHandleChange(event) {
        if (event.target.value === RHForm.RHDISABILITY) {
            setRHForm({ ...RHForm, RHDISABILITY: "" })
        } else {
            setRHForm({ ...RHForm, RHDISABILITY: event.target.value })
        }
    }

    function lactHandleChange(event) {
        if (event.target.value === RHForm.RHLACMOTHER) {
            setRHForm({ ...RHForm, RHLACMOTHER: "" })
        } else {
            setRHForm({ ...RHForm, RHLACMOTHER: event.target.value })
        }
    }

    ///////////Handle Change///////////
    const [tspCode, setTspCode] = useState('')
    const [clnCode, setClnCode] = useState('')
    const [villageList, setVillageList] = useState([])
    const [villageCode, setVillageCode] = useState('')

    const RHVillageHandleChange = (event) => {
        let tsp = _.find(props.village, ['VILLAGE_CODE', event.target.value]);
        setTspCode(tsp.TSP_CODE)
        setVillageCode(event.target.value)
        setRHLabForm({ ...RHLabForm, LABVILLAGE: event.target.value })
        setRHForm({ ...RHForm, RHVILLAGE: event.target.value, RHTSP: tsp.TSP_CODE })
        console.log("Selected Village => ", event.target.value)
    };

    const RHClinicHandleChange = (event) => {
        setClnCode(event.target.value)
        setRHForm({ ...RHForm, RHCLNID: event.target.value })
        if ((sessionStorage.getItem('project') === 'P-008' ||
            sessionStorage.getItem('org') === 'CPI-17' || sessionStorage.getItem('org') === 'CPI-18' ||
            sessionStorage.getItem('org') === 'CPI-19' || sessionStorage.getItem('org') === 'CPI-63' || sessionStorage.getItem('org') === 'CPI-86')
            || ((sessionStorage.getItem('org') === 'CPI-20' || sessionStorage.getItem('org') === 'CPI-13') && sessionStorage.getItem('project') === 'P-027')) {
            setChosenVillageData(_.filter(villageList, ['CLN_CODE', event.target.value]))
        }
        console.log("village list => ", chosenVillageData)
        console.log("Selected Clinic => ", event.target.value)
    };

    ///////Age Calculate/////////////
    const [ageCalculate, setAgeCalculate] = useState('')
    const [realAge, setRealAge] = useState('')
    const [age, setAge] = useState('')
    const [ageUnit, setAgeUnit] = useState('')
    const [ageUnitValue, setAgeUnitValue] = useState('')
    const [providedDate, setProvidedDate] = useState('')
    const calculateAge = async (event) => {

        setProvidedDate(event.target.value)
        console.log(event.target.value)
        console.log(new Date(event.target.value))
        let date = await new Date(new Date(event.target.value) - new Date().getTimezoneOffset() * 60000);
        console.log("provided date => ", date)
        let a = await Number(props.patient[0].REGAGE) * Number(props.patient[0].REGAGEUNIT);
        let b = await new Date(date);
        let c = await new Date(props.patient[0].REGDATE);
        console.log("register date=>", c)
        let g = await b.getTime() - c.getTime();
        let e = await g / (1000 * 3600 * 24);
        //let f = (a + e) / 365;
        let totalAge = await (a + e);
        if (b >= c) {

            if (totalAge >= 365) {
                //year
                let ageCount = await Number(totalAge);
                let h = await Number(ageCount / 365);

                /* if (h < 10) {
                    setAgeError('Patient must be older than 10 years to get this service')
                    setAgeSnack(true)
                    setAgeValid(false)
                    sessionStorage.setItem('rhage', h.toString().split('.')[0])
                    sessionStorage.setItem('rhageunit', '365')
                    sessionStorage.setItem('rhageunitvalue', 'Year')
                }

                else {
                    setAgeValid(true)
                    await setAge(h.toString().split('.')[0])
                    await setAgeUnit('365')
                    await setAgeUnitValue('Year')

                    setRHForm({ ...RHForm, RHPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD hh:mm:ss'), RHAGE: h.toString().split('.')[0], RHAGEUNIT: '365' })
                    setRHLabForm({ ...RHLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD hh:mm:ss'), })
                    sessionStorage.setItem('rhage', h.toString().split('.')[0])
                    sessionStorage.setItem('rhageunit', '365')
                    sessionStorage.setItem('rhageunitvalue', 'Year')
                } */

                setAgeValid(true)
                await setAge(h.toString().split('.')[0])
                await setAgeUnit('365')
                await setAgeUnitValue('Year')

                setRHForm({ ...RHForm, RHPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD hh:mm:ss'), RHAGE: h.toString().split('.')[0], RHAGEUNIT: '365' })
                setRHLabForm({ ...RHLabForm, LABPROVIDEDDATE: moment(event.target.value).format('YYYY-MM-DD hh:mm:ss'), })
                sessionStorage.setItem('rhage', h.toString().split('.')[0])
                sessionStorage.setItem('rhageunit', '365')
                sessionStorage.setItem('rhageunitvalue', 'Year')


            }
            else if (totalAge >= 30 && totalAge < 365) {
                setAgeValid(true)
                //month
                let ageCount = await Number(totalAge);
                let h = await Number(ageCount / 30);

                await setAge(h.toString().split('.')[0])
                await setAgeUnit('30')
                await setAgeUnitValue('Month')

                setRHForm({ ...RHForm, RHPROVIDEDDATE: event.target.value, RHAGE: h.toString().split('.')[0], RHAGEUNIT: '30' })
                setRHLabForm({ ...RHLabForm, LABPROVIDEDDATE: event.target.value, })
                sessionStorage.setItem('rhage', h.toString().split('.')[0])
                sessionStorage.setItem('rhageunit', '30')
                sessionStorage.setItem('rhageunitvalue', 'Month')
            }
            else {
                //day
                setAgeValid(true)
                await setAge(totalAge)
                await setAgeUnit('1')
                await setAgeUnitValue('Day')

                setRHForm({ ...RHForm, RHPROVIDEDDATE: event.target.value, RHAGE: totalAge, RHAGEUNIT: '1' })
                setRHLabForm({ ...RHLabForm, LABPROVIDEDDATE: event.target.value, })
                sessionStorage.setItem('rhage', totalAge)
                sessionStorage.setItem('rhageunit', '1')
                sessionStorage.setItem('rhageunitvalue', 'Day')

            }
        }
        else if (b < c) {

            setAgeError('Provided Date is cannot be Less than Registration Date!')
            setAgeSnack(true)
            setAgeValid(false)
        }

        else {
            setAgeValid(true)
        }

        console.log("Total Age => ", a + e)
        //console.log("After Calculation => ",f)


    }

    /////////////Save btn////////////////
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

    const setAgeSnackBarOpen = () => {
        setAgeSnack(true)
    }

    const setAgeSnackBarClose = () => {
        setAgeSnack(false)
    }

    const [error, setError] = useState("")
    const [ageError, setAgeError] = useState("")
    const [success, setSuccess] = useState("")
    const [ageValid, setAgeValid] = useState(false)
    const [successSnack, setSuccessSnack] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [ageSnack, setAgeSnack] = useState(false)

    ///////////////Save Cancle btn/////////////
    const save = async () => {
        let valid = !providedDate ? "Please Choose Provided Date" :
            !proPosition ? "Please Choose Provider Position" :
                !proPlace ? "Please Choose Provided Place" : 'valid';



        if (valid === 'valid') {
            var parity = RHForm.RHP === '' ? 999 : RHForm.RHP
            RHForm.RHP = parity
            var abortion = RHForm.RHA === '' ? 999 : RHForm.RHA
            RHForm.RHA = abortion
            var weight = RHForm.RHWT === '' ? 999.9 : RHForm.RHWT
            RHForm.RHWT = weight
            var height = RHForm.RHHT === '' ? 999.9 : RHForm.RHHT
            RHForm.RHHT = height
            var temp = RHForm.RHTEMP === '' ? 999.9 : RHForm.RHTEMP
            RHForm.RHTEMP = temp
            var tempUnit = RHForm.RHTEMPUNIT === '' ? 999 : RHForm.RHTEMPUNIT
            RHForm.RHTEMPUNIT = tempUnit
            var pulseRate = RHForm.RHPR === '' ? 999 : RHForm.RHPR
            RHForm.RHPR = pulseRate
            var resRate = RHForm.RHRR === '' ? 999 : RHForm.RHRR
            RHForm.RHRR = resRate
            var bp = RHForm.RHBP === '' ? '000/000' : RHForm.RHBP
            RHForm.RHBP = bp
            RHForm.RHINSERT = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            RHForm.RHUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            var migrant = RHForm.RHMIGRANT === '' ? 999 : RHForm.RHMIGRANT
            RHForm.RHMIGRANT = migrant
            var idp = RHForm.RHIDP === '' ? 999 : RHForm.RHIDP
            RHForm.RHIDP = idp
            var lac = RHForm.RHLACMOTHER === '' ? 999 : RHForm.RHLACMOTHER
            RHForm.RHLACMOTHER = lac
            var dis = RHForm.RHDISABILITY === '' ? 999 : RHForm.RHDISABILITY
            RHForm.RHDISABILITY = dis

            var labHB = RHLabForm.LABHB === '' ? 999 : RHLabForm.LABHB
            RHLabForm.LABHB = labHB
            var labRBS = RHLabForm.LABRBS === '' ? 999 : RHLabForm.LABRBS
            RHLabForm.LABRBS = labRBS

            var lab = labTest === false ? 0 : 1;
            RHForm.RHLAB = lab
            RHLabForm.LABTEST = lab

            RHLabForm.LABINSERT = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            RHLabForm.LABUPDATE = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            const rhres = await insertRH({ RHForm, RHLabForm });
            if (rhres?.status === 200) {
                sessionStorage.setItem('homeSave', 'done')
                setSuccess("Successfully inserted a patient's RH Service")
                setSuccessSnack(true)
                history.push({
                    pathname: "entryhomepage",
                    openRHSaveSnackbar: true
                });
            }
        }
        else {
            setError(valid)
            setOpenSnack(true)
        }
    }


    const cancle = () => {
        history.push('entryhomepage')
        sessionStorage.setItem('homeSave', 'done')
    }

    //////Patient Data///////////

    useEffect(async () => {

        setAgeValid(true)

        if (props.patient.length) {

            let maxID = await getMaxID();
            let id = ''
            let maxid = ''

            if (maxID) {

                id = maxID.data.data.getMaxID[0].MAX

                maxid = id === null ? 1 : id + 1

                console.log("id =>", maxid)
            }
            setVillageList(props.village)
            setChosenVillageData(_.filter(props.village, ['CLN_CODE', props.clinic[0].CLN_CODE]))
            setRHForm({
                ...RHForm,
                ID: parseInt(maxid),
                RHREGID: props.patient[0].REGID,
                RHTYPE: props.serviceType === null ? 1 : 2,
                RHPREG: '2',
                RHTEMPUNIT: '1',
                RHHE: '2',
                RHDONOR: sessionStorage.getItem('donor'),
                RHORG: sessionStorage.getItem('org'),
                RHPROJECT: sessionStorage.getItem('project'),
                RHTSP: sessionStorage.getItem('project') === 'P-990' ? 'KRN-TSP-002' : props.village[0].TSP_CODE,
                RHVILLAGE: props.village[0].VILLAGE_CODE,
                RHAGE: parseInt(props.patient[0].REGAGE),
                RHAGEUNIT: parseInt(props.patient[0].REGAGEUNIT),
                RHCLNID: props.clinic.length > 0 ? props.clinic[0].CLN_CODE : /* sessionStorage.getItem('project') === 'P-990' && sessionStorage.getItem('org') === 'CPI-16' ? */ 'TNTH-001',
                RHUSRLOGIN: sessionStorage.getItem('userName'),
                RHSYNC: 0,
                RHGVB: 0,
                RHSTATUS: 1,
                RHINSERT: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                RHUPDATE: moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
            })

            setRHLabForm({
                ...RHLabForm,
                ID: parseInt(maxid),
                LABREGID: props.patient[0].REGID,
                LABVILLAGE: props.village[0].VILLAGE_CODE,
                LABORG: sessionStorage.getItem('org'),
                LABSSOURCE: 'rh',
                LABINSERT: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                LABUPDATE: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                LABSTATUS: 1,
                LABSYNC: 0,
            })
            setAge(parseInt(props.patient[0].REGAGE))
            setAgeUnitValue((props.patient[0].REGAGEUNIT === 365 ? 'Year' : props.patient[0].REGAGEUNIT === 30 ? 'Month' : 'Day'))

        }

    }, [])


    return (
        <>
            <Typography variant="h5" align="center" style={{ color: '#53344d', background: '#fcf0f2', fontWeight: 'bold', padding: '1%' }}>
                RH Service</Typography>
            {props.patient.length ?
                <>

<TableContainer component={Paper}>
                    <Table size='small' className={classes.table} aria-label="simple table" >
                    <TableBody>
                    <TableRow>
                        <TableCell className={classes.cellOne} size='small' align="left">&nbsp;&nbsp;&nbsp;&nbsp;Patient ID</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">Patient Name</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">Age</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">Patient Type</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">Father</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">Org</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">Project</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">Donor</TableCell>
                        <TableCell className={classes.cellOne} size='small' align="left">UsrLogin</TableCell>
                    </TableRow>
                </TableBody>
                        <TableBody>
                        {props.patient.length ?
                            <TableRow key={props.patient[0].REGID}>
                                <TableCell className={classes.cellTwo} align="left" size='small' >&nbsp;&nbsp;&nbsp;{props.patient[0].REGID}</TableCell>
                                <TableCell className={classes.cellTwo} align="left" size='small' >{props.patient[0].REGNAME}</TableCell>
                                <TableCell className={classes.cellTwo} align="left" size='small' >{parseInt(age)+ageUnitValue}</TableCell>
                                <TableCell className={classes.cellTwo} align="left" size='small' >{props.serviceType === null ? 'New' : 'Old'}</TableCell>
                                <TableCell className={classes.cellTwo} align="left" size='small' >{props.patient[0].REGFATHER}</TableCell>
                                <TableCell className={classes.cellTwo} align="left" size='small' >{sessionStorage.getItem('orgName')}</TableCell>
                                <TableCell className={classes.cellTwo} align="left" size='small' >{sessionStorage.getItem('projName')}</TableCell>
                                <TableCell className={classes.cellTwo} align="left" size='small' >{sessionStorage.getItem('donorName')}</TableCell>
                                <TableCell className={classes.cellTwo} align="left" size='small' >{sessionStorage.getItem('userName')}</TableCell>
    
                            </TableRow> : null}
    
                    </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ background: '#fcf0f2', paddingTop: '2%' }}>
                        <div className={classes.root} style={{ paddingLeft: "2%", paddingRight: "3%", paddingBottom: "2%" }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={4} md={4}>
                                    <CustomTextField
                                        id="filled-basic"
                                        type="date"
                                        label={<Grid row container><Typography color="#482642">Provided Date </Typography>
                                            <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                                        variantText="filled"
                                        InputLabelProps={{
                                            style: { color: '#482642' },
                                            shrink: true
                                        }}
                                        onChange={calculateAge}
                                        value={providedDate} />

                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <CustomTextField
                                        id="filled-basic"
                                        select
                                        label={<Grid row container><Typography color="#482642">Choose Clinic </Typography>
                                            <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                                        variantText="filled"
                                        value={clnCode}
                                        onChange={RHClinicHandleChange}
                                        InputLabelProps={{
                                            style: { color: '#482642' },
                                            shrink: true
                                        }}
                                        SelectProps={{
                                            native: true
                                        }}>
                                        {props.clinic.length &&
                                            props.clinic.map((option) => (
                                                <option key={option.CLN_CODE} value={option.CLN_CODE}>
                                                    {option.CLN_NAME}
                                                </option>
                                            ))}
                                    </CustomTextField>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                    <CustomTextField
                                        id="filled-basic"
                                        select
                                        label={<Grid row container><Typography color="#482642">Provided Village </Typography>
                                            <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}
                                        variantText="filled"
                                        value={villageCode}
                                        onChange={RHVillageHandleChange}
                                        InputLabelProps={{
                                            style: { color: '#482642' },
                                            shrink: true
                                        }}
                                        SelectProps={{
                                            native: true
                                        }}
                                    >
                                        {chosenVillageData.length &&
                                            chosenVillageData.map((option) => (
                                                <option key={option.VILLAGE_CODE} value={option.VILLAGE_CODE}>
                                                    {option.VILLAGE_NAME + " " + " (" + option.CLN_NAME + "," + option.PROJECT_NAME + ")"}
                                                </option>
                                            ))}
                                    </CustomTextField>
                                </Grid>
                                {(props.patient.length && props.gender === 1) ? <Grid item xs={12} sm={12} md={12}>
                                    <ThemeProvider theme={radioTheme}>
                                        <Card
                                            variant="outlined"
                                            style={{
                                                background: "#fcf0f2",
                                                width: '100%',
                                                borderRadius: '10px'
                                            }}
                                            className={classes.cardStyle}>
                                            {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>History </Typography>
                                            </Grid>}
                                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                                <CustomTextField
                                                    type="number"
                                                    variantText="filled"
                                                    disabled
                                                    inputProps={{ step: "1", min: 0 }}
                                                    InputLabelProps={{
                                                        style: { color: '#482642' },
                                                        shrink: true
                                                    }}
                                                    label={<Grid row container><Typography color="#482642">Parity </Typography>
                                                    </Grid>}
                                                    style={{ marginTop: '10px' }}
                                                    onChange={e => { setRHForm({ ...RHForm, RHP: 999 }) }}
                                                    value={RHForm.RHP} />
                                                <CustomTextField
                                                    type="number"
                                                    variantText="filled"
                                                    disabled
                                                    inputProps={{ step: "1", min: 0 }}
                                                    InputLabelProps={{
                                                        style: { color: '#482642' },
                                                        shrink: true
                                                    }}
                                                    label={<Grid row container><Typography color="#482642">Abortion </Typography>
                                                    </Grid>}
                                                    style={{ marginTop: '10px' }}
                                                    onChange={e => { setRHForm({ ...RHForm, RHA: 999 }) }}
                                                    value={RHForm.RHA} />
                                                <ThemeProvider theme={radioTheme}>
                                                    <Card
                                                        variant="outlined"
                                                        style={{
                                                            marginTop: '10px',
                                                            width: '100%',
                                                            marginRight: '10px',
                                                            background: "#fcf0f2"
                                                        }}
                                                    >
                                                        {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Pregnancy </Typography>
                                                        </Grid>}

                                                        <RadioGroup
                                                            aria-label="gender"
                                                            name="gender1"
                                                            style={{
                                                                display: "flex",
                                                                width: "100%",
                                                                flexDirection: 'row',
                                                                justifyContent: "space-around"
                                                            }}
                                                            onChange={e => { setRHForm({ ...RHForm, RHPREG: e.target.value }) }}
                                                            value={RHForm.RHPREG}
                                                            row={true}
                                                        >
                                                            <FormControlLabel
                                                                value="1"
                                                                labelPlacement="left"
                                                                disabled
                                                                label="Yes"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={RHPregHandleChange} onKeyDown={e => e.key === 'Enter' && RHPregHandleChange(e)} />}
                                                            />
                                                            <FormControlLabel
                                                                value="2"
                                                                labelPlacement="left"
                                                                disabled
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={RHPregHandleChange} onKeyDown={e => e.key === 'Enter' && RHPregHandleChange(e)} />}
                                                                label="No"
                                                            />
                                                        </RadioGroup>
                                                    </Card>
                                                </ThemeProvider>
                                            </div>


                                        </Card>
                                    </ThemeProvider>
                                </Grid> :
                                    <Grid item xs={12} sm={12} md={12}>
                                        <ThemeProvider theme={radioTheme}>
                                            <Card
                                                variant="outlined"
                                                style={{
                                                    background: "#fcf0f2",
                                                    width: '100%',
                                                    borderRadius: '10px'
                                                }}
                                                className={classes.cardStyle}>
                                                {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>History </Typography>
                                                </Grid>}
                                                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                                    <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0, max: 99, maxLength: 2 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">Parity </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { (e.target.value.length > 2) ? setRHForm({ ...RHForm, RHP: (e.target.value).slice(0, 2) }) : setRHForm({ ...RHForm, RHP: e.target.value }) }}
                                                        value={RHForm.RHP} />
                                                    <CustomTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0, max: 99, maxLength: 2 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">Abortion </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '10px' }}
                                                        onChange={e => { (e.target.value.length > 2) ? setRHForm({ ...RHForm, RHA: (e.target.value).slice(0, 2) }) : setRHForm({ ...RHForm, RHA: e.target.value }) }}
                                                        value={RHForm.RHA} />
                                                    <ThemeProvider theme={radioTheme}>
                                                        <Card
                                                            variant="outlined"
                                                            style={{
                                                                marginTop: '10px',
                                                                width: '100%',
                                                                marginRight: '10px',
                                                                background: "#fcf0f2"
                                                            }}>
                                                            {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Pregnancy </Typography>
                                                            </Grid>}

                                                            <RadioGroup
                                                                aria-label="gender"
                                                                name="gender1"
                                                                style={{
                                                                    display: "flex",
                                                                    width: "100%",
                                                                    flexDirection: 'row',
                                                                    justifyContent: "space-around"
                                                                }}
                                                                onChange={e => { setRHForm({ ...RHForm, RHPREG: e.target.value }) }}
                                                                value={RHForm.RHPREG}
                                                                row={true}
                                                            >
                                                                <FormControlLabel
                                                                    value="1"
                                                                    labelPlacement="left"
                                                                    label="Yes"
                                                                    style={{ height: "30px" }}
                                                                    className={classes.fontSize}
                                                                    control={<Radio size="small" color="primary"
                                                                        onClick={RHPregHandleChange} onKeyDown={e => e.key === 'Enter' && RHPregHandleChange(e)} />}
                                                                />
                                                                <FormControlLabel
                                                                    value="2"
                                                                    labelPlacement="left"
                                                                    style={{ height: "30px" }}
                                                                    className={classes.fontSize}
                                                                    control={<Radio size="small" color="primary"
                                                                        onClick={RHPregHandleChange} onKeyDown={e => e.key === 'Enter' && RHPregHandleChange(e)} />}
                                                                    label="No"
                                                                />
                                                            </RadioGroup>
                                                        </Card>
                                                    </ThemeProvider>
                                                </div>


                                            </Card>
                                        </ThemeProvider>
                                    </Grid>}


                                <ThemeProvider theme={radioTheme}>
                                    <Card
                                        variant="outlined"
                                        style={{
                                            background: "#fcf0f2",
                                            width: '100%',
                                            borderRadius: '10px',
                                            paddingBottom: '10px',
                                            marginLeft: '10px',
                                            marginRight: '10px',
                                        }}
                                        className={classes.cardStyle}>
                                        {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Examination </Typography>
                                        </Grid>}
                                        <Grid container row>
                                            <Grid item xs={12} sm={3} md={3} style={{ marginTop: '10px', }}>
                                                <CustomTextField
                                                    type="number"
                                                    variantText="filled"
                                                    inputProps={{ step: "1", min: 0, maxLength: 5 }}
                                                    InputLabelProps={{
                                                        style: { color: '#482642', textAlign: 'center' },
                                                        shrink: true
                                                    }}
                                                    label={<Grid row container><Typography color="#482642">Weight(kg) </Typography>
                                                    </Grid>}
                                                    style={{ width: '90%' }}
                                                    onChange={e => { (e.target.value.length > 5) ? setRHForm({ ...RHForm, RHWT: (e.target.value).slice(0, 5) }) : setRHForm({ ...RHForm, RHWT: e.target.value }) }}
                                                    value={RHForm.RHWT} />
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ marginTop: '10px', }}>
                                                <CustomTextField
                                                    type="number"
                                                    variantText="filled"
                                                    inputProps={{ step: "1", min: 0, maxLength: 5 }}
                                                    InputLabelProps={{
                                                        style: { color: '#482642', textAlign: 'center' },
                                                        shrink: true
                                                    }}
                                                    label={<Grid row container><Typography color="#482642">Height(cm) </Typography>
                                                    </Grid>}
                                                    style={{ width: '90%' }}
                                                    onChange={e => { (e.target.value.length > 5) ? setRHForm({ ...RHForm, RHHT: (e.target.value).slice(0, 5) }) : setRHForm({ ...RHForm, RHHT: e.target.value }) }}
                                                    value={RHForm.RHHT} />
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ marginTop: '10px', }}>
                                                <CustomTextField
                                                    type="number"
                                                    variantText="filled"
                                                    inputProps={{ step: "1", min: 0, maxLength: 5 }}
                                                    InputLabelProps={{
                                                        style: { color: '#482642', textAlign: 'center' },
                                                        shrink: true
                                                    }}
                                                    label={<Grid row container><Typography color="#482642">Temp </Typography>
                                                    </Grid>}
                                                    style={{ width: '90%' }}
                                                    onChange={e => { (e.target.value.length > 5) ? setRHForm({ ...RHForm, RHTEMP: (e.target.value).slice(0, 5) }) : setRHForm({ ...RHForm, RHTEMP: e.target.value }) }}
                                                    value={RHForm.RHTEMP} />
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ marginTop: '10px' }}>
                                                <ThemeProvider theme={radioTheme}>
                                                    <FormControl component="fieldset" style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: '90%'
                                                    }}>
                                                        <Card
                                                            variant="outlined"
                                                            style={{
                                                                marginRight: '10px',
                                                                background: "#fcf0f2",
                                                                width: '100%'
                                                            }}
                                                        >
                                                            {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Unit </Typography>
                                                            </Grid>}

                                                            <RadioGroup
                                                                aria-label="gender"
                                                                name="gender1"
                                                                style={{
                                                                    display: "flex",

                                                                    flexDirection: 'row',
                                                                    justifyContent: "space-around"
                                                                }}
                                                                onChange={e => { setRHForm({ ...RHForm, RHTEMPUNIT: e.target.value }) }}
                                                                value={RHForm.RHTEMPUNIT}
                                                                row={true}
                                                            >
                                                                <FormControlLabel
                                                                    value="1"
                                                                    labelPlacement="left"
                                                                    label="°F"
                                                                    style={{ height: "30px" }}
                                                                    className={classes.fontSize}
                                                                    control={<Radio size="small" color="primary"
                                                                        onClick={RHTempUnitHandleChange} onKeyDown={e => e.key === 'Enter' && RHTempUnitHandleChange(e)} />}
                                                                />
                                                                <FormControlLabel
                                                                    value="2"
                                                                    labelPlacement="left"
                                                                    style={{ height: "30px" }}
                                                                    className={classes.fontSize}
                                                                    control={<Radio size="small" color="primary"
                                                                        onClick={RHTempUnitHandleChange} onKeyDown={e => e.key === 'Enter' && RHTempUnitHandleChange(e)} />}
                                                                    label="°C"
                                                                />
                                                            </RadioGroup>
                                                        </Card>
                                                    </FormControl>
                                                </ThemeProvider>
                                            </Grid>
                                        </Grid>
                                        <Grid container row>
                                            <Grid item xs={12} sm={3} md={3} style={{ marginTop: '10px', }}>
                                                <CustomTextField
                                                    type="number"
                                                    variantText="filled"
                                                    inputProps={{ step: "1", min: 0 }}
                                                    InputLabelProps={{
                                                        style: { color: '#482642' },
                                                        shrink: true
                                                    }}
                                                    label={<Grid row container><Typography color="#482642">Pulse Rate(/min)</Typography>
                                                    </Grid>}
                                                    style={{ width: '90%' }}
                                                    onChange={e => { setRHForm({ ...RHForm, RHPR: e.target.value }) }}
                                                    value={RHForm.RHPR} />
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={3} style={{ marginTop: '10px', }}>
                                                <CustomTextField
                                                    type="number"
                                                    variantText="filled"
                                                    inputProps={{ step: "1", min: 0 }}
                                                    InputLabelProps={{
                                                        style: { color: '#482642', textAlign: 'center' },
                                                        shrink: true
                                                    }}
                                                    label={<Grid row container><Typography color="#482642">Respiratory Rate(/min) </Typography>
                                                    </Grid>}
                                                    style={{ width: '90%' }}
                                                    onChange={e => { setRHForm({ ...RHForm, RHRR: e.target.value }) }}
                                                    value={RHForm.RHRR} />
                                            </Grid>
                                            <Grid item xs={12} sm={2} md={2} style={{ marginTop: '10px', }}>
                                                <CustomTextField
                                                    id="filled-basic"
                                                    label="BP(mmHg)"
                                                    variantText="filled"
                                                    style={{ width: '90%' }}
                                                    onChange={e => { setRHForm({ ...RHForm, RHBP: e.target.value }) }}
                                                    value={RHForm.RHBP}
                                                />
                                            </Grid>
                                            {sessionStorage.getItem('project') === 'P-027' && 
                                            <Grid item xs={12} sm={2} md={2}>
                                            <FormControl variant="filled" className={classes.formControl} style={{ width: '95%', marginRight: '10px' }}>
                                                <InputLabel id="demo-simple-select-filled-label">VIA</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-filled-label"
                                                    id="demo-simple-select-filled"
                                                    MenuProps={{
                                                        anchorOrigin: {
                                                            vertical: "bottom",
                                                            horizontal: "left",
                                                        },
                                                        style: {
                                                            maxHeight: 300,
                                                        },
                                                        getContentAnchorEl: null
                                                    }}
                                                    value={RHForm.RHVIAR}
                                                    onChange={RHVIARHandleChange} >
                                                    <MenuItem value={999}>-</MenuItem>
                                                    <MenuItem value={1}>Positive</MenuItem>
                                                    <MenuItem value={2}>Negative</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>}
                                            
                                            <Grid item xs={12} sm={2} md={2} style={{ marginTop: '10px', }}>
                                                <FormControlLabel

                                                    control={
                                                        <Switch
                                                            checked={labTest}
                                                            onChange={labTestHandle}
                                                            name="checkedB"
                                                            color="primary"
                                                        />
                                                    }
                                                    InputLabelProps={{
                                                        style: { color: '#482642' },
                                                    }}
                                                    label="LabTest"
                                                    labelPlacement="top"
                                                />
                                            </Grid>
                                        </Grid>

                                    </Card>

                                </ThemeProvider>

                                {labTest &&
                                    <ThemeProvider theme={radioTheme}>
                                        <Card
                                            variant="outlined"
                                            style={{
                                                background: "#fcf0f2",
                                                width: '100%',
                                                borderRadius: '10px',
                                                marginTop: '20px'
                                            }}
                                            className={classes.cardStyle}>
                                            {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Investigation </Typography>
                                            </Grid>}
                                            <Grid container spacing={1} style={{ marginBottom: '10px' }}>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">RDT</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={RDT}
                                                            onChange={RDTHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>PF</MenuItem>
                                                            <MenuItem value={2}>PV</MenuItem>
                                                            <MenuItem value={3}>Mixed</MenuItem>
                                                            <MenuItem value={4}>Negative</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Microscopic</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={microscopic}
                                                            onChange={microscopicHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Not Seen</MenuItem>
                                                            <MenuItem value={2}>Pf</MenuItem>
                                                            <MenuItem value={3}>Pf+</MenuItem>
                                                            <MenuItem value={4}>Pf++</MenuItem>
                                                            <MenuItem value={5}>Pf+++</MenuItem>
                                                            <MenuItem value={6}>Pv</MenuItem>
                                                            <MenuItem value={7}>Pv+</MenuItem>
                                                            <MenuItem value={8}>Pv++</MenuItem>
                                                            <MenuItem value={9}>Pv+++</MenuItem>
                                                            <MenuItem value={10}>Mixed</MenuItem>
                                                            <MenuItem value={11}>Po</MenuItem>
                                                            <MenuItem value={12}>Po+</MenuItem>
                                                            <MenuItem value={13}>Po++</MenuItem>
                                                            <MenuItem value={14}>Po+++</MenuItem>
                                                            <MenuItem value={15}>Pm</MenuItem>
                                                            <MenuItem value={16}>Pm+</MenuItem>
                                                            <MenuItem value={17}>Pm++</MenuItem>
                                                            <MenuItem value={18}>Pm+++</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <CustomUnicefTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ step: "1", min: 0 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">HB(%) </Typography>
                                                        </Grid>}
                                                        style={{ marginTop: '11px', width: '95%' }}
                                                        onChange={e => { setRHLabForm({ ...RHLabForm, LABHB: e.target.value }) }}
                                                        value={RHLabForm.LABHB} />
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">BloodGroup</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={blood}
                                                            onChange={bloodHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>A</MenuItem>
                                                            <MenuItem value={2}>B</MenuItem>
                                                            <MenuItem value={3}>O</MenuItem>
                                                            <MenuItem value={4}>AB</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">RH</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={RH}
                                                            onChange={RHHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Rh+</MenuItem>
                                                            <MenuItem value={2}>Rh-</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">UrineProtein</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={urineProtein}
                                                            onChange={urintProteinHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>None</MenuItem>
                                                            <MenuItem value={2}>Trace</MenuItem>
                                                            <MenuItem value={3}>+</MenuItem>
                                                            <MenuItem value={4}>++</MenuItem>
                                                            <MenuItem value={5}>+++</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">UCG/HCG</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={UCG}
                                                            onChange={UCGHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Positive</MenuItem>
                                                            <MenuItem value={2}>Negative</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Urine Sugar</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={urine}
                                                            onChange={urineHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>None</MenuItem>
                                                            <MenuItem value={2}>Trace</MenuItem>
                                                            <MenuItem value={3}>+</MenuItem>
                                                            <MenuItem value={4}>++</MenuItem>
                                                            <MenuItem value={5}>+++</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Gonorrhoea</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={gonorrhoea}
                                                            onChange={gonorrhoeaHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Seen</MenuItem>
                                                            <MenuItem value={2}>Not Seen</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Trichomonus</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={trichomonus}
                                                            onChange={trichomonusHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Seen</MenuItem>
                                                            <MenuItem value={2}>Not Seen</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Candida</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={candida}
                                                            onChange={candidaHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Seen</MenuItem>
                                                            <MenuItem value={2}>Not Seen</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">RPR</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={RPR}
                                                            onChange={RPRHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Reactive</MenuItem>
                                                            <MenuItem value={2}>Non Reactive</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">TPHA</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={TPHA}
                                                            onChange={TPHAHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Reactive</MenuItem>
                                                            <MenuItem value={2}>Non Reactive</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">VDRL</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={VDRL}
                                                            onChange={VDRLHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Reactive</MenuItem>
                                                            <MenuItem value={2}>Non Reactive</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">HIV</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={HIV}
                                                            onChange={HIVHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Reactive</MenuItem>
                                                            <MenuItem value={2}>Non Reactive</MenuItem>
                                                            <MenuItem value={3}>Invalid</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">HBV</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={HBV}
                                                            onChange={HBVHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Reactive</MenuItem>
                                                            <MenuItem value={2}>Non Reactive</MenuItem>
                                                            <MenuItem value={3}>Invalid</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Hep-C</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"

                                                            value={HepC}
                                                            onChange={HepCHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Reactive</MenuItem>
                                                            <MenuItem value={2}>Non Reactive</MenuItem>
                                                            <MenuItem value={3}>Invalid</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <CustomUnicefTextField
                                                        id="filled-basic"
                                                        label="Remark"
                                                        variantText="filled"
                                                        style={{ marginTop: '11px', width: '95%' }}
                                                        onChange={e => { setRHLabForm({ ...RHLabForm, LABOTHER: e.target.value }) }}
                                                        value={RHLabForm.LABOTHER}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} sm={4} md={2}>
                                                    <CustomUnicefTextField
                                                        type="number"
                                                        variantText="filled"
                                                        inputProps={{ min: 0 }}
                                                        InputLabelProps={{
                                                            style: { color: '#482642' },
                                                            shrink: true
                                                        }}
                                                        label={<Grid row container><Typography color="#482642">RBS </Typography>
                                                        </Grid>}
                                                        style={{ width: '95%', marginTop: '11px' }}
                                                        onChange={e => { setRHLabForm({ ...RHLabForm, LABRBS: e.target.value }) }}
                                                        value={RHLabForm.LABRBS} />
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </ThemeProvider>}

                                <Grid item xs={12} sm={4} md={4}>
                                    <CustomTextField
                                        id="filled-basic"
                                        label="Chief Complaint"
                                        variantText="filled"
                                        style={{ marginTop: '30px' }}
                                        onChange={e => { setRHForm({ ...RHForm, RHCHEIFCOMPLAIN: e.target.value }) }}
                                        value={RHForm.RHCHEIFCOMPLAIN}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8} md={8}>
                                    <ThemeProvider theme={radioTheme}>

                                        <Card
                                            variant="outlined"
                                            style={{
                                                background: "#fcf0f2",
                                                borderRadius: '10px',
                                                paddingBottom: '10px',
                                            }}
                                            className={classes.cardStyle}>
                                            {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Diagnosis </Typography>
                                            </Grid>}
                                            <Grid Grid item xs={12} sm={12} md={12}>
                                                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                                    <Grid item xs={12} sm={6} md={6}>
                                                        <FormControl variant="filled" className={classes.formControl} style={{ width: '95%', marginRight: '10px' }}>
                                                            <InputLabel id="demo-simple-select-filled-label">PAC Related</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-filled-label"
                                                                id="demo-simple-select-filled"
                                                                MenuProps={{
                                                                    anchorOrigin: {
                                                                        vertical: "bottom",
                                                                        horizontal: "left",
                                                                    },
                                                                    style: {
                                                                        maxHeight: 300,
                                                                    },
                                                                    getContentAnchorEl: null
                                                                }}
                                                                value={PAC}
                                                                onChange={PACHandle}>
                                                                <MenuItem value={999}>-</MenuItem>
                                                                <MenuItem value={1}>Complete</MenuItem>
                                                                <MenuItem value={2}>Incomplete</MenuItem>
                                                                <MenuItem value={3}>Threaten</MenuItem>
                                                                <MenuItem value={4}>Missed</MenuItem>
                                                                <MenuItem value={5}>Inevitable</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} >
                                                        <CustomTextField
                                                            id="filled-basic"
                                                            label="Other Diagnosis"
                                                            variantText="filled"
                                                            style={{ marginTop: '10px', width: '90%', marginRight: '10px' }}
                                                            onChange={e => { setRHForm({ ...RHForm, RHDXOTHER: e.target.value }) }}
                                                            value={RHForm.RHDXOTHER}
                                                        />
                                                    </Grid>
                                                </div>
                                            </Grid>



                                        </Card>



                                    </ThemeProvider>
                                </Grid>


                                <Grid item xs={12} sm={12} md={12}>
                                    <ThemeProvider theme={radioTheme}>
                                        <Card
                                            variant="outlined"
                                            style={{
                                                background: "#fcf0f2",
                                                width: '100%',
                                                borderRadius: '10px'
                                            }}
                                            className={classes.cardStyle}>
                                            {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Procedure-Treatment-HE </Typography>
                                            </Grid>}
                                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
                                                <CustomTextField
                                                    id="filled-basic"
                                                    label="Procedure"
                                                    variantText="filled"
                                                    style={{ marginTop: '10px', width: '35%' }}
                                                    onChange={e => { setRHForm({ ...RHForm, RHPROCEDURE: e.target.value }) }}
                                                    value={RHForm.RHPROCEDURE}
                                                />
                                                <CustomTextField
                                                    id="filled-basic"
                                                    label="Treatment"
                                                    variantText="filled"
                                                    style={{ marginTop: '10px', width: '35%' }}
                                                    onChange={e => { setRHForm({ ...RHForm, RHTX: e.target.value }) }}
                                                    value={RHForm.RHTX}
                                                />
                                                <FormControl style={{ width: '30%' }}>
                                                    <Card
                                                        variant="outlined"
                                                        style={{
                                                            marginTop: '10px',
                                                            marginRight: '10px',
                                                            background: "#fcf0f2"
                                                        }}
                                                    >
                                                        {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Health Education </Typography>
                                                        </Grid>}

                                                        <RadioGroup
                                                            aria-label="gender"
                                                            name="gender1"
                                                            style={{
                                                                display: "flex",

                                                                flexDirection: 'row',
                                                                justifyContent: "space-around"
                                                            }}
                                                            onChange={e => { setRHForm({ ...RHForm, RHHE: e.target.value }) }}
                                                            value={RHForm.RHHE}
                                                            row={true}
                                                        >
                                                            <FormControlLabel
                                                                value="1"
                                                                labelPlacement="left"
                                                                label="Yes"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={RHHEHandleChange} onKeyDown={e => e.key === 'Enter' && RHHEHandleChange(e)} />}
                                                            />
                                                            <FormControlLabel
                                                                value="2"
                                                                labelPlacement="left"
                                                                style={{ height: "30px" }}
                                                                className={classes.fontSize}
                                                                control={<Radio size="small" color="primary"
                                                                    onClick={RHHEHandleChange} onKeyDown={e => e.key === 'Enter' && RHHEHandleChange(e)} />}
                                                                label="No"
                                                            />
                                                        </RadioGroup>
                                                    </Card>
                                                </FormControl>

                                            </div>


                                        </Card>
                                    </ThemeProvider>
                                </Grid>


                                <ThemeProvider theme={radioTheme}>
                                    <Card
                                        variant="outlined"
                                        style={{
                                            background: "#fcf0f2",
                                            width: '100%',
                                            borderRadius: '10px',
                                            marginLeft: '10px',
                                            marginRight: '10px'
                                        }}
                                        className={classes.cardStyle}>
                                        {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Patient Outcome </Typography>
                                        </Grid>}
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Grid item xs={12} sm={4} md={4}>
                                                <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                    <InputLabel id="demo-simple-select-filled-label">Patient Outcome</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"
                                                        style={{ width: '95%' }}
                                                        value={patientOutcome}
                                                        onChange={patientOutcomeHandle}
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
                                                        <MenuItem value={999}>-</MenuItem>
                                                        <MenuItem value={1}>OPD</MenuItem>
                                                        <MenuItem value={2}>IPD</MenuItem>
                                                        <MenuItem value={3}>Referral</MenuItem>
                                                        <MenuItem value={4}>Death</MenuItem>
                                                        <MenuItem value={5}>Discharge</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            {patientOutcome === 3 && <>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">Provided ReferPlace</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"
                                                            style={{ width: '95%' }}
                                                            value={referPlace}
                                                            onChange={referPlaceHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Gov Hospital</MenuItem>
                                                            <MenuItem value={2}>MTC</MenuItem>
                                                            <MenuItem value={3}>NGO</MenuItem>
                                                            <MenuItem value={4}>Thai Hospital</MenuItem>
                                                            <MenuItem value={5}>Others</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <CustomTextField
                                                        id="filled-basic"
                                                        label="Reasons of Referral"
                                                        variantText="filled"
                                                        style={{ marginTop: '9px', width: '90%' }}
                                                        onChange={e => { setRHForm({ ...RHForm, RHREFREASON: e.target.value }) }}
                                                        value={RHForm.RHREFREASON}
                                                    />
                                                </Grid></>}
                                            {patientOutcome === 4 && <>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <CustomTextField
                                                        id="filled-basic"
                                                        label="Reasons of Death"
                                                        variantText="filled"
                                                        style={{ marginTop: '9px', marginBottom: '10px', width: '90%' }}
                                                        onChange={e => { setRHForm({ ...RHForm, RHDEATHREASON: e.target.value }) }}
                                                        value={RHForm.RHDEATHREASON}
                                                    />
                                                </Grid></>}
                                            {patientOutcome === 3 && referPlace === 5 && <>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <CustomTextField
                                                        id="filled-basic"
                                                        label="Other Referral"
                                                        variantText="filled"
                                                        style={{ marginTop: '9px', marginBottom: '10px', width: '90%' }}
                                                        onChange={e => { setRHForm({ ...RHForm, RHREFTOOTHER: e.target.value }) }}
                                                        value={RHForm.RHREFTOOTHER}
                                                    />
                                                </Grid>
                                            </>}

                                        </div>



                                    </Card>
                                </ThemeProvider>
                                <Grid item xs={12} sm={8} md={8}>
                                    <ThemeProvider theme={radioTheme}>
                                        <Card
                                            variant="outlined"
                                            style={{
                                                background: "#fcf0f2",
                                                width: '100%',
                                                borderRadius: '10px',

                                            }}
                                            className={classes.cardStyle}>
                                            {<Grid row container style={{ background: '#6c5268', color: 'white', padding: '10px' }}><Typography>Provider Information</Typography>
                                            </Grid>}
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <CustomTextField
                                                        id="filled-basic"
                                                        label="Provider Name"
                                                        variantText="filled"
                                                        style={{ marginTop: '9px', width: '90%' }}
                                                        onChange={e => { setRHForm({ ...RHForm, RHPROVIDERNAME: e.target.value }) }}
                                                        value={RHForm.RHPROVIDERNAME}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Provider Position </Typography>
                                                            <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"
                                                            style={{ width: '100%' }}
                                                            value={proPosition}
                                                            onChange={proPositionHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>EmOCW</MenuItem>
                                                            <MenuItem value={2}>MCHW</MenuItem>
                                                            <MenuItem value={3}>Medic</MenuItem>
                                                            <MenuItem value={4}>CHW</MenuItem>
                                                            <MenuItem value={5}>AMW</MenuItem>
                                                            <MenuItem value={6}>Nurse</MenuItem>
                                                            <MenuItem value={7}>Doctor</MenuItem>
                                                            {(sessionStorage.getItem('project') === 'P-008' ||
                                                                sessionStorage.getItem('org') === 'CPI-17' || sessionStorage.getItem('org') === 'CPI-18' ||
                                                                sessionStorage.getItem('org') === 'CPI-19' || sessionStorage.getItem('org') === 'CPI-63' || sessionStorage.getItem('org') === 'CPI-86') ?
                                                                <MenuItem value={16} >VHW</MenuItem> : null}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={4} md={4}>
                                                    <FormControl variant="filled" className={classes.formControl} style={{ width: '95%' }}>
                                                        <InputLabel id="demo-simple-select-filled-label">{<Grid row container><Typography color="#482642">Provided Place </Typography>
                                                            <Typography variant='subtitle2' style={{ color: '#d91d4c' }}>*</Typography></Grid>}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-filled-label"
                                                            id="demo-simple-select-filled"
                                                            style={{ width: '100%' }}
                                                            value={proPlace}
                                                            onChange={proPlaceHandle}
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
                                                            <MenuItem value={999}>-</MenuItem>
                                                            <MenuItem value={1}>Clinic</MenuItem>
                                                            <MenuItem value={2}>Outreach</MenuItem>
                                                            <MenuItem value={3}>Volunteer</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>



                                            </div>



                                        </Card>
                                    </ThemeProvider>
                                </Grid>

                                <Grid item xs={12} sm={4} md={4}>
                                    <CustomTextField
                                        id="filled-basic"
                                        label="Remark/Comment"
                                        variantText="filled"
                                        style={{ marginTop: '30px', width: '95%' }}
                                        onChange={e => { setRHForm({ ...RHForm, RHREMARK: e.target.value }) }}
                                        value={RHForm.RHREMARK}
                                    />
                                </Grid>

                                {((sessionStorage.getItem('project') === 'P-008' &&
                                   ( sessionStorage.getItem('org') === 'CPI-17' || sessionStorage.getItem('org') === 'CPI-18' ||
                                    sessionStorage.getItem('org') === 'CPI-19' || sessionStorage.getItem('org') === 'CPI-63' || sessionStorage.getItem('org') === 'CPI-86'))
                                    || ((sessionStorage.getItem('org') === 'CPI-20' || sessionStorage.getItem('org') === 'CPI-13') && sessionStorage.getItem('project') === 'P-027')) ?
                                    <Grid container spacing={2} alignItems="center" justifyContent="center">

                                        {(sessionStorage.getItem('project') === 'P-008' &&
                                            (sessionStorage.getItem('org') === 'CPI-17' || sessionStorage.getItem('org') === 'CPI-18' ||
                                            sessionStorage.getItem('org') === 'CPI-19' || sessionStorage.getItem('org') === 'CPI-63')) ?
                                            <>
                                                <Grid item xs={6} sm={4} md={3} >
                                                    <ThemeProvider theme={radioTheme}>
                                                        <Card
                                                            variant="outlined"
                                                            style={{
                                                                background: "#fcf0f2",
                                                                width: '95%',

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
                                                                onChange={e => { setRHForm({ ...RHForm, RHMIGRANT: e.target.value }) }}
                                                                value={RHForm.RHMIGRANT}
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

                                                <Grid item xs={6} sm={4} md={3} >
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
                                                                onChange={e => { setRHForm({ ...RHForm, RHIDP: e.target.value }) }}
                                                                value={RHForm.RHIDP}
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
                                                </Grid> </> : null}


                                        {((sessionStorage.getItem('org') === 'CPI-86') || ((sessionStorage.getItem('org') === 'CPI-20' || sessionStorage.getItem('org') === 'CPI-13') && sessionStorage.getItem('project') === 'P-027')) ?
                                            <Grid item xs={6} sm={4} md={3} >
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
                                                            onChange={e => { setRHForm({ ...RHForm, RHDISABILITY: e.target.value }) }}
                                                            value={RHForm.RHDISABILITY}
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
                                        {(props.patient.length && props.gender !== 1) && ((sessionStorage.getItem('org') !== 'CPI-20' || sessionStorage.getItem('org') !== 'CPI-13') && sessionStorage.getItem('project') !== 'P-027') ?
                                            <>

                                                <Grid item xs={6} sm={4} md={3} >
                                                    <ThemeProvider theme={radioTheme}>
                                                        <Card
                                                            variant="outlined"
                                                            style={{
                                                                background: "#fcf0f2",
                                                                width: '95%',
                                                                marginLeft: '12px'
                                                            }}
                                                            className={classes.cardStyle}>
                                                            {<Grid row container style={{ marginLeft: "13px", marginTop: "3px" }}><Typography color="#482642">Lactating Mother</Typography>
                                                            </Grid>}

                                                            <RadioGroup
                                                                aria-label="gender"
                                                                name="gender1"
                                                                style={{
                                                                    display: "flex",
                                                                    width: "100%",
                                                                    justifyContent: "space-around"
                                                                }}
                                                                onChange={e => { setRHForm({ ...RHForm, RHLACMOTHER: e.target.value }) }}
                                                                value={RHForm.RHLACMOTHER}
                                                                row={true}
                                                            >
                                                                <FormControlLabel
                                                                    value="1"
                                                                    labelPlacement="left"
                                                                    label="Yes"
                                                                    style={{ height: "30px" }}
                                                                    className={classes.fontSize}
                                                                    control={<Radio size="small" color="primary"
                                                                        onClick={lactHandleChange} onKeyDown={e => e.key === 'Enter' && lactHandleChange(e)} />}
                                                                />
                                                                <FormControlLabel
                                                                    value="0"
                                                                    labelPlacement="left"
                                                                    style={{ height: "30px" }}
                                                                    className={classes.fontSize}
                                                                    control={<Radio size="small" color="primary"
                                                                        onClick={lactHandleChange} onKeyDown={e => e.key === 'Enter' && lactHandleChange(e)} />}
                                                                    label="No"
                                                                />
                                                            </RadioGroup>
                                                        </Card>
                                                    </ThemeProvider>
                                                </Grid>
                                            </> : null}


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

                            </Grid>


                        </div>
                        {ageValid && <>
                            <Grid container spacing={10} alignItems="center" justifyContent="center" style={{ padding: '20px' }} row>
                                <Grid item xs={'auto'} style={{ width: '18%' }}>
                                    <Button
                                        variant="contained"
                                        style={{ background: '#482642', color: '#fff', width: '100%' }}
                                        onClick={save} >Save</Button>
                                </Grid>
                                <Grid item xs={'auto'} style={{ width: '18%' }}>
                                    <Button
                                        variant="contained"
                                        style={{ background: '#482642', color: '#fff', width: '100%' }}
                                        onClick={cancle} >Cancel</Button>
                                </Grid>
                            </Grid>
                        </>}

                        {openSnack && <CustomSnackBar open={setSnackBarOpen} close={setSnackBarClose} alertMsg={error} type="warning" />}
                        {ageSnack && <CustomSnackBar open={setAgeSnackBarOpen} close={setAgeSnackBarClose} alertMsg={ageError} type="warning" />}
                        {successSnack && <CustomSnackBar open={setSuccessSnackBarOpen} close={setSuccessSnackBarClose} alertMsg={success} type="success" />}
                    </div > </> : <div style={{ textAlign: 'center', background: '#fcf0f2' }}>
                    <img
                        src={noPatientLogo}
                        alt="nopatient"
                        height={420}
                        style={{ alignSelf: 'center' }}
                    /></div>}


        </>);
}
