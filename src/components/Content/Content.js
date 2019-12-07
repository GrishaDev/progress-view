import React from 'react';
import '../../App.css';
import Graph from './Graph/Graph';
import Stats from './Stats/Stats';

class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='content'>
                <Graph data={this.props.data}/>
                <Stats/>
            </div>
        );
    }
}

export default Content;
