import React from 'react';
const MathJax:any = require('react-mathjax2');


//global const's
type Props = {
  coefficients:number[],
  lhs?:string,
};
//procedures
function _PrintVariableWithExponent(v:string,e:number) {
  if( e===0 ) {
    return "";
  } else if (e===1) {
    return v;
  } else {
    return ("t^"+(e+""));
  }
}

const MathjaxPolynomial: React.FC<Props> = props => {
  const ascii = (props.lhs || "")
    +props.coefficients
      .map((c,i)=>
        (c!==0)
          ?(((c<0)?"-": (i===0)?"":"+")
              +((Math.abs(c)!==1 || (i)===(props.coefficients.length-1)) ? Math.abs(c):"")
              +((props.coefficients.length-1)===(i)?"":_PrintVariableWithExponent("t",props.coefficients.length-1-i)))
          :"")
      .reduce((a,b)=>a+b,"");

	return (<MathJax.Node inline>{ ascii }</MathJax.Node>);
}

export default MathjaxPolynomial;
