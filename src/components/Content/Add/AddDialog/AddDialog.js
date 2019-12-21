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
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

let value=0;
let weight = [];
let reps = [];
let special = false;
let special_data;

export default class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        weight.push(0);
        reps.push(0);

        this.state = { date: new Date(), sets: 1};
        this.handleDateChange = this.handleDateChange.bind(this);
        // this.handleSpecialForm = this.handleSpecialForm.bind(this);
        this.handleNormalForm = this.handleNormalForm.bind(this);
        this.addSet = this.addSet.bind(this);
        this.removeSet = this.removeSet.bind(this);
    }

    handleDateChange(date){
        this.setState({date: date});
    }

    // handleSpecialForm(e){
    //     let id = e.target.id;
    // }

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
    
    addSet(){
        this.setState({sets: this.state.sets + 1})
        weight.push(0);
        reps.push(0);
    }
    removeSet(){
        if(this.state.sets > 1){
            this.setState({sets: this.state.sets - 1})
            weight.pop();
            reps.pop();
        }

    }

    render() {

        let extrafields =[];
        let extrafield=[];
        if(this.props.gym){
            extrafield.push( 
            <div key="stfu" className="ihatecss">
                <div className="ihatecss2" onClick={this.addSet}>
                    <AddIcon style={{ fontSize: 50 }}/>
                </div>
                <div className="ihatecss3" onClick={this.removeSet}>
                    <RemoveIcon style={{ fontSize: 50 }}/>
                </div> 
            </div>)

            for(let i=0; i<this.state.sets; i++){
                extrafields.push( <TextField  key={"annoyingshit1"+String(i)} label="weight" variant="outlined" type="number" id="weight"
                onChange={(e)=> weight[i]=e.target.value }
                style={ {margin: '0 0 0 0',width: '25%'}} helperText='example: 20' /> );

                extrafields.push( <TextField  key={"annoyingshit2"+String(i)} label="reps" variant="outlined" type="number" id="reps"
                onChange={(e)=> reps[i]=e.target.value}
                style={ {margin: '0 0 0 20px',width: '25%'}} helperText='example: 8' /> );

                // extrafields.push( <TextField   key="annoyingshit3 "label="sets" variant="outlined" type="number" id="sets"
                // onChange={(e)=> sets=e.target.value} 
                // style={  {margin: '0 0 0 20px',width: '25%'}} helperText='example: 3' /> );

                extrafield.push( <div key={"annoyingshit3"+String(i)} className="form-formula">{extrafields}</div>);
                extrafields =[];
            }
        }
        else{
        extrafield.push(<TextField key={"annoyingshit4"}  style={{  padding: '0 0 0 0' }} required={!this.props.gym} label="Value" variant="outlined"
        fullWidth type="number" onChange={this.handleNormalForm} />);
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
    num = parseFloat(num);
    num = Math.round(num * 100) / 100
    if(isNaN(num))
        value=0
    else
        value=num;
    return value;
}

function validateSpecialForm(){
    // weight = validateNumber(weight);
    // reps = validateNumber(reps);
    // sets = validateNumber(sets);

    formula();
    special=true;
    special_data={weight: arrayOutput(weight), reps: arrayOutput(reps), sets: weight.length};
    for(let i=0; i<weight.length; i++){
        weight[i] = 0;
        reps[i] = 0;
    }
}

function formula()
{
    let rm = [];
    for(let i=0; i<weight.length; i++){
        if(validateNumber(reps[i]) == 0)
            rm[i] = 0;
        else
            rm[i] = (validateNumber(weight[i]) * ((validateNumber(reps[i])/30)+1));
    }
    let average = (rm) => rm.reduce((a, b) => a + b) / rm.length;
    value = average(rm);
    value = Math.round(value * 100) / 100
    console.log(value);

    // if(reps === 0){
    //     value=0;
    //     return;
    // }
    // console.log("i leave");
    // value = (weight * ((reps/30)+1)) * sets;
}

function arrayOutput(arr){
    let str="";
    arr.map(o=>{
        str+= String(o)+",";
    });
    return str;
}
