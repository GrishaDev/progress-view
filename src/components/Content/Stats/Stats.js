import React from 'react';
import '../../../App.css';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

class Stats extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='stats-area'>
                <Typography variant="h6" className='header-title'>Stats:</Typography>
                <Divider />
                <p>Type: {this.props.valueType}</p>
                <p>Last: {this.props.data[this.props.data.length -1].y}</p>
                <p>Highest: {getHighest(this.props.data)}</p>
                <p>Lowest: {getLowest(this.props.data)}</p>
                <p>Average: {getAverage(this.props.data)}</p>
            </div>
        );
    }
}

export default Stats;


function getHighest(data){
    let a = Math.max.apply(Math, data.map(function(o) {
        return o.y;
    }))

    return a;
}

function getLowest(data){
    let a = Math.min.apply(Math, data.map(function(o) {
        return o.y;
    }))
    return a;
}

function getAverage(data){
    return data.reduce((r, c) => r + c.y, 0) / data.length;
}