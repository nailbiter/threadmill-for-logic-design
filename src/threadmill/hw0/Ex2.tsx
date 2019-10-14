import React from "react";
import MixedFraction,{FromString,ToString,ALPHABET} from "./MixedFraction";
import {UniformRandom} from "../util/random";


type Props = {

};
type State = {
  base1:number,
  base2:number,
  input:string,
  isShowingAnswer:boolean,
};

export default class Ex2 extends React.Component<Props,State> {
  state:State;
  public static CODE = "WBgTksGp5ixluAdH9QWx";
  constructor(props:Props) {
    super(props);
    this.state = Ex2._GenerateRandomParams();
  }
  private static _GenerateRandomParams = function ():State  {
    const base1 = Math.floor(UniformRandom(2,20));
    let base2:number = base1;
    let count = 0;
    for(;base2===base1;base2 = Math.floor(UniformRandom(2,20))) {
      count++;
      if(count>=10)
        break;
    }
    let input = "";
    for(let len:number = Math.floor(UniformRandom(2,4)), i:number = 0;i<len;i++) {
      input += ALPHABET.substr(Math.floor(UniformRandom(0,base1)),1);
    }
    input +=".";
    for(let len:number = Math.floor(UniformRandom(2,4)), i:number = 0;i<len;i++) {
      input += ALPHABET.substr(Math.floor(UniformRandom(0,base1)),1);
    }
    return {
      base1,base2,
      input,
      isShowingAnswer:false,
    }
  }
  render() {
    const {base1,base2,input,isShowingAnswer} = this.state;
    return (<div style={{
      display:"flex",
      flexDirection:"column",
    }}>
        <div>
          {`Convert ${input} from base ${base1} to base ${base2}.`}
        </div>
        {
          isShowingAnswer && (
            <>
            <b>Answer.</b>
            <div>{ToString(FromString(input,base1),base2)}</div>
            </>
          )
        }
        <button onClick = {isShowingAnswer?
          ()=>this.setState(Ex2._GenerateRandomParams()):
          ()=>this.setState({isShowingAnswer:true})
        }>
          {isShowingAnswer ? "generate another problem" : "show answer"}
        </button>
      </div>);
  }
}
