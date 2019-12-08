import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';


const data = [{
  name: "games",
  graphs: [{
    name: "Roofcampers in rust",
    data: [{ x: new Date(2013, 1, 1), y: 140 },
    { x: new Date(1987, 1, 1), y: 12 },
    { x: new Date(1993, 1, 1), y: 14 },
    { x: new Date(1997, 1, 1), y: 18 },
    { x: new Date(2001, 1, 1), y: 52 },
    { x: new Date(2005, 1, 1), y: 80 },
    { x: new Date(2011, 1, 1), y: 150 },
    { x: new Date(2015, 1, 1), y: 170 }]
  },
  {
    name: "Balanced matches in dota",
    data: [{ x: new Date(2013, 1, 1), y: 400 },
    { x: new Date(1987, 1, 1), y: 320 },
    { x: new Date(1993, 1, 1), y: 280 },
    { x: new Date(1997, 1, 1), y: 150 },
    { x: new Date(2001, 1, 1), y: 210 },
    { x: new Date(2005, 1, 1), y: 120 },
    { x: new Date(2011, 1, 1), y: 80 },
    { x: new Date(2015, 1, 1), y: 2 }]
  }
  ]
},
{
  name: "ugh",
  graphs: [{
    name: "uga",
    data: [{ x: new Date(2013, 1, 1), y: 140 },
    { x: new Date(1987, 1, 1), y: 12 },
    { x: new Date(1993, 1, 1), y: 14 },
    { x: new Date(1997, 1, 1), y: 18 },
    { x: new Date(2001, 1, 1), y: 52 },
    { x: new Date(2005, 1, 1), y: 80 },
    { x: new Date(2011, 1, 1), y: 150 },
    { x: new Date(2015, 1, 1), y: 170 }]
  },
  {
    name: "dada",
    data: [{ x: new Date(2013, 1, 1), y: 400 },
    { x: new Date(1987, 1, 1), y: 320 },
    { x: new Date(1993, 1, 1), y: 280 },
    { x: new Date(1997, 1, 1), y: 150 },
    { x: new Date(2001, 1, 1), y: 210 },
    { x: new Date(2005, 1, 1), y: 120 },
    { x: new Date(2011, 1, 1), y: 80 },
    { x: new Date(2015, 1, 1), y: 2 }]
  }
  ]
}
]


class App extends React.Component {
  constructor(props) {
    super(props);
    this.first = data[0];
    this.state = { current: { name: this.first.graphs[0].name, data: this.first.graphs[0].data, category: 0, graph: 0 } };
    this.onGraphChange = this.onGraphChange.bind(this);
    this.newValue= this.newValue.bind(this);
    this.newGraph= this.newGraph.bind(this);
  }

  componentDidMount() {
  }

  newValue(date,value,category,graph){

    // console.log(data[category]);
    // console.log(data[category].graphs);
    data[category].graphs[graph].data.push({x: date, y: parseInt(value)});
    this.setState({ current: { name: data[category].graphs[graph].name, data: data[category].graphs[graph].data,
    category: category, graph: graph } });

    console.log(data[category].graphs[graph]);
  }

  newGraph(category,graph){
    let newcategory = true;
    let category_index=0;
    let graph_index=0;

    data.map((obj,index)=>{
        if(obj.name === category){
            graph_index = data[index].graphs.length;
            category_index  = index;
            newcategory = false;
            data[index].graphs.push({name: graph, data: []});
        }
    });

    if(newcategory){
        category_index = data.length;
        let new_graph = [{name: graph, data: []}];
        data.push({name: category, graphs: new_graph});
    }
    this.setState({ current: { name: data[category_index].graphs[graph_index].name, data: data[category_index].graphs[graph_index].data,
    category: category_index, graph: graph_index } });
  }

  onGraphChange(category,graph) {
    // console.log(category + '  WHY  '+graph);
    this.setState({ current: { name: data[category].graphs[graph].name, data: data[category].graphs[graph].data, 
    category: category, graph: graph } });
  }


  render() {
    return (
      <>
        <Header title={this.state.current.name} onGraphChange={this.onGraphChange} data={data} newGraph={this.newGraph}/>
        <Content data={this.state.current.data} title={this.state.current.name} newValue={this.newValue} category={this.state.current.category}
        graph={this.state.current.graph} />
      </>
    );
  }
}

export default App;
