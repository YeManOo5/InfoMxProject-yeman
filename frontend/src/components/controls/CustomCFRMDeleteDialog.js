import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import _ from 'lodash';
import { TextField } from '@material-ui/core';
import moment from "moment";
import CustomSnackBar from "../../components/controls/CustomSnackBar";

//////////////////API//////////////////
import { deleteCFRM } from '../../modals/cfrminfo';

const styles = (theme) => ({
    root: {
        padding: theme.spacing(2),
        width: '500px',
        height: '50px',
        color: '#53344d'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(0),
        backgroundColor: '#fcf0f2',
        color: '#53344d',

    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}  {...other}>
            <Typography variant="h6" style={{ alignSelf: 'center' }} >{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),

        alignSelf: 'center'
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),

    },
}))(MuiDialogActions);

export default function CustomMDSRDeleteDialog(props) {
    const { onClose, open } = props;
    const [msg,setMsg] = useState('')

    useEffect(() => {

    }, [])

   

    const handleClose = () => {
        onClose();
    };

    const deleteHandle = async() => {

        const mData = {ID: sessionStorage.getItem('deleteServicePatientID')}
        const rhres = await deleteCFRM(mData);
        let m = ''
        if (rhres?.status === 200) {
           m = "Successfully deleted!"
        }
        setMsg(m)
        setTimeout(function () {
            onClose()
        }, 1500);
    }

    return (
        <div>
             
            <Dialog PaperProps={{
                style: {
                    backgroundColor: '#fcf0f2',
                    color: '#53344d'
                },
            }} onClose={handleClose} open={open}>
                <DialogTitle onClose={handleClose}>
                    Do you really want to delete?
                </DialogTitle>
                <DialogContent><Typography style={{color:'#009688'}} variant="body1">{msg}</Typography></DialogContent>
                <DialogActions  >
                    <Button variant="contained" autoFocus onClick={deleteHandle} style={{ background: '#d91d4c', color: 'white' }}>
                        OK
                    </Button>
                    <Button variant="contained" autoFocus onClick={handleClose} style={{ background: 'lightgray', color: 'black' }}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}