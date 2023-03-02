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
import CustomizedSnackbars from "../../components/controls/CustomSnackBar";

//////////////////API//////////////////
import * as del from '../../modals/deleteservice'
import * as dellab from '../../modals/deletelabservice'

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

export default function CustomDeleteServiceDialog(props) {
    const { onClose, open, data } = props;
    const [msg,setMsg] = useState('')

    useEffect(() => {

    }, [])



    const handleClose = () => {
        onClose();
    };

    const deleteHandle = async () => {

        if (data) {
            console.log("Data => ", data)
            const res = await del.deleteService(data);
            const labRes = await dellab.deleteLabService(data);
            let m = ''
            if (res?.status === 200 && labRes?.status === 200) {
               m = "Successfully deleted patient's service"
            }
            setMsg(m)
            setTimeout(function () {
                onClose()
            }, 1500);
            //await onClose()
        }

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