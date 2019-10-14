import React from 'react';
import './App.css';
import threadmill from "./threadmill";


//global const's
type State = {
  exerciseSelected?:string,
};

class App extends React.Component<{},State> {
  private static _HOMEWORKS:any = {
    "homework 1":{
      "exercise 2":"WBgTksGp5ixluAdH9QWx",
//      "exercise 3":"FYIOtUApQbNfKgfiMMzN",
    }
  };
  state:State = {
  };
  render() {
    if( !this.state.exerciseSelected ) {
      return (
        <div style={{
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
        }}>
        {
          Object.keys(App._HOMEWORKS).map(hwKey=>{
            return (<section style={{
              textAlign:"center",
            }}>
              <header>{hwKey}</header>
              <div style={{
                display:"flex",
                flexDirection:"row",
                padding:"0 1em 0 1em",
              }}>
                {
                  Object.keys(App._HOMEWORKS[hwKey]).map(exKey=>{
                    return (<button onClick={()=>this.setState({exerciseSelected:App._HOMEWORKS[hwKey][exKey]})}>
                      {exKey}
                    </button>);
                  })
                }
              </div>
            </section>);
          })
        }
        </div>
      );
    } else {
//      return (<h1>no such exercise as {this.state.exerciseSelected}</h1>);
      const keys:string[] = Object.keys(threadmill as any);
      for(let i = 0; i < keys.length; i++) {
        var k:string[] = Object.keys((threadmill as any)[keys[i]]);
        for(let j = 0; j < k.length;j++) {
          if((threadmill as any)[keys[i]][k[j]].CODE === this.state.exerciseSelected) {
            const ComponentToRender = (threadmill as any)[keys[i]][k[j]];
            return (<ComponentToRender/>);
          }
        }
      }
    }
  }
}

export default App;
