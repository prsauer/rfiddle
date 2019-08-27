import React, { Component } from 'react';
import {
  getChampions,
  getMatches,
  getMatchDetails
} from "./util/riot";
import {
    mean,
    analyze,
    sum
} from "./util/stats";
import common from "./util/common";
import Signal from "./Signal";
import js_beautify from "js-beautify";
import styled from "styled-components";

import CodeArea from "./components/CodeArea";

var myid = 'Z2SI1qI2W86XQcY0L1gQ6Cr6rB8xQ_3vUY8Hq4mLgg-Arw';

var funcs = [
  common.gameDuration,
  common.alliedDeaths,
  common.enemyDeaths,
  common.myKillsPer10,
  common.myDeathsPer10,
  common.myKDA,
  common.myCSPerMin
];

let sampleFunc = `funcs.unshift(
  //Your Code goes here
  function YourFunctionName(details) {
    return details.YourDetails;
  }
  //end-your-code
);
`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signals: {},
      ctr: 0,
    };
  }


  addfunc = () => {
    let ta = this.refs['userFuncText'].getCode();
    console.log('t', this.refs['userFuncText'].getCode(), ta);
    eval(ta);
    this.setState({
      ctr: this.state.ctr + 1,
    });
  }

  clicked = async () => {
    this.setState({
      ctr: this.state.ctr + 1,
    });
    var championsById = await getChampions();
      var matches = await getMatches(myid, false);
      var matchDetails = []

      for (let m of matches) {
          let details = await getMatchDetails(m['gameId']);
          matchDetails.push(details);
      }
    let signals = analyze(funcs, matchDetails, 'Armsperson').stats;
      console.log(signals);
      this.setState({
        signals
      });
    return false;
  }

  componentWillUnmount() {
    console.log("Component Unmounting");
  }

  render() {
    console.log('Render.App', this);
    let dp = Object.keys(this.state.signals).map(
      k => <Signal name={k} {...this.state.signals[k]} />
    );
    return(
     <div>
        <h1>Signals Analysis</h1>
        <CodeArea
          ref="userFuncText"
          rows="8"
          cols="50"
          code={sampleFunc}
          startVisible={true}
        />
        <button onClick={this.addfunc}>Add Func</button>
        <button onClick={this.clicked}>Analyze</button>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div style={{width: "20%"}}>
            <h2>Tips</h2>
          </div>
          <div style={{width: "35%"}}>
            {
              funcs.map(f => <CodeArea code={f} />)
            }
          </div>
          <div style={{width: "35%"}}>
            { dp }
          </div>
         </div>
     </div>
   )
  }
}

export default App;
