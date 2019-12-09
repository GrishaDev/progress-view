import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';


const data = [{
  name: "games",
  graphs: [{
    name: "Roofcampers in rust",
    type: "noobs",
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
    type: "matches",
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
    type: "meme",
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
    type: "xd",
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

    this.state = { current: { name: this.first.graphs[0].name,
    type: this.first.graphs[0].type,
    data: this.first.graphs[0].data, category: 0, graph: 0 } };

    this.onGraphChange = this.onGraphChange.bind(this);
    this.newValue= this.newValue.bind(this);
    this.newGraph= this.newGraph.bind(this);
  }

  componentDidMount() {
    document.title="hehe";
  }

  newValue(date,value,category,graph, special, special_data){
    if(!special)
      data[category].graphs[graph].data.push({x: date, y: parseInt(value)});
    else
      data[category].graphs[graph].data.push({x: date, y: parseInt(value), special_data: special_data});

    this.setState({ current: { name: data[category].graphs[graph].name,
    type: data[category].graphs[graph].type,
    data: data[category].graphs[graph].data,
    category: category, graph: graph } });
  }

  newGraph(category,graph,valueType){
    let a = newGraphParse(category,graph,valueType)
    let category_index = a.category_index;
    let graph_index = a.graph_index;

    this.setState({ current: { name: data[category_index].graphs[graph_index].name,
    type: data[category_index].graphs[graph_index].type,
    data: data[category_index].graphs[graph_index].data,
    category: category_index, graph: graph_index } });
  }

  onGraphChange(category,graph) {
    this.setState({ current: { name: data[category].graphs[graph].name,
    type: data[category].graphs[graph].type,
    data: data[category].graphs[graph].data, 
    category: category, graph: graph } });
  }


  render() {
    return (
      <>
        <Header title={this.state.current.name} onGraphChange={this.onGraphChange} data={data} newGraph={this.newGraph}/>
        <Content data={this.state.current.data} title={this.state.current.name} newValue={this.newValue} category={this.state.current.category}
        graph={this.state.current.graph} valueType={this.state.current.type}/>
      </>
    );
  }
}

export default App;



function newGraphParse(category,graph,valueType){
  let newcategory = true;
    let category_index=0;
    let graph_index=0;

    data.map((obj,index)=>{
        if(obj.name === category){
            graph_index = data[index].graphs.length;
            category_index  = index;
            newcategory = false;
            data[index].graphs.push({name: graph, type: valueType, data: []});
        }
    });

    if(newcategory){
        category_index = data.length;
        let new_graph = [{name: graph,type: valueType, data: []}];
        data.push({name: category, graphs: new_graph});
    }

    return {category_index,graph_index};
}
