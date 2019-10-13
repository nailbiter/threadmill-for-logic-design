import React from 'react';
import './Ex50.css';
import Ex50 from "./Ex50";
import MathjaxPolynomial from "./MathjaxPolynomial";
const MathJax:any = require('react-mathjax2');


type Props = {

};
type State = {
  isShowingAnswer:boolean,
  coefficientsOfPoly:number[],
  coefficientsOfDe:number[],
};

export default class Ex68 extends React.Component<Props,State> {
  state:State;

  private static _DEGREE = 2;
  private static _DE_COEFF_MIN = -4;
  private static _DE_COEFF_MAX = 5;
  private static _COEFF_MIN = 1;
  private static _COEFF_MAX = 5;

  private static _Div_HyBJIr6yMulA = (p:any) => <div className="HyBJIr6yMulA">{p.children}</div>

  private static _GenerateRandomParams = () => {
    const res:State = {
      isShowingAnswer:false,
      coefficientsOfDe:[
        1,
        ...Array.from(
          {length:Ex68._DEGREE},
          ()=>
          (2*Math.floor(2*Math.random())-1)
          *Math.floor(Ex68._DE_COEFF_MIN+Math.random()*(Ex68._DE_COEFF_MAX-Ex68._DE_COEFF_MIN))
        ),
      ],
      coefficientsOfPoly:
        Array.from(
          {length:Ex68._DEGREE+1},
          ()=>Math.floor(Ex68._COEFF_MIN+Math.random()*(Ex68._COEFF_MAX-Ex68._COEFF_MIN))
        ),
    };
    return res;
  }

  constructor(props:Props) {
    super(props);

    this.state = Ex68._GenerateRandomParams();
  }
  render() {
    return (<div style={{
      display:"flex",
      flexDirection:"column",
    }}>
      <p>
        <span>The equation </span>
        <MathJax.Context input='ascii'>
          <MathjaxPolynomial 
            coefficients={this.state.coefficientsOfDe} 
            printVariableWithExponent={(v,e)=>{return "f"+"'".repeat(e)}}
          />
        </MathJax.Context>
        <span>\(=\)</span>
        <MathJax.Context input='ascii'>
          <MathjaxPolynomial 
            coefficients={this.state.coefficientsOfDe
              .map((coeff,index)=>{
                let res = JSON.parse(JSON.stringify(this.state.coefficientsOfPoly));
                for(let i = 0; i < (this.state.coefficientsOfDe.length-index-1);i++) {
                  res = Ex50._Diff(res);
                }
                return res.map((c:any)=>coeff*c);
              })
              .reduce((coeffs1:number[],coeffs2:number[])=>{
                while(coeffs1.length>coeffs2.length) {
                  coeffs2 = [0,...coeffs2];
                }
                while(coeffs1.length<coeffs2.length) {
                  coeffs1 = [0,...coeffs1];
                }
                return coeffs1.map((_,index1)=>coeffs1[index1]+coeffs2[index1]);
              },[])
            }
            variable="x"
          />
        </MathJax.Context>
        <span> is called </span>
        <b>a differential equation</b>
        <span> because it involves an unknown function \(y\) and its derivatives \(y'\) and \(y''\).</span>
        <span>Find constants \(A\), \(B\), and \(C\) such that the function \(y = Ax^2+ Bx+C\) satisfies 
      this equation. (Differential equations will be studied in detail in
        Chapter 9.)</span>
      </p>
      { this.state.isShowingAnswer && 
        <>
          <b>Answer.</b>
          <MathJax.Context input='ascii'>
            <MathJax.Node inline>
              {`A=${this.state.coefficientsOfPoly[0]}, B=${this.state.coefficientsOfPoly[1]}, C=${this.state.coefficientsOfPoly[2]}`}
            </MathJax.Node>
          </MathJax.Context>
        </>
      }

      <button onClick={this.state.isShowingAnswer ?
        ()=>{this.setState(Ex68._GenerateRandomParams())} :
        ()=>{this.setState({isShowingAnswer:true})}
      }>
        {this.state.isShowingAnswer ? "generate another problem" : "show answer"}
      </button>
    </div>);
  }
};
