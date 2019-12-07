import React from 'react';
import '../../../App.css';
import { VictoryZoomContainer, VictoryChart,VictoryLine } from 'victory'

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleZoom(domain) {
        this.setState({ selectedDomain: domain });
    }

    handleBrush(domain) {
        this.setState({ zoomDomain: domain });
    }

    render() {
        return (
            <div className='graph-area'>
                <VictoryChart width={800} height={350} scale={{ x: "time" }}
                    containerComponent={
                        <VictoryZoomContainer responsive={true}
                            zoomDimension="x"
                            zoomDomain={this.state.zoomDomain}
                            onZoomDomainChange={this.handleZoom.bind(this)}
                        />
                    }
                >
                    <VictoryLine
                        style={{
                            data: { stroke: "tomato" }
                        }}
                        data={this.props.data}
                    />
                </VictoryChart>
            </div>
        );
    }
}

export default Graph;
