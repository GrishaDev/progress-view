import React from 'react';
import '../../../../App.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function DataDialog(props) {

    let fields=[];
    props.data.map((o,ind)=>{
        fields.push(<p key={ind}>{JSON.stringify(o)}</p>);
    });

    return (
        <Dialog open={props.open} onClose={props.dialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle>Raw data:</DialogTitle>
            <DialogContent>
                {fields}
            </DialogContent>
            <DialogActions>
                    <Button onClick={props.dialogClose} color="primary" className="raw">Leave</Button>
                    {/* <Button onClick={()=> this.onSubmit()}
                    color="primary">
                        Add
                </Button>  */}
            </DialogActions>
        </Dialog>
    )
}