import React from 'react';
import '../../App.css';
import Graph from './Graph/Graph';
import Stats from './Stats/Stats';
import Add from './Add/Add'
import Divider from '@material-ui/core/Divider';
class Content extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        let stats = <div className='stats-area'>Add some values to graph</div>
        if(this.props.data.length > 0)
            stats = <Stats valueType={this.props.valueType} data={this.props.data}/>;
        
        return (
            <>
            <div className='content'>
                <Graph data={this.props.data} valueType={this.props.valueType}/>
                {/* <Divider /> */}
                {stats}
            </div>
            <Add title={this.props.title} newValue={this.props.newValue} category={this.props.category} graph={this.props.graph}/>
            </>
        );
    }
}

export default Content;
