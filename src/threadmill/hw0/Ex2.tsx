import React from "react";
import MixedFraction,{FromString,ToString} from "./MixedFraction";


type Props = {

};
type State = {
  base1:number,
  base2:number,
  input:string,
  output:string,
};

export default class Ex2 extends React.Component<Props,State> {
  state:State = {
    base1:10,
    base2:2,
    input:"",
    output:"",
  };
  public static CODE = "WBgTksGp5ixluAdH9QWx";
  render() {
    const {base1,base2,input,output} = this.state;
    return (<div style={{
      display:"flex",
      flexDirection:"column",
    }}>
      <input type="text" value={this.state.input}
        onChange={(e)=>this.setState({input:e.target.value})}
      /> 
      <input type="text" value={this.state.base1}
        onChange={(e)=>this.setState({base1:Number(e.target.value)})}
      /> 
      <input type="text" value={this.state.base2}
        onChange={(e)=>this.setState({base2:Number(e.target.value)})}
      /> 
      <button onClick={()=>this.setState({output:ToString(FromString(input,base1),base2)})}>
        Compute!
      </button>
      <span>{output}</span>
    </div>);
  }
}
