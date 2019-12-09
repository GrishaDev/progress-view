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
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

let value=0;

export default class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date()};
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date){
        this.setState({date: date});
    }

    // error={this.state.graphError} helperText={this.state.graphHelper}  onChange={this.onChangeGraph.bind(this)}

    render() {

        let extrafield;
        if(this.props.gym){
            console.log("gym");
            extrafield = <TextField label="formula" variant="outlined" fullWidth onChange={(e)=> value = e.target.value}
            style={{  margin: '30px 0 0 0' }} helperText='example: 20,8,3'/>
        }

        return(
            <div>
            <Dialog open={this.props.open} onClose={this.props.dialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add value to {this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add some value
                    </DialogContentText>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="time"
                            value={this.state.date}
                            fullWidth
                            onChange={this.handleDateChange}
                            style={{  padding: '0 0 30px 0' }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>

                    <TextField required label="Value" variant="outlined" fullWidth type="number" onChange={(e)=> value = e.target.value} />
                    {extrafield}

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.dialogClose} color="primary">
                        nah
                </Button>
                    <Button onClick={()=> this.props.newValue(this.state.date,value, this.props.category, this.props.graph)}
                    color="primary">
                        Add
                </Button>
                </DialogActions>
            </Dialog>
            </div >
        );
    }
}