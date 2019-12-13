import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import axios from 'axios';
import Nothing from './components/Nothing'


let data = [];

// let data = [{
//   name: "games",
//   graphs: [{
//     name: "Roofcampers in rust",
//     type: "noobs",
//     data: [{ x: new Date(2013, 1, 1), y: 140 },
//     { x: new Date(1987, 1, 1), y: 12 },
//     { x: new Date(1993, 1, 1), y: 14 },
//     { x: new Date(1997, 1, 1), y: 18 },
//     { x: new Date(2001, 1, 1), y: 52 },
//     { x: new Date(2005, 1, 1), y: 80 },
//     { x: new Date(2011, 1, 1), y: 150 },
//     { x: new Date(2015, 1, 1), y: 170 }]
//   },
//   {
//     name: "Balanced matches in dota",
//     type: "matches",
//     data: [{ x: new Date(2013, 1, 1), y: 400 },
//     { x: new Date(1987, 1, 1), y: 320 },
//     { x: new Date(1993, 1, 1), y: 280 },
//     { x: new Date(1997, 1, 1), y: 150 },
//     { x: new Date(2001, 1, 1), y: 210 },
//     { x: new Date(2005, 1, 1), y: 120 },
//     { x: new Date(2011, 1, 1), y: 80 },
//     { x: new Date(2015, 1, 1), y: 2 }]
//   }
//   ]
// },
// {
//   name: "ugh",
//   graphs: [{
//     name: "uga",
//     type: "meme",
//     data: [{ x: new Date(2013, 1, 1), y: 140 },
//     { x: new Date(1987, 1, 1), y: 12 },
//     { x: new Date(1993, 1, 1), y: 14 },
//     { x: new Date(1997, 1, 1), y: 18 },
//     { x: new Date(2001, 1, 1), y: 52 },
//     { x: new Date(2005, 1, 1), y: 80 },
//     { x: new Date(2011, 1, 1), y: 150 },
//     { x: new Date(2015, 1, 1), y: 170 }]
//   },
//   {
//     name: "dada",
//     type: "xd",
//     data: [{ x: new Date(2013, 1, 1), y: 400 },
//     { x: new Date(1987, 1, 1), y: 320 },
//     { x: new Date(1993, 1, 1), y: 280 },
//     { x: new Date(1997, 1, 1), y: 150 },
//     { x: new Date(2001, 1, 1), y: 210 },
//     { x: new Date(2005, 1, 1), y: 120 },
//     { x: new Date(2011, 1, 1), y: 80 },
//     { x: new Date(2015, 1, 1), y: 2 }]
//   }
//   ]
// }
// ]


class App extends React.Component {
  constructor(props) {
    super(props);

    // if(data.length > 0){
    //   this.first = data[0];

    //   this.state = { current: { name: this.first.graphs[0].name,
    //   type: this.first.graphs[0].type,
    //   data: this.first.graphs[0].data, category: 0, graph: 0 } };
    // }

    this.onGraphChange = this.onGraphChange.bind(this);
    this.newValue= this.newValue.bind(this);
    this.newGraph= this.newGraph.bind(this);
    this.delete= this.delete.bind(this);
    this.graphUpdate= this.graphUpdate.bind(this);
  }

  async componentDidMount() {
    await getData();

    if(data.length > 0){
      this.first = data[0];

      this.state = { current: { name: this.first.graphs[0].name,
      type: this.first.graphs[0].type,
      data: this.first.graphs[0].data, category: 0, graph: 0 } };
    }

    document.title="Progress View";
  }

  async newValue(date,value,category,graph, special, special_data){
    if(!special)
      data[category].graphs[graph].data.push({x: date, y: parseInt(value)});
    else
      data[category].graphs[graph].data.push({x: date, y: parseInt(value), special_data: special_data});

    await saveData(data);

    this.setState({ current: { name: data[category].graphs[graph].name,
    type: data[category].graphs[graph].type,
    data: data[category].graphs[graph].data,
    category: category, graph: graph } });

    console.log(data);
  }

  async newGraph(category,graph,valueType){
    let a = newGraphParse(category,graph,valueType)
    let category_index = a.category_index;
    let graph_index = a.graph_index;

    await saveData(data);

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

  async delete(){
    let cat = this.state.current.category;
    let grf = this.state.current.graph;
    data[cat].graphs.splice(grf,1);
    if(data[cat].graphs.length === 0)
      data.splice(cat,1);
    
    await saveData(data);

    if(data.length > 0){
      let first = data[0];
      this.setState( { current: { name: first.graphs[0].name,
        type: first.graphs[0].type,
        data: first.graphs[0].data, category: 0, graph: 0 } });
    }
    else{
      this.setState({nothing: true})
    }
  }

  async graphUpdate(graph){
    let parsed
    try{
      parsed = JSON.parse(graph);
    } catch(e){
      console.log("Invalid json from raw data option. >> "+e)
      return;
    }
    parsed.map(o =>{
      o.x = new Date(o.x);
    })
    let cat = this.state.current.category;
    let grf = this.state.current.graph;
    data[cat].graphs[grf].data = parsed;
    let current = data[cat].graphs[grf];

    await saveData(data);

    this.setState( { current: { name: current.name, type: current.type, data: parsed, category: cat, graph: grf } });
  }

  render() {

    let content = <Nothing/>;
    let header = <Header title={""} onGraphChange={this.onGraphChange} data={data} newGraph={this.newGraph}/>
    console.log("================================");
    console.log(data);
    console.log("================================");
    if(data.length > 0){
      content = <Content data={this.state.current.data} title={this.state.current.name} newValue={this.newValue} category={this.state.current.category}
      graph={this.state.current.graph} valueType={this.state.current.type} delete={this.delete} graphUpdate={this.graphUpdate}/>

      header = <Header title={this.state.current.name} onGraphChange={this.onGraphChange} data={data} newGraph={this.newGraph}/>
    }
    return (
      <>
        {header}
        {content}
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


async function getData(){
    try{
      let res = await axios.get('/api/');
      if(res.status)
          return res.data;
      else
          alert("error");
  }
  catch{
      alert("error contacting server");
  }
  return [];
}

async function saveData(data){
  try{
    let res = await axios.post('/api/',{data:data});
    if(res.status)
        console.log(res.msg);
    else
        alert("error");
  }
  catch{
      alert("error contacting server");
  }
}

