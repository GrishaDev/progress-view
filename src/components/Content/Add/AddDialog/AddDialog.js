import React from 'react';
import '../../../../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

let value=0;
let weight,reps,sets = 0;
let special = false;
let special_data;

export default class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date()};
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSpecialForm = this.handleSpecialForm.bind(this);
        this.handleNormalForm = this.handleNormalForm.bind(this);
    }

    handleDateChange(date){
        this.setState({date: date});
    }

    handleSpecialForm(e){
        let id = e.target.id;
    }

    handleNormalForm(e){
        value = validateNumber(e.target.value)
    }

    onSubmit(){
        if(this.props.gym)
            validateSpecialForm();
        else{
            special = false;
            special_data = {};
        }
        
        this.props.newValue(this.state.date,value, this.props.category, this.props.graph, special, special_data);
    }
    

    render() {

        let extrafields =[];
        let extrafield;
        if(this.props.gym){
            extrafields.push( <TextField  key="annoyingshit1" label="weight(kg)" variant="outlined" type="number" id="weight"
            onChange={(e)=> weight=e.target.value}
            style={ {margin: '0 0 0 0',width: '25%'}} helperText='example: 20' /> );

            extrafields.push( <TextField  key="annoyingshit2" label="reps" variant="outlined" type="number" id="reps"
            onChange={(e)=> reps=e.target.value}
            style={ {margin: '0 0 0 20px',width: '25%'}} helperText='example: 8' /> );

            extrafields.push( <TextField   key="annoyingshit3 "label="sets" variant="outlined" type="number" id="sets"
            onChange={(e)=> sets=e.target.value} 
            style={  {margin: '0 0 0 20px',width: '25%'}} helperText='example: 3' /> );

            extrafield = <div className="form-formula">{extrafields}</div>
        }
        else{
        extrafield = <TextField style={{  padding: '0 0 0 0' }} required={!this.props.gym} label="Value" variant="outlined"
        fullWidth type="number" onChange={this.handleNormalForm} />
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
                            format="dd/MM/yyyy"
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

                    {extrafield}

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.dialogClose} color="primary">
                        nah
                </Button>
                    <Button onClick={()=> this.onSubmit()}
                    color="primary">
                        Add
                </Button>
                </DialogActions>
            </Dialog>
            </div >
        );
    }
}

function validateNumber(num){
    let value;
    num = parseInt(num);

    if(isNaN(num))
        value=0
    else
        value=num;
    return value;
}

function validateSpecialForm(){
    weight = validateNumber(weight);
    reps = validateNumber(reps);
    sets = validateNumber(sets);

    formula();
    special=true;
    special_data={weight: weight, reps: reps, sets: sets};
}

function formula()
{
    value = weight * reps * sets;
}
