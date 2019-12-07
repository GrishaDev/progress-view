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
    this.state = { current: { name: this.first.graphs[0].name, data: this.first.graphs[0].data } };
    this.onGraphChange = this.onGraphChange.bind(this);
    this.newGraph= this.newGraph.bind(this);
  }

  componentDidMount() {
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
    console.log(category_index);
    console.log(graph_index);
    console.log(data[category_index].graphs[0]);

    this.setState({ current: { name: data[category_index].graphs[graph_index].name, data: data[category_index].graphs[graph_index].data } });
  }

  onGraphChange(category,graph) {
    // console.log(category + '  WHY  '+graph);
    this.setState({ current: { name: data[category].graphs[graph].name, data: data[category].graphs[graph].data } });
  }

  render() {
    return (
      <>
        <Header title={this.state.current.name} onGraphChange={this.onGraphChange} data={data} newGraph={this.newGraph}/>
        <Content data={this.state.current.data} />
      </>
    );
  }
}

export default App;
