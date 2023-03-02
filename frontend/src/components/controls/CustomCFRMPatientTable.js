import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";

import { Card } from '@material-ui/core';

import CustomCFRMDeleteDialog from './CustomCFRMDeleteDialog'


const useStyles = makeStyles({
    container: {
        maxHeight: '400px',
        width: '98%',
        borderRadius: '5px',
        position: 'revert',
        background: '#fcf0f2',
        marginLeft: '1%',
        marginRight: '1%'
    },
});



export default function CustomCFRMPatientTable(props) {

    const classes = useStyles();
    const { tableID, searchData, tdata } = props
    const [dialogOpen, setDialogOpen] = useState(false)

    const history = useHistory();

    const editButtonHandle = (event) => {
        console.log(event.currentTarget.value)
        history.push('entrypage')
        sessionStorage.setItem('editCFRM', true)
        sessionStorage.setItem('editServicePatientID', event.currentTarget.value)

    }

    const deleteButtonHandle = (event) => {
        console.log(event.currentTarget.value)
        sessionStorage.setItem('deleteCFRM', "true")
        sessionStorage.setItem('deleteServicePatientID', event.currentTarget.value)
        setDialogOpen(true)
    }

    //Dialog
    const setDialogOpenControl = () => {
        setDialogOpen(true)
    }
    const setDialogCloseControl = async () => {


        setDialogOpen(false)


    }

    return (
        <>
            {dialogOpen && <CustomCFRMDeleteDialog onClose={setDialogCloseControl} open={setDialogOpenControl} />}
            <TableContainer
                className={classes.container}>
                <Table
                    id={tableID}
                    aria-label="spanning table"
                    size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>အကြံပြုစာအမှတ်စဉ်</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>အကြံပြုစာပေးသူ</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}> Date</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Sex</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>AGE</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Village</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Division</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Project</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Organization</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Edit</TableCell>
                            <TableCell align="center" style={{ color: '#53344d', background: '#f8dadd', fontWeight: 'bold' }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody >
                        {searchData.length ?

                            searchData.map((row) => (
                                <TableRow>
                                    <TableCell align="center" >{row.ID}</TableCell>
                                    <TableCell align="center" >{row.CFRMREGCODE}</TableCell>
                                    <TableCell align="center" >{row.CFRMFBPERSON}</TableCell>
                                    <TableCell align="center" >{moment(row.FBDATE).format('DD-MM-YYYY')}</TableCell>
                                    <TableCell align="center" >{row.SEX}</TableCell>
                                    <TableCell align="center" >{row.AGE+'Years'}</TableCell>
                                    <TableCell align="center" >{row.VILNAME}</TableCell>
                                    <TableCell align="center" >{row.DIVNAME}</TableCell>
                                    <TableCell align="center" >{row.PROJNAME}</TableCell>
                                    <TableCell align="center" >{row.ORGNAME}</TableCell>
                                    <TableCell align="center">
                                    {(row.ORGID === sessionStorage.getItem('org')) ?
                                        <IconButton value={row.ID} onClick={editButtonHandle}>
                                            <EditIcon style={{ color: "#d91d4c" }} />
                                        </IconButton>:
                                       <IconButton value={row.REGID + ',' + row.ID} disabled onClick={editButtonHandle}>
                                            <EditIcon style={{ color: "#b9b9b9" }} />
                                        </IconButton>}

                                    </TableCell>
                                    <TableCell align="center">
                                    {(row.ORGID === sessionStorage.getItem('org')) ?
                                       <IconButton value={row.ID} onClick={deleteButtonHandle}>
                                            <DeleteIcon style={{ color: "#d91d4c" }} />
                                        </IconButton>:
                                       <IconButton value={row.REGID + ',' + row.ID} disabled onClick={deleteButtonHandle}>
                                            <DeleteIcon style={{ color: "#b9b9b9" }} />
                                        </IconButton>}

                                    </TableCell>
                                </TableRow>
                            ))
                            : null}


                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}
