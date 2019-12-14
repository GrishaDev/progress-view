import React from 'react';
import '../../../App.css';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DataDialog from './DataDialog/DataDialog'

const weightType="kg";

class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.getLabel = this.getLabel.bind(this);
        this.state = {open: false};
    }

    dialogClick = () => {
        this.setState({open:true});
     }; 
 
     dialogClose = () => {
        this.setState({open:false});
     };

    getLabel(){
        if(this.props.gym)
            return "str";
        return this.props.valueType;
    }

    render() {
        return (
            <div className='stats-area'>
                <Typography variant="h6" className='header-title'>Stats:</Typography>
                <Divider />
                <p>Type: {this.getLabel()}</p>
                <p>Last: {getLast(this.props.data)}</p>
                <p>Highest: {getHighest(this.props.data)} </p>
                <p>Lowest: {getLowest(this.props.data)} </p>
                <p>Average: {getAverage(this.props.data)} </p>
                <Button color="primary" variant="contained" onClick={this.dialogClick}>Raw Data</Button>
                <DataDialog open={this.state.open} dialogClose={this.dialogClose} title={this.props.title} data={this.props.data}
                 graphUpdate={this.props.graphUpdate}/>
            </div>
        );
    }
}

export default Stats;


function getDate(date){
    return date.toLocaleDateString('en-gb');
}

function getExtra(index,data){
    let a = "";
    if(data[index].special_data){
        let thing = data[index].special_data;
        a += " | weight: "+thing.weight+" "+weightType;
        a += ", reps: "+ thing.reps;
        a += ", sets: "+thing.sets;
    }
    // return JSON.stringify(data[index].special_data);
    return a;
}

function getLast(data){
    let index = data.length -1;
    return data[index].y + " at "+getDate(data[index].x)+" "+getExtra(index,data);
}

function getHighest(data){
    let index=0;
    let max=0;

    data.map(function(o,ind){
        if(o.y > max){
            max = o.y;
            index = ind;
        }
    });
    return max + " at "+getDate(data[index].x)+" "+getExtra(index,data);
}

function getLowest(data){
    let index=0;
    let lowest=data[0].y;

    data.map(function(o,ind){
        if(o.y < lowest){
            lowest = o.y;
            index = ind;
        }
    });
    return lowest + " at "+getDate(data[index].x)+" "+getExtra(index,data);
}

function getAverage(data){
    return data.reduce((r, c) => r + c.y, 0) / data.length;
}