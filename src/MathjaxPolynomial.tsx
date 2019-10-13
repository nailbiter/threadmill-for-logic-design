import React from 'react';
const MathJax:any = require('react-mathjax2');


//global const's
type Props = {
  coefficients:number[],
  lhs?:string,
  variable?:string,
  printVariableWithExponent?: (v:string,e:number)=>string,
};
//procedures

const MathjaxPolynomial: React.FC<Props> = props => {
  const variable = props.variable || "t";
  const printVariableWithExponent
    = props.printVariableWithExponent
    || ((v:string,e:number) => {
    if( e===0 ) {
      return "";
    } else if (e===1) {
      return v;
    } else {
      return (v+"^"+(e+""));
    }
  });

  const ascii = (props.lhs || "")
    +props.coefficients
      .map((c,i)=>
        (c!==0)
          ?(((c<0)?"-": (i===0)?"":"+")
              +((Math.abs(c)!==1 || (i)===(props.coefficients.length-1)) ? Math.abs(c):"")
              +printVariableWithExponent(variable,props.coefficients.length-1-i))
          :"")
      .reduce((a,b)=>a+b,"");

	return (<MathJax.Node inline>{ ascii }</MathJax.Node>);
}

export default MathjaxPolynomial;
