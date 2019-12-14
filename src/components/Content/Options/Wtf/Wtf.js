import React from 'react';
import '../../../../App.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function Wtf(props) {

    return (
        <Dialog open={props.open} onClose={props.dialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle>Delete {props.title}?</DialogTitle>
            <DialogActions>
                    <Button onClick={props.dialogClose} color="primary" className="raw">No</Button>
                    <Button onClick={props.dialogDone}
                    color="primary">
                        Delete
                </Button> 
            </DialogActions>
        </Dialog>
    )
}

