import React from "react";
import MixedFraction,{FromString,ToString,FromInteger,GetIntegerPart} from "./MixedFraction";


type Props = {

};
type State = {
  complement:string,
  numberOfBits:number,
  input:string,
  output:string,
};

export default class Ex3 extends React.Component<Props,State> {
  state:State = {
    complement:"2s complement",
    numberOfBits:6,
    input:"",
    output:"",
  };
  public static CODE = "FYIOtUApQbNfKgfiMMzN";
  private static _COMPLEMENTS_AVAILABLE = [
    "2s complement",
    "1s complement"
  ]
  private static _ShowComplement = (input:string,complementType:string,numberOfBits:number) => {
    const shouldDoComplement = input.substr(0,1) === "-";
    console.log("shouldDoComplement: %s",JSON.stringify({shouldDoComplement,complementType}));
    let res:string = ToString(FromString(shouldDoComplement ? input.substr(1) : input,10),2);
    res = res.padStart(numberOfBits,"0");
    if( shouldDoComplement ) {
      if( complementType === "2s complement" ) {
        let newRes:string = "";
        for(let i = 0; i < res.length; i++) {
          newRes += (res.substr(i,1)==="0" ? "1" : "0");
        }
        res = ToString(FromInteger(GetIntegerPart(FromString(newRes,2))+1),2)

      } else if (complementType === "1s complement") {
        let newRes:string = "";
        for(let i = 0; i < res.length; i++) {
          newRes += (res.substr(i,1)==="0" ? "1" : "0");
        }
        res = newRes;
      } else {
        throw complementType;
      }
    }
    return res;
  }
  render() {
    const {complement,numberOfBits,input,output} = this.state;
    return (<div style={{
      display:"flex",
      flexDirection:"column",
      padding:"0 1em 0 1em",
    }}>
      <input type="text" value={this.state.input}
        onChange={(e)=>this.setState({input:e.target.value})}
      /> 
      <select value={complement} onChange={(e)=>this.setState({complement:e.target.value})}>
        {
          Ex3._COMPLEMENTS_AVAILABLE.map((c)=>{
            return (<option value={c}>{c}</option>);
          })
        }
      </select>
      <input type="text" value={this.state.numberOfBits}
        onChange={(e)=>this.setState({numberOfBits:Number(e.target.value)})}
      /> 
      <button onClick={()=>this.setState({output:Ex3._ShowComplement(input,complement,numberOfBits)})}>
        Compute!
      </button>
      <span>{output}</span>
    </div>);
  }
}
