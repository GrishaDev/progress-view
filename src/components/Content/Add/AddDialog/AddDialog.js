import React from 'react';
import '../../../../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

let category='';
let graph = '';
let disabled = true;

export default class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    // error={this.state.graphError} helperText={this.state.graphHelper}  onChange={this.onChangeGraph.bind(this)}

    render() {
        return(
            <div>
            <Dialog open={this.props.open} onClose={this.props.dialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add value to {this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add some value
                    </DialogContentText>

                    <TextField required label="Value" variant="outlined" fullWidth type="number"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.dialogClose} color="primary">
                        nah
                </Button>
                    <Button onClick={this.props.dialogClose} disabled ={disabled}
                    color="primary">
                        Add
                </Button>
                </DialogActions>
            </Dialog>
            </div >
        );
    }
}