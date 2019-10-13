import React from 'react';
import logo from './logo.svg';
import './App.css';
import MathjaxPolynomial from "./MathjaxPolynomial";
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
} = require("react-vis");


//global const's
type Props = {

};
type State = {
  isShowingAnswer:boolean,
  coefficients: number[],
  after_sec:number,
};

class App extends React.Component<Props,State> {
  state:State;
  private static _DEGREE = 3;
  private static _COEFF_MIN = -4;
  private static _COEFF_MAX = 5;
  private static _AFTER_SEC_MAX = 5;
  private static _Div_HyBJIr6yMulA = (p:any) => <div className="HyBJIr6yMulA">{p.children}</div>

  private static _At = (coefficients:number[],val:number) => {
    return coefficients
      .map((c,i)=>Math.pow(val,coefficients.length-i-1)*c)
      .reduce((a,b)=>a+b,0);
  }
  private static _Diff = (coefficients:number[]) => {
    return coefficients
                    .slice(0,coefficients.length-1)
                    .map((c,i)=>c*(coefficients.length-i-1))
  }
  private _generateRandomParams = () => {
    const res:State = {
      isShowingAnswer:false,
      coefficients: [
        1,
        ...Array.from(
          {length:App._DEGREE},
          ()=>Math.floor(App._COEFF_MIN+Math.random()*(App._COEFF_MAX-App._COEFF_MIN))
        ),
      ],
      after_sec: 1+Math.floor(Math.random()*(App._AFTER_SEC_MAX-1)),
    };
    console.log("generating new state: %s",JSON.stringify(res,null,2));
    return res;
  }
  constructor(props:Props) {
    super(props);

    this.state = this._generateRandomParams();
  }
  render() {
    const {
        XYPlot,
        XAxis,
        YAxis,
        ChartLabel,
        HorizontalGridLines,
        VerticalGridLines,
        LineSeries,
        LineSeriesCanvas,
    } = ReactVis;
    const useCanvas = true;
    const Line = useCanvas ? LineSeriesCanvas : LineSeries;

    return (<div style={{
      display:"flex",
      flexDirection:"column",
    }}>
      <p>
          <span>The equation of motion of a particle is </span>
          <MathJax.Context input='ascii'>
            <MathjaxPolynomial coefficients={this.state.coefficients} lhs="s="/>
          </MathJax.Context>
          <span>, where \(s\) is in meters and \(t\) is in seconds. Find</span>
      </p>
      <ol>
        <li> Find the velocity and acceleration as functions of \(t\). </li>
        <li> Find the acceleration after {this.state.after_sec} s.</li>
        <li> Graph the position, velocity, and acceleration functions
        on the same screen.</li>
      </ol>
      { this.state.isShowingAnswer && 
        <>
          <b>Answer.</b>
          <div style={{
            display:"flex",
            flexDirection:"column",
          }}>
            <b>(a)</b>
            <App._Div_HyBJIr6yMulA>
              <MathJax.Context input='ascii'>
                <MathjaxPolynomial 
                  coefficients={App._Diff(this.state.coefficients)}
                  lhs="v="
                />
              </MathJax.Context>
            </App._Div_HyBJIr6yMulA>
            <App._Div_HyBJIr6yMulA>
              <MathJax.Context input='ascii'>
                <MathjaxPolynomial 
                  coefficients={App._Diff(App._Diff(this.state.coefficients))} 
                  lhs="a="
                />
              </MathJax.Context>
            </App._Div_HyBJIr6yMulA>
            <b>(b)</b>
            <App._Div_HyBJIr6yMulA>
              <MathJax.Context input='ascii'>
                <MathJax.Node inline>{ `v(${this.state.after_sec})=${App._At(App._Diff(this.state.coefficients),this.state.after_sec)}` }</MathJax.Node>
              </MathJax.Context>
            </App._Div_HyBJIr6yMulA>
            <App._Div_HyBJIr6yMulA>
              <MathJax.Context input='ascii'>
                <MathJax.Node inline>{ `a(${this.state.after_sec})=${App._At(App._Diff(App._Diff(this.state.coefficients)),this.state.after_sec)}` }</MathJax.Node>
              </MathJax.Context>
            </App._Div_HyBJIr6yMulA>
          </div>
          <b>(c)</b>
          <Plot
            className="myPlot"
            fn={(t:number)=>App._At(App._Diff(this.state.coefficients),t)}
            thickness={4}
          />
        <div>
          <XYPlot width={300} height={300}>
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis />
            <YAxis />
            <Line
              className="first-series"
              data={[{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}]}
            />
          {
            /*
            <Line className="second-series" data={null} />
            <Line
              className="third-series"
              curve={'curveMonotoneX'}
              data={[{x: 1, y: 10}, {x: 2, y: 4}, {x: 3, y: 2}, {x: 4, y: 15}]}
              strokeDasharray={useCanvas ? [7, 3] : '7, 3'}
            />
            <Line
              className="fourth-series"
              curve={curveCatmullRom.alpha(0.5)}
              style={{
                // note that this can not be translated to the canvas version
                strokeDasharray: '2 2'
              }}
              data={[{x: 1, y: 7}, {x: 2, y: 11}, {x: 3, y: 9}, {x: 4, y: 2}]}
            />
             */
          }
          </XYPlot>
        </div>
        </>
      }

      <button onClick={this.state.isShowingAnswer ?
        ()=>{this.setState(this._generateRandomParams())} :
        ()=>{this.setState({isShowingAnswer:true})}
      }>
        {this.state.isShowingAnswer ? "generate another problem" : "show answer"}
      </button>
    </div>);
  }
}

export default App;
