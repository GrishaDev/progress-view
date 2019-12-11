import React from 'react';
import '../../../App.css';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

// let label;

class Stats extends React.Component {
    constructor(props) {
        super(props);
        // gym(this.props.valueType);
        this.getLabel = this.getLabel.bind(this);
    }

    // componentDidUpdate() {
    //     console.log("hello? "+this.props.valueType)
    //     gym(this.props.valueType);
    // }

    getLabel(){
        if(this.props.gym)
            return "volume";
        return this.props.valueType;
    }

    render() {

        // let extrafield;
        // if(this.props.data[this.props.data.length -1].special_data)
        //     extrafield = JSON.stringify(this.props.data[this.props.data.length -1].special_data);
        
        return (
            <div className='stats-area'>
                <Typography variant="h6" className='header-title'>Stats:</Typography>
                <Divider />
                <p>Type: {this.getLabel()}</p>
                <p>Last: {getLast(this.props.data)}</p>
                <p>Highest: {getHighest(this.props.data)} </p>
                <p>Lowest: {getLowest(this.props.data)} </p>
                <p>Average: {getAverage(this.props.data)} </p>
            </div>
        );
    }
}

export default Stats;



function getExtra(index,data){
    if(data[index].special_data)
        return JSON.stringify(data[index].special_data);
    return "";
}

function getLast(data){
    let index = data.length -1;
    return data[index].y + " "+getExtra(index,data);
}

function getHighest(data){
    let index=0;
    let max=0;
    // let a = Math.max.apply(Math, data.map(function(o,ind) {
    //     index= ind;
    //     return o.y;
    // }))

    data.map(function(o,ind){
        if(o.y > max){
            max = o.y;
            index = ind;
        }
    });
    return max + " "+getExtra(index,data);
}

function getLowest(data){
    let index=0;
    let lowest=data[0].y;
    // let a = Math.min.apply(Math, data.map(function(o,ind) {
    //     return o.y;
    // }))

    data.map(function(o,ind){
        if(o.y < lowest){
            lowest = o.y;
            index = ind;
        }
    });
    return lowest + " "+getExtra(index,data);
}

function getAverage(data){
    return data.reduce((r, c) => r + c.y, 0) / data.length;
}

// function gym(valueType){
//     if(valueType === "gym")
//         label = "volume";
//     else
//         label=valueType;
// }