import React from 'react';
import '../../../App.css';
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
let valueType='';
let disabled = true;

export default class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { categoryHelper: '', categoryError: false, graphHelper: '', graphError: false };
    }

    onCategorySelect(event,values){
        if(values != null){
            this.setState({ categoryHelper: '', categoryError: false });
            category = values;
            disabled=!this.isValid();
        }
        else{
            disabled=true;
            category = '';
        }
    }

    onChangeCategory(event) {
        if (event.target.value.length > 0) {
          this.setState({ categoryHelper: '', categoryError: false });
          disabled = false;
          category = event.target.value;
          disabled=!this.isValid();
        } 
        else {
          this.setState({ categoryHelper: 'give it a name', categoryError: true });
          disabled = true;
          category = '';
        }

        
    }

    onChangeGraph(event) {
        if (event.target.value.length > 0) {
            this.setState({ graphHelper: '', graphError: false });
            graph = event.target.value;
            disabled=!this.isValid();
        } 
        else {
          this.setState({ graphHelper: 'give it a name', graphError: true });
          disabled=true;
          graph = '';
        }
    }

    isValid()
    {
        return ( category.length > 0  && graph.length > 0 )
    }

    render() {
        return(
            <div>
            <Dialog open={this.props.open} onClose={this.props.dialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add graph</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Make a new graph
                    </DialogContentText>

                    <Autocomplete
                        id="category"
                        options={this.props.categories}
                        getOptionLabel={option => option}
                        style={{  padding: '0 0 30px 0' }}
                        freeSolo
                        onChange={this.onCategorySelect.bind(this)}
                        renderInput={params => (
                            <TextField {...params} required label="Category" variant="outlined" fullWidth
                            error={this.state.categoryError} helperText={this.state.categoryHelper} onChange={this.onChangeCategory.bind(this)}/>
                        )}
                    />

                    <TextField required label="Graph" variant="outlined" fullWidth style={{  padding: '0 0 30px 0' }}
                    error={this.state.graphError} helperText={this.state.graphHelper}  onChange={this.onChangeGraph.bind(this)}/>

                    <TextField label="type" variant="outlined" fullWidth 
                     helperText={'example: kg, minutes'}  onChange={(e)=> valueType = e.target.value}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.dialogClose} color="primary">
                        nah
                </Button>
                    <Button onClick={() => this.props.newGraph(category,graph,valueType)} disabled ={disabled}
                    color="primary">
                        Create
                </Button>
                </DialogActions>
            </Dialog>
            </div >
        );
    }
}