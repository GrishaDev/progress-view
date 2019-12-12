import React from 'react';
import '../../App.css';
import Graph from './Graph/Graph';
import Stats from './Stats/Stats';
import Add from './Add/Add'
import Options from './Options/Options'

class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    isGym(){
        return (this.props.valueType === "gym")
    }

    render() {

        let stats = <div className='stats-area'>Add some values to graph</div>
        if(this.props.data.length > 0)
            stats = <Stats valueType={this.props.valueType} data={this.props.data} gym={ this.isGym() } graphUpdate={this.props.graphUpdate}/>;
        
        return (
            <>
            <div className='content'>
                <Graph data={this.props.data} valueType={this.props.valueType} gym={ this.isGym() }/>
                <Options delete={this.props.delete} title={this.props.title}/>
                {stats}
            </div>
            <Add title={this.props.title} newValue={this.props.newValue} category={this.props.category}
             graph={this.props.graph} gym={ this.isGym() }/>
            </>
        );
    }
}

export default Content;


