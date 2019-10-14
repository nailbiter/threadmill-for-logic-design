import React from "react";
import MixedFraction,{FromString,ToString} from "./MixedFraction";


type Props = {

};
type State = {

};

export default class Ex2 extends React.Component<Props,State> {
  public static CODE = "WBgTksGp5ixluAdH9QWx";
  render() {
    return (<div style={{
      display:"flex",
      flexDirection:"column",
    }}>
      <p>{JSON.stringify(FromString("3BA.25",14))}</p>
      <p>{JSON.stringify(ToString(FromString("3BA.25",14),6))}</p>
    </div>);
  }
}
