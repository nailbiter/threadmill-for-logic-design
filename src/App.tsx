import React from 'react';
import logo from './logo.svg';
import './App.css';
import Ex50 from "./Ex50";
import Ex68 from "./Ex68";
import MathjaxPolynomial from "./MathjaxPolynomial";
import 'react-vis/dist/style.css';
const MathJax:any = require('react-mathjax2');
const Plot:any = require( 'react-function-plot');
const ReactVis:{
    XYPlot:any,
    XAxis:any,
    YAxis:any,
    ChartLabel:any,
    HorizontalGridLines:any,
    VerticalGridLines:any,
    LineSeries:any,
    LineSeriesCanvas:any,
    DiscreteColorLegend:any,
} = require("react-vis");


//global const's
type State = {
  exerciseSelected?:string,
};

class App extends React.Component<{},State> {
  private static _EXERCISES:string[] = [
    "exercise 50",
    "exercise 68",
  ];
  state:State = {
  };
  render() {
    if( !this.state.exerciseSelected ) {
      return (
        <div style={{
          display:"flex"
        }}>
        {
          App._EXERCISES.map(e=>(
            <button onClick={()=>this.setState({exerciseSelected:e})}>
              {e}
            </button>
          ))
        }
        </div>
      );
    } else if(this.state.exerciseSelected === "exercise 50") {
      return (<Ex50/>);
    } else if(this.state.exerciseSelected === "exercise 68") {
      return (<Ex68/>);
    } else {
      return (<h1>no such exercise as {this.state.exerciseSelected}</h1>);
    }
  }
}

export default App;
