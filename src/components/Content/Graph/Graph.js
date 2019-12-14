import React from 'react';
import '../../../App.css';
import { VictoryZoomContainer, VictoryChart,VictoryLine,VictoryAxis } from 'victory'

// let label;

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getLabel = this.getLabel.bind(this);
        // gym(this.props.valueType);
    }

    // componentDidUpdate() {
    //     gym(this.props.valueType);
    // }

    handleZoom(domain) {
        this.setState({ selectedDomain: domain });
    }

    handleBrush(domain) {
        this.setState({ zoomDomain: domain });
    }


    getLabel(){
        if(this.props.gym)
            return "str";
        return this.props.valueType;
    }

    render() {
        return (
            <div className='graph-area'>
                <VictoryChart width={800} height={350} scale={{ x: "time" }} animate={{
                    duration: 500,
                    onLoad: { duration: 500 }
                    }}
                    padding={{ left: 90, top: 50, right: 20, bottom: 50 }}
                    // containerComponent={
                    //     <VictoryZoomContainer responsive={true}
                    //         zoomDimension="x"
                    //         zoomDomain={this.state.zoomDomain}
                    //         onZoomDomainChange={this.handleZoom.bind(this)}
                    //     />
                    // }
                >
                    <VictoryLine
                        style={{
                            data: { stroke: "tomato" }
                        }}
                        data={this.props.data}
                    />

                    <VictoryAxis dependentAxis
                        // theme={V.VictoryTheme.material}
                        tickFormat={(t) => `${Math.round(t)} `+this.getLabel()}
                        fixLabelOverlap={true}
                        style={{ 
                            axis: {
                            stroke: 'black',
                            },
                            ticks: {
                            stroke: 'black',
                            },
                            tickLabels: {
                            color: 'black',
                            fill: 'black'
                            }
                        }}
                        standalone={false}
                    />

                    <VictoryAxis
                        standalone={false}
                        style={{
                        axis: {
                            stroke: 'black',
                        }
                        }}
                    />
                </VictoryChart>
            </div>
        );
    }
}

export default Graph;

// function gym(valueType){
//     if(valueType === "gym")
//         label = "volume";
//     else
//         label=valueType;
// }