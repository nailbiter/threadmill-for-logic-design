import React from 'react';
import './Ex50.css';
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
type Props = {

};
type State = {
  isShowingAnswer:boolean,
  coefficients: number[],
  after_sec:number,
};

class Ex50 extends React.Component<Props,State> {
  state:State;
  private static _DEGREE = 3;
  private static _COEFF_MIN = -4;
  private static _COEFF_MAX = 5;
  private static _AFTER_SEC_MAX = 5;
  private static _Div_HyBJIr6yMulA = (p:any) => <div className="HyBJIr6yMulA">{p.children}</div>

  private static _Range = (start:number, stop:number, step:number) => {
    return Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))
	}
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
          {length:Ex50._DEGREE},
          ()=>Math.floor(Ex50._COEFF_MIN+Math.random()*(Ex50._COEFF_MAX-Ex50._COEFF_MIN))
        ),
      ],
      after_sec: 1+Math.floor(Math.random()*(Ex50._AFTER_SEC_MAX-1)),
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
        DiscreteColorLegend,
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
            <Ex50._Div_HyBJIr6yMulA>
              <MathJax.Context input='ascii'>
                <MathjaxPolynomial 
                  coefficients={Ex50._Diff(this.state.coefficients)}
                  lhs="v="
                />
              </MathJax.Context>
            </Ex50._Div_HyBJIr6yMulA>
            <Ex50._Div_HyBJIr6yMulA>
              <MathJax.Context input='ascii'>
                <MathjaxPolynomial 
                  coefficients={Ex50._Diff(Ex50._Diff(this.state.coefficients))} 
                  lhs="a="
                />
              </MathJax.Context>
            </Ex50._Div_HyBJIr6yMulA>
            <b>(b)</b>
            <Ex50._Div_HyBJIr6yMulA>
              <MathJax.Context input='ascii'>
                <MathJax.Node inline>{ `v(${this.state.after_sec})=${Ex50._At(Ex50._Diff(this.state.coefficients),this.state.after_sec)}` }</MathJax.Node>
              </MathJax.Context>
            </Ex50._Div_HyBJIr6yMulA>
            <Ex50._Div_HyBJIr6yMulA>
              <MathJax.Context input='ascii'>
                <MathJax.Node inline>{ `a(${this.state.after_sec})=${Ex50._At(Ex50._Diff(Ex50._Diff(this.state.coefficients)),this.state.after_sec)}` }</MathJax.Node>
              </MathJax.Context>
            </Ex50._Div_HyBJIr6yMulA>
          </div>
          <b>(c)</b>
        <div>
          <XYPlot width={500} height={500}>
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis />
            <YAxis />
            {
              [
                (t:number)=>Ex50._At(this.state.coefficients,t),
                (t:number)=>Ex50._At(Ex50._Diff(this.state.coefficients),t),
                (t:number)=>Ex50._At(Ex50._Diff(Ex50._Diff(this.state.coefficients)),t),
              ]
              .map(f=>{
                return (
                  <Line
                    className="first-series"
                    data={Ex50._Range(0,5,0.1).map(x=>({x,y:f(x)}))}
                  />
                );
              })
            }
          </XYPlot>
          <h2>Legend:</h2>
          <DiscreteColorLegend height={100} width={200} items={["s","v","a"]}/>
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

export default Ex50;
