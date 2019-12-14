import React from 'react';
import '../../../../App.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

let graph;

export default function DataDialog(props) {

    const [disabled, setDisabled] = React.useState(true);
    // const [data, setData] = React.useState(JSON.stringify(props.data,null,4));

    function onInput(e){
        graph = e.target.value;
        // setData(graph);

        if(graph.length === 0)
            setDisabled(true);
        else
            setDisabled(false);
    }

    function submitHandle(){
        props.graphUpdate(graph);
        props.dialogClose();
    }

    // React.useEffect(()=>{
    //     console.log("haha");
    // })

    // let fields=[];
    // props.data.map((o,ind)=>{
    //     fields.push(<p key={ind}>{JSON.stringify(o)}</p>);
    // });

    return (
        <Dialog open={props.open} onClose={props.dialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle>Raw data:</DialogTitle>
            <DialogContent className="raw-data-area">
                {/* {fields} */}
                <TextField
                    placeholder="What have you done? ctrl z asap"
                    multiline={true}
                    rows={9}
                    rowsMax={15}
                    // value={data}
                    defaultValue={JSON.stringify(props.data,null,4)}
                    fullWidth
                    helperText="Change at your own risk"
                    onChange={onInput}
                    />
            </DialogContent>
            <DialogActions>
                    <Button onClick={props.dialogClose} color="primary" className="raw">Leave</Button>
                    <Button  disabled={disabled} onClick={submitHandle} color="primary">Change</Button> 
            </DialogActions>
        </Dialog>
    )
}